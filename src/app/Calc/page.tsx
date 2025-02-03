"use client";
import React from "react";
import { useEffect, useState } from "react";

const Page = () => {  // Change 'page' to 'Page'
  const [slidingWindowData, setSlidingWindowData] = useState([]);

  useEffect(() => {
    const storedData = sessionStorage.getItem("slidingWindowData");
    if (storedData) {
      setSlidingWindowData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-4">
      <table className="table-auto border-collapse border border-gray-300 w-full text-sm text-center">
        <thead>
          <tr className="bg-teal-500 text-white">
            <th className="border border-gray-300 px-4 py-2" rowSpan={2}>
              รหัส
            </th>
            <th className="border border-gray-300 px-4 py-2" rowSpan={2}>
              Type
            </th>
            <th className="border border-gray-300 px-4 py-2" colSpan={2}>
              ขนาด
            </th>
            <th className="border border-gray-300 px-4 py-2" rowSpan={2}>
              พื้นที่
            </th>
            <th className="border border-gray-300 px-4 py-2" rowSpan={2}>
              รวมพื้นที่
            </th>
            <th className="border border-gray-300 px-4 py-2" rowSpan={2}>
              QTY
            </th>
          </tr>
          <tr className="bg-teal-500 text-white">
            <th className="border border-gray-300 px-4 py-2">W</th>
            <th className="border border-gray-300 px-4 py-2">H</th>
          </tr>
        </thead>
        <tbody>
          {slidingWindowData.map((row, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
            >
              <td className="border border-gray-300 px-4 py-2 w-40">
                {row.id}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {row.type} + {row.glass}
              </td>
              <td className="border border-gray-300 px-4 py-2">{row.width}</td>
              <td className="border border-gray-300 px-4 py-2 w-28">
                {row.height}
              </td>
              <td className="border border-gray-300 px-4 py-2 w-28">
                {row.qty}
              </td>
              <td className="border border-gray-300 px-4 py-2 w-28"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;  // Change 'page' to 'Page'
