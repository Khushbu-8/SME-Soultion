import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarLayout from "../components/SidebarLayout";
import SearchFilter from "../components/SearchFilter";
import ConfirmationDialog from "../components/ConfirmationDialog";
import JobWorkCard from "../components/JobWork/JobWorkCard";
import JobWorkReturnDialog from "../components/JobWork/JobWorkReturnDialog";

const JOB_WORK_STORAGE_KEY = "jobWorkCards";
const ORDER_JOB_OVERRIDES_KEY = "orderJobWorkOverrides";

const INITIAL_JOB_WORKS = [
  {
    id: 1,
    jobId: "Job ID - 001",
    partyName: "Ishita Industries To Maruti Brass",
    finish: "S.S + 16",
    stickerQty: "26",
    date: "03-11-2025",
    time: "13:15",
    itemSize: "6 X 1.1/8 X 5/32 - 3.600",
    itemElement: "2P",
    itemKg: "100Kg",
    returnElement: "2P",
    returnKg: "99.200Kg",
    ghati: "0.800",
    returnKgInput: "99.200",
    ghatiInput: "0.800",
    returnElementInput: "2",
    returnType: "Peti",
    status: "Completed",
    completionStatus: "Complete",
    inHouseStatus: "In-House",
  },
];

const readJsonStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
};

const writeJsonStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage write failures
  }
};

const JobWork = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [jobWorks, setJobWorks] = useState(() =>
    readJsonStorage(JOB_WORK_STORAGE_KEY, INITIAL_JOB_WORKS),
  );
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    mode: "edit",
    job: null,
  });
  const [deleteTarget, setDeleteTarget] = useState(null);

  const syncOrderOverrideFromJob = useCallback((job) => {
    if (!job) return;
    if (!job.sourceItemId && !job.sourceOrderId) return;
    const overrides = readJsonStorage(ORDER_JOB_OVERRIDES_KEY, {});
    const next = { ...overrides };
    const payload = {
      jobWork: job.inHouseStatus || "Job Work",
      jobWorkNo: job.jobId || "—",
      platingStatus: true,
    };
    if (job.sourceItemId) next[`item-${job.sourceItemId}`] = payload;
    if (job.sourceOrderId) next[`order-${job.sourceOrderId}`] = payload;
    writeJsonStorage(ORDER_JOB_OVERRIDES_KEY, next);
  }, []);

  useEffect(() => {
    const savedPayload = location.state?.savedJobWork;
    if (!savedPayload?.job) return;

    syncOrderOverrideFromJob(savedPayload.job);
    setJobWorks((prev) => {
      if (savedPayload.mode === "edit") {
        return prev.map((item) => (item.id === savedPayload.job.id ? savedPayload.job : item));
      }
      return [savedPayload.job, ...prev];
    });

    navigate(location.pathname, { replace: true, state: {} });
  }, [location.pathname, location.state, navigate, syncOrderOverrideFromJob]);

  useEffect(() => {
    writeJsonStorage(JOB_WORK_STORAGE_KEY, jobWorks);
  }, [jobWorks]);

  const filteredJobs = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return jobWorks.filter((job) => {
      const matchesSearch =
        !normalizedSearch ||
        job.jobId.toLowerCase().includes(normalizedSearch) ||
        job.partyName.toLowerCase().includes(normalizedSearch) ||
        job.itemSize.toLowerCase().includes(normalizedSearch);
      const matchesType =
        !typeFilter || job.status.toLowerCase().includes(typeFilter.toLowerCase());
      return matchesSearch && matchesType;
    });
  }, [jobWorks, searchTerm, typeFilter]);

  const handleOpenDialog = (job, mode) => {
    setDialogState({ isOpen: true, mode, job });
  };

  const handleCloseDialog = () => {
    setDialogState({ isOpen: false, mode: "edit", job: null });
  };

  const handleSaveDialog = (formData) => {
    if (!dialogState.job) return;

    setJobWorks((prev) =>
      prev.map((item) => {
        if (item.id !== dialogState.job.id) return item;

        const returnKgValue = formData.returnKg?.trim() || item.returnKgInput;
        const ghatiValue = formData.ghati?.trim() || item.ghatiInput;
        const elementValue = formData.returnElement?.trim() || item.returnElementInput;

        return {
          ...item,
          returnKgInput: returnKgValue,
          ghatiInput: ghatiValue,
          returnElementInput: elementValue,
          returnType: formData.returnType,
          returnKg: `${returnKgValue}Kg`,
          ghati: ghatiValue,
          returnElement: `${elementValue}${formData.returnType === "Peti" ? "P" : ""}`,
        };
      }),
    );

    handleCloseDialog();
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.sourceItemId || deleteTarget.sourceOrderId) {
      const overrides = readJsonStorage(ORDER_JOB_OVERRIDES_KEY, {});
      if (deleteTarget.sourceItemId) delete overrides[`item-${deleteTarget.sourceItemId}`];
      if (deleteTarget.sourceOrderId) delete overrides[`order-${deleteTarget.sourceOrderId}`];
      writeJsonStorage(ORDER_JOB_OVERRIDES_KEY, overrides);
    }
    setJobWorks((prev) => prev.filter((item) => item.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const handleStatusChange = (jobId, key, value) => {
    setJobWorks((prev) =>
      prev.map((item) => {
        if (item.id !== jobId) return item;
        const updatedItem = { ...item, [key]: value };
        if (key === "inHouseStatus") syncOrderOverrideFromJob(updatedItem);
        return updatedItem;
      }),
    );
  };

  return (
    <SidebarLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-3">
          <button
            type="button"
            onClick={() => navigate("/order")}
            className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-black transition"
            aria-label="Back to Order List"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Order List</span>
          </button>
        </div>
        <SearchFilter
          searchQuery={searchTerm}
          setSearchQuery={setSearchTerm}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          filterOptions={["Type", "Completed"]}
          filterPlaceholder="Type"
        />

        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <JobWorkCard
              key={job.id}
              job={job}
              onEdit={() => navigate("/job-work/move", { state: { mode: "edit", job } })}
              onReturnRecord={() => handleOpenDialog(job, "edit")}
              onDelete={() => setDeleteTarget(job)}
              onCompletionChange={(value) =>
                handleStatusChange(job.id, "completionStatus", value)
              }
              onInHouseChange={(value) =>
                handleStatusChange(job.id, "inHouseStatus", value)
              }
            />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <p className="mt-4 text-sm text-gray-500">No job work records found.</p>
        )}
      </div>

      <JobWorkReturnDialog
        isOpen={dialogState.isOpen}
        mode={dialogState.mode}
        initialData={dialogState.job}
        onClose={handleCloseDialog}
        onSave={handleSaveDialog}
      />

      <ConfirmationDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete Job Work"
        message={`Are you sure you want to delete ${deleteTarget?.jobId || "this record"}?`}
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </SidebarLayout>
  );
};

export default JobWork;
