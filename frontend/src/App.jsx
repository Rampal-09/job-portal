import "./App.css";
import styles from "./App.module.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/Login";
import JobForm from "./pages/JobForm";
import { FaSearch } from "react-icons/fa";
import JobList from "./pages/JobList";
import AppliedJobs from "./pages/AppliedJobs";
import FavoriteJobs from "./pages/FavoriteJobs";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [isJobFormOpen, setIsJobFormOpen] = useState(false);

  const handleSearch = () => {
    setSearchTrigger(!searchTrigger);
  };
  const handleJobFormClose = () => {
    setIsJobFormOpen(false);
  };

  return (
    <Router>
      <section className={styles.section}>
        <div>
          get ready to discover the career you were weant for
          <strong>stay turned</strong>
        </div>
      </section>
      <header className={styles.header}>
        <div className={styles.jobDataContainer}>
          <div className={styles.logoSection}>
            <a href="#" className={styles.logo}>
              <span className={styles.logoText}>jobPortal</span>
              <span className={styles.tagLine}>Find your Dream Job</span>
            </a>
          </div>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <Link
                  to="job-form"
                  className={`${styles.navLink} ${
                    location.pathname === "/signup" ? styles.active : ""
                  }`}
                >
                  Post Job
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  to="jobs"
                  className={`${styles.navLink} ${
                    location.pathname === "/signup" ? styles.active : ""
                  }`}
                >
                  Job List
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  to="applied"
                  className={`${styles.navLink} ${
                    location.pathname === "/signup" ? styles.active : ""
                  }`}
                >
                  Applied Jobs
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  to="/favorites"
                  className={`${styles.navLink} ${
                    location.pathname === "/signup" ? styles.active : ""
                  }`}
                >
                  Favorite Jobs
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  to="/signup"
                  className={`${styles.navLink} ${
                    location.pathname === "/signup" ? styles.active : ""
                  }`}
                >
                  signup
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  to="login"
                  className={`${styles.navLink} ${
                    location.pathname === "/signup" ? styles.active : ""
                  }`}
                >
                  login
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.jobSearchContainer}>
          <div className={styles.queryContainer}>
            <div className={styles.searchContainer}>
              <FaSearch className={styles.icon} />
              <input
                type="text"
                placeholder="Search Job title,Company ,Skills"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className={styles.btn} onClick={handleSearch}>
              Search Job
            </button>
          </div>

          <div className={styles.registerInfo}>
            <span className={styles.span1}>are you a fresher</span>
            <span className={styles.span2}>
              looking for your first dream job
            </span>

            <div>
              <a href="/signup">register now</a>
            </div>
          </div>
        </div>
      </header>
      {isJobFormOpen && (
        <JobForm isOpen={isJobFormOpen} onClose={handleJobFormClose} />
      )}
      <Routes>
        <Route
          path="/"
          element={<JobList search={search} searchTrigger={searchTrigger} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/jobs"
          element={<JobList search={search} searchTrigger={searchTrigger} />}
        />
        <Route path="/job-form" element={<JobForm />} />
        <Route path="/applied" element={<AppliedJobs />} />
        <Route path="/favorites" element={<FavoriteJobs />} />
      </Routes>
    </Router>
  );
}

export default App;
