/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Correct import for App Router
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push('/home'); // Navigate programmatically to /home
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <div>
      <button onClick={handleNavigation} className="rounded" color="black">Go to Home</button>
      </div>
      {/* Corrected Link component */}
      <Link href="/home" className="text-3xl font-bold underline">Go to Home (Link Component)</Link>
    </div>
  );
}
