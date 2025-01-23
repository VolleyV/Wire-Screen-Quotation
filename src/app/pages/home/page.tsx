/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";



export default function HomePage() {
    return (
      <div>
        <h1>Welcome to the Home Page!</h1>
        <div>
        <Link href="/" className="text-3xl font-bold underline">Go Back (Link Component)</Link>
        </div>
      </div>
    );
  }
  