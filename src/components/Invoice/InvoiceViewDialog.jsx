import React from "react";
import { X } from "lucide-react";
import FormSection from "../InvoiceForm/FormSection";
import ExporterSection from "../InvoiceForm/sections/ExporterSection";
import ImporterSection from "../InvoiceForm/sections/ImporterSection";
import InvoiceDetailsSection from "../InvoiceForm/sections/InvoiceDetailsSection";
import ItemsDetailsSection from "../InvoiceForm/sections/ItemsDetailsSection";
import PackingDetailsSection from "../InvoiceForm/sections/PackingDetailsSection";
import AdditionalChargesSection from "../InvoiceForm/sections/AdditionalChargesSection";
import BankDetailsSection from "../InvoiceForm/sections/BankDetailsSection";
import TextAreaSection from "../InvoiceForm/sections/TextAreaSection";

const InvoiceViewDialog = ({ isOpen, onClose, onEdit, invoice }) => {
  if (!isOpen || !invoice) return null;

  const formData = invoice.details?.formData || {};
  const items = invoice.details?.items || [];
  const packings = invoice.details?.packings || [];
  const noop = () => {};

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <h2 className="text-3xl font-medium text-black">Invoice Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="space-y-6">
            <FormSection title="Exporter">
              <ExporterSection formData={formData} onChange={noop} readOnly />
            </FormSection>

            <FormSection title="Importer (Bill To)">
              <ImporterSection
                title="Bill To"
                prefix="billTo"
                formData={formData}
                onChange={noop}
                readOnly
              />
            </FormSection>

            <FormSection title="Importer (Ship To)">
              <ImporterSection
                title="Ship To"
                prefix="shipTo"
                formData={formData}
                onChange={noop}
                readOnly
              />
            </FormSection>

            <FormSection title="Invoice Details">
              <InvoiceDetailsSection
                formData={formData}
                onChange={noop}
                readOnly
              />
            </FormSection>

            <FormSection title="Items Details">
              <ItemsDetailsSection
                items={items}
                onItemsChange={noop}
                readOnly
              />
            </FormSection>

            <FormSection title="Packing Details">
              <PackingDetailsSection
                packings={packings}
                onPackingsChange={noop}
                readOnly
              />
            </FormSection>

            <FormSection title="Extra Changes">
              <AdditionalChargesSection
                formData={formData}
                onChange={noop}
                readOnly
              />
            </FormSection>

            <FormSection title="Bank Details">
              <BankDetailsSection formData={formData} onChange={noop} readOnly />
            </FormSection>

            <FormSection title="ARN No">
              <TextAreaSection
                title="Enter ARN No."
                name="arnNo"
                value={formData.arnNo}
                onChange={noop}
                placeholder="SUPPLY MEANT FOR EXPORT UNDER BOND OR LUT WITHOUT PAYMENT OF INTEGRATED TAX (IGST), LUT ARN..."
                disabled
              />
            </FormSection>

            <FormSection title="RoDTEP">
              <TextAreaSection
                title="Enter RoDTEP"
                name="rodtep"
                value={formData.rodtep}
                onChange={noop}
                placeholder="WE INTEND TO CLAIM REWARDS UNDER THE 'REMISSION OF DUTIES AND TAXES ON EXPORTED PRODUCT (RoDTEP)' SCHEME."
                disabled
              />
            </FormSection>

            <FormSection title="REX No.">
              <TextAreaSection
                title="Enter REX No."
                name="rexNo"
                value={formData.rexNo}
                onChange={noop}
                placeholder="Ishita Industries having REX reg n [NREXEJP]xxxxx of the products covered by this document declares that, except..."
                disabled
              />
            </FormSection>
          </div>
        </div>

        <div className="flex justify-center gap-3 px-6 py-4 border-t border-gray-200 shrink-0">
          <button
            onClick={onEdit}
            className="bg-black text-white px-12 py-2 rounded-xl hover:bg-gray-900 transition text-sm"
          >
            Edit
          </button>
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-700 px-12 py-2 rounded-xl hover:bg-gray-50 transition text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceViewDialog;
