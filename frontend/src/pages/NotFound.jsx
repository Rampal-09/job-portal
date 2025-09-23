// Fixed NotFound.js - CORRECTED: Fixed CSS class name typos
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.notFoundContent}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.errorTitle}>Page Not Found</h1>
        <p className={styles.errorMessage}>
          Oops! The page you're looking for doesn't exist. It might have been
          moved, deleted, or you entered the wrong URL.
        </p>
        <div className={styles.actionButtons}>
          <Link to="/jobs" className={styles.homeButton}>
            Go to Jobs
          </Link>
          <button onClick={handleGoBack} className={styles.backButton}>
            Go Back
          </button>
        </div>
        <div className={styles.helpfulLinks}>
          <h3>Helpful Links:</h3>
          <ul>
            <li>
              <Link to="/jobs">Browse Jobs</Link>
            </li>
            <li>
              <Link to="/job-form">Post a Job</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
