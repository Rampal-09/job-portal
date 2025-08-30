import { useEffect, useState } from "react";
import css from "./EditJobModal.module.css";

const EditJobModal = ({ job, onClose, isOpen, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave(formData);
    } catch (err) {}
  };

  useEffect(() => {
    if (job) {
      setFormData({
        title: job?.title,
        company: job?.company,
        location: job?.location,
        salary: job?.salary,
        description: job?.description,
      });
    }
  }, [job]);

  if (!isOpen) return null;

  return (
    <div className={css.modalOverlay} onClick={onClose}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={css.modalHeader}>
          <h2>Edit Job Posting</h2>
          <button className={css.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <form className={css.editForm} onSubmit={handleSubmit}>
          <div className={css.formGroup}>
            <label htmlFor="title">Job Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              required
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              required
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              required
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="salary">Salary</label>
            <input
              type="text"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={(e) =>
                setFormData({ ...formData, salary: e.target.value })
              }
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              required
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className={css.formActions}>
            <button type="button" className={css.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={css.saveBtn}>
              update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobModal;
