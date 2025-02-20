import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv'; // ⬅ Import dotenv

dotenv.config(); // ⬅ Load .env.local variables
console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Loaded' : 'Not Loaded');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('SUPABASE_URL:', supabaseUrl); // Debugging output
console.log('SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Loaded' : 'Not Loaded');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(req) {
  // Parse query parameters from the request URL
  const { searchParams } = new URL(req.url);
  const width = searchParams.get("width");
  const height = searchParams.get("height");

  if (!width || !height) {
    return new Response(JSON.stringify({ error: "Missing width or height parameters" }), { status: 400 });
  }

  const { data, error } = await supabase
    .from("W2")
    .select("price")
    .eq("width", width)
    .eq("height", height)
    

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ data }), { status: 200 });
}
