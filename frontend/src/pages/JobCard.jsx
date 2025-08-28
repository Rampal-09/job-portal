import css from "./JobCard.module.css";

const JobCard = ({ job }) => {
  console.log("job card", job);

  return (
    <div className={css.JobCard}>
      <div>
        <div className={css.jobHeader}>
          <h3 className={css.jobTittle}>{job.title}</h3>
          <div className={css.salary}>{job.salary}</div>
        </div>
      </div>
      <div className={css.companyInfo}>
        <span className={css.company}>{job.company}</span>
        <span className={css.location}>{job.location}</span>
      </div>
      <p className={css.description}>{job.description}</p>
      <div className={css.jobFooter}>
        <div className={css.postInfo}>
          <span className={css.postedBy}>{job.postedBy.name}</span>
          <span className={css.postedDate}>{job.createdAt}</span>
        </div>
      </div>

      <div className={css.jobActions}>
        <button className={css.editBtn}>Edit</button>
        <button className={css.deleteBtn}>Delete</button>
      </div>

      <div className={css.candidateActions}>
        <button className={css.applyBtn}>apply</button>
        <button className={css.saveBtn}>save</button>
      </div>
    </div>
  );
};

export default JobCard;
