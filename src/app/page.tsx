/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useRouter } from "next/navigation"; // Correct import for App Router

import { useState } from "react";

import InputInfo from "./Components/InputInfo";
import SlidingWindow from "./Components/SlidingWindow";
import CheckBox from "./Components/checkbox";

export default function Home() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="mb-6">
        <h1 className="text-4xl text-center font-bold">Vignet</h1>
      </div>
      <div></div>
      <InputInfo />
      <div className="overflow x-auto px-4 mt-10">
        <SlidingWindow />
      </div>
      <CheckBox />
    </div>
  );
}
