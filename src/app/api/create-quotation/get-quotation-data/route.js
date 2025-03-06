import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("customerId"); // Get customerId from URL parameter

    console.log("Fetching quotation data for customer ID:", customerId); // Log fetch request

    if (!customerId) {
      return NextResponse.json(
        { error: "Customer ID is required to fetch quotation data" },
        { status: 400 }
      );
    }

    const { data: customerData, error } = await supabase
      .from("Customer") // **IMPORTANT: Verify your table name is "Customer"**
      .select("slidingWindowData, quotationFormData") // **Select columns where you store quotation data**
      .eq("id", customerId); // **Assuming 'id' is the column in 'Customer' table that matches customerId**

    if (error) {
      console.error("Supabase Fetch Error:", error);
      return NextResponse.json(
        {
          error: `Failed to fetch quotation data from database: ${error.message}`,
        },
        { status: 500 }
      );
    }

    if (!customerData || customerData.length === 0) {
      return NextResponse.json(
        { error: `Quotation data not found for customer ID: ${customerId}` },
        { status: 404 }
      ); // Return 404 if no data found
    }

    const quotationData = customerData[0]; // Assuming one entry per customerId

    console.log("Successfully fetched quotation data:", quotationData); // Log fetched data

    return NextResponse.json({ data: quotationData }, { status: 200 }); // Return quotation data
  } catch (error) {
    console.error("Error fetching quotation data:", error);
    return NextResponse.json(
      { error: "Failed to fetch quotation data" },
      { status: 500 }
    );
  }
}
