import { useEffect, useState } from "react";
import {
  getFavoriteJobs,
  removeFavoriteJob,
  getAppliedJob,
  applyJob,
} from "../services/jobApi";
import JobCard from "./JobCard";
import styles from "./favoriteJobs.module.css";

const FavoriteJobs = () => {
  const [favoriteJobs, setFavoriteJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  useEffect(() => {
    fetchFavoriteJobs();
    fetchAppliedJobs();
  }, []);

  const fetchFavoriteJobs = async () => {
    try {
      const response = await getFavoriteJobs();

      setFavoriteJobs(response.favorite);
    } catch (err) {
      console.error("Error fetching favorite jobs:", err);
    }
  };

  const fetchAppliedJobs = async () => {
    try {
      const response = await getAppliedJob();
      setAppliedJobs(response.appliedJobs.map((job) => job._id));
    } catch (err) {
      console.error("Error fetching applied jobs:", err);
    }
  };

  const handleApply = async (jobId) => {
    try {
      await applyJob(jobId);
      setAppliedJobs((prev) => [...prev, jobId]);
      alert("Applied successfully!");
    } catch (err) {
      console.error("Error applying to job:", err);
      alert("Failed to apply.");
    }
  };
  const handleRemoveFavorite = async (JobId) => {
    try {
      const response = await removeFavoriteJob(JobId);

      setFavoriteJobs(response.favorite);
    } catch (err) {
      console.error("Error removing favorite job:", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Favorite Jobs</h1>
        <p className={styles.subtitle}>Jobs you have saved for later</p>
      </div>

      {favoriteJobs.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyBox}>
            <h3 className={styles.emptyTitle}>No Favorite Jobs</h3>
            <p className={styles.emptyText}>
              You haven't added any jobs to your favorites yet.
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.jobsGrid}>
          {favoriteJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onApply={handleApply}
              userRole="candidate"
              onRemoveFavorite={handleRemoveFavorite}
              isApplied={appliedJobs.includes(job._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteJobs;
