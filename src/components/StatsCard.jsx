import React from "react";

const StatsCard = ({
  label,
  value,
  className = "",
  labelClassName = "",
  valueClassName = "",
}) => {
  return (
    <div
      className={`bg-white px-3 py-2 rounded-lg border border-gray-300 h-[110px] flex flex-col justify-between ${className}`.trim()}
    >
      <p className={`text-gray-500 ${labelClassName}`.trim()}>{label}</p>
      <p className={`text-2xl font-medium text-black ${valueClassName}`.trim()}>
        {value}
      </p>
    </div>
  );
};

export default StatsCard;
