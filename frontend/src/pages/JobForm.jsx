import { useState } from "react";
import css from "./JobForm.module.css";
import { createJob } from "../services/jobApi";
const JobForm = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setError] = useState({});
  const [message, setMessage] = useState("");
  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Job title is required";
    } else if (title.length < 3) {
      newErrors.title = "Job title must be at least 3 characters long";
    }
    if (!company.trim()) {
      newErrors.company = "Company name is required";
    }
    if (!location.trim()) {
      newErrors.location = "Location is required";
    }
    if (!salary) {
      newErrors.salary = "Salary is required";
    } else if (isNaN(Number(salary)) || salary <= 0) {
      newErrors.salary = "Please enter a valid salary amount";
    }
    if (!description.trim()) {
      newErrors.description = "Job description is required";
    } else if (description.length < 50) {
      newErrors.description =
        "Job description must be at least 50 characters long";
    }
    return newErrors;
  };

  const clearFieldError = (field) => {
    if (errors[field]) {
      setError((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleJobData = async (e) => {
    e.preventDefault();
    const newErros = validateForm();
    if (Object.keys(newErros).length > 0) {
      setError(newErros);

      return;
    }
    try {
      const jobData = {
        title,
        company,
        location,
        salary: Number(salary),
        description,
      };
      const response = await createJob(jobData);
      setMessage(response.message);
    } catch (err) {
      if (err.type === "auth") {
        setMessage(err.message);
      } else {
        setMessage(err.response?.data?.message);
      }
    }

    setTitle("");
    setCompany("");
    setLocation("");
    setSalary("");
    setDescription("");
  };

  return (
    <div className={css.formOverlay}>
      <div className={css.formContainer}>
        <div className={css.formHeader}>
          <h2>"Post new Job"</h2>
          <button className={css.closeBtn} type="button">
            ×
          </button>

          {message && (
            <div
              style={{
                padding: "10px",
                margin: "10px 0",
                backgroundColor: message.includes("successfully")
                  ? "lightgreen"
                  : "lightcoral",
                borderRadius: "5px",
              }}
            >
              {message}
            </div>
          )}
        </div>
        <form className={css.JobForm} onSubmit={handleJobData}>
          <div className={css.formGroup}>
            <label htmlFor="title">Job Title</label>
            <input
              className={errors.title && css.errorInput}
              type="text"
              id="title"
              placeholder="e.g., Frontend Developer"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                clearFieldError("title");
              }}
            />
            {errors.title && (
              <div className={css.fieldError}>{errors.title}</div>
            )}
          </div>
          <div className={css.formGroup}>
            <label htmlFor="company">Company</label>
            <input
              className={errors.company && css.errorInput}
              type="text"
              id="company"
              placeholder="e.g., Tech Corp"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                clearFieldError("company");
              }}
            />
            {errors.company && (
              <div className={css.fieldError}>{errors.company}</div>
            )}
          </div>

          <div className={css.formGroup}>
            <label htmlFor="location">Location</label>
            <input
              className={errors.location && css.errorInput}
              type="text"
              id="location"
              placeholder="e.g., Banglore, B"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                clearFieldError("location");
              }}
            />
            {errors.location && (
              <div className={css.fieldError}>{errors.location}</div>
            )}
          </div>

          <div className={css.formGroup}>
            <label htmlFor="salary">Annual Salary(INR)</label>
            <input
              className={errors.salary && css.errorInput}
              type="text"
              id="salary"
              placeholder="e.g., 75000"
              value={salary}
              onChange={(e) => {
                setSalary(e.target.value);
                clearFieldError("salary");
              }}
            />
            {errors.salary && (
              <div className={css.fieldError}>{errors.salary}</div>
            )}
          </div>
          <div className={css.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              className={errors.description && css.errorInput}
              type="text"
              id="description"
              placeholder="Describe the job requirements, responsibilities, and qualifications..."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                clearFieldError("description");
              }}
            />
            {errors.description && (
              <div className={css.fieldError}>{errors.description}</div>
            )}
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
