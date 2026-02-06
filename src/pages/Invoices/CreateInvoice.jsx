import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import SidebarLayout from "../../components/SidebarLayout";

// Reusable UI Components
import FormSection from "../../components/InvoiceForm/FormSection";

// Section Components
import ExporterSection from "../../components/InvoiceForm/sections/ExporterSection";
import ImporterSection from "../../components/InvoiceForm/sections/ImporterSection";
import InvoiceDetailsSection from "../../components/InvoiceForm/sections/InvoiceDetailsSection";
import ItemsDetailsSection from "../../components/InvoiceForm/sections/ItemsDetailsSection";
import PackingDetailsSection from "../../components/InvoiceForm/sections/PackingDetailsSection";
import AdditionalChargesSection from "../../components/InvoiceForm/sections/AdditionalChargesSection";
import BankDetailsSection from "../../components/InvoiceForm/sections/BankDetailsSection";
import TextAreaSection from "../../components/InvoiceForm/sections/TextAreaSection";

const CreateInvoice = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Exporter
    exporterCompanyName: "",
    exporterContactNo: "",
    exporterAddress: "",

    // Bill To (Importer)
    billToToTheOrder: "",
    billToName: "",
    billToContactNo: "",
    billToAddress: "",

    // Ship To (Importer)
    shipToToTheOrder: "",
    shipToName: "",
    shipToContactNo: "",
    shipToAddress: "",

    // Invoice Details
    invoiceNo: "",
    invoiceDate: "",
    gstNo: "",
    iecCode: "",
    poNo: "",
    incoterms: "",
    paymentTerms: "",
    preCarriage: "",
    countryOfOrigin: "",
    countryOfFinalDestination: "",
    portOfLoading: "",
    portOfDischarge: "",

    // Additional Charges
    freightCost: "",
    insuranceCost: "",
    otherCharges: "",

    // Bank Details
    beneficiaryName: "",
    beneficiaryBank: "",
    branch: "",
    beneficiaryAcNo: "",
    switchCode: "",

    // Text Sections
    arnNo: "",
    rodtep: "",
    rexNo: "",
  });

  const [items, setItems] = useState([
    {
      itemNo: "",
      itemDescription: "",
      hsCode: "",
      itemQty: "",
      unitPrice: "",
      currency: "EUR",
      currencyCurrentPrice: "",
    },
  ]);

  const [packings, setPackings] = useState([
    {
      packingItemNo: "",
      packingDescription: "",
      totalQtyPcs: "",
      qtyInEachCarton: "",
      noOfCarton: "",
      grossWeight: "",
      netWeight: "",
      totalCartonWith: "",
      woodenPallet: "",
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemsChange = (newItems) => {
    setItems(newItems);
  };

  const handleAddItem = () => {
    const newItem = {
      itemNo: "",
      itemDescription: "",
      hsCode: "",
      itemQty: "",
      unitPrice: "",
      currency: "EUR",
      currencyCurrentPrice: "",
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handlePackingsChange = (newPackings) => {
    setPackings(newPackings);
  };

  const handleAddPacking = () => {
    const newPacking = {
      packingItemNo: "",
      packingDescription: "",
      totalQtyPcs: "",
      qtyInEachCarton: "",
      noOfCarton: "",
      grossWeight: "",
      netWeight: "",
      totalCartonWith: "",
      woodenPallet: "",
    };
    setPackings((prev) => [...prev, newPacking]);
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    console.log("Items:", items);
    console.log("Packings:", packings);
    // Add your submit logic here
  };

  return (
    <SidebarLayout>
      <div className="space-y-6">
        {/* Exporter Section */}
        <FormSection title="Exporter">
          <ExporterSection formData={formData} onChange={handleChange} />
        </FormSection>

        {/* Bill To Section */}
        <FormSection title="Importer (Bill To)">
          <ImporterSection
            title="Bill To"
            prefix="billTo"
            formData={formData}
            onChange={handleChange}
          />
        </FormSection>

        {/* Ship To Section */}
        <FormSection title="Importer (Ship To)">
          <ImporterSection
            title="Ship To"
            prefix="shipTo"
            formData={formData}
            onChange={handleChange}
          />
        </FormSection>

        {/* Invoice Details Section */}
        <FormSection title="Invoice Details">
          <InvoiceDetailsSection
            formData={formData}
            onChange={handleChange}
          />
        </FormSection>

        {/* Items Details Section */}
        <FormSection
          title="Items Details"
          action={
            <button
              type="button"
              onClick={handleAddItem}
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Add Item
              <Plus className="w-3 h-3" />
            </button>
          }
        >
          <ItemsDetailsSection
            items={items}
            onItemsChange={handleItemsChange}
          />
        </FormSection>

        {/* Packing Details Section */}
        <FormSection
          title="Packing Details"
          action={
            <button
              type="button"
              onClick={handleAddPacking}
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Add Item
              <Plus className="w-3 h-3" />
            </button>
          }
        >
          <PackingDetailsSection
            packings={packings}
            onPackingsChange={handlePackingsChange}
          />
        </FormSection>

        {/* Additional Charges Section */}
        <FormSection title="Extra Changes">
          <AdditionalChargesSection
            formData={formData}
            onChange={handleChange}
          />
        </FormSection>

        {/* Bank Details Section */}
        <FormSection title="Bank Details">
          <BankDetailsSection formData={formData} onChange={handleChange} />
        </FormSection>

        {/* ARN No Section */}
        <FormSection title="ARN No">
          <TextAreaSection
            title="Enter ARN No."
            name="arnNo"
            value={formData.arnNo}
            onChange={handleChange}
            placeholder="SUPPLY MEANT FOR EXPORT UNDER BOND OR LUT WITHOUT PAYMENT OF INTEGRATED TAX (IGST), LUT ARN..."
          />
        </FormSection>

        {/* RoDTEP Section */}
        <FormSection title="RoDTEP">
          <TextAreaSection
            title="Enter RoDTEP"
            name="rodtep"
            value={formData.rodtep}
            onChange={handleChange}
            placeholder="WE INTEND TO CLAIM REWARDS UNDER THE 'REMISSION OF DUTIES AND TAXES ON EXPORTED PRODUCT (RoDTEP)' SCHEME."
          />
        </FormSection>

        {/* REX No Section */}
        <FormSection title="REX No.">
          <TextAreaSection
            title="Enter REX No."
            name="rexNo"
            value={formData.rexNo}
            onChange={handleChange}
            placeholder="Ishita Industries having REX reg n [NREXEJP]xxxxx of the products covered by this document declares that, except..."
          />
        </FormSection>

{/* Submit Button */}
        <div className="flex justify-center gap-4 pt-4">
           <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
          >
           Save & Download
          </button>
          <button
            onClick={() => navigate("/invoices")}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
         
        </div>
        </div>
    </SidebarLayout>
  );
};

export default CreateInvoice;
