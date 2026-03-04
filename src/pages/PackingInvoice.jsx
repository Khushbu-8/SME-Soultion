import React, { useMemo, useState } from "react";
import { Calendar, Download, Plus } from "lucide-react";
import SidebarLayout from "../components/SidebarLayout";
import PageHeader from "../components/PageHeader";
import StatsCard from "../components/StatsCard";
import SearchFilter from "../components/SearchFilter";

const partyOptions = ["Elite", "Marco", "Forum", "Maxin"];
const sizeOptions = [
  "6 X 1.1/8 X 5/32 - 3.600",
  "7 X 1.1/8 X 5/32 - 3.500",
  "6 X 1.2/8 X 5/32 - 3.200",
];

const initialRows = [
  {
    id: 1,
    date: "2026-03-02",
    invoiceId: "01",
    party: "Elite",
    cartoonNo: "01",
    acDozWeight: "4.300",
    size: "6 X 1.1/8 X 5/32 - 3.600",
    finish: "S.S + 16",
    box: "10",
    pc: "6",
    totalPc: "60",
    scrap: "500",
    labour: "150",
    rsKg: "650",
    boxWeight: "2.16",
    boxWeightAccDozWeight: "4.320",
    billCalDozWeight: "4.300",
    ratePc: "232.91",
    totalRs: "13975",
    totalKg: "21.6",
    asPerDozWeight: "21.5",
    loss: "0.100",
  },
  {
    id: 2,
    date: "",
    invoiceId: "",
    party: "",
    cartoonNo: "",
    acDozWeight: "",
    size: "",
    finish: "",
    box: "",
    pc: "",
    totalPc: "",
    scrap: "",
    labour: "",
    rsKg: "",
    boxWeight: "",
    boxWeightAccDozWeight: "",
    billCalDozWeight: "",
    ratePc: "",
    totalRs: "",
    totalKg: "",
    asPerDozWeight: "",
    loss: "",
  },
];

const columns = [
  { key: "date", label: "Date", type: "date" },
  { key: "invoiceId", label: "Invoice ID", type: "text" },
  { key: "party", label: "Party", type: "party-select" },
  { key: "cartoonNo", label: "Cartoon No.", type: "text" },
  { key: "acDozWeight", label: "Ac. Doz Weight", type: "number" },
  { key: "size", label: "Size", type: "size-select" },
  { key: "finish", label: "Finish", type: "text" },
  { key: "box", label: "Box", type: "number" },
  { key: "pc", label: "Pc.", type: "number" },
  { key: "totalPc", label: "Total Pc", type: "number" },
  { key: "scrap", label: "Scrap.", type: "number" },
  { key: "labour", label: "Laboure", type: "number" },
  { key: "rsKg", label: "Rs/Kg", type: "number" },
  { key: "boxWeight", label: "Box Weight", type: "number" },
  { key: "boxWeightAccDozWeight", label: "Box Weight / Ac. Doz Weight", type: "number" },
  { key: "billCalDozWeight", label: "Bill Cal. Doz Weight", type: "number" },
  { key: "ratePc", label: "Rate/Pc.", type: "number" },
  { key: "totalRs", label: "Total Rs.", type: "number" },
  { key: "totalKg", label: "Total Kg.", type: "number" },
  { key: "asPerDozWeight", label: "As. Per Doz Weight", type: "number" },
  { key: "loss", label: "Loss", type: "number" },
];

const formatDate = (value) => {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;
  return `${day}/${month}/${year}`;
};

const createRow = (id) => ({
  id,
  date: "",
  invoiceId: "",
  party: "",
  cartoonNo: "",
  acDozWeight: "",
  size: "",
  finish: "",
  box: "",
  pc: "",
  totalPc: "",
  scrap: "",
  labour: "",
  rsKg: "",
  boxWeight: "",
  boxWeightAccDozWeight: "",
  billCalDozWeight: "",
  ratePc: "",
  totalRs: "",
  totalKg: "",
  asPerDozWeight: "",
  loss: "",
});

