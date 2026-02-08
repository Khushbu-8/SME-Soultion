import React from "react";

const FormInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  className = "",
  colSpan = "1",
  disabled = false,
}) => {
  return (
    <div className={colSpan}>
      <label className="block text-black font-medium mb-1">
        {label}
        {required && <span className="text-black">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full border border-gray-200 rounded-lg px-4 py-2  focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder:text-gray-500 placeholder:text-sm ${disabled ? 'bg-gray-50 text-gray-600' : ''} ${className}`}
      />
    </div>
  );
};

export default FormInput;

