import { useEffect, useState } from "react";
import { getJobs } from "../services/jobApi";

import JobCard from "./JobCard";
import { getCurrentUser } from "../services/jobApi";
import EditJobModal from "../pages/EditJobModal";
import { updateJob } from "../services/jobApi";
// import job from "../../../backend/models/job";
import { DeleteJob } from "../services/jobApi";
import { applyJob } from "../services/jobApi";

import { addToFavoite } from "../services/jobApi";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [isEditModelOpen, setIsEditModelOpen] = useState(false);

  const handleApplyJob = async (jobId) => {
    try {
      const response = await applyJob(jobId);
      alert("Successfully applied for the job!");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleFavoriteJob = async (jobId) => {
    try {
      const response = await addToFavoite(jobId);
      alert("Job added to favorites!");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setIsEditModelOpen(true);
  };

  const handleDelteJob = async (deleteId) => {
    try {
      const data = await DeleteJob(deleteId);

      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== data.job._id));
    } catch (err) {}
  };

  const handleUpdateJob = async (updatedJobData) => {
    try {
      const data = await updateJob(editingJob._id, updatedJobData);

      setJobs((prevJobs) =>
        prevJobs.map((job) => (job._id === editingJob._id ? data.job : job))
      );

      setIsEditModelOpen(false);
      setEditingJob(null);
    } catch (err) {}
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const [jobData, userData] = await Promise.all([
          getJobs(),
          getCurrentUser(),
        ]);

        setJobs(jobData.jobs);
        setCurrentUser(userData?.user);
      } catch (err) {}
    };
    fetchJobs();
  }, []);

  return (
    <>
      {jobs.map((job) => (
        <JobCard
          job={job}
          key={job?._id}
          userRole={currentUser?.role}
          userId={currentUser?.id}
          onEdit={handleEditJob}
          onDelete={handleDelteJob}
          onApply={handleApplyJob}
          onFavorite={handleFavoriteJob}
        ></JobCard>
      ))}
      {isEditModelOpen && (
        <EditJobModal
          job={editingJob}
          isOpen={isEditModelOpen}
          onClose={() => {
            setIsEditModelOpen(false);
            setEditingJob(null);
          }}
          onSave={handleUpdateJob}
        ></EditJobModal>
      )}
    </>
  );
};

export default JobList;
