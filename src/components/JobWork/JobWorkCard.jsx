import React, { useState } from "react";
import { SquarePen, Trash2, Printer, ChevronDown, CircleCheck } from "lucide-react";

const JobWorkCard = ({
  job,
  onEdit,
  onDelete,
  onCompletionChange,
  onInHouseChange,
  onReturnRecord,
}) => {
  const [isCompletionOpen, setIsCompletionOpen] = useState(false);
  const [isInHouseOpen, setIsInHouseOpen] = useState(false);

  const completionValue = job.completionStatus || "Complete";
  const inHouseValue = job.inHouseStatus || "In-House";

  const completionColorClass = {
    Complete: "bg-[#D1FFE2] ",
    Pending: "bg-[#fde68a]",
    Reject: "bg-[#fecaca] ",
  }[completionValue];

  return (
    <div className="border-1 border-gray-200 rounded-xl bg-white p-4">
      <div className=" border-gray-200">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-4  text-black">
              <span>{job.jobId}</span>
              <button type="button" onClick={onEdit} aria-label="Edit job work">
                <SquarePen className="w-4 h-4 text-gray-600" />
              </button>
              
              <button type="button" onClick={onDelete} aria-label="Delete job work">
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-2   mt-1">
              <p className="text-gray-500">{job.partyName}</p>
              <p className="p-0.5 rounded-full bg-black"></p>
              <p className="text-gray-500">Finish :<span className="!text-black"> {job.finish}</span></p>
              <p className="p-0.5 rounded-full bg-black"></p>
             <p className="text-gray-500">Sticker Qty :- <span className="!text-black"> {job.stickerQty}</span></p> 
            </div>
          </div>
          <div className="text-right  text-gray-500">
            <p>Date : {job.date}</p>
            <p>Time : {job.time}</p>
          </div>
        </div>
      </div>

      <div className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-1 border-gray-200 rounded-xl bg-white p-4">
            <div className="flex items-center justify-between mb-3">
              <p className=" text-black text-lg font-medium">Items</p>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-3 py-1 text-[15px]  border border-gray-300 rounded-md text-black cursor-pointer"
              >
                Print <Printer className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-3 text-sm text-gray-500 mb-2">
              <p>Sizes</p>
              <p className="text-center">Element</p>
              <p className="text-right">Kg.</p>
            </div>
            <div className="grid grid-cols-3  text-sm text-gray-700">
              <p className="text-left ">{job.itemSize}</p>
              <p className="text-center">{job.itemElement}</p>
              <p className="text-right">{job.itemKg}</p>
            </div>
          </div>

          <div className="border-1 border-gray-200 rounded-xl bg-white p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-black text-lg font-medium">Return</p>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-3 py-1  text-[15px]  border border-gray-300 rounded-md text-black  cursor-pointer"
              >
                Print <Printer className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-3  text-sm text-gray-500 mb-1">
              <p>Element</p>
              <p className="text-center">Return Kg.</p>
              <p className="text-right">Ghati</p>
            </div>
            <div className="grid grid-cols-3 text-sm  text-gray-700">
              <p>{job.returnElement}</p>
              <p className="text-center">{job.returnKg}</p>
              <p className="text-right">{job.ghati}</p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap items-center text-sm gap-3 ">
            <div className="relative min-w-[120px]">
              <button
                type="button"
                onClick={() => {
                  setIsCompletionOpen((prev) => !prev);
                  setIsInHouseOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2 rounded-md transition text-black ${completionColorClass}`}
              >
                <span>{completionValue}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isCompletionOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isCompletionOpen && (
                <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                  {["Complete", "Pending", "Reject"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        onCompletionChange?.(option);
                        setIsCompletionOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition text-black`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative min-w-[120px]">
              <button
                type="button"
                onClick={() => {
                  setIsInHouseOpen((prev) => !prev);
                  setIsCompletionOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md bg-white transition"
              >
                <span className="text-black font-medium">{inHouseValue}</span>
                <ChevronDown
                  className={`w-4 h-4 text-black transition-transform ${isInHouseOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isInHouseOpen && (
                <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                  {["In-House", "Outside"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        onInHouseChange?.(option);
                        setIsInHouseOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition text-black font-medium"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onReturnRecord}
              className=" px-5 py-2 rounded-md bg-[#b9d8e9] text-black font-medium inline-flex items-center gap-2"
            >
              Return Record <CircleCheck className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobWorkCard;
