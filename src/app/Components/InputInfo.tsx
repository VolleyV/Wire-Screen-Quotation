import React from "react";
import { useState } from "react";

const InputInfo = () => {
  const [formData, setFormData] = useState({
    name: "",
    attention:"",
    phone:"",
    project:"",
    address:"",
    company:"",
    quote:""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap">
          <div className="w-full md:w-3/12 px-4">
            <label
              className="block text-blueGray-600 text-base font-bold mb-2"
              htmlFor="grid-password"
            >
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
            <label
              className="block text-blueGray-600 text-base font-bold mb-2"
              htmlFor="grid-password"
            >
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
            <label
              className="block text-blueGray-600 text-base font-bold mb-2"
              htmlFor="grid-password"
            >
              Adress
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
            <label
              className="block text-blueGray-600 text-base font-bold mb-2"
              htmlFor="grid-password"
            >
              Telephone Number
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
        </div>

        <div className="flex flex-wrap mt-4">
          <div className="w-full md:w-3/12 px-4">
            <label
              className="block text-blueGray-600 text-base font-bold mb-2"
              htmlFor="grid-password"
            >
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
            <label
              className="block text-blueGray-600 text-base font-bold mb-2"
              htmlFor="grid-password"
            >
              Phone
            </label>
            <input
              type="text"
              value={formData.phone}
              className="border px-2 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="w-full md:w-3/12 px-4">
            <label
              className="block text-blueGray-600 text-base font-bold mb-2"
              htmlFor="grid-password"
            >
              Adress
            </label>
            <input
              type="text"
              value={formData.name}
              className="border px-2 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="w-full md:w-3/12 px-4">
            <label
              className="block text-blueGray-600 text-base font-bold mb-2"
              htmlFor="grid-password"
            >
              เขียนใบเสนอ
            </label>
            <input
              type="text"
              value={formData.name}
              className="border px-2 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-end mt-4 px-4">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            ส่งข้อมูล
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputInfo;
