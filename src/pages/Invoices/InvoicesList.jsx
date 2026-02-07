import React, { useMemo, useState } from "react";
import { Plus, Download, SquarePen, Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "../../components/SidebarLayout";
import SearchFilter from "../../components/SearchFilter";
import InvoiceData from "../../Data/invoicedata";

const InvoicesList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const filteredInvoices = useMemo(() => {
    return InvoiceData.filter((invoice) => {
      const matchesSearch =
        invoice.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.partyName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = !typeFilter || invoice.invoiceType === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [searchTerm, typeFilter]);

  return (
    <SidebarLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-medium text-black mb-2">Invoices</h1>
              <p className="text-gray-500 text-md">
                Centralised management of invoices with type, date, and download
                options.
              </p>
            </div>

            <button
              onClick={() => navigate("/invoices/create")}
              className="flex items-center gap-2 bg-white border border-gray-900 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              <Plus className="w-5 h-5" />
              Create Invoice
            </button>
          </div>
        </div>
        {/* Stats */}
        <div className="mb-8">
          <div className="bg-white border border-gray-300 rounded-lg px-3 py-2 h-[110px] flex flex-col justify-between">
            <p className="text-gray-500">Total Invoices</p>
            <p className="text-3xl font-medium text-black">
              {filteredInvoices.length}
            </p>
          </div>
        </div>

        {/* Search Filter */}
        <SearchFilter
          searchQuery={searchTerm}
          setSearchQuery={setSearchTerm}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          filterOptions={["Export", "Commercial", "Packing List"]}
          filterPlaceholder="Type"
        />

        {/* Table */}
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-6 py-4 text-center text-sm font-medium">
                  Invoice No
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium">
                  Date
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium">
                  Party Name
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium">
                  Invoice Type
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium">
                  Get Invoices
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredInvoices.map((invoice, index) => {
                const isLastOfGroup =
                  index === filteredInvoices.length - 1 ||
                  filteredInvoices[index + 1].invoiceNo !== invoice.invoiceNo;

                return (
                  <React.Fragment key={invoice.id}>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-center text-sm font-medium">
                        {invoice.invoiceNo}
                      </td>
                      <td className="px-6 py-4 text-center text-sm ">
                        {invoice.date}
                      </td>
                      <td className="px-6 py-4 text-center text-sm ">
                        {invoice.partyName}
                      </td>
                      <td className="px-6 py-4 text-center text-sm ">
                        {invoice.invoiceType}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="inline-flex items-center gap-2 text-gray-800 hover:text-black text-sm">
                          Download
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                      <td className="px-6 py-4 flex justify-center gap-3">
                        <SquarePen className="w-4 h-4 cursor-pointer" />
                        <Eye className="w-4 h-4 cursor-pointer" />
                        <Trash2 className="w-4 h-4 cursor-pointer text-red-600" />
                      </td>
                    </tr>

                    {/* 🔹 Group Spacer (THIS IS THE MAGIC) */}
                    {isLastOfGroup && (
                      <tr>
                        <td colSpan={6} className="h-4 bg-gray-50"></td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default InvoicesList;
