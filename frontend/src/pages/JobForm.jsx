import css from "./JobForm.module.css";

const JobForm = () => {
  return (
    <div className={css.formOverlay}>
      <div className={css.formContainer}>
        <div className={css.formHeader}>
          <h2>"Post new Job"</h2>
          <button className={css.closeBtn} type="button">
            ×
          </button>
        </div>
        <form className={css.JobForm}>
          <div className={css.formGroup}>
            <label htmlFor="title">Job Title</label>
            <input
              type="text"
              id="title"
              placeholder="e.g., Frontend Developer"
            />
          </div>
          <div className={css.formGroup}>
            <label htmlFor="company">Compancy</label>
            <input type="text" id="company" placeholder="e.g., Tech Corp" />
          </div>
          <div className={css.formRow}>
            <div className={css.formGroup}>
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                placeholder="e.g., Banglore, B"
              />
            </div>
          </div>
          <div className={css.formGroup}>
            <label htmlFor="salary">Annual Salary(INR)</label>
            <input type="text" id="salary" placeholder="e.g., 75000" />
          </div>
          <div className={css.formGroup}>
            <label htmlFor="description">description</label>
            <textarea
              type="text"
              id="description"
              placeholder="Describe the job requirements, responsibilities, and qualifications..."
            />
          </div>
          <div className={css.formActions}>
            <button type="button" className={css.cancelBtn}>
              cancel
            </button>
            <button type="submit" className={css.submitBtn}>
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
