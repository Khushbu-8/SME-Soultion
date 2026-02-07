import React from "react";
import { X } from "lucide-react";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";

const ItemCard = ({
  item,
  index,
  onChange,
  onRemove,
  canRemove,
  readOnly = false,
  currencyOptions = [
    { value: "USD", label: "USD" },
    { value: "EUR", label: "Euro" },
  ],
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 relative">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">
          Item #{index + 1}
        </span>
        {canRemove && !readOnly && (
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
          name={`itemNo_${index}`}
          value={item.itemNo || ""}
          onChange={(e) => onChange(index, e)}
          placeholder="01"
          disabled={readOnly}
        />
        <FormInput
          label="Description"
          name={`itemDescription_${index}`}
          value={item.itemDescription || ""}
          onChange={(e) => onChange(index, e)}
          placeholder="FNESPBL 10-32 X 5/16 A/F E.S.P Hex Nut"
          disabled={readOnly}
        />
        <FormInput
          label="HS Code"
          name={`hsCode_${index}`}
          value={item.hsCode || ""}
          onChange={(e) => onChange(index, e)}
          placeholder="1001"
          disabled={readOnly}
        />
        <FormInput
          label="Qty (Pcs)"
          name={`itemQty_${index}`}
          value={item.itemQty || ""}
          onChange={(e) => onChange(index, e)}
          placeholder="1232"
          disabled={readOnly}
        />
        <div className="flex gap-2">
          <div className="">
            <FormInput
              label="Unit Price (USD)"
              name={`unitPrice_${index}`}
              value={item.unitPrice || ""}
              onChange={(e) => onChange(index, e)}
              placeholder="135.45"
              disabled={readOnly}
            />
          </div>
          <div className="relative w-26 ">
            <FormSelect
              label=""
              name={`currency_${index}`}
              value={item.currency || ""}
              onChange={(e) => onChange(index, e)}
              options={currencyOptions}
              defaultValue="EUR"
              showIcon
              iconText="â‚¬"
              disabled={readOnly}
            />
          </div>
        </div>
        <FormInput
          label="Currency Current Price"
          name={`currencyCurrentPrice_${index}`}
          value={item.currencyCurrentPrice || ""}
          onChange={(e) => onChange(index, e)}
          placeholder="91.10"
          disabled={readOnly}
        />
      </div>
    </div>
  );
};

export default ItemCard;
