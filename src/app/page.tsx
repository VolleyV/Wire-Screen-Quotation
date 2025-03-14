"use client";

import React, { useState, Suspense, useEffect } from "react";
import InputInfo from "./Components/InputInfo";
import SlidingWindow from "./Components/SlidingWindow";
import CheckBox from "./Components/CheckBox";
import { useSearchParams, useRouter } from "next/navigation";

function HomeContent() {
  const searchParams = useSearchParams();

  const initialFormData = {
    attention: searchParams.get("attention") || "",
    company: searchParams.get("company") || "",
    address: searchParams.get("address") || "",
    place: searchParams.get("place") || "",
    project: searchParams.get("project") || "",
    phone: searchParams.get("phone") || "",
    quote: searchParams.get("quote") || "",
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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("/api/auth/check"); // Call API to check cookie
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          router.push("/Login");
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsLoggedIn(false); // Assume not logged in on error
        router.push("/Login"); // Redirect to login on error
      }
    };

    checkLoginStatus();
  }, [router]);

  if (!isLoggedIn) {
    return <div>Redirecting to Login...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
