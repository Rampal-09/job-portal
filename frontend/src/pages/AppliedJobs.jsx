import { useEffect } from "react";
import { getAppliedJob } from "../services/jobApi";
import { useState } from "react";
import JobCard from "./JobCard";
import { useAuth } from "../context/AuthContext";

import style from "./Applied.module.css";
const AppliedJobs = () => {
  const { user: currentUser } = useAuth();
  const [appliedjobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const handleApplyJob = async (jobId) => {
    if (appliedjobs.includes(jobId)) {
      alert("You already applied for this job!");
      return;
    }
    try {
      const response = await applyJob(jobId);
      setAppliedJobs((prev) => [...prev, jobId]);
      alert("Successfully applied for the job!");
    } catch (err) {
      console.error("Apply job error:", err);
      alert(err.message || "Failed to apply for the job");
    }
  };

  const fetchAppliedJobs = async () => {
    try {
      const response = await getAppliedJob();
      setAppliedJobs(response.appliedJobs);
    } catch (err) {}
  };
  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1>applied Jobs</h1>
        <p className={style.subtitle}>
          track all the jobs you have applied for
        </p>
      </div>
      {appliedjobs.length === 0 ? (
        <div className={style.emptyState}>
          <div className={style.emptyBox}>
            <h3 className={style.emptyTitle}>No Applied Jobs</h3>
            <p className={style.emptyText}>
              You haven't applied for any jobs yet.
            </p>
          </div>
        </div>
      ) : (
        <div className={style.jobsGrid}>
          {appliedjobs.map((job) => (
            <div className={style.jobItem} key={job._id}>
              <JobCard
                job={job}
                userRole={currentUser?.role}
                isApplied={true}
                userId={currentUser?.id}
                onApply={handleApplyJob}
              ></JobCard>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
