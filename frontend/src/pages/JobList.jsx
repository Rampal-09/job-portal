import { useEffect, useState } from "react";
import { getJobs } from "../services/jobApi";
import styles from "./jobList.module.css";
import JobCard from "./JobCard";
import { getCurrentUser } from "../services/jobApi";
import EditJobModal from "../pages/EditJobModal";
import { updateJob } from "../services/jobApi";
// import job from "../../../backend/models/job";
import { DeleteJob } from "../services/jobApi";
import { applyJob } from "../services/jobApi";
import { getAppliedJob } from "../services/jobApi";
import { addToFavoite } from "../services/jobApi";
import { useAuth } from "../context/AuthContext";
// import { getAppliedJob } from "../../../backend/controllers/jobController";

const JobList = ({ search, searchTrigger }) => {
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const { user: currentUser } = useAuth();
  const [appliedJobs, setAppliedJobs] = useState([]);

  const [editingJob, setEditingJob] = useState(null);
  const [isEditModelOpen, setIsEditModelOpen] = useState(false);
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");

  const [location, setLocation] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  const fetchAppliedJobs = async () => {
    try {
      const response = await getAppliedJob();
      const jobIds = response.appliedJobs?.map((job) => job._id) || [];
      setAppliedJobs(jobIds);
    } catch (error) {
      console.error("Failed to fetch applied jobs:", error);
      setAppliedJobs([]);
    }
  };

  useEffect(() => {
    if (currentUser?.role === "candidate") {
      fetchAppliedJobs();
    }
  }, [currentUser]);

  const handleApplyJob = async (jobId) => {
    if (appliedJobs.includes(jobId)) {
      alert("You already applied for this job!");
    }
    try {
      const response = await applyJob(jobId);
      setAppliedJobs((prev) => [...prev, jobId]);
      alert("Successfully applied for the job!");
    } catch (err) {
      console.error("Apply job error:", err);
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
      setAllJobs((prevJobs) =>
        prevJobs.filter((job) => job._id !== data.job._id)
      );
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== data.job._id));
    } catch (err) {}
  };

  const handleUpdateJob = async (updatedJobData) => {
    try {
      const data = await updateJob(editingJob._id, updatedJobData);
      setAllJobs((prevJobs) =>
        prevJobs.map((job) => (job._id === editingJob._id ? data.job : job))
      );
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
        const params = {};
        if (search) {
          params.search = search;
        }

        const jobData = await getJobs(params);
        setAllJobs(jobData.jobs);
        setJobs(jobData.jobs);
      } catch (err) {}
    };
    fetchJobs();
  }, [searchTrigger]);

  const handleApplyFilters = () => {
    let filteredJobs = [...allJobs];
    if (location.trim()) {
      filteredJobs = filteredJobs.filter((job) =>
        job.location?.includes(location.toLowerCase())
      );
    }
    if (minSalary) {
      filteredJobs = filteredJobs.filter(
        (job) => job.salary >= parseInt(minSalary)
      );
    }

    if (maxSalary) {
      filteredJobs = filteredJobs.filter(
        (job) => job.salary <= parseInt(maxSalary)
      );
    }

    if (jobType) {
      filteredJobs = filteredJobs.filter(
        (job) => job.jobType?.toLowerCase() === jobType.toLowerCase()
      );
    }

    if (experience) {
      filteredJobs = filteredJobs.filter((job) =>
        job.experience?.toLowerCase().includes(experience.toLowerCase())
      );
    }

    setJobs(filteredJobs);
  };

  const clearFilters = () => {
    setLocation("");
    setMinSalary("");
    setMaxSalary("");
    setJobType("");
    setExperience("");
    setJobs(allJobs);
  };

  return (
    <div className={styles.jobListContainer}>
      <div className={styles.sideBar}>
        <div className={styles.filterHeader}>
          <h3>Search and Filters</h3>
        </div>

        <div className={styles.filterGroup}>
          <input
            type="text"
            placeholder="Location"
            className={styles.filterInput}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Salary Range</label>
          <div className={styles.salaryInputs}>
            <input
              type="number"
              placeholder="Min Salary"
              className={styles.filterInput}
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Salary"
              className={styles.filterInput}
              value={maxSalary}
              onChange={(e) => setMaxSalary(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Job Type</label>
          <select
            className={styles.filterSelect}
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
            <option value="remote">Remote</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Experience Level</label>
          <select
            className={styles.filterSelect}
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          >
            <option value="">All Levels</option>
            <option value="entry">Entry Level</option>
            <option value="mid">Mid Level</option>
            <option value="senior">Senior Level</option>
            <option value="lead">Lead/Manager</option>
          </select>
        </div>

        <div className={styles.resultsCount}></div>
        <button className={styles.applyBtn} onClick={handleApplyFilters}>
          Apply Filters
        </button>
        <p>{jobs.length} jobs found</p>
      </div>

      <div className={styles.jobsContainer}>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard
              job={job}
              key={job?._id}
              userRole={currentUser?.role}
              userId={currentUser?.id}
              onEdit={handleEditJob}
              onDelete={handleDelteJob}
              onApply={handleApplyJob}
              onFavorite={handleFavoriteJob}
              appliedJobs={appliedJobs}
              isApplied={appliedJobs.includes(job._id)}
            />
          ))
        ) : (
          <div className={styles.noResults}>
            <p>No jobs found matching your criteria.</p>
            <button className={styles.clearBtn} onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {isEditModelOpen && (
        <EditJobModal
          job={editingJob}
          isOpen={isEditModelOpen}
          onClose={() => {
            setIsEditModelOpen(false);
            setEditingJob(null);
          }}
          onSave={handleUpdateJob}
        />
      )}
    </div>
  );
};

export default JobList;
