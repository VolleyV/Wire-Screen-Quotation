/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useRouter } from "next/navigation"; // Correct import for App Router

import { useState } from "react";

import InputInfo from "./Components/InputInfo";
import SlidingWindow from "./Components/SlidingWindow";

export default function Home() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-4">
      <InputInfo />
      <div className="overflow x-auto px-4 mt-10">
        <SlidingWindow />

        <div className="mt-10">
          <h1 className="text-2xl font-bold mt-4">ATISSSS</h1>
          <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
            <thead>
              <tr className="bg-teal-500 text-white">
                <th className="border border-gray-300 px-4 py-2" rowSpan={2}>
                  รหัส
                </th>
                <th className="border border-gray-300 px-4 py-2" rowSpan={2}>
                  sub
                </th>
                <th className="border border-gray-300 px-4 py-2" rowSpan={2}>
                  Type
                </th>
                <th className="border border-gray-300 px-4 py-2" rowSpan={2}>
                  กระจก
                </th>
                <th className="border border-gray-300 px-4 py-2" colSpan={2}>
                  ขนาด
                </th>
                <th className="border border-gray-300 px-4 py-2" rowSpan={2}>
                  QTY
                </th>
                <th className="border border-gray-300 px-4 py-2" rowSpan={2}>
                  ลบ
                </th>
              </tr>
              <tr className="bg-teal-500 text-white">
                <th className="border border-gray-300 px-4 py-2">W</th>
                <th className="border border-gray-300 px-4 py-2">H</th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white even:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <input type="checkbox" className="form-checkbox h-5 w-5" />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <select className="border rounded px-2 py-1 w-full">
                    <option>กระจกเขียวตัดแสง 6มม</option>
                    <option>กระจกใส 5มม</option>
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <select className="border rounded px-2 py-1 w-full">
                    <option>กระจกเขียวตัดแสง 6มม</option>
                    <option>กระจกใส 5มม</option>
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    placeholder="W"
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    placeholder="H"
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center text-red-500 cursor-pointer">
                  ลบ
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
