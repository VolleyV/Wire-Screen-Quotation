"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function HomePage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>ชื่อ: {name}</p>
      <div>
        <Link href="/" className="text-3xl font-bold underline">
          Go Back (Link Component)
        </Link>
      </div>
    </div>
  );
}
