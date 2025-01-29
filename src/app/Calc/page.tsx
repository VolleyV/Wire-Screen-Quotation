"use client";
import React from "react";
import { useEffect, useState } from "react";

const page = () => {
  const [slidingWindowData, setSlidingWindowData] = useState([]);

  useEffect(() => {
    // ดึงข้อมูลจาก sessionStorage
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

      <div className="flex justify-between mt-4 px-4 text-lg">
        <div className="text-left">
          <p>พื้นที่ประตูหน้าต่าง 48.00 ตารางเมตร</p>
          <p>พื้นที่มุ้ง 0.00 ตารางเมตร</p>
          <p className="font-bold text-xl">รวมพื้นที่ทั้งหมด 48.00 ตารางเมตร</p>
        </div>
        <div className="border-l border-gray-500"></div>
        <div className="text-right font-bold ">
          <p>ค่าสินค้า 17,808.00 บาท</p>
          <p>ค่าติดตั้ง 28,800.00 บาท</p>
          <p className="text-xl text-red-500">รวม 46,608.00 บาท</p>
        </div>
      </div>
      <div className="border-t border-gray-500 mt-4"></div>
      <div className="flex mt-4 px-4">
        <div className="w-2/5">
          <div className="flex items-center">
            <input type="checkbox" id="checkbox1" className="w-4 h-4" />
            <label htmlFor="checkbox1" className="ml-2">
              ราคารวมค่าติดตั้ง
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="checkbox2" className="w-4 h-4" />
            <label htmlFor="checkbox2" className="ml-2">
              ราคารวมค่าติดตั้งมุ้ง
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="checkbox3" className="w-4 h-4" />
            <label htmlFor="checkbox3" className="ml-2">
              ราคารวม VAT 7%
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="checkbox4" className="w-4 h-4" />
            <label htmlFor="checkbox4" className="ml-2">
              คำนวณ VAT 7%
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="checkbox5" className="w-4 h-4" />
            <label htmlFor="checkbox5" className="ml-2">
              โชว์ข้อมูลบัญชีโอนเงิน
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="checkbox6" className="w-4 h-4" />
            <label htmlFor="checkbox6" className="ml-2">
              บวก 5% มุ้งลวด
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="checkbox7" className="w-4 h-4" />
            <label htmlFor="checkbox1" className="ml-2">
              กรณีพิเศษ สินค้า +10%
            </label>
          </div>
        </div>

        <div className="grid grid-cols-4">
          <div>
            <label>ส่วนลดค่าสินค้า (%)</label>
            <input
              className="border border-gray-300 text-gray-900 rounded-lg p-1"
              placeholder="%"
            />
          </div>
          <div>
            <label>ส่วนลดค่าสินค้า (%)</label>
            <input
              className="border border-gray-300 text-gray-900 rounded-lg p-1"
              placeholder="%"
            />
          </div>
          <div>
            <label>ส่วนลดค่าสินค้า (%)</label>
            <input
              className="border border-gray-300 text-gray-900 rounded-lg p-1"
              placeholder="%"
            />
          </div>
          <div>
            <label>ส่วนลดค่าสินค้า (%)</label>
            <input
              className="border border-gray-300 text-gray-900 rounded-lg p-1"
              placeholder="%"
            />
          </div>
          <div>
            <label>ส่วนลดค่าสินค้า (%)</label>
            <input
              className="border border-gray-300 text-gray-900 rounded-lg p-1"
              placeholder="%"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
