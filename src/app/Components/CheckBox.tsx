import React from "react";

interface CheckBoxProps {
  // Define an interface for the props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any; //  It's better to be more specific with your formData type if possible.
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  // Destructure props here
  formData,
  handleCheckboxChange,
  handleInputChange,
}) => {
  return (
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
        <div className="w-10/12 px-4">
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
  );
};
export default CheckBox;
