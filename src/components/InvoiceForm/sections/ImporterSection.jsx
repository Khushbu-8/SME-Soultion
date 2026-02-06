import React from "react";
import FormInput from "../FormInput";

const ImporterSection = ({
  title,
  prefix,
  formData,
  onChange,
  toTheOrderOptions = [
    { value: "USA", label: "USA" },
    { value: "UK", label: "UK" },
    { value: "Germany", label: "Germany" },
    { value: "Denmark", label: "Denmark" },
    { value: "Canada", label: "Canada" },
    { value: "Australia", label: "Australia" },
    { value: "France", label: "France" },
    { value: "Netherlands", label: "Netherlands" },
  ],
}) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <FormInput
            label="To The Order"
            name={`${prefix}ToTheOrder`}
            value={formData[`${prefix}ToTheOrder`]}
            onChange={onChange}
            placeholder="Select Country"
          />
        </div>
        <FormInput
          label={`${title}*`}
          name={`${prefix}Name`}
          value={formData[`${prefix}Name`]}
          onChange={onChange}
          placeholder="Enter Party Name"
          required
        />
        <FormInput
          label="Contact No."
          name={`${prefix}ContactNo`}
          value={formData[`${prefix}ContactNo`]}
          onChange={onChange}
          placeholder="+44 6785 6975"
        />
        <div className="col-span-2">
          <FormInput
            label="Address"
            name={`${prefix}Address`}
            value={formData[`${prefix}Address`]}
            onChange={onChange}
            placeholder="Enter Address"
          />
        </div>
      </div>
    </>
  );
};

export default ImporterSection;

