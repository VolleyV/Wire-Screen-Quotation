"use client";
import React, { useEffect, useState } from "react";

interface SlidingWindowData {
  id: number;
  type: string;
  glass: string;
  width: number;
  height: number;
  qty: number;
  price?: number | string; // Make sure price is optional to prevent errors
}

const Page = () => {
  const [slidingWindowData, setSlidingWindowData] = useState<
    SlidingWindowData[]
  >([]);

  useEffect(() => {
    console.log(slidingWindowData);
    const storedData = sessionStorage.getItem("slidingWindowData");
    if (storedData) {
      setSlidingWindowData(JSON.parse(storedData) as SlidingWindowData[]);
    }
  }, []);
  const previewQuotation = async () => {
    const storedData = sessionStorage.getItem("slidingWindowData");
    if (!storedData || JSON.parse(storedData).length === 0) {
      console.error("No sliding window data found!");
      alert("No sliding window data found! Please submit first.");
      return;
    }
    if (slidingWindowData.length === 0) {
      console.error("No customer data available.");
      return;
    }

    const customerId = slidingWindowData[0].id;

    if (!customerId) {
      console.error("No customer ID found.");
      return;
    }

    try {
      const response = await fetch("/api/create-quotation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const text = await response.text();
      console.log("Raw response:", text); // Debugging

      if (!text) {
        throw new Error("Empty response from server");
      }

      const data = JSON.parse(text);

      if (data.pdfUrl) {
        window.open(data.pdfUrl, "_blank");
      } else {
        console.error("Failed to get PDF URL");
      }
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <table className="table-auto border-collapse border border-gray-300 w-full text-sm text-center">
        <thead>
          <tr className="bg-teal-500 text-white">
            <th className="border border-gray-300 px-4 py-2">รหัส</th>
            <th className="border border-gray-300 px-4 py-2">Type</th>
            <th className="border border-gray-300 px-4 py-2">W</th>
            <th className="border border-gray-300 px-4 py-2">H</th>
            <th className="border border-gray-300 px-4 py-2">QTY</th>
            <th className="border border-gray-300 px-4 py-2">ราคา</th>
            <th className="border border-gray-300 px-4 py-2">รวมราคา</th>
          </tr>
        </thead>
        <tbody>
          {slidingWindowData.map((row, index) => {
            const totalPrice =
              row.price && row.qty
                ? Number(row.price) * Number(row.qty)
                : "N/A";
            return (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
              >
                <td className="border border-gray-300 px-4 py-2">{row.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {row.type}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {row.width}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {row.height}
                </td>
                <td className="border border-gray-300 px-4 py-2">{row.qty}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {row.price ?? "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {totalPrice}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button className="bg-green-500 mt-4" onClick={previewQuotation}>
          Preview PDF
        </button>
      </div>
    </div>
  );
};

export default Page;
