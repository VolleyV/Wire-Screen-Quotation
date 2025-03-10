"use client";
import React, { useEffect, useState } from "react";
import { FaRegFilePdf } from "react-icons/fa6";
import { IconContext } from "react-icons/lib";
import { FaPen } from "react-icons/fa";
import { ToastContainer, toast, } from "react-toastify";

interface SlidingWindowData {
  id: number;
  type: string;
  glass: string;
  width: number;
  height: number;
  qty: number;
  price?: number | string;
}

interface QuotationFormData {
  attention: string;
  company: string;
  address: string;
  place: string;
  project: string;
  phone: string;
  quote: string;
}

interface CombinedQuotationData {
  slidingWindowData: SlidingWindowData[];
  quotationFormData: QuotationFormData;
}

const Page = () => {
  const [slidingWindowData, setSlidingWindowData] = useState<
    SlidingWindowData[]
  >([]);
  const [quotationFormData, setQuotationFormData] =
    useState<QuotationFormData | null>(null);
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null); // State to track editing row

  useEffect(() => {
    const storedCombinedData = sessionStorage.getItem("combinedQuotationData");
    if (storedCombinedData) {
      const combinedData = JSON.parse(
        storedCombinedData
      ) as CombinedQuotationData;
      setSlidingWindowData(combinedData.slidingWindowData);
      setQuotationFormData(combinedData.quotationFormData);
      console.log("Combined Data from sessionStorage:", combinedData);
    }
  }, []);

  const previewQuotation = async (index: number) => {
    console.log("previewQuotation function called"); // 1. Log when function starts
    for (const row of slidingWindowData) {
      const priceValue = row.price;
      console.log(`Checking price for row type: ${row.type}, price: ${priceValue}`); // 2. Log price being checked
      if (priceValue === "N/A" || priceValue === null || priceValue === "") {
        console.log("Invalid price found!"); // 3. Log when invalid price condition is met
        toast.warn("Please enter price for all items before downloading PDF", {
          position: "top-right",
          autoClose: 3000,
        });
        console.log("Toast message displayed (or should be)"); // 4. Log after toast call
        return; // Stop PDF generation if any price is invalid
      }
    }
    console.log("All prices are valid. Proceeding with PDF generation.");
    try {
      const response = await fetch("/api/create-quotation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slidingWindowData: slidingWindowData,
          quotationFormData: quotationFormData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to create quotation:", errorData);
        alert(
          `Failed to create quotation: ${errorData.error || "Unknown error"}`
        );
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

  const handleEditPrice = (index: number) => {
    setEditingRowIndex(index); // Set the editing row index
  };

  const handlePriceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newSlidingWindowData = [...slidingWindowData];
    newSlidingWindowData[index].price = event.target.value;
    setSlidingWindowData(newSlidingWindowData);
  };

  const handlePriceBlur = (index: number) => {
    setEditingRowIndex(null); // Exit edit mode onBlur (when input loses focus)
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="container mx-auto px-4 py-4">
        <div className="mb-6">
          <h1 className="text-4xl text-center font-bold">Quotation Details</h1>
        </div>
      </div>
      {quotationFormData && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">General Information</h2>
          <p>Attention: {quotationFormData.attention}</p>
          <p>Company: {quotationFormData.company}</p>
          <p>Phone: {quotationFormData.phone}</p>
          <p>Project: {quotationFormData.project}</p>
          <p>Place: {quotationFormData.place}</p>
          <p>Address: {quotationFormData.address}</p>
          <p>Quote by: {quotationFormData.quote}</p>
        </div>
      )}
      <div>
        <h2 className="text-xl font-bold mb-2">Product Details</h2>
      </div>
      <table className="table-auto border-collapse border border-gray-300 w-full text-sm text-center">
        <thead>
          <tr className="bg-teal-500 text-white">
            <th className="border border-gray-300 px-4 py-2">Type</th>
            <th className="border border-gray-300 px-4 py-2">W</th>
            <th className="border border-gray-300 px-4 py-2">H</th>
            <th className="border border-gray-300 px-4 py-2">QTY</th>
            <th className="border border-gray-300 px-4 py-2 ">ราคา</th>
            <th className="border border-gray-300 px-4 py-2">รวมราคา</th>
          </tr>
        </thead>
        <tbody>
          {slidingWindowData.map((row, index) => {
            const totalPrice =
              row.price && row.qty
                ? Number(row.price) * Number(row.qty)
                : "N/A";
            const isEditing = editingRowIndex === index; // Check if this row is being edited

            return (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
              >
                <td className="border border-gray-300 px-4 py-2">{row.type}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {row.width}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {row.height}
                </td>
                <td className="border border-gray-300 px-4 py-2">{row.qty}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {isEditing ? ( // Conditional rendering for editing mode
                    <input
                      type="number"
                      value={row.price || ""} // Use empty string if price is undefined
                      onChange={(e) => handlePriceChange(e, index)}
                      onBlur={() => handlePriceBlur(index)} // Exit edit mode on blur
                      className="w-full px-2 py-1 border rounded text-center"
                      autoFocus // Automatically focus on input when editing starts
                    />
                  ) : (
                    <>
                      {row.price ?? "N/A"}
                      <button
                        className="bg-green-500 text-white px-2 py-2 rounded ml-4"
                        onClick={() => handleEditPrice(index)} // Start editing on button click
                      >
                        <IconContext.Provider
                          value={{ className: "shared-class", size: "10" }}
                        >
                          <>
                            <FaPen />
                          </>
                        </IconContext.Provider>
                      </button>
                    </>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {totalPrice}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-start">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mt-5 flex items-center gap-2"
          onClick={previewQuotation}
        >
          <IconContext.Provider
            value={{ className: "shared-class", size: "20" }}
          >
            <>
              Download
              <FaRegFilePdf className="" />
            </>
          </IconContext.Provider>
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;
