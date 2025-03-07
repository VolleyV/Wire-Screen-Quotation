"use client"; // Make sure this is client component if you are using client-side features like useState
import React, { useState } from "react"; // Import useState
import InputInfo from "./Components/InputInfo";
import SlidingWindow from "./Components/SlidingWindow";
import CheckBox from "./Components/CheckBox"; // Keep import for CheckBox

export default function Home() {
  const [formData, setFormData] = useState({
    // **Moved formData state here**
    attention: "",
    company: "",
    address: "",
    place: "",
    project: "",
    phone: "",
    quote: "",
    includeInstallationCost: false,
    includeShippingCost: false,
    includeVAT: false,
    includeValueAddedTax: false,
    add5PercentDiscount: false,
    deduct20PercentNonStill: false,
    discountPercentage: "",
    discountAmount: "",
    shippingAmount: "",
    installationAmount: "",
    vatDiscountAmount: "",
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // **Moved handleCheckboxChange here**
    setFormData({ ...formData, [event.target.name]: event.target.checked });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // **Moved handleInputChange here**
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="mb-6">
        <h1 className="text-4xl text-center font-bold">Vignet</h1>
      </div>
      <InputInfo
        formData={formData} // **Pass formData prop to InputInfo**
        handleInputChange={handleInputChange} // **Pass handleInputChange prop to InputInfo**
        // **You can choose NOT to pass handleCheckboxChange to InputInfo if you only want checkboxes in CheckBox component**
      />
      <div className="mt-5 text-2xl text-starts">รายการสินค้า</div>
      <SlidingWindow /> {/* Assuming you render SlidingWindow here */}
      <CheckBox
        formData={formData} // **Pass formData prop to CheckBox**
        handleCheckboxChange={handleCheckboxChange} // **Pass handleCheckboxChange prop to CheckBox**
        handleInputChange={handleInputChange} // **Pass handleInputChange prop to CheckBox**
      />
    </div>
  );
}
