import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(request) {
  try {
    console.log("Fetching customer history data from Supabase..."); // Log when fetching starts

    const { data: customerHistoryData, error } = await supabase
      .from("Customer") // **IMPORTANT: Replace 'customer_history' with your actual table name if different**
      .select("*") // Select all columns
      .order("created_at", { ascending: false }); // Order by creation date, newest first

    if (error) {
      console.error("Supabase Fetch Error:", error);
      return NextResponse.json(
        {
          error: `Failed to fetch customer history from database: ${error.message}`,
        },
        { status: 500 }
      );
    }

    console.log(
      "Successfully fetched customer history data:",
      customerHistoryData
    ); // Log fetched data

    return NextResponse.json({ data: customerHistoryData }, { status: 200 }); // Return data in JSON response
  } catch (error) {
    console.error("Error fetching customer history:", error);
    return NextResponse.json(
      { error: "Failed to fetch customer history" },
      { status: 500 }
    );
  }
}
