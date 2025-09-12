import { useState } from "react";
import css from "./JobCard.module.css";

const JobCard = ({
  job,
  userRole,
  userId,
  onEdit,
  onDelete,
  onApply,
  onFavorite,
  onRemoveFavorite,
  isApplied,
}) => {
  if (!job) return null;

  const [isExpanded, setIsExpended] = useState(false);
  const isOwner =
    userRole === "employer" && job.postedBy && job.postedBy._id === userId;

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);

      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        return "Today";
      } else if (diffDays === 1) {
        return "yesterDay";
      } else if (diffDays < 7) {
        return `${diffDays} days ago`;
      } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
      } else {
        return date.toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      }
    } catch (err) {
      return "Date unavailable";
    }
  };
  const formatExperienceLevel = (level) => {
    const levels = {
      entry: "Entry Level",
      mid: "Mid Level",
      senior: "Senior Level",
      lead: "Lead/Principal",
    };
    return levels[level] || level;
  };

  const formatJobType = (type) => {
    const types = {
      "full-time": "Full Time",
      "part-time": "Part Time",
      contract: "Contract",
      freelance: "Freelance",
      internship: "Internship",
      remote: "Remote",
    };
    return types[type] || type;
  };

  const handleEdit = () => {
    if (onEdit) onEdit(job);
  };

  const handleDelete = () => {
    onDelete(job._id);
  };
  const handleRemoveFavorite = () => {
    if (onRemoveFavorite) {
      onRemoveFavorite(job._id);
    }
  };

  const toggleDescription = () => {
    setIsExpended((prev) => !prev);
  };

  const words = job?.description.split("") || [];

  const sortdescription = words.slice(0, 280).join("");

  return (
    <div className={css.JobCard}>
      <div>
        <div className={css.jobHeader}>
          <h3 className={css.jobTittle}>{job?.title}</h3>
          <div className={css.salary}>{job?.salary}</div>
        </div>
      </div>
      <div className={css.companyInfo}>
        <span className={css.company}>{job?.company}</span>
        <span className={css.location}>{job?.location}</span>
      </div>
      <div className={css.jobMeta}>
        {job?.experienceLevel && (
          <div className={css.metaItem}>
            <span className={css.metaLabel}>Experience:</span>
            <span className={css.metaValue}>
              {formatExperienceLevel(job.experienceLevel)}
            </span>
          </div>
        )}

        {job?.jobType && (
          <div className={css.metaItem}>
            <span className={css.metaLabel}>Type:</span>
            <span className={css.jobTypeBadge}>
              {formatJobType(job.jobType)}
            </span>
          </div>
        )}
      </div>

      {job?.skills && job.skills.length > 0 && (
        <div className={css.skillsContainer}>
          <span className={css.skillsLabel}>Skills:</span>
          <div className={css.skillsList}>
            {job.skills.map((skill, index) => (
              <span key={index} className={css.skillTag}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      <p className={css.description}>
        {isExpanded
          ? job?.description
          : sortdescription + (words.length > 60 ? "..." : "")}
        {words.length > 60 && (
          <button className={css.seeMoreBtn} onClick={toggleDescription}>
            {isExpanded ? "See less" : "See more"}
          </button>
        )}
      </p>
      <div className={css.jobFooter}>
        <div className={css.postInfo}>
          <span className={css.postedBy}>{job?.postedBy?.name}</span>
          <span className={css.postedDate}>{formatDate(job?.createdAt)}</span>
        </div>
      </div>
      {isOwner && (
        <div className={css.jobActions}>
          <button className={css.editBtn} onClick={handleEdit}>
            Edit
          </button>
          <button className={css.deleteBtn} onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
      {userRole === "candidate" && (
        <div className={css.candidateActions}>
          <button className={css.applyBtn} onClick={() => onApply(job._id)}>
            {isApplied ? "Applied" : "Apply"}
          </button>
          {onFavorite && (
            <button className={css.saveBtn} onClick={() => onFavorite(job._id)}>
              Save
            </button>
          )}

          {onRemoveFavorite && (
            <button className={css.saveBtn} onClick={handleRemoveFavorite}>
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default JobCard;
