/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {  useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { toast } from "react-toastify";
/* import CheckBox from "./CheckBox"; // **Import CheckBox component** */

interface InputInfoProps {
  // Define props for InputInfo
  formData: any; // Or be more specific with your formData type
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const InputInfo: React.FC<InputInfoProps> = ({
  formData,
  handleInputChange,
  setFormData,
}) => {
  console.log("InputInfo Component Rendered:"); // Indicate component render
  console.log("  formData prop:", formData); // Log formData prop
  console.log("  handleInputChange prop:", handleInputChange); // Log handleInputChange prop
  console.log("  setFormData prop:", setFormData); // Log setFormData prop
  console.log("  Is setFormData a function?", typeof setFormData === 'function'); // Check if it's a function
  // Receive props
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    sessionStorage.setItem("quotationFormData", JSON.stringify(formData));
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No submit action needed here, data is saved on change
  };
  const handleReset = () => {
    // **CORRECTED LINE: Call setFormData, NOT formData**
    setFormData({
      attention: '',
      company: '',
      address: '',
      place: '',
      project: '',
      phone: '',
      quote: '',
      includeInstallationCost: false,
      includeShippingCost: false,
      includeVAT: false,
      includeValueAddedTax: false,
      add5PercentDiscount: false,
      deduct20PercentNonStill: false,
      discountPercentage: '',
      discountAmount: '',
      shippingAmount: '',
      installationAmount: '',
      vatDiscountAmount: '',
    });
  };
  const handleSaveHistory = async () => {
    try {
      // **Generate unique ID using Date.now().toString()**
      const quotationId = Date.now().toString();
      console.log("Generated quotationId:", quotationId);

      // **Include quotationId in formData**
      const formDataWithId = {
        ...formData,
        quotationId: quotationId, // Add quotationId to formData
      };

      console.log("Sending formData with ID:", formDataWithId); // Log data being sent

      const response = await fetch("/api/create-quotation/save-history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithId), // Send formDataWithId (including quotationId)
      });

      if (response.ok) {
        toast.success("บันทึกข้อมูลลูกค้าเรียบร้อยแล้ว");
      } else {
        const errorData = await response.json();
        toast.error(
          `บันทึกข้อมูลลูกค้าไม่สำเร็จ: ${errorData.error || "Unknown error"}`
        );
        console.error("Failed to save history:", errorData);
      }
    } catch (error) {
      console.error("Error saving history:", error);
      toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูลลูกค้า");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* ... (Existing Customer Info Fields - Attention, Company, Address, etc. - Keep these) ... */}
        <div className="flex flex-wrap">
          <div className="w-full md:w-3/12 px-4">
            <label className="block text-blueGray-600 text-base font-bold mb-2">
              Attention
            </label>
            <input
              type="text"
              value={formData.attention}
              name="attention"
              className="border px-2 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="w-full md:w-3/12 px-4">
            <label className="block text-blueGray-600 text-base font-bold mb-2">
              Company
            </label>
            <input
              type="text"
              value={formData.company}
              name="company"
              className="border px-2 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="w-full md:w-3/12 px-4">
            <label className="block text-blueGray-600 text-base font-bold mb-2">
              Address
            </label>
            <input
              type="text"
              value={formData.address}
              name="address"
              className="border px-2 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="w-full md:w-3/12 px-4">
            <label className="block text-blueGray-600 text-base font-bold mb-2">
              Place
            </label>
            <input
              type="text"
              value={formData.place}
              name="place"
              className="border px-2 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>

        <div className="flex flex-wrap mt-4">
          <div className="w-full md:w-3/12 px-4">
            <label className="block text-blueGray-600 text-base font-bold mb-2">
              Project
            </label>
            <input
              type="text"
              value={formData.project}
              name="project"
              className="border px-2 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="w-full md:w-3/12 px-4">
            <label className="block text-blueGray-600 text-base font-bold mb-2">
              Telephone number
            </label>
            <input
              type="text"
              value={formData.phone}
              name="phone"
              className="border px-2 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <div className="w-full md:w-3/12 px-4">
            <label className="block text-blueGray-600 text-base font-bold mb-2">
              Quoted by
            </label>
            <input
              type="text"
              value={formData.quote}
              name="quote"
              className="border px-2 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="flex justify-center w-full md:w-2/12 px-2">
          <button
              type="button" // type="button" is important to prevent form submission
              className="bg-red-500 text-white px-4 py-2 rounded mt-5 ml-4 mr-4 justify-items-end"
              onClick={handleReset} // Call handleSaveHistory on click
            >
              เคลียร์
            </button>
            <button
              type="button" // type="button" is important to prevent form submission
              className="bg-green-500 text-white px-4 py-2 rounded mt-5 justify-items-end"
              onClick={handleSaveHistory} // Call handleSaveHistory on click
            >
              บันทึกรายการ
            </button>
            <button
              type="button" // type="button" is important to prevent form submission
              className="ml-4 bg-blue-500 text-white px-4 py-2 rounded mt-5 justify-items-end"
              onClick={() => router.push("/Customer-history")} // Navigate to CustomerHistoryPage
            >
              ดูรายการ
            </button>
          </div>
        </div>

        {/* --- New Checkbox Options --- */}

        {/*  <CheckBox
          formData={formData}
          handleCheckboxChange={handleCheckboxChange}
          handleInputChange={handleInputChange}
        /> */}
      </form>
    </div>
  );
};

export default InputInfo;
