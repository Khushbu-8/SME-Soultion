import React from "react";
import FormInput from "../FormInput";

const AdditionalChargesSection = ({ formData, onChange, readOnly = false }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <FormInput
          label="Freight Cost"
          name="freightCost"
          value={formData.freightCost}
          onChange={onChange}
          placeholder="10.400"
          disabled={readOnly}
        />
        <FormInput
          label="Insurance Cost"
          name="insuranceCost"
          value={formData.insuranceCost}
          onChange={onChange}
          placeholder="00"
          disabled={readOnly}
        />
        <div className="col-span-2">
          <FormInput
            label="Other Charges"
            name="otherCharges"
            value={formData.otherCharges}
            onChange={onChange}
            placeholder="00"
            disabled={readOnly}
          />
        </div>
      </div>
    </>
  );
};

export default AdditionalChargesSection;

