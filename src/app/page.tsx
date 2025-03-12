"use client";

import React, { useState, Suspense } from "react";
import InputInfo from "./Components/InputInfo";
import SlidingWindow from "./Components/SlidingWindow";
import CheckBox from "./Components/CheckBox";
import { useSearchParams } from 'next/navigation'; // **Import useSearchParams**

function HomeContent() {
  const searchParams = useSearchParams(); // ✅ Use inside Suspense

  const initialFormData = {
    attention: searchParams.get('attention') || '',
    company: searchParams.get('company') || '',
    address: searchParams.get('address') || '',
    place: searchParams.get('place') || '',
    project: searchParams.get('project') || '',
    phone: searchParams.get('phone') || '',
    quote: searchParams.get('quote') || '',
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

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
