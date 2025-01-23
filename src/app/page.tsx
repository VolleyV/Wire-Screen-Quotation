/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useRouter } from "next/navigation"; // Correct import for App Router

import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
  });

  const [atisSeries, setAtisSeries] = useState({
    id: "",
    type: "",
  });

  const handleNavigation = () => {
    router.push("/home"); // Navigate programmatically to /home
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/Pages/home?name=${encodeURIComponent(formData.name)}`);
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap">
          <div className="w-full md:w-3/12 px-4">
            <label
              className="block text-blueGray-600 text-base font-bold mb-2"
              htmlFor="grid-password"
            >
              Attention
            </label>
            <input
              type="text"
              value={formData.name}
              className="border px-2 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="w-full md:w-3/12 px-4">
            <label
              className="block text-blueGray-600 text-base font-bold mb-2"
              htmlFor="grid-password"
            >
              Company
            </label>
            <input
              type="text"
              value={formData.name}
              className="border px-2 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="w-full md:w-3/12 px-4">
            <label
              className="block text-blueGray-600 text-base font-bold mb-2"
              htmlFor="grid-password"
            >
              Place
            </label>
            <input
              type="text"
              value={formData.name}
              className="border px-2 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="w-full md:w-3/12 px-4">
            <label
              className="block text-blueGray-600 text-base font-bold mb-2"
              htmlFor="grid-password"
            >
              เขียนใบเสนอ
            </label>
            <input
              type="text"
              value={formData.name}
              className="border px-2 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex flex-wrap mt-4">
          <div className="w-full md:w-3/12 px-4">
            <label
              className="block text-blueGray-600 text-base font-bold mb-2"
              htmlFor="grid-password"
            >
              Project
            </label>
            <input
              type="text"
              value={formData.name}
              className="border px-2 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="w-full md:w-3/12 px-4">
            <label
              className="block text-blueGray-600 text-base font-bold mb-2"
              htmlFor="grid-password"
            >
              Phone
            </label>
            <input
              type="text"
              value={formData.name}
              className="border px-2 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="w-full md:w-3/12 px-4">
            <label
              className="block text-blueGray-600 text-base font-bold mb-2"
              htmlFor="grid-password"
            >
              Place
            </label>
            <input
              type="text"
              value={formData.name}
              className="border px-2 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="w-full md:w-3/12 px-4">
            <label
              className="block text-blueGray-600 text-base font-bold mb-2"
              htmlFor="grid-password"
            >
              เขียนใบเสนอ
            </label>
            <input
              type="text"
              value={formData.name}
              className="border px-2 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-end mt-4 px-4">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            ส่งข้อมูล
          </button>
        </div>
      </form>

      <div className="overflow x-auto px-4">
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
<<<<<<< HEAD
      {/* Corrected Link component */}
      <Link href="/pages/test" className="text-3xl font-bold underline">Go to Home (Link Component)</Link>
=======
>>>>>>> 5eafa5cae7b7e3d4f6ba782ccbf4b53e012dbc5b
    </div>
  );
}
