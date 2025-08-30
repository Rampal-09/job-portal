import { useEffect, useState } from "react";
import { getJobs } from "../services/jobApi";
import JobCard from "./JobCard";
import { getCurrentUser } from "../services/jobApi";
import EditJobModal from "../pages/EditJobModal";
import { updateJob } from "../services/jobApi";
// import job from "../../../backend/models/job";
import { DeleteJob } from "../services/jobApi";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [isEditModelOpen, setIsEditModelOpen] = useState(false);

  const handleEditJob = (job) => {
    setEditingJob(job);
    setIsEditModelOpen(true);
  };

  const handleDelteJob = async (deleteId) => {
    console.log("deleteId", deleteId);
    try {
      const data = await DeleteJob(deleteId);
      console.log("data", data);
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
      } catch (err) {
        console.log(err);
      }
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
