import React from "react";

const ImporterSection = ({ title, prefix, formData, onChange, disabled }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      {/* 1. Country Field (Likely missing previously) */}
      <div className="md:col-span-2">
        <label className="block font-medium text-black mb-1">
        To The Order
        </label>
        <input
          type="text"
          name={`${prefix}Country`}
          value={formData[`${prefix}Country`] || ""}
          onChange={onChange}
          disabled={disabled}
          placeholder="Enter Country"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-100 placeholder:text-gray-500 placeholder:text-sm"
        />
      </div>

      {/* 2. To The Order Field (Likely missing previously) */}
      

      {/* 3. Company / Party Name */}
      <div>
        <label className="block font-medium text-black mb-1">
          {title}
        </label>
        <input
          type="text"
          name={`${prefix}Name`}
          value={formData[`${prefix}Name`] || ""}
          onChange={onChange}
          disabled={disabled}
          placeholder="Enter Party Name"
          className="w-full  px-4 py-2  border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-100 placeholder:text-gray-500 placeholder:text-sm"
        />
      </div>

      {/* 4. Contact Number */}
      <div>
        <label className="block font-medium text-black mb-1">
          Contact No.
        </label>
        <input
          type="text"
          name={`${prefix}ContactNo`}
          value={formData[`${prefix}ContactNo`] || ""}
          onChange={onChange}
          disabled={disabled}
          placeholder="Enter Number"
          className="w-full  px-4 py-2  border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-100 placeholder:text-gray-500 placeholder:text-sm"
        />
      </div>

      {/* 5. Address */}
      <div className="md:col-span-2">
        <label className="block font-medium text-black mb-1">
          Address
        </label>
        <textarea
          name={`${prefix}Address`}
          value={formData[`${prefix}Address`] || ""}
          onChange={onChange}
          disabled={disabled}
          rows="1"
          placeholder="Enter Address"
          className="w-full px-4 py-2  border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-100 placeholder:text-gray-500 placeholder:text-sm"
        />
      </div>
    </div>
  );
};

export default ImporterSection;