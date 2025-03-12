import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { IconContext } from "react-icons";

const SlidingWindow = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [slidingWindow, setSlidingWindow] = useState([
    {
      id: "",
      sub: false,
      type: "",
      glass: "",
      ml: false,
      sl: false,
      width: "",
      height: "",
      qty: "",
    },
  ]);

  const handleAddSlidingWindowRow = () => {
    setSlidingWindow([
      ...slidingWindow,
      {
        id: "",
        sub: false,
        type: "",
        glass: "",
        ml: false,
        sl: false,
        width: "",
        height: "",
        qty: "",
      },
    ]);
  };
  useEffect(() => {
    if (slidingWindow && slidingWindow.length > 0) {
      console.log("Saving sliding window data:", slidingWindow);
      sessionStorage.setItem(
        "slidingWindowData",
        JSON.stringify(slidingWindow)
      );
    }
  }, [slidingWindow]); // Keep track of slidingWindow state

  const handleRemoveSlidingWindowRow = (index: number) => {
    const updatedRows = slidingWindow.filter((_, i) => i !== index);
    setSlidingWindow(updatedRows);
  };

  const windowTypes = [
    { label: "Select Type", value: "" },
    { label: "W2 (W6000 x H3200)", value: "W2" },
    { label: "Demo", value: "Demo" },
    {
      label: "หน้าต่างบานเลื่อนสลับ (2P,2T)",
      value: "หน้าต่างบานเลื่อนสลับ (2P,2T)",
    },
    {
      label: "หน้าต่างบานเลื่อนสลับ (3P,3T)",
      value: "หน้าต่างบานเลื่อนสลับ (3P,3T)",
    },
    {
      label: "หน้าต่างบานเลื่อนสลับ (4P,2T)",
      value: "หน้าต่างบานเลื่อนสลับ (4P,2T)",
    },
    { label: "ช่องแสง (F)", value: "F" },
  ];

  const [mlHeaderChecked, setMlHeaderChecked] = useState(false);
  const [slHeaderChecked, setSlHeaderChecked] = useState(false);
  /*   const glassOptions = [
    { label: "Select Glass", value: "" },
    { label: "W2 (W6000 x H3200)", value: "W2" },
    { label: "Demo", value: "Demo" },
  ]; */

  const handleInputChange = (
    index: number,
    field: string,
    value: number | string | boolean
  ) => {
    const updatedRows = slidingWindow.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setSlidingWindow(updatedRows);
  };
  //const checkPrice = () => {};
  const handleSubmit = async () => {
    if (isChecked) {
      const isDataComplete = slidingWindow.every((row) => {
        return (
          /* row.id.trim() !== "" && */
          row.type.trim() !== "" &&
          row.glass.trim() !== "" &&
          row.width.toString().trim() !== "" && // Convert to string and trim
          row.height.toString().trim() !== "" && // Convert to string and trim
          row.qty.toString().trim() !== "" // Convert to string and trim
        );
      });

      if (!isDataComplete) {
        toast.error("กรุณากรอกข้อมูลให้ครบถ้วน (รวมถึงจำนวนสินค้า)");
        return;
      }

      // Fetch price for each row
      const updatedRows = await Promise.all(
        slidingWindow.map(async (row) => {
          /*   const validTypes = ["W2", "Demo", "2P2T", "3P3T", "4P2T","F"]; // Allowed types

          if (!validTypes.includes(row.type)) {
            toast.error(`ไม่สามารถคำนวณราคาได้สำหรับ Type: ${row.type}`);
            return;
          } */
          try {
            const response = await fetch(
              `/api/calculate-price?width=${row.width}&height=${row.height}&type=${row.type}`
            );
            console.log(response);
            console.log(row.qty);
            const result = await response.json();

            if (response.ok && result.data.length > 0) {
              return { ...row, price: result.data[0].price };
            }
            if (row.qty == null || row.qty == "") {
              toast.error(`กรุณาใส่จำนวนสินค้า`);
            } else {
              /* toast.error(`ไม่พบราคาสำหรับ W: ${row.width}, H: ${row.height}`, {
                autoClose: 2000,
              }); */
              return { ...row, price: "N/A" }; // Handle missing price
            }
          } catch (error) {
            console.error("Error fetching price:", error);
            return { ...row, price: "Error" };
          }
        })
      );
      const storedFormData = sessionStorage.getItem("quotationFormData");
      const quotationFormData = storedFormData
        ? JSON.parse(storedFormData)
        : {}; // Default to empty object if not found

      sessionStorage.setItem("slidingWindowData", JSON.stringify(updatedRows));

      // Pass both slidingWindowData and quotationFormData to Calc page (via sessionStorage)
      sessionStorage.setItem(
        "combinedQuotationData",
        JSON.stringify({
          slidingWindowData: updatedRows,
          quotationFormData: quotationFormData,
        })
      );
      sessionStorage.setItem("slidingWindowData", JSON.stringify(updatedRows));
      setTimeout(() => {
        window.open("/Calc", "_blank");
      }, 500); // Adjust delay as needed
    } else {
      toast.error("กรุณาติ๊กถูกหลายการที่จะสร้างใบเสนอราคา");
    }
  };

  const checkPrice = async (index: number) => {
    const row = slidingWindow[index];

    if (!row.width || !row.height) return;
    const validTypes = ["W2", "Demo", "Type3", "Type4", "Type5", "F"]; // Allowed types

    /* if (!validTypes.includes(row.type)) {
      toast.error(`ไม่สามารถคำนวณราคาได้สำหรับ Type: ${row.type}`);
      return;
    } */
    try {
      const response = await fetch(
        `/api/calculate-price?width=${row.width}&height=${row.height}&type=${row.type}`
      );
      const result = await response.json();
      console.log("API Response:", result);
      /*  if (response.ok && result.data.length > 0) {
        handleInputChange(index, "price", result.data[0].price);
        toast.success(`พบราคาสำหรับ W: ${row.width}, H: ${row.height}`);
      } else {
        handleInputChange(index, "price", "N/A");
        toast.error(`ไม่พบราคาสำหรับ W: ${row.width}, H: ${row.height}`);
      } */
    } catch (error) {
      console.error("Error fetching price:", error);
      handleInputChange(index, "price", "Error");
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="w-6 h-6"
          checked={isChecked}
          onChange={() => {
            setIsChecked(!isChecked);
          }}
        />
        <h1 className="text-2xl font-bold ml-2">
          ประตูหน้าต่างบานเลื่อน UPVC Vignet
        </h1>
      </div>
      <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
        <thead>
          <tr className="bg-teal-500 text-white">
            <th className="border border-gray-300 px-4 py-2" rowSpan={2}>
              รหัส
            </th>
            <th className="border border-gray-300 px-4 py-2" rowSpan={2}>
              sub
            </th>
            <th className="border border-gray-300 px-4 py-2" rowSpan={2}>
              Type
            </th>
            <th className="border border-gray-300 px-4 py-2" rowSpan={2}>
              Glass
            </th>
            <th className="border border-gray-300 px-4 py-2" rowSpan={2}>
              Multilock
            </th>
            <th className="border border-gray-300 px-4 py-2" colSpan={2}>
              ขนาด
            </th>
            <th className="border border-gray-300 px-4 py-2" rowSpan={2}>
              QTY
            </th>
            <th className="border border-gray-300 px-4 py-2" rowSpan={2}>
              ลบ
            </th>
          </tr>
          <tr className="bg-teal-500 text-white">
            <th className="border border-gray-300 px-4 py-2">W</th>
            <th className="border border-gray-300 px-4 py-2">H</th>
          </tr>
        </thead>
        <tbody>
          {slidingWindow.map((row, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
            >
              <td className="border border-gray-300 px-4 py-2 w-40">
                <input
                  type="text"
                  value={row.id}
                  onChange={(e) =>
                    handleInputChange(index, "id", e.target.value)
                  }
                  className="border rounded px-2 py-1 w-full"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <input
                  type="checkbox"
                  checked={row.sub}
                  onChange={(e) =>
                    handleInputChange(index, "sub", e.target.checked)
                  }
                  className="form-checkbox h-5 w-5"
                />
              </td>

              <td className="border border-gray-300 px-4 py-2">
                <select
                  value={row.type}
                  onChange={(e) =>
                    handleInputChange(index, "type", e.target.value)
                  }
                  className="border rounded px-2 py-1 w-full"
                >
                  {windowTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <select
                  value={row.glass}
                  onChange={(e) =>
                    handleInputChange(index, "glass", e.target.value)
                  }
                  className="border rounded px-2 py-1 w-full"
                >
                  <option value="">Select Glass</option>
                  <option value="W2">W2 (W6000 x H3200)</option>
                  <option value="Demo">Demo</option>
                </select>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
              <div className="flex justify-center"> {/* Added justify-center to center the content horizontally */}
  <div className="flex">
    <div className="flex flex-col items-center mr-4">
      <span>ML</span>
      <input
        type="checkbox"
        checked={row.ml}
        onChange={(e) => handleInputChange(index, "ml", e.target.checked)}
        className="form-checkbox h-5 w-5"
      />
    </div>
    <div className="flex flex-col items-center">
      <span>SL</span>
      <input
        type="checkbox"
        checked={row.sl}
        onChange={(e) => handleInputChange(index, "sl", e.target.checked)}
        className="form-checkbox h-5 w-5"
      />
    </div>
  </div>
</div>
              </td>
              <td className="border border-gray-300 px-4 py-2 w-28">
                <input
                  type="number"
                  value={row.width}
                  onBlur={() => checkPrice(index)}
                  placeholder="W"
                  onChange={(e) =>
                    handleInputChange(index, "width", Number(e.target.value))
                  }
                  className="border rounded px-2 py-1 w-full"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2 w-28">
                <input
                  type="number"
                  value={row.height}
                  onBlur={() => checkPrice(index)}
                  placeholder="H"
                  onChange={(e) =>
                    handleInputChange(index, "height", Number(e.target.value))
                  }
                  className="border rounded px-2 py-1 w-full"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2 w-28">
                <input
                  type="text"
                  value={row.qty}
                  onChange={(e) =>
                    handleInputChange(index, "qty", e.target.value)
                  }
                  className="border rounded px-2 py-1 w-full"
                />
              </td>
              <td
                className="border border-gray-300 px-4 py-2 flex justify-center items-center text-red-500 cursor-pointer"
                onClick={() => handleRemoveSlidingWindowRow(index)}
              >
                <IconContext.Provider
                  value={{ className: "shared-class", size: "25" }}
                >
                  <>
                    <MdDelete />
                  </>
                </IconContext.Provider>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={handleAddSlidingWindowRow}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          เพิ่มแถว
        </button>
        <button
          onClick={() => (slidingWindow ? handleSubmit() : null)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SlidingWindow;
