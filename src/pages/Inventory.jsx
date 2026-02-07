import React, { useMemo, useState } from "react";
import { SquarePen, Eye, Trash2 } from "lucide-react";
import SidebarLayout from "../components/SidebarLayout";
import SearchFilter from "../components/SearchFilter";
import InventoryData from "../Data/inventorydata";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filteredItems = useMemo(() => {
    return InventoryData.filter((item) => {
      const matchesSearch =
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.itemNo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !categoryFilter ||
        item.category.toLowerCase().includes(categoryFilter.toLowerCase());
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);

  const totals = useMemo(() => {
    const lowStock = InventoryData.filter(
      (item) => item.status === "Low Stock",
    ).length;
    const outOfStock = InventoryData.filter(
      (item) => item.status === "Out of Stock",
    ).length;
    return {
      total: InventoryData.length,
      lowStock,
      outOfStock,
    };
  }, []);

  const getStatusStyles = (status) => {
    if (status === "Low Stock") {
      return "bg-amber-50 text-amber-700 border border-amber-200";
    }
    if (status === "Out of Stock") {
      return "bg-red-50 text-red-700 border border-red-200";
    }
    return "bg-emerald-50 text-emerald-700 border border-emerald-200";
  };

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Inventory
            </h1>
            <p className="text-gray-500 mt-1 text-md">
              Centralised management of all items with sizes, weights,
              categories, and stock details.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-3 h-[110px] flex flex-col justify-between">
            <p className="text-gray-500">Total Items</p>
            <p className="text-3xl font-semibold text-gray-900">
              {totals.total}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-3 h-[110px] flex flex-col justify-between">
            <p className="text-gray-500">Low Stock</p>
            <p className="text-3xl font-semibold text-gray-900">
              {totals.lowStock}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-3 h-[110px] flex flex-col justify-between">
            <p className="text-gray-500">Out of Stock</p>
            <p className="text-3xl font-semibold text-gray-900">
              {totals.outOfStock}
            </p>
          </div>
        </div>

        <SearchFilter
          className="flex gap-4"
          searchQuery={searchTerm}
          setSearchQuery={setSearchTerm}
          typeFilter={categoryFilter}
          setTypeFilter={setCategoryFilter}
          filterOptions={["Category", "Fasteners", "Anchors", "Insert Nuts"]}
          filterPlaceholder="Category"
        />

        <div className="bg-white rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  Item No
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  Item Name
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  Category
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  Stock
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 text-center">
                    {item.itemNo}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 text-center">
                    {item.itemName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 text-center">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 text-center">
                    {item.stock} {item.unit}
                  </td>
                  <td className="px-6 py-4 text-sm text-center">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(
                        item.status,
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm flex items-center justify-center gap-3">
                    <button
                      className="text-black hover:text-black transition"
                      title="Edit"
                    >
                      <SquarePen className="w-4 h-4" />
                    </button>
                    <button
                      className="text-gray-700 hover:text-gray-900 transition"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Inventory;
