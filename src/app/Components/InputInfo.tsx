import React, { useState, useEffect } from "react";

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
    includeShippingCost: false,    // Checkbox: ราคารวมค่าขนส่ง
    includeVAT: false,             // Checkbox: ราคารวม VAT 7%
    includeValueAddedTax: false,    // Checkbox: ราคารวมมูลค่าเพิ่ม
    add5PercentDiscount: false,     // Checkbox: บวก 5% ส่วนลด
    deduct20PercentNonStill: false, // Checkbox: หัก 20% Non-Still
    discountPercentage: "",         // Input: ส่วนลดสินค้า (%)
    discountAmount: "",             // Input: ส่วนลด (บาท)
    shippingAmount: "",             // Input: ค่าขนส่งสินค้า (บาท)
    installationAmount: "",         // Input: ค่าติดตั้ง (บาท)
    vatDiscountAmount: "",          // Input: ส่วนลด VAT (บาท) -  (Though VAT discount is unusual, keeping it as per UI)
  });

  useEffect(() => {
    console.log("Saving InputInfo data:", formData);
    sessionStorage.setItem("quotationFormData", JSON.stringify(formData));
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No submit action needed here, data is saved on change
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
              type="number"
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
        </div>


        {/* --- New Checkbox Options --- */}
        <div className="mt-6 border-t border-blueGray-200">
          <h4 className="text-xl text-blueGray-700 mt-4 mb-2">ตัวเลือกเพิ่มเติม</h4>
          <div className="flex flex-wrap">
            <div className="w-full md:w-6/12 px-4">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="includeInstallationCost"
                  name="includeInstallationCost"
                  checked={formData.includeInstallationCost}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 mr-2"
                />
                <label htmlFor="includeInstallationCost" className="text-blueGray-600 text-sm">
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
                <label htmlFor="includeShippingCost" className="text-blueGray-600 text-sm">
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
                <label htmlFor="includeVAT" className="text-blueGray-600 text-sm">
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
                <label htmlFor="includeValueAddedTax" className="text-blueGray-600 text-sm">
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
                <label htmlFor="add5PercentDiscount" className="text-blueGray-600 text-sm">
                  บวก 5% ส่วนลด
                </label>
              </div>
               <div className="flex items-center mb-2">
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
              </div>
            </div>
            <div className="w-full md:w-6/12 px-4">
              <div className="mb-2">
                <label htmlFor="discountPercentage" className="block text-blueGray-600 text-sm mb-1">
                  ส่วนลดสินค้า (%)
                </label>
                <input
                  type="number"
                  id="discountPercentage"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="discountAmount" className="block text-blueGray-600 text-sm mb-1">
                  ส่วนลด (บาท)
                </label>
                <input
                  type="number"
                  id="discountAmount"
                  name="discountAmount"
                  value={formData.discountAmount}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="shippingAmount" className="block text-blueGray-600 text-sm mb-1">
                  ค่าขนส่งสินค้า (บาท)
                </label>
                <input
                  type="number"
                  id="shippingAmount"
                  name="shippingAmount"
                  value={formData.shippingAmount}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
               <div className="mb-2">
                <label htmlFor="installationAmount" className="block text-blueGray-600 text-sm mb-1">
                  ค่าติดตั้ง (บาท)
                </label>
                <input
                  type="number"
                  id="installationAmount"
                  name="installationAmount"
                  value={formData.installationAmount}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
               <div className="mb-2">
                <label htmlFor="vatDiscountAmount" className="block text-blueGray-600 text-sm mb-1">
                  ส่วนลด VAT (บาท)
                </label>
                <input
                  type="number"
                  id="vatDiscountAmount"
                  name="vatDiscountAmount"
                  value={formData.vatDiscountAmount}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
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
