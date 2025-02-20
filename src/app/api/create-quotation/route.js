import { createClient } from "@supabase/supabase-js";
import puppeteer from "puppeteer";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const generateQuotationPDF = async (req, res) => {
  if(req.method === 'POST'){
  try {
    const { customerId } = req.body;

    if (!customerId) {
      return res.status(400).json({ error: "ID is required" });
    }

    // Fetch data from Supabase
    const { data, error } = await supabase
      .from("W2")
      .select("name, price, width, height")
      .eq("id", customerId)
      .single();

    if (error || !data) {
      return res.status(500).json({ error: `Failed to fetch data: ${error.message}` });
    }

    const { name, price, width, height } = data;

    const htmlContent = `
      <html>
        <head>
          <title>Quotation</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f4f4f4; }
          </style>
        </head>
        <body>
          <h1>Quotation</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Price:</strong> $${price}</p>
          <p><strong>Width:</strong> ${width} cm</p>
          <p><strong>Height:</strong> ${height} cm</p>
        </body>
      </html>
    `;

    // Generate PDF
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();

    // Upload PDF directly as a buffer
    const fileName = `quotations/${customerId}-${Date.now()}.pdf`;
    const { error: uploadError } = await supabase.storage
      .from("quotations")
      .upload(fileName, pdfBuffer, {
        contentType: "application/pdf",
        upsert: true, // Allows overwriting existing files
      });

    if (uploadError) {
      return res.status(500).json({ error: `Failed to upload PDF: ${uploadError.message}` });
    }

    // Get Signed URL
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from("quotations")
      .createSignedUrl(fileName, 60 * 60); // 1 hour expiry

    if (signedUrlError) {
      return res.status(500).json({ error: `Failed to get signed URL: ${signedUrlError.message}` });
    }

    res.json({ pdfUrl: signedUrlData.signedUrl });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: `Internal server error: ${err.message}` });
  }
  }
};