const PackingInvoice = () => {
  const [rows, setRows] = useState(initialRows);
  const [savedRows, setSavedRows] = useState(initialRows);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [selectedCell, setSelectedCell] = useState(null);
  const [editingCell, setEditingCell] = useState(null);

  const todayIso = new Date().toISOString().split("T")[0];

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesSearch =
        !searchQuery ||
        row.invoiceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.party.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.size.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.finish.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = !typeFilter || row.finish === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [rows, searchQuery, typeFilter]);

  const stats = useMemo(() => {
    return {
      todaysInvoices: rows.filter((row) => row.date === todayIso).length,
      totalInvoices: rows.filter((row) => row.invoiceId).length,
    };
  }, [rows, todayIso]);

  const hasChanges = useMemo(
    () => JSON.stringify(rows) !== JSON.stringify(savedRows),
    [rows, savedRows],
  );

  const updateCell = (rowId, key, value) => {
    setRows((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, [key]: value } : row)),
    );
  };

  const handleAddRow = () => {
    setRows((prev) => [...prev, createRow(Date.now())]);
  };

  const handleSaveAll = () => {
    setSavedRows(rows);
  };

  const handleRefresh = () => {
    setRows(savedRows);
    setSelectedCell(null);
    setEditingCell(null);
  };

  const handleCellClick = (cellId) => {
    if (editingCell === cellId) return;
    if (selectedCell === cellId) {
      setEditingCell(cellId);
      return;
    }
    setSelectedCell(cellId);
    setEditingCell(null);
  };

  const handleCellBlur = (cellId) => {
    setEditingCell(null);
    setSelectedCell(cellId);
  };

  const handleLastCellTab = (event, rowIndex, colIndex, totalRows) => {
    if (
      event.key === "Tab" &&
      !event.shiftKey &&
      rowIndex === totalRows - 1 &&
      colIndex === columns.length - 1
    ) {
      event.preventDefault();
      setRows((prev) => [...prev, createRow(Date.now())]);
      setEditingCell(null);
    }
  };

  const renderCellValue = (row, col) => {
    if (col.key === "date") {
      return row.date ? (
        formatDate(row.date)
      ) : (
        <span className="inline-flex items-center justify-center text-gray-500">
          <Calendar className="w-4 h-4" />
        </span>
      );
    }
    return row[col.key] || "";
  };

  const renderEditableCell = (
    row,
    col,
    rowIndex,
    colIndex,
    totalRows,
    cellId,
    autoFocusEnabled = true,
  ) => {
    if (col.type === "date") {
      return (
        <input
          autoFocus={autoFocusEnabled}
          type="date"
          value={row.date}
          onChange={(e) => updateCell(row.id, col.key, e.target.value)}
          onKeyDown={(e) => handleLastCellTab(e, rowIndex, colIndex, totalRows)}
          onBlur={() => handleCellBlur(cellId)}
          className="w-full bg-transparent text-center text-sm focus:outline-none"
        />
      );
    }

    if (col.type === "party-select") {
      return (
        <select
          autoFocus={autoFocusEnabled}
          value={row[col.key]}
          onChange={(e) => updateCell(row.id, col.key, e.target.value)}
          onKeyDown={(e) => handleLastCellTab(e, rowIndex, colIndex, totalRows)}
          onBlur={() => handleCellBlur(cellId)}
          className="w-full bg-transparent text-center text-sm focus:outline-none"
        >
          <option value="">Select Party Name</option>
          {partyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    if (col.type === "size-select") {
      return (
        <select
          autoFocus={autoFocusEnabled}
          value={row[col.key]}
          onChange={(e) => updateCell(row.id, col.key, e.target.value)}
          onKeyDown={(e) => handleLastCellTab(e, rowIndex, colIndex, totalRows)}
          onBlur={() => handleCellBlur(cellId)}
          className="w-full bg-transparent text-center text-sm focus:outline-none"
        >
          <option value="">Select Size</option>
          {sizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        autoFocus={autoFocusEnabled}
        type={col.type === "number" ? "number" : "text"}
        step={col.type === "number" ? "any" : undefined}
        value={row[col.key]}
        onChange={(e) => updateCell(row.id, col.key, e.target.value)}
        onKeyDown={(e) => handleLastCellTab(e, rowIndex, colIndex, totalRows)}
        onBlur={() => handleCellBlur(cellId)}
        className="w-full bg-transparent text-center text-sm focus:outline-none"
      />
    );
  };

  return (
    <SidebarLayout>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="Packing Invoice"
          description="Add packing Invoice and other details"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-4">
          <StatsCard label="Today's Invoices" value={stats.todaysInvoices} />
          <StatsCard label="Total Invoice" value={stats.totalInvoices} />
        </div>

        <SearchFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          filterOptions={["Type"]}
          filterPlaceholder="Type"
        />

        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <div className="max-h-[460px] overflow-auto scrollbar-thin">
            <table className="min-w-[1400px] w-full">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={`sticky top-0 z-10 whitespace-nowrap px-6 py-4 text-center text-sm font-[550] text-gray-900 border-r border-gray-200 bg-gray-100 ${
                        col.key === "size" ? "min-w-[220px]" : "min-w-[90px]"
                      }`}
                    >
                      {col.label}
                    </th>
                  ))}
                  <th className="sticky top-0 z-10 whitespace-nowrap px-3 py-4 text-center text-sm font-[550] text-gray-900 bg-gray-100 w-[60px] border-r border-gray-200">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, rowIndex) => (
                  <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50">
                    {columns.map((col, colIndex) => {
                      const cellId = `${row.id}-${col.key}`;
                      const isSelected = selectedCell === cellId;
                      const isEditing = editingCell === cellId;
                      const isAlwaysDropdown =
                        col.type === "party-select" || col.type === "size-select";
                      return (
                        <td
                          key={cellId}
                          onClick={() => handleCellClick(cellId)}
                          className={`h-10 px-2 py-1 text-center border-r border-gray-200 cursor-pointer ${
                            col.key === "size" ? "min-w-[220px]" : "min-w-[90px]"
                          } ${isSelected ? "ring-2 ring-gray-400 ring-inset" : ""}`}
                        >
                          {isEditing || isAlwaysDropdown
                            ? renderEditableCell(
                                row,
                                col,
                                rowIndex,
                                colIndex,
                                filteredRows.length,
                                cellId,
                                isEditing,
                              )
                            : renderCellValue(row, col)}
                        </td>
                      );
                    })}
                    <td className="h-12 px-3 py-1 text-center">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 px-3 py-1 text-sm border border-gray-300 rounded bg-gray-100 hover:bg-gray-200"
                      >
                        Download
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs text-gray-500 text-right mb-2">
            Press Tab on last cell to add a new row.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleSaveAll}
              disabled={!hasChanges}
              className={`px-10 py-2 rounded-lg transition text-sm font-medium ${
                hasChanges
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleAddRow}
              className="flex items-center gap-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Row
            </button>
            <button
              type="button"
              onClick={handleRefresh}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default PackingInvoice;
