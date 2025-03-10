// src/app/api/login/route.js
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import { NextResponse } from 'next/server'; // Import NextResponse

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req) { // **Export POST function**
    const { username, password } = await req.json(); // **Get data from request body using req.json()**

    try {
        const { data, error: supabaseError } = await supabase
            .from('users')
            .select('password_hash')
            .eq('username', username)
            .single();

        if (supabaseError) {
            console.error("Supabase error fetching user:", supabaseError);
            return NextResponse.json({ message: 'Server error during login.' }, { status: 500 }); // **Use NextResponse.json**
        }

        if (!data) {
            return NextResponse.json({ message: 'Invalid username or password.' }, { status: 401 }); // **Use NextResponse.json**
        }

        const passwordMatch = await bcrypt.compare(password, data.password_hash);

        if (passwordMatch) {
            // Successful login - Set session (using cookie here for simplicity)
            const sessionToken = 'your_secure_session_token'; // In a real app, generate a more secure token (JWT, etc.)
            const serializedCookie = serialize('sessionToken', sessionToken, {
                httpOnly: true, // Important for security - prevents client-side JS access
                secure: process.env.NODE_ENV !== 'development', // Send cookie only over HTTPS in production
                sameSite: 'strict', // Helps prevent CSRF attacks
                path: '/',
                maxAge: 60 * 60 * 24 * 7, // Cookie expires in 7 days (adjust as needed)
            });

            return new NextResponse(JSON.stringify({ success: true, message: 'Login successful' }), { // **Use NextResponse constructor**
                status: 200,
                headers: {
                    'Set-Cookie': serializedCookie,
                    'Content-Type': 'application/json', // **Ensure Content-Type is set**
                },
            });
        } else {
            return NextResponse.json({ message: 'Invalid username or password.' }, { status: 401 }); // **Use NextResponse.json**
        }

    } catch (error) {
        console.error("API Login error:", error);
        return NextResponse.json({ message: 'Server error during login.' }, { status: 500 }); // **Use NextResponse.json**
    }
}

// Optionally, you can add handlers for other methods (GET, etc.) if needed,
// e.g., export async function GET(req) { ... }