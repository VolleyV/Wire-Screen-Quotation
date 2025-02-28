import { jsPDF } from "jspdf";
import { notoSansThaiBase64 } from "./roboto-base64";

export async function POST(request) {
    try {
        const { slidingWindowData, quotationFormData } = await request.json();

        if (!slidingWindowData || !Array.isArray(slidingWindowData) || !quotationFormData) {
            return new Response(JSON.stringify({ error: "Invalid data received" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const doc = new jsPDF({
            orientation: "p",
            unit: "mm",
            format: "a4",
            putOnlyUsedFonts: true,
            encoding: "unicode",
        });
        doc.setFont('NotoSansThai'); // Set default font to NotoSansThai

        // --- Register NotoSansThai font ---
        doc.addFileToVFS("NotoSansThai-Regular.ttf", notoSansThaiBase64.normal);
        doc.addFont("NotoSansThai-Regular.ttf", "NotoSansThai", "normal");
        doc.setFont("NotoSansThai", "normal");

        // --- 1. Header Section (Top Left - Vignet, Top Right - Company Info) ---
        doc.setFontSize(24);
        doc.text('Vignet', 20, 20); // Top Left - Brand Name
        doc.setFontSize(10);
        doc.text('Certified Dealer', 20, 28); // Top Left - Subtitle

        doc.setFontSize(10);
        doc.setFont("Helvetica", "normal"); // Ensure normal font style
        let companyInfoX = 195; // X position for company info (right align - adjusted)
        let companyInfoY = 20;
        doc.text("Kunnapab Home Solution Ltd. (Head Office)", companyInfoX, companyInfoY, { align: 'right' });
        companyInfoY += 5;
        doc.text("1104/314 Phatthanakan, Suan Luang, Bangkok, 10250", companyInfoX, companyInfoY, { align: 'right' });
        companyInfoY += 5;
        doc.text("Bangkok, 10250", companyInfoX, companyInfoY, { align: 'right' }); // Added separate line
        companyInfoY += 5;
        doc.text(`063-720-5750; kunnapabtostem@hotmail.com`, companyInfoX, companyInfoY, { align: 'right' });

        // --- 2. Quotation Title and Number (Dynamic Date) ---
        doc.setFontSize(16);
        doc.setFont('NotoSansThai', 'normal');  // Explicitly set font before Thai text
        doc.text('ใบเสนอราคาเบื้องต้น (Drafted Quotation)', 105, 45, { align: 'center' }); // Centered Title (Thai)
        doc.setFontSize(10);
        doc.setFont('Helvetica', 'normal'); // Switch back to Helvetica for quotation number and date (optional - you can use NotoSansThai for all if you prefer)
        const quotationNumber = "(TM-250225-001)"; // Replace with dynamic quotation number generation later if needed
        doc.text(quotationNumber, 105, 52, { align: 'center' }); // Centered Quotation Number (Placeholder)

        const today = new Date();
        const formattedDate = today.toLocaleDateString('th-TH', { year: 'numeric', month: '2-digit', day: '2-digit' }); // Thai date format
        doc.text(`Date ${formattedDate}`, 195, 60, { align: 'right' }); // Dynamic Date (Top Right, below company info)

        // --- 3. Customer Information (Left Side - Dynamic from InputInfo) ---
        doc.setFontSize(10);
        doc.setFont('NotoSansThai', 'normal'); // Set font to NotoSansThai for customer info
        let customerInfoX = 20;
        let customerInfoY = 65;
        doc.text(`Attn.`, customerInfoX, customerInfoY);
        doc.text(`${quotationFormData.attention || '-'}`, customerInfoX + 20, customerInfoY);
        customerInfoY += 5;
        doc.text(`Comp.`, customerInfoX, customerInfoY);
        doc.text(`${quotationFormData.company || '-'}`, customerInfoX + 20, customerInfoY);
        customerInfoY += 5;
        doc.text(`Addr.`, customerInfoX, customerInfoY);
        doc.text(`${quotationFormData.address || '-'}`, customerInfoX + 20, customerInfoY);
        customerInfoY += 5;
        doc.text(`Tel.`, customerInfoX, customerInfoY);
        doc.text(`${quotationFormData.phone || '-'}`, customerInfoX + 20, customerInfoY);

        // --- 4. Quotation Details (Right Side - Dynamic Place, Project, Quoted by) ---
        doc.setFontSize(10);
        doc.setFont('NotoSansThai', 'normal'); // Set font to NotoSansThai for quotation details
        let quotationDetailsX = 110; // X position for right side details
        let quotationDetailsY = 65; // Adjusted Y position to start below Date
        doc.text(`Place`, quotationDetailsX, quotationDetailsY);
        doc.text(`${quotationFormData.place || '-'}`, quotationDetailsX + 20, quotationDetailsY);
        quotationDetailsY += 5;
        doc.text(`Project`, quotationDetailsX, quotationDetailsY);
        doc.text(`${quotationFormData.project || '-'}`, quotationDetailsX + 20, quotationDetailsY);
        quotationDetailsY += 5;
        doc.text(`Quoted by`, quotationDetailsX, quotationDetailsY + 5); // "Quoted by" Y position *increased by 5px* to avoid overlap
        doc.text(`${quotationFormData.quote || '-'}`, quotationDetailsX + 18, quotationDetailsY + 5); // Quoted by X and Y adjusted


        // --- 5. Horizontal Line Separator ---
        doc.line(20, 85, 195, 85); // x1, y1, x2, y2

        // --- 6. Product Table Headers (Same as before) ---
        const headers = ["Code", "Series", "Description", "Size (mm.)", " ", "Qty.", "Price/Unit\n(THB)", "Total\n(THB)"]; // Modified Headers
        let tableY = 95; // Start Y for table
        let tableX = 5;
        const cellWidths = [15, 20, 60, 20, 20, 15, 25, 25]; // Adjusted Column Widths

        const addTableCell = (doc, text, x, y, width, height = 10, isHeader = false, align = 'center', isPrice = false) => { // **Added isPrice parameter**
            doc.rect(x, y, width, height);
            if (isHeader) {
                doc.setFont('Helvetica', 'bold');
            } else {
                doc.setFont('NotoSansThai', 'normal');
            }
            let displayValue = text; // Default display value is just the text
            if (isPrice && typeof text === 'number') { // **If isPrice and text is a number, format it**
                displayValue = text.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            }
            doc.text(displayValue, x + width/2, y + height/2 + 2, { align: align }); // Vertically centered text
            if (isHeader) {
                doc.setFont('Helvetica', 'normal');
            }
        };

        // Table Header Row (Same as before)
        let currentX = tableX;
        headers.forEach((header, index) => {
            const headerHeight = (header === "Size (mm.)" || header === "   Price/Unit\n(THB)" || header === "Total\n(THB)") ? 15 : 10; // Adjust header height for multi-line headers
            addTableCell(doc, header, currentX, tableY, cellWidths[index], headerHeight, true);
            currentX += cellWidths[index];
        });

        // Sub-headers for "Size (mm.)" (Same as before)
        let sizeHeaderX = tableX + cellWidths[0] + cellWidths[1] + cellWidths[2]; // X position for "Size (mm.)" columns
        addTableCell(doc, "W", sizeHeaderX, tableY + 10, cellWidths[3], 5, true); // "W" sub-header
        addTableCell(doc, "H", sizeHeaderX + cellWidths[3], tableY + 10, cellWidths[4], 5, true); // "H" sub-header


        tableY += 15; // Move Y position below headers

        // --- 7. Product Table Data Rows (Same as before) ---
        slidingWindowData.forEach(item => {
            currentX = tableX;
            const totalPrice = item.price && item.qty ? Number(item.price) * Number(item.qty) : 0; // Ensure totalPrice is a number
            const rowData = [
                item.id,
                item.type,
                item.glass,
                item.width,
                item.height,
                item.qty,
                item.price ? Number(item.price) : 'N/A', // Pass price as Number if available, else 'N/A'
                totalPrice
            ];
            rowData.forEach((cell, index) => {
                let cellAlign = 'center';
                let isPriceCell = false; // Default isPriceCell to false
                if (index === 2) cellAlign = 'left';
                if (index > 5) {
                    cellAlign = 'right';
                    isPriceCell = true; // **Set isPriceCell to true for Price/Unit and Total columns**
                }
                addTableCell(doc, cell.toString(), currentX, tableY, cellWidths[index], 10, false, cellAlign, isPriceCell); // **Pass isPriceCell to addTableCell**
                currentX += cellWidths[index];
            });
            tableY += 10;
        });

        // --- 8. Summary Section (Right Bottom - Same calculations, adjusted labels) ---
        let summaryX = 130;
        let summaryAmountX = 195;
        let summaryY = tableY + 10;

        let subtotal = slidingWindowData.reduce((sum, item) => sum + (Number(item.price) * Number(item.qty) || 0), 0);
        let installationCost = Number(quotationFormData.installationAmount) || 0; // Get from form
        let shippingCost = Number(quotationFormData.shippingAmount) || 0;    // Get from form
        let discountPercent = Number(quotationFormData.discountPercentage) || 0; // Get discount % from form
        let discountAmount = Number(quotationFormData.discountAmount) || 0;     // Get discount amount (fixed) from form
        let vatRate = 0.07;
        let calculatedDiscountAmount = (subtotal * discountPercent) / 100; // Calculate discount from percentage
        let totalDiscount = calculatedDiscountAmount + discountAmount; // Total discount is % discount + fixed discount
        let discountedSubtotal = subtotal - totalDiscount; // Apply discount to subtotal


        let vatAmount = discountedSubtotal * vatRate + installationCost * vatRate + shippingCost * vatRate; // VAT on discounted subtotal
        let totalAmount = discountedSubtotal + installationCost + shippingCost + vatAmount; // Total on discounted subtotal

        doc.setFontSize(10);
        doc.text(`ราคารวมค่าสินค้า`, summaryX, summaryY, { align: 'right' });
        doc.text(`${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, summaryAmountX, summaryY, { align: 'right' });
        summaryY += 5;

        if (discountPercent > 0) { // Conditionally display % discount if > 0
            doc.text(`ส่วนลด (${discountPercent}%)`, summaryX, summaryY, { align: 'right' }); // Discount % Label
            doc.text(`-${calculatedDiscountAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, summaryAmountX, summaryY, { align: 'right' }); // Discount % Amount
            summaryY += 5;
        }
        if (discountAmount > 0) { // Conditionally display fixed discount if > 0
            doc.text(`ส่วนลด (บาท)`, summaryX, summaryY, { align: 'right' }); // Discount (Baht) Label
            doc.text(`-${discountAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, summaryAmountX, summaryY, { align: 'right' }); // Discount (Baht) Amount
            summaryY += 5;
        }


        //doc.setFont('Helvetica', 'bold');
        doc.text(`ราคารวมหลังหักส่วนลด`, summaryX, summaryY, { align: 'right' }); // Discounted Subtotal Label
        doc.text(`${discountedSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, summaryAmountX, summaryY, { align: 'right' }); // Discounted Subtotal Amount
        summaryY += 5;
        doc.setFont('NotoSansThai', 'normal');

        if (quotationFormData.includeInstallationCost) {
            doc.text(`ค่าติดตั้ง`, summaryX, summaryY, { align: 'right' });
            doc.text(`${installationCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, summaryAmountX, summaryY, { align: 'right' });
            summaryY += 5;
        }

        if (quotationFormData.includeShippingCost) {
            doc.text(`ค่าขนส่ง`, summaryX, summaryY, { align: 'right' });
            doc.text(`${shippingCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, summaryAmountX, summaryY, { align: 'right' });
            summaryY += 5;
        }


        //doc.setFont('Helvetica', 'bold');
        doc.text(`ราคารวมสุทธิ`, summaryX, summaryY, { align: 'right' });
        doc.text(`${(discountedSubtotal + installationCost + shippingCost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, summaryAmountX, summaryY, { align: 'right' });
        summaryY += 5;
        //doc.setFont('Helvetica', 'normal');
        doc.text(`VAT 7%`, summaryX, summaryY, { align: 'right' });
        doc.text(`${vatAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, summaryAmountX, summaryY, { align: 'right' });
        summaryY += 5;
        //doc.setFont('Helvetica', 'bold');
        doc.text(`ราคารวม VAT`, summaryX, summaryY, { align: 'right' });
        doc.text(`${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, summaryAmountX, summaryY, { align: 'right' });
        doc.setFont('Helvetica', 'normal');

        // --- 9. "หมายเหตุ" (Notes) Section (Bottom Left - Same Notes) ---
        let notesX = 20;
        let notesY = summaryY + 15; // Start notes below summary
        doc.setFontSize(10);
        doc.setFont('NotoSansThai', 'normal'); // Set font to NotoSansThai for notes section <--- ENSURE THIS LINE IS HERE
        doc.text('หมายเหตุ', notesX, notesY);
        notesY += 5;
        const notes = [
            "ใบเสนอราคานี้เป็นใบเสนอราคาเบื้องต้น ใบเสนอราคาจริงจะจัดทำหลังสำรวจหน้างานเท่านั้น",
            "- ราคาประเมินค่าขนส่งคิดจากโรงงาน tostem นวนคร",
            "- ระยะเวลาในการผลิตสินค้าประมาณ 45-60 วัน (กำหนดโดยโรงงาน TOSTEM) หลังจากชำระค่าสินค้าเต็มจำนวน",
            "- ราคาดังกล่าวยังไม่รวมมุ่ง",
            "- กรุณาเซ็นอนุมัติสั่งซื้อสินค้าและส่งหลักฐานการชำระเงินให้ บริษัท คุณภาพ โฮมโซลูชั่น จำกัด",
            "- สินค้าทั้งหมดยังถือเป็นกรรมสิทธิ์ของบริษัทฯจนกว่าลูกค้าจะชำระเงินเต็มจำนวน",
            "- สินค้าที่สั่งผลิตแล้ว จะไม่สามารถคืนเงินหรือเปลี่ยนแปลงสินค้าได้ในทุกกรณี",
            "- เทปกันรอยทั้งหมดจะถูกลอกออกทันทีเมื่อติดตั้งเสร็จ",
            "- เทปส่วนที่เหลือและการทำความสะอาดประตูหน้าต่างถือเป็นความรับผิดชอบของเจ้าของบ้าน",
            "- ในกรณีที่ไม่สามารถติดตั้งได้เนื่องจากอุปสรรคที่เกิดจากหน้างาน ทางเราขอเก็บค่าติดตั้งเก็บตามจำนวนที่ติดตั้งจริง",
            "- งานติดตั้งไม่รวมถึงการความสะอาดประตูหน้าต่างและกระจกที่เกิดจากฝุ่นและสิ่งสกปรกจากหน้างาน",
            "- ในกรณีที่ชำระค่าสินค้าไม่ครบ สินค้ายังคงกรรมสิทธิ์ของบริษัทฯ และจะไม่มีการรับประกันและบริการหลังการขายใดๆ ทั้งสิ้น",
        ];

        notes.forEach(note => {
            notesY += 5;
            doc.text(note, notesX + 5, notesY); // Indented notes
        });

        // --- 10. Footer Section (Bottom - Same Footer) ---
        let footerY = 280; // Adjust footer Y position as needed (A4 page height is ~297mm)
        doc.setFontSize(8);
        doc.setFont('NotoSansThai', 'normal'); // Set font to NotoSansThai for footer section <--- ENSURE THIS LINE IS HERE
        doc.text("รับทราบและตกลงตามเงื่อนไขเพื่อสั่งซื้อ", 20, footerY); // Bottom Left
        doc.text("ผู้อนุมัติสั่งซื้อ (โปรดประทับตรานิติบุคคล)", 20, footerY + 5);

        doc.setFontSize(10); // Slightly larger for company name in footer
        doc.text("ผู้เสนอราคา", 105, footerY + 5, { align: 'center' }); // Bottom Center
        doc.setFont('Helvetica', 'normal'); // Switch back to Helvetica for company name in footer (optional)
        doc.text("Kunnapab Home Solution Ltd. (Head Office)", 195, footerY + 5, { align: 'right' }); // Bottom Right


        // --- 11. Generate PDF buffer and return response ---
        const pdfBufferBase64 = doc.output('arraybuffer');
        const pdfBuffer = Buffer.from(pdfBufferBase64);

        return new Response(pdfBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline; filename="quotation.pdf"',
            },
        });

    } catch (error) {
        console.error("jsPDF Generation Error:", error);
        return new Response(JSON.stringify({ error: "Failed to generate PDF with jsPDF" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}