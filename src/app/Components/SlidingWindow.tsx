import React from "react";
import { useState } from "react";
import { ToastContainer, toast, Zoom } from "react-toastify";

const SlidingWindow = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [slidingWindow, setSlidingWindow] = useState([
    {
      id: "",
      sub: false,
      type: "",
      glass: "",
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
        width: "",
        height: "",
        qty: "",
      },
    ]);
  };

  const handleRemoveSlidingWindowRow = (index: number) => {
    const updatedRows = slidingWindow.filter((_, i) => i !== index);
    setSlidingWindow(updatedRows);
  };

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

  const handleSubmit = () => {
    if (isChecked) {
      const isDataComplete = slidingWindow.every((row) => {
        return (
          row.id.trim() !== "" &&
          row.type.trim() !== "" &&
          row.glass.trim() !== "" &&
          row.width.trim() !== "" &&
          row.height.trim() !== "" &&
          row.qty.trim() !== ""
        );
      });

      if (!isDataComplete) {
        toast.warn("กรอกข้อมูล Sliding Window ให้ครบ", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
        });
        return;
      }

      sessionStorage.setItem(
        "slidingWindowData",
        JSON.stringify(slidingWindow)
      );

      window.open("/Calc", "_blank");
    } else {
      window.open("/Calc", "_blank");
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
        <h1 className="text-2xl font-bold ml-2">Sliding Window</h1>
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
              กระจก
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
                  <option value="">Select Type</option>
                  <option>กระจกเขียวตัดแสง 6มม</option>
                  <option>กระจกใส 5มม</option>
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
                  <option value="green_6mm">กระจกเขียวตัดแสง 6มม</option>
                  <option value="clear_5mm">กระจกใส 5มม</option>
                </select>
              </td>
              <td className="border border-gray-300 px-4 py-2 w-28">
                <input
                  type="text"
                  value={row.width}
                  onChange={(e) =>
                    handleInputChange(index, "width", e.target.value)
                  }
                  placeholder="W"
                  className="border rounded px-2 py-1 w-full"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2 w-28">
                <input
                  type="text"
                  value={row.height}
                  onChange={(e) =>
                    handleInputChange(index, "height", e.target.value)
                  }
                  placeholder="H"
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
                className="border border-gray-300 px-4 py-2 text-center text-red-500 cursor-pointer"
                onClick={() => handleRemoveSlidingWindowRow(index)}
              >
                ลบ
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
