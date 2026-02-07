import React from "react";
import FormInput from "../FormInput";

const InvoiceDetailsSection = ({ formData, onChange, readOnly = false }) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <FormInput
          label="Invoice No."
          name="invoiceNo"
          value={formData.invoiceNo}
          onChange={onChange}
          placeholder="01"
          disabled={readOnly}
        />
        <FormInput
          label="Invoice Date"
          name="invoiceDate"
          type="date"
          value={formData.invoiceDate}
          onChange={onChange}
          disabled={readOnly}
        />
        <FormInput
          label="GST No"
          name="gstNo"
          value={formData.gstNo}
          onChange={onChange}
          placeholder="24AAMCC7842H1ZG"
          disabled={readOnly}
        />
        <FormInput
          label="IEC Code"
          name="iecCode"
          value={formData.iecCode}
          onChange={onChange}
          placeholder="AAGFI3929N"
          disabled={readOnly}
        />
        <FormInput
          label="P/O No."
          name="poNo"
          value={formData.poNo}
          onChange={onChange}
          placeholder="67937969"
          disabled={readOnly}
        />
        <FormInput
          label="Incoterms"
          name="incoterms"
          value={formData.incoterms}
          onChange={onChange}
          placeholder="F.O.B"
          disabled={readOnly}
        />
        <FormInput
          label="Payment Terms"
          name="paymentTerms"
          value={formData.paymentTerms}
          onChange={onChange}
          placeholder="T/T Net 15 B/L"
          disabled={readOnly}
        />
        <FormInput
          label="Pre Carriage"
          name="preCarriage"
          value={formData.preCarriage}
          onChange={onChange}
          placeholder="Jamnagar"
          disabled={readOnly}
        />
        <FormInput
          label="Country of Origin"
          name="countryOfOrigin"
          value={formData.countryOfOrigin}
          onChange={onChange}
          placeholder="India"
          disabled={readOnly}
        />
        <FormInput
          label="Country of Final Destination"
          name="countryOfFinalDestination"
          value={formData.countryOfFinalDestination}
          onChange={onChange}
          placeholder="Denmark"
          disabled={readOnly}
        />
        <FormInput
          label="Port of Loading"
          name="portOfLoading"
          value={formData.portOfLoading}
          onChange={onChange}
          placeholder="Nhava Sheva"
          disabled={readOnly}
        />
        <FormInput
          label="Port of Discharge"
          name="portOfDischarge"
          value={formData.portOfDischarge}
          onChange={onChange}
          placeholder="Dallas Port"
          disabled={readOnly}
        />
      </div>
    </>
  );
};

export default InvoiceDetailsSection;

