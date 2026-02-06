import React from "react";

const FormSection = ({ title, children, className = "", action }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {title && (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-normal text-black mt-2 ml-2">{title}</h1>
          </div>
          {action ? <div>{action}</div> : null}
        </div>
      )}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        {children}
      </div>
    </div>
  );
};

export default FormSection;

