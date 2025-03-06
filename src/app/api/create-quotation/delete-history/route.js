import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function DELETE(request) { // Changed to DELETE request method
  try {
    const { searchParams } = new URL(request.url);
    const customerIdToDelete = searchParams.get('id'); // Get customer ID from URL parameter

    console.log("Deleting customer history entry with ID:", customerIdToDelete); // Log deletion request

    if (!customerIdToDelete) {
      return NextResponse.json({ error: "Customer ID is required to delete" }, { status: 400 });
    }

    const { error } = await supabase
      .from('Customer') // **IMPORTANT: Replace 'customer_history' with your actual table name if different**
      .delete()
      .eq('id', customerIdToDelete); // **Filter to delete row with matching ID**

    if (error) {
      console.error("Supabase Delete Error:", error);
      return NextResponse.json({ error: `Failed to delete customer history entry from database: ${error.message}` }, { status: 500 });
    }

    console.log("Customer history entry deleted successfully:", customerIdToDelete); // Log successful deletion

    return NextResponse.json({ message: `Customer history entry with ID ${customerIdToDelete} deleted successfully!` }, { status: 200 }); // Return success response

  } catch (error) {
    console.error("Error deleting customer history:", error);
    return NextResponse.json({ error: "Failed to delete customer history" }, { status: 500 });
  }
}