"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // **Correct import for App Router**
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase URL or anonymous key.");
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Now this should work correctly
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/login", {
        // Call the API route
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Login failed.");
        return;
      }

      // Successful login (API route sets the cookie)
      console.log("Login successful! Redirecting to /");
      router.push("/"); // Redirect to dashboard
      window.location.href = "/";
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. An unexpected error occurred.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100"> {/* Main container for centering */}
      <div className="bg-white p-8 rounded-lg shadow-md w-96"> {/* Login form container */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Log in</h1> {/* Heading */}

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* Error message */}

        <form onSubmit={handleLogin} className="space-y-4"> {/* Form with vertical spacing */}
          <div>
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2"> {/* Label styling */}
              Username or Email
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Your username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2"> {/* Label styling */}
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Your password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            />
          </div>
          <div className="flex items-center justify-center"> {/* Button container */}
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}