// src/app/api/create-quotation/get-quotation-data/route.js
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js"; // Import Supabase client

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(request) {

  try {
    const searchParams = request.nextUrl.searchParams;
    const customerId = searchParams.get("customerId");

    if (!customerId) {
      return NextResponse.json(
        { error: "Missing customerId parameter" },
        { status: 400 }
      );
    }

    const { data: customerData, error: supabaseError } = await supabase
      .from("Customer")
      .select("*")
      .eq("id", customerId)
      .single();

    if (supabaseError) {
      console.error("Supabase error fetching customer data:", supabaseError);
      return NextResponse.json(
        {
          error: "Failed to fetch customer data from Supabase",
          details: supabaseError,
        },
        { status: 500 }
      ); // Include supabaseError details
    }

    if (!customerData) {
      return NextResponse.json(
        { error: "Customer data not found in Supabase" },
        { status: 404 }
      );
    }

    const quotationFormData = {
      attention: customerData.Attention || null,
      company: customerData.Company || null,
      address: customerData.Address || null,
      place: customerData.Place || null,
      project: customerData.Project || null,
      phone: customerData.Phone || null,
      quote: customerData.QuoteBy || null,
      date: customerData.Date || null,
    };

    // **Remove sessionStorage part completely**
    // const storedSlidingWindowData = sessionStorage.getItem("slidingWindowData");
    // const slidingWindowData = storedSlidingWindowData ? JSON.parse(storedSlidingWindowData) : [];

    // if (!quotationFormData) {
    //   return NextResponse.json({ error: "Incomplete quotation form data" }, { status: 404 });
    // }
    // if (!slidingWindowData || !Array.isArray(slidingWindowData)) {
    //   return NextResponse.json({ error: "Incomplete product details data" }, { status: 404 });
    // }

    return NextResponse.json(
      { data: { quotationFormData /*, slidingWindowData */ } },
      { status: 200 }
    ); // Remove slidingWindowData from response for now
  } catch (error) {
    console.error("API Error fetching quotation data:", error);
    return NextResponse.json(
      { error: "Failed to fetch quotation data", details: error.message },
      { status: 500 }
    ); // Include error details
  }
}
