"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SearchParamsComponent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return <p>ชื่อ: {name}</p>;
}

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <SearchParamsComponent />
      </Suspense>
      <div>
        <Link href="/" className="text-3xl font-bold underline">
          Go Back (Link Component)
        </Link>
      </div>
    </div>
  );
}
