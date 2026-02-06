import React from "react";
import { X } from "lucide-react";
import FormInput from "../FormInput";

const PackingCard = ({ 
  item, 
  index, 
  onChange, 
  onRemove, 
  canRemove 
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 relative">
      {/* Packing Number and Remove Button */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">Packing #{index + 1}</span>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-gray-400 hover:text-red-500 transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="Item No."
          name={`packingItemNo_${index}`}
          value={item.packingItemNo || ""}
          onChange={(e) => onChange(index, e)}
          placeholder="01"
        />
        <FormInput
          label="Description"
          name={`packingDescription_${index}`}
          value={item.packingDescription || ""}
          onChange={(e) => onChange(index, e)}
          placeholder="FNESPBL 10-32 X 5/16 A/F E.S.P Hex Nut"
        />
        <FormInput
          label="Total Qty (Pcs)"
          name={`totalQtyPcs_${index}`}
          value={item.totalQtyPcs || ""}
          onChange={(e) => onChange(index, e)}
          placeholder="1232"
        />
        <FormInput
          label="Qty In Each Carton"
          name={`qtyInEachCarton_${index}`}
          value={item.qtyInEachCarton || ""}
          onChange={(e) => onChange(index, e)}
          placeholder="22"
        />
        <FormInput
          label="No. of Carton"
          name={`noOfCarton_${index}`}
          value={item.noOfCarton || ""}
          onChange={(e) => onChange(index, e)}
          placeholder="56"
        />
        <FormInput
          label="Gross Weight"
          name={`grossWeight_${index}`}
          value={item.grossWeight || ""}
          onChange={(e) => onChange(index, e)}
          placeholder="186.000kg"
        />
        <FormInput
          label="Net Weight"
          name={`netWeight_${index}`}
          value={item.netWeight || ""}
          onChange={(e) => onChange(index, e)}
          placeholder="136.500kg"
        />
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <FormInput
              label="Total Carton With"
              name={`totalCartonWith_${index}`}
              value={item.totalCartonWith || ""}
              onChange={(e) => onChange(index, e)}
              placeholder="56"
            />
          </div>
          <div className="flex-1">
            <FormInput
              label="Wooden Pallet"
              name={`woodenPallet_${index}`}
              value={item.woodenPallet || ""}
              onChange={(e) => onChange(index, e)}
              placeholder="02"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackingCard;

