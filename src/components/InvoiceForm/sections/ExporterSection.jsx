import React from "react";
import FormInput from "../FormInput";

const ExporterSection = ({ formData, onChange, readOnly = false }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="Company Name"
          name="exporterCompanyName"
          value={formData.exporterCompanyName}
          onChange={onChange}
          placeholder="Enter Party Name"
          required
          disabled={readOnly}
        />
        <FormInput
          label="Contact No."
          name="exporterContactNo"
          value={formData.exporterContactNo}
          onChange={onChange}
          placeholder="+44 6785 5679"
          disabled={readOnly}
        />
        <div className="col-span-2">
          <FormInput
            label="Address"
            name="exporterAddress"
            value={formData.exporterAddress}
            onChange={onChange}
            placeholder="Enter Address"
            disabled={readOnly}
          />
        </div>
      </div>
    </>
  );
};

export default ExporterSection;

