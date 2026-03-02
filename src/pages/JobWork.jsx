import React, { useMemo, useState } from "react";
import SidebarLayout from "../components/SidebarLayout";
import SearchFilter from "../components/SearchFilter";
import ConfirmationDialog from "../components/ConfirmationDialog";
import JobWorkCard from "../components/JobWork/JobWorkCard";
import JobWorkReturnDialog from "../components/JobWork/JobWorkReturnDialog";

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

const JobWork = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [jobWorks, setJobWorks] = useState(INITIAL_JOB_WORKS);
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    mode: "edit",
    job: null,
  });
  const [deleteTarget, setDeleteTarget] = useState(null);

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
    setJobWorks((prev) => prev.filter((item) => item.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const handleStatusChange = (jobId, key, value) => {
    setJobWorks((prev) =>
      prev.map((item) => (item.id === jobId ? { ...item, [key]: value } : item)),
    );
  };

  return (
    <SidebarLayout>
      <div className="max-w-7xl mx-auto">
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
              onEdit={() => handleOpenDialog(job, "edit")}
              onView={() => handleOpenDialog(job, "view")}
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
