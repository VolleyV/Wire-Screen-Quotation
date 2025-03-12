  "use client";
  import React, { useEffect, useState } from "react";
  import { toast } from "react-toastify";
  import { useRouter } from "next/navigation"; // Import useRouter for navigation
  import { MdDelete } from "react-icons/md";
  import { IconContext } from "react-icons";
  import { IoMdDownload } from "react-icons/io";
  interface CustomerHistoryData {
    id: number;
    Date: string;
    Attention: string;
    Company: string;
    Place: string;
    Address: string;
    Project: string;
    Phone: string;
    QuoteBy: string;
  }

  const CustomerHistoryPage = () => {
    const [customerData, setCustomerData] = useState<CustomerHistoryData[]>([]);
    const router = useRouter(); // Initialize useRouter
    // **Moved fetchCustomerHistory function OUTSIDE useEffect**
    const fetchCustomerHistory = async () => {
      console.log("Fetching customer history data...");

      try {
        const response = await fetch("/api/create-quotation/get-history");
        if (!response.ok) {
          const message = `HTTP error! status: ${response.status}`;
          console.error("HTTP Error:", message);
          throw new Error(message);
        }
        const result = await response.json();
        console.log("Fetched data:", result);
        if (result.data) {
          setCustomerData(result.data);
        } else if (result.error) {
          console.error("API Error:", result.error);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    useEffect(() => {
      fetchCustomerHistory(); // Call fetchCustomerHistory on component mount - KEEP THIS
    }, []); // Empty dependency array

    const handleDeleteCustomer = async (customerId: number) => {
      if (!window.confirm("คุณต้องการลบรายการนี้หรือไม่?")) {
        return;
      }

      try {
        const response = await fetch(
          `/api/create-quotation/delete-history?id=${customerId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Failed to delete customer:", errorData);
          toast.error(`ลบรายการไม่สำเร็จ: ${errorData.error || "Unknown error"}`);
          return;
        }

        toast.success(`ลบรายการ ID ${customerId} สำเร็จแล้ว`);
        // After successful delete, refresh the customer history data
        fetchCustomerHistory(); // Re-fetch data to update the table - KEEP THIS THE SAME
      } catch (error) {
        console.error("Error deleting customer:", error);
        toast.error("เกิดข้อผิดพลาดในการลบรายการ");
      }
    };
    // **UPDATED: Function to handle "โหลด" (Download) button click - Fetches data from API**
    const handleDownloadQuotation = async (customerId: number) => {
      console.log("Downloading quotation for customer ID:", customerId);

      try {
        const response = await fetch(
          `/api/create-quotation/get-customer-data?customerId=${customerId}`
        );

        console.log("API Response:", response);

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Failed to fetch quotation data:", errorData);
          toast.error(
            `ไม่พบข้อมูลใบเสนอราคา: ${errorData.error || "Unknown error"}`
          );
          return;
        }

        const result = await response.json();
        console.log("Parsed JSON Result:", result);

        const quotationData = result.data?.quotationFormData;
        console.log("Extracted quotationData:", quotationData);

        if (!quotationData) {
          toast.error("ไม่พบข้อมูลใบเสนอราคาที่สมบูรณ์ (Quotation Data missing)");
          console.error(
            "Incomplete quotation data fetched: quotationData is missing",
            result
          );
          return;
        }

        // **Navigation to HOMEPAGE route '/' with data as query parameters**
        const queryString = new URLSearchParams(quotationData).toString();
        router.push(`/?${queryString}`);
        toast.success("ข้อมูลลูกค้าโหลดสำเร็จ กำลังนำทางไปยังหน้าแก้ไข");
      } catch (error) {
        console.error("Error downloading quotation:", error);
        toast.error("เกิดข้อผิดพลาดในการดาวน์โหลดใบเสนอราคา");
      }
    };
    return (
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold mb-2">ประวัติลูกค้า</h1>
        <div className="flex justify-start">
          <button
            type="button" // type="button" is important to prevent form submission
            className="ml-1 bg-blue-500 text-white px-4 py-2 rounded mt-2 mb-2 justify-items-end"
            onClick={() => router.push("/")} // Navigate to homepage
          >
            กลับหน้าหลัก
          </button>
        </div>
        <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Attention</th>
              <th className="border border-gray-300 px-4 py-2">Company</th>
              <th className="border border-gray-300 px-4 py-2">Place</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
              <th className="border border-gray-300 px-4 py-2">Project</th>
              <th className="border border-gray-300 px-4 py-2">Tel</th>
              <th className="border border-gray-300 px-4 py-2">Quoted By</th>
              <th className="border border-gray-300 px-4 py-2">ลบ</th>
            </tr>
          </thead>
          <tbody>
            {customerData.map((customer, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
              >
                <td className="border border-gray-300 px-4 py-2">
                  {
                    // **Date Formatting Here**
                    new Date(customer.Date).toLocaleDateString("th-TH", {
                      // Parse and format Date
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  }
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {customer.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {customer.Attention}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {customer.Company}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {customer.Place}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {customer.Address}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {customer.Project}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {customer.Phone}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {customer.QuoteBy}
                </td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center items-center cursor-pointer">
                  <button
                    onClick={() => handleDownloadQuotation(customer.id)} // Call handleDownloadQuotation on click
                    className="text-blue-500"
                  >
                    <IconContext.Provider
                      value={{ className: "shared-class", size: "25" }}
                    >
                      <>
                        <IoMdDownload />
                      </>
                    </IconContext.Provider>
                  </button>
                  <button
                    onClick={() => handleDeleteCustomer(customer.id)}
                    className="text-red-500 ml-2"
                  >
                    <IconContext.Provider
                      value={{ className: "shared-class", size: "25" }}
                    >
                      <>
                        <MdDelete />
                      </>
                    </IconContext.Provider>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default CustomerHistoryPage;
