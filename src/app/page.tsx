"use client";
import React, { useState } from "react";
import InputInfo from "./Components/InputInfo";
import SlidingWindow from "./Components/SlidingWindow";
import CheckBox from "./Components/CheckBox";
import { useSearchParams } from 'next/navigation'; // **Import useSearchParams**


export default function Home() {
  const searchParams = useSearchParams(); // **Use useSearchParams hook**

  // Initialize formData from search params OR default empty values
  const initialFormData = {
    attention: searchParams.get('attention') || '',
    company: searchParams.get('company') || '',
    address: searchParams.get('address') || '',
    place: searchParams.get('place') || '',
    project: searchParams.get('project') || '',
    phone: searchParams.get('phone') || '',
    quote: searchParams.get('quote') || '',
    includeInstallationCost: false, // Keep default boolean values
    includeShippingCost: false,
    includeVAT: false,
    includeValueAddedTax: false,
    add5PercentDiscount: false,
    deduct20PercentNonStill: false,
    discountPercentage: '', // Keep default empty strings for text inputs
    discountAmount: '',
    shippingAmount: '',
    installationAmount: '',
    vatDiscountAmount: '',
    slidingWindowData: [],
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.checked });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="mb-6">
        <h1 className="text-4xl text-center font-bold">Vignet</h1>
      </div>
      <InputInfo
        formData={formData}
        handleInputChange={handleInputChange}
        setFormData={setFormData} 
      />
      <div className="mt-5 text-2xl text-starts">รายการสินค้า</div>
      <SlidingWindow />
      <CheckBox
        formData={formData}
        handleCheckboxChange={handleCheckboxChange}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}