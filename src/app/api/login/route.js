// src/app/api/login/route.js
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';
import crypto from 'crypto'; // Import crypto for generating session token

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req) {
    const { username, password } = await req.json();

    console.log("Login API called for username:", username);

    try {
        const { data, error: supabaseError } = await supabase
            .from('users')
            .select('password_hash, id') // Select id only
            .eq('username', username)
            .single();

        if (supabaseError) {
            console.error("Supabase error fetching user:", supabaseError);
            return NextResponse.json({ message: 'Server error during login.' }, { status: 500 });
        }

        if (!data) {
            console.log("User not found for username:", username);
            return NextResponse.json({ message: 'Invalid username or password.' }, { status: 401 });
        }

        const passwordMatch = await bcrypt.compare(password, data.password_hash);

        if (passwordMatch) {
            console.log("Setting simplified session cookie...");
            // **Custom Session Token Generation (Instead of signInWithPassword):**
            const sessionTokenValue = crypto.randomBytes(32).toString('hex'); // Generate a random token
            console.log("Generated Custom Session Token Value:", sessionTokenValue); // Log token value


            const serializedCookie = serialize('sessionToken', sessionTokenValue, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict',
                path: '/',
                //maxAge: 60 * 60 * 24 * 7, // 7 days expiration
            });

            console.log("Serialized Cookie:", serializedCookie);

            return new NextResponse(JSON.stringify({ success: true, message: 'Login successful' }), {
                status: 200,
                headers: {
                    'Set-Cookie': `sessionToken=${sessionTokenValue}; HttpOnly; Path=/; SameSite=Strict`,
                    'Content-Type': 'application/json',
                },
            });
        } else {
            console.log("Password mismatch for username:", username);
            return NextResponse.json({ message: 'Invalid username or password.' }, { status: 401 });
        }

    } catch (error) {
        console.error("API Login error:", error);
        return NextResponse.json({ message: 'Server error during login.' }, { status: 500 });
    }
}