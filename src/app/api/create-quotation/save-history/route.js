import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request) {
  try {
    const formData = await request.json();
    console.log("Received formData for saving:", formData);

    // **Map formData to your Supabase table columns, including id**
    const customerHistoryData = {
      id: formData.quotationId, // **Use quotationId from formData for the 'id' column**
      Date: new Date().toLocaleDateString('en-CA'),
      Attention: formData.attention,
      Company: formData.company,
      Place: formData.place,
      Address: formData.address,
      Project: formData.project,
      Phone: formData.phone,
      QuoteBy: formData.quote,
      // ... other fields ...
    };

    console.log("Data to be inserted into Supabase:", customerHistoryData);

    const { data, error } = await supabase
      .from('Customer')
      .insert([customerHistoryData])
      .select();

    if (error) {
      console.error("Supabase Insert Error:", error);
      return NextResponse.json({ error: `Failed to save history to database: ${error.message}` }, { status: 500 });
    }

    console.log("Data inserted successfully:", data);

    return NextResponse.json({ message: "Data saved to history successfully!", data: data }, { status: 200 });

  } catch (error) {
    console.error("Error saving history:", error);
    return NextResponse.json({ error: "Failed to save history" }, { status: 500 });
  }
}