// app/api/auth/check/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
//import { createClient } from '@supabase/supabase-js'; // No Supabase client needed here anymore

//const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Not needed
//const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Not needed
//const supabase = createClient(supabaseUrl, supabaseAnonKey); // Not needed

export async function GET() {
    const sessionToken = await (await cookies()).get('sessionToken');
    console.log("Session Token in /api/auth/check:", sessionToken);

    let isValidSession = false; // Default to invalid

    if (sessionToken && sessionToken.value) {
        isValidSession = true; // Simply check if the cookie exists and has a value
    }

    console.log("isValidSession in /api/auth/check:", isValidSession); // Logging

    if (isValidSession) {
        return NextResponse.json({ authenticated: true, message: 'Session is valid' }, { status: 200 });
    } else {
        // Clear the invalid session cookie (optional, but good practice)
        (await
            // Clear the invalid session cookie (optional, but good practice)
            cookies()).delete('sessionToken');
        return NextResponse.json({ authenticated: false, message: 'Session is invalid' }, { status: 401 });
    }
}