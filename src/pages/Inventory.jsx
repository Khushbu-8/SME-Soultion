import React, { useMemo, useState } from "react";
import SidebarLayout from "../components/SidebarLayout";
import SearchFilter from "../components/SearchFilter";
import StatsCard from "../components/StatsCard";
import PageHeader from "../components/PageHeader";

const Inventory = () => {
  const columns = useMemo(
    () => [
      "Item Name",
      "Size",
      "In MM",
      "Dia.",
      "Pc./Box",
      "Bn/Carton",
      "Plt/Carton",
      "Carton Weight",
      "8.8 Sdrn Len(g)",
      "ANTIQ",
      "Galv.",
      "Z Blk.",
      "Blk.",
      "UNI Lang",
      "MS-ANTIQ",
      "PVC",
      "PVC Blk",
      "PVC Black",
      "Rust Guard",
      "Clear Lacq",
    ],
    [],
  );
  const initialRows = 10;
  const [tableData, setTableData] = useState(() =>
    Array.from({ length: initialRows }, () => Array(columns.length).fill("")),
  );
  const [editingCell, setEditingCell] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const typeOptions = ["Type", "Hex Bolt", "CSK", "Allen Key"];

  const filteredRows = useMemo(() => {
    return tableData.filter((row) => {
      const rowText = row.join(" ").toLowerCase();
      const matchesSearch = !searchTerm || rowText.includes(searchTerm.toLowerCase());
      const matchesType = !typeFilter || rowText.includes(typeFilter.toLowerCase());
      return matchesSearch && matchesType;
    });
  }, [searchTerm, tableData, typeFilter]);

  const updateCell = (rowIndex, colIndex, value) => {
    setTableData((prev) =>
      prev.map((row, rIdx) =>
        rIdx === rowIndex
          ? row.map((cell, cIdx) => (cIdx === colIndex ? value : cell))
          : row,
      ),
    );
  };

  return (
    <SidebarLayout>
      <div className="max-w-7xl mx-auto">
        <div className="">
          <div className="mb-8">
            <PageHeader
              title="Item Management"
              description="Add the items , size & packing system"
            />
          </div>
          
        <div className="mb-8">
          <StatsCard label="Total Items" value={26} />
        </div>
          <div className="mt-3">
            <SearchFilter
              searchQuery={searchTerm}
              setSearchQuery={setSearchTerm}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              filterOptions={typeOptions}
              filterPlaceholder="Type"
            />
          </div>

          <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
            <div className="max-h-[460px] overflow-auto scrollbar-thin">
            <table className="min-w-[1200px] w-full">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  {columns.map((col) => (
                    <th
                      key={col}
                      className="sticky top-0 z-10 whitespace-nowrap px-6 py-4 text-center text-sm font-semibold text-gray-900 border-r border-gray-200 last:border-r-0 bg-gray-100"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, rowIndex) => (
                  <tr key={`row-${rowIndex}`} className="border-b border-gray-200 hover:bg-gray-50">
                    {row.map((value, colIndex) => {
                      const isEditing = editingCell === `${rowIndex}-${colIndex}`;
                      return (
                        <td
                          key={`${rowIndex}-${columns[colIndex]}`}
                          className="h-10 min-w-[84px] px-3 py-3 text-center text-sm text-gray-500 border-r border-gray-200 last:border-r-0"
                          onClick={() => setEditingCell(`${rowIndex}-${colIndex}`)}
                        >
                          {isEditing ? (
                            <input
                              autoFocus
                              value={value}
                              onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                              onBlur={() => setEditingCell(null)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.currentTarget.blur();
                                }
                              }}
                              className="w-full rounded text-start text-sm focus:outline-none focus:ring-none focus:ring-gray-300"
                            />
                          ) : (
                            <span className={value ? "text-gray-500" : "text-gray-300"}>
                              {value || " "}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
          {filteredRows.length === 0 && (
            <p className="mt-2 text-xs text-gray-500">No matching rows.</p>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Inventory;
