import "./App.css";
import styles from "./App.module.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/Login";
import JobForm from "./pages/JobForm";
import { FaSearch } from "react-icons/fa";
import JobList from "./pages/JobList";
import AppliedJobs from "./pages/AppliedJobs";
import FavoriteJobs from "./pages/FavoriteJobs";
import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import NotFound from "./pages/NotFound";

const Header = ({ search, setSearch, handleSearch }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = async () => {
    try {
      await logout();
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <section className={styles.section}>
        <div>
          get ready to discover the career you were meant for
          <strong> stay tuned</strong>
        </div>
      </section>

      <header className={styles.header}>
        <div className={styles.jobDataContainer}>
          <div className={styles.logoSection}>
            <Link to="/jobs" className={styles.logo}>
              <span className={styles.logoText}>jobPortal</span>
              <span className={styles.tagLine}>Find your Dream Job</span>
            </Link>
          </div>

          <nav className={styles.nav}>
            <ul className={styles.navList}>
              {isAuthenticated && user?.role === "employer" && (
                <li className={styles.navItem}>
                  <Link
                    to="/job-form"
                    className={`${styles.navLink} ${
                      location.pathname === "/job-form" ? styles.active : ""
                    }`}
                  >
                    Post Job
                  </Link>
                </li>
              )}

              <li className={styles.navItem}>
                <Link
                  to="/jobs"
                  className={`${styles.navLink} ${
                    location.pathname === "/jobs" ? styles.active : ""
                  }`}
                >
                  Job List
                </Link>
              </li>

              {isAuthenticated && user?.role === "candidate" && (
                <>
                  <li className={styles.navItem}>
                    <Link
                      to="/applied"
                      className={`${styles.navLink} ${
                        location.pathname === "/applied" ? styles.active : ""
                      }`}
                    >
                      Applied Jobs
                    </Link>
                  </li>
                  <li className={styles.navItem}>
                    <Link
                      to="/favorites"
                      className={`${styles.navLink} ${
                        location.pathname === "/favorites" ? styles.active : ""
                      }`}
                    >
                      Favorite Jobs
                    </Link>
                  </li>
                </>
              )}

              {!isAuthenticated ? (
                <>
                  <li className={styles.navItem}>
                    <Link
                      to="/signup"
                      className={`${styles.navLink} ${
                        location.pathname === "/signup" ? styles.active : ""
                      }`}
                    >
                      Signup
                    </Link>
                  </li>
                  <li className={styles.navItem}>
                    <Link
                      to="/login"
                      className={`${styles.navLink} ${
                        location.pathname === "/login" ? styles.active : ""
                      }`}
                    >
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <li className={styles.navItem}>
                  <div className={styles.userSection}>
                    <span className={styles.welcomeText}>
                      Welcome, {user?.name}!
                    </span>
                    <button
                      onClick={handleLogout}
                      className={`${styles.navLink} ${styles.logoutBtn}`}
                    >
                      Logout
                    </button>
                  </div>
                </li>
              )}
            </ul>
          </nav>
        </div>

        <div className={styles.jobSearchContainer}>
          <div className={styles.queryContainer}>
            <div className={styles.searchContainer}>
              <FaSearch className={styles.icon} />
              <input
                type="text"
                placeholder="Search Job title, Company, Skills"
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
              <Link to="/signup">register now</Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

const AppContent = () => {
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
    <>
      <Header
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        isJobFormOpen={isJobFormOpen}
        setIsJobFormOpen={setIsJobFormOpen}
      />

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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
