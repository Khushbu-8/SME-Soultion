import React, { useMemo, useState } from "react";
import { Plus, SquarePen, Copy, Eye, Trash2, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "../../components/SidebarLayout";
import SearchFilter from "../../components/SearchFilter";
import StatsCard from "../../components/StatsCard";
import PageHeader from "../../components/PageHeader";
import PrimaryActionButton from "../../components/PrimaryActionButton";

const OrderManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const orders = useMemo(
    () => [
      {
        id: 1,
        partyName: "Eneron Tech",
        date: "25/02/2025",
        size: '6 X 1.1/8 X 5/32 - 3,600',
        qtyPc: "300",
        qtyKg: "135 Kg",
        boxPc: "135",
        cartoon: "13",
        dispatchDate: "25/02/2025",
        dispatchPcs: "298",
        pendingPc: "02",
        plating: "S.S + 16",
        platingStatus: true,
        jobWork: "Job Work",
      },
      {
        id: 2,
        partyName: "Eneron Tech",
        date: "25/02/2025",
        size: '6 X 1.1/8 X 5/32 - 3,600',
        qtyPc: "300",
        qtyKg: "135 Kg",
        boxPc: "135",
        cartoon: "13",
        dispatchDate: "25/02/2025",
        dispatchPcs: "298",
        pendingPc: "02",
        plating: "S.S + 16",
        platingStatus: true,
        jobWork: "Job Work",
      },
      {
        id: 3,
        partyName: "Eneron Tech",
        date: "25/02/2025",
        size: '6 X 1.1/8 X 5/32 - 3,600',
        qtyPc: "300",
        qtyKg: "135 Kg",
        boxPc: "135",
        cartoon: "13",
        dispatchDate: "25/02/2025",
        dispatchPcs: "298",
        pendingPc: "02",
        plating: "S.S + 16",
        platingStatus: true,
        jobWork: "Job Work",
      },
      {
        id: 4,
        partyName: "Eneron Tech",
        date: "25/02/2025",
        size: '6 X 1.1/8 X 5/32 - 3,600',
        qtyPc: "300",
        qtyKg: "135 Kg",
        boxPc: "135",
        cartoon: "13",
        dispatchDate: "25/02/2025",
        dispatchPcs: "298",
        pendingPc: "02",
        plating: "S.S + 16",
        platingStatus: true,
        jobWork: "Job Work",
      },
      {
        id: 5,
        partyName: "Eneron Tech",
        date: "25/02/2025",
        size: '6 X 1.1/8 X 5/32 - 3,600',
        qtyPc: "300",
        qtyKg: "135 Kg",
        boxPc: "135",
        cartoon: "13",
        dispatchDate: "25/02/2025",
        dispatchPcs: "298",
        pendingPc: "02",
        plating: "S.S + 16",
        platingStatus: true,
        jobWork: "Job Work",
      },
    ],
    [],
  );

  const filteredOrders = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesSearch =
        !normalizedSearch ||
        order.partyName.toLowerCase().includes(normalizedSearch) ||
        order.size.toLowerCase().includes(normalizedSearch);
      const matchesType =
        !typeFilter || order.jobWork.toLowerCase().includes(typeFilter.toLowerCase());
      return matchesSearch && matchesType;
    });
  }, [orders, searchTerm, typeFilter]);

  return (
    <SidebarLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <PageHeader
            title="Order Management"
            description="Simplifying Order Processing from Start to Delivery"
            action={
              <PrimaryActionButton
                onClick={() => navigate("/order/select")}
                icon={Plus}
              >
                Add Order
              </PrimaryActionButton>
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <StatsCard
            label="Total Order"
            value={26}
            className="h-[90px] rounded-md"
           
          />
          <StatsCard
            label="Total Pending Order"
            value={17}
            className="h-[90px] rounded-md"
          />
        </div>

        <SearchFilter
          searchQuery={searchTerm}
          setSearchQuery={setSearchTerm}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          filterOptions={["Type", "Job Work"]}
          filterPlaceholder="Type"
        />

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="max-h-[520px] overflow-auto scrollbar-thin">
            <table className="min-w-[1500px] w-full">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th rowSpan={2} className="px-3 py-4 text-left text-sm font-semibold border-r border-gray-200 whitespace-nowrap">Party Name</th>
                  <th rowSpan={2} className="px-3 py-4 text-left text-sm font-semibold border-r border-gray-200 whitespace-nowrap">Date</th>
                  <th rowSpan={2} className="px-3 py-4 text-left text-sm font-semibold border-r border-gray-200 whitespace-nowrap">Size</th>
                  <th rowSpan={2} className="px-3 py-4 text-center text-sm font-semibold border-r border-gray-200 whitespace-nowrap">Qty. Pc</th>
                  <th rowSpan={2} className="px-3 py-4 text-center text-sm font-semibold border-r border-gray-200 whitespace-nowrap">Qty Kg</th>
                  <th rowSpan={2} className="px-3 py-4 text-center text-sm font-semibold border-r border-gray-200 whitespace-nowrap">Box/Pc.</th>
                  <th rowSpan={2} className="px-3 py-4 text-center text-sm font-semibold border-r border-gray-200 whitespace-nowrap">Cartoon</th>
                  <th colSpan={2} className="px-3 py-2 text-center text-sm font-semibold border-r border-gray-200 whitespace-nowrap">Dispatch</th>
                  <th rowSpan={2} className="px-3 py-4 text-center text-sm font-semibold border-r border-gray-200 whitespace-nowrap">Pending Pc.</th>
                  <th rowSpan={2} className="px-3 py-4 text-center text-sm font-semibold border-r border-gray-200 whitespace-nowrap">Plating</th>
                  <th rowSpan={2} className="px-3 py-4 text-center text-sm font-semibold border-r border-gray-200 whitespace-nowrap">Job Action</th>
                  <th rowSpan={2} className="px-3 py-4 text-center text-sm font-semibold border-r border-gray-200 whitespace-nowrap">Plating</th>
                  <th rowSpan={2} className="px-3 py-4 text-center text-sm font-semibold whitespace-nowrap">Action</th>
                </tr>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="px-3 py-2 text-center text-sm font-semibold border-r border-gray-200 whitespace-nowrap">Date</th>
                  <th className="px-3 py-2 text-center text-sm font-semibold border-r border-gray-200 whitespace-nowrap">Pcs.</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((row) => (
                  <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-3 py-4 text-sm text-gray-700 border-r border-gray-200 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <span>{row.partyName}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                      </div>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-700 border-r border-gray-200 whitespace-nowrap">{row.date}</td>
                    <td className="px-3 py-4 text-sm text-gray-700 border-r border-gray-200 whitespace-nowrap">{row.size}</td>
                    <td className="px-3 py-4 text-sm text-center text-gray-700 border-r border-gray-200 whitespace-nowrap">{row.qtyPc}</td>
                    <td className="px-3 py-4 text-sm text-center text-gray-700 border-r border-gray-200 whitespace-nowrap">{row.qtyKg}</td>
                    <td className="px-3 py-4 text-sm text-center text-gray-700 border-r border-gray-200 whitespace-nowrap">{row.boxPc}</td>
                    <td className="px-3 py-4 text-sm text-center text-gray-700 border-r border-gray-200 whitespace-nowrap">{row.cartoon}</td>
                    <td className="px-3 py-4 text-sm text-center text-gray-700 border-r border-gray-200 whitespace-nowrap">{row.dispatchDate}</td>
                    <td className="px-3 py-4 text-sm text-center text-gray-700 border-r border-gray-200 whitespace-nowrap">{row.dispatchPcs}</td>
                    <td className="px-3 py-4 text-sm text-center text-gray-700 border-r border-gray-200 whitespace-nowrap">{row.pendingPc}</td>
                    <td className="px-3 py-4 text-sm text-center text-gray-700 border-r border-gray-200 whitespace-nowrap">{row.plating}</td>
                    <td className="px-3 py-4 border-r border-gray-200">
                      <div className="flex items-center justify-center">
                        <span className="w-7 h-4 bg-emerald-600 rounded-full relative">
                          <span className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5" />
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-sm text-center border-r border-gray-200 whitespace-nowrap">
                      <span className="text-red-500">{row.jobWork}</span>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <SquarePen className="w-4 h-4 text-gray-500 cursor-pointer" />
                        <Eye className="w-4 h-4 text-gray-500 cursor-pointer" />
                        <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default OrderManagement;
