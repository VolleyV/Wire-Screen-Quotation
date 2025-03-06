import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { toast } from "react-toastify";

const InputInfo = () => {
  const [formData, setFormData] = useState({
    attention: "",
    company: "",
    address: "",
    place: "",
    project: "",
    phone: "",
    quote: "",
    includeInstallationCost: false, // Checkbox: ราคารวมค่าติดตั้ง
    includeShippingCost: false, // Checkbox: ราคารวมค่าขนส่ง
    includeVAT: false, // Checkbox: ราคารวม VAT 7%
    includeValueAddedTax: false, // Checkbox: ราคารวมมูลค่าเพิ่ม
    add5PercentDiscount: false, // Checkbox: บวก 5% ส่วนลด
    deduct20PercentNonStill: false, // Checkbox: หัก 20% Non-Still
    discountPercentage: "", // Input: ส่วนลดสินค้า (%)
    discountAmount: "", // Input: ส่วนลด (บาท)
    shippingAmount: "", // Input: ค่าขนส่งสินค้า (บาท)
    installationAmount: "", // Input: ค่าติดตั้ง (บาท)
    vatDiscountAmount: "", // Input: ส่วนลด VAT (บาท) -  (Though VAT discount is unusual, keeping it as per UI)
  });
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    console.log("Saving InputInfo data:", formData);
    sessionStorage.setItem("quotationFormData", JSON.stringify(formData));
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No submit action needed here, data is saved on change
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
        toast.error(`บันทึกข้อมูลลูกค้าไม่สำเร็จ: ${errorData.error || 'Unknown error'}`);
        console.error("Failed to save history:", errorData);
      }
    } catch (error) {
      console.error("Error saving history:", error);
      toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูลลูกค้า");
    }
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.checked });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
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
              className="border px-2 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={(e) =>
                setFormData({ ...formData, attention: e.target.value })
              }
            />
          </div>
          <div className="w-full md:w-3/12 px-4">
            <label className="block text-blueGray-600 text-base font-bold mb-2">
              Company
            </label>
            <input
              type="text"
              value={formData.company}
              className="border px-2 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />
          </div>
          <div className="w-full md:w-3/12 px-4">
            <label className="block text-blueGray-600 text-base font-bold mb-2">
              Address
            </label>
            <input
              type="text"
              value={formData.address}
              className="border px-2 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>
          <div className="w-full md:w-3/12 px-4">
            <label className="block text-blueGray-600 text-base font-bold mb-2">
              Place
            </label>
            <input
              type="text"
              value={formData.place}
              className="border px-2 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={(e) =>
                setFormData({ ...formData, place: e.target.value })
              }
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
              className="border px-2 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={(e) =>
                setFormData({ ...formData, project: e.target.value })
              }
            />
          </div>
          <div className="w-full md:w-3/12 px-4">
            <label className="block text-blueGray-600 text-base font-bold mb-2">
              Telephone number
            </label>
            <input
              type="text"
              value={formData.phone}
              className="border px-2 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div className="w-full md:w-3/12 px-4">
            <label className="block text-blueGray-600 text-base font-bold mb-2">
              Quoted by
            </label>
            <input
              type="text"
              value={formData.quote}
              className="border px-2 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={(e) =>
                setFormData({ ...formData, quote: e.target.value })
              }
            />
          </div>
          <div className="flex justify-center w-full md:w-2/12 px-2">
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
        <div className="mt-5  border-t border-blueGray-200">
          <h4 className="text-xl text-blueGray-700 mt-4 mb-4 ml-5 font-bold">
            ตัวเลือกเพิ่มเติม
          </h4>
          <div className="flex flex-wrap">
            <div className="w-full md:w-2/12 px-4">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="includeInstallationCost"
                  name="includeInstallationCost"
                  checked={formData.includeInstallationCost}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 mr-2"
                />
                <label
                  htmlFor="includeInstallationCost"
                  className="text-blueGray-600 text-sm"
                >
                  ราคารวมค่าติดตั้ง
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="includeShippingCost"
                  name="includeShippingCost"
                  checked={formData.includeShippingCost}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 mr-2"
                />
                <label
                  htmlFor="includeShippingCost"
                  className="text-blueGray-600 text-sm"
                >
                  ราคารวมค่าขนส่ง
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="includeVAT"
                  name="includeVAT"
                  checked={formData.includeVAT}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 mr-2"
                />
                <label
                  htmlFor="includeVAT"
                  className="text-blueGray-600 text-sm"
                >
                  ราคารวม VAT 7%
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="includeValueAddedTax"
                  name="includeValueAddedTax"
                  checked={formData.includeValueAddedTax}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 mr-2"
                />
                <label
                  htmlFor="includeValueAddedTax"
                  className="text-blueGray-600 text-sm"
                >
                  ราคารวมมูลค่าเพิ่ม
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="add5PercentDiscount"
                  name="add5PercentDiscount"
                  checked={formData.add5PercentDiscount}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 mr-2"
                />
                <label
                  htmlFor="add5PercentDiscount"
                  className="text-blueGray-600 text-sm"
                >
                  บวก 5% ส่วนลด
                </label>
              </div>
              {/*   <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="deduct20PercentNonStill"
                  name="deduct20PercentNonStill"
                  checked={formData.deduct20PercentNonStill}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 mr-2"
                />
                <label htmlFor="deduct20PercentNonStill" className="text-blueGray-600 text-sm">
                  หัก 20% Non-Still
                </label>
              </div> */}
            </div>
            {/* Additional inputbox */}
            <div className="w-full w-8/12 px-4">
              <div className="mb-2">
                <label
                  htmlFor="discountPercentage"
                  className="block text-blueGray-600 text-sm mb-1"
                >
                  ส่วนลดสินค้า (%)
                </label>
                <input
                  type="number"
                  id="discountPercentage"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded text-sm shadow focus:outline-none focus:ring w-48 ease-linear transition-all duration-150"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="discountAmount"
                  className="block text-blueGray-600 text-sm mb-1"
                >
                  ส่วนลด (บาท)
                </label>
                <input
                  type="number"
                  id="discountAmount"
                  name="discountAmount"
                  value={formData.discountAmount}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded text-sm shadow focus:outline-none focus:ring w-48 ease-linear transition-all duration-150"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="shippingAmount"
                  className="block text-blueGray-600 text-sm mb-1"
                >
                  ค่าขนส่งสินค้า (บาท)
                </label>
                <input
                  type="number"
                  id="shippingAmount"
                  name="shippingAmount"
                  value={formData.shippingAmount}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded text-sm shadow focus:outline-none focus:ring w-48 ease-linear transition-all duration-150"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="installationAmount"
                  className="block text-blueGray-600 text-sm mb-1"
                >
                  ค่าติดตั้ง (บาท)
                </label>
                <input
                  type="number"
                  id="installationAmount"
                  name="installationAmount"
                  value={formData.installationAmount}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded text-sm shadow focus:outline-none focus:ring w-48 ease-linear transition-all duration-150"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="vatDiscountAmount"
                  className="block text-blueGray-600 text-sm mb-1"
                >
                  ส่วนลด VAT (บาท)
                </label>
                <input
                  type="number"
                  id="vatDiscountAmount"
                  name="vatDiscountAmount"
                  value={formData.vatDiscountAmount}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded text-sm shadow focus:outline-none focus:ring w-48 ease-linear transition-all duration-150"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputInfo;
