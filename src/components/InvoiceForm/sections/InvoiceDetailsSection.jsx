import React from "react";
import FormInput from "../FormInput";

const InvoiceDetailsSection = ({ formData, onChange, disabled = false }) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <FormInput
          label="Invoice No."
          name="invoiceNo"
          value={formData.invoiceNo}
          onChange={onChange}
          disabled={disabled}
          placeholder="Enter Invoice No."
        />
        <FormInput
          label="Invoice Date"
          name="invoiceDate"
          type="date"
          value={formData.invoiceDate}
          onChange={onChange}
          disabled={disabled}
          placeholder="Enter Date"
        />
        <FormInput
          label="GST No"
          name="gstNo"
          value={formData.gstNo}
          onChange={onChange}
          disabled={disabled}
          placeholder="Enter GST No"
        />
        <FormInput
          label="IEC Code"
          name="iecCode"
          value={formData.iecCode}
          onChange={onChange}
          disabled={disabled}
          placeholder="Enter IEC Code"
        />
        <FormInput
          label="P/O No."
          name="poNo"
          value={formData.poNo}
          onChange={onChange}
          disabled={disabled}
          placeholder="Enter P/O No."
        />
        <FormInput
          label="Incoterms"
          name="incoterms"
          value={formData.incoterms}
          onChange={onChange}
          disabled={disabled}
          placeholder="Enter Incoterms"
        />
        <FormInput
          label="Payment Terms"
          name="paymentTerms"
          value={formData.paymentTerms}
          onChange={onChange}
          disabled={disabled}
          placeholder="Enter Payment Terms"
        />
        <FormInput
          label="Pre Carriage"
          name="preCarriage"
          value={formData.preCarriage}
          onChange={onChange}
          disabled={disabled}
          placeholder="Enter Pre Carriage"
        />
        <FormInput
          label="Country of Origin"
          name="countryOfOrigin"
          value={formData.countryOfOrigin}
          onChange={onChange}
          disabled={disabled}
          placeholder="Enter Country of Origin"
        />
        <FormInput
          label="Country of Final Destination"
          name="countryOfFinalDestination"
          value={formData.countryOfFinalDestination}
          onChange={onChange}
          disabled={disabled}
          placeholder="Enter Final Destination"
        />
        <FormInput
          label="Port of Loading"
          name="portOfLoading"
          value={formData.portOfLoading}
          onChange={onChange}
          disabled={disabled}
          placeholder="Enter Port of Loading"
        />
        <FormInput
          label="Port of Discharge"
          name="portOfDischarge"
          value={formData.portOfDischarge}
          onChange={onChange}
          disabled={disabled}
          placeholder="Enter Port of Discharge"
        />
      </div>
    </>
  );
};

export default InvoiceDetailsSection;

