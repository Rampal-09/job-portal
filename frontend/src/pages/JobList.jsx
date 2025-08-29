import { useEffect, useState } from "react";
import { getJobs } from "../services/jobApi";
import JobCard from "./JobCard";
import { getCurrentUser } from "../services/jobApi";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    console.log("currentuser", currentUser);
  }, []);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const [jobData, userData] = await Promise.all([
          getJobs(),
          getCurrentUser(),
        ]);

        setJobs(jobData.jobs);
        setCurrentUser(userData?.user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchJobs();
  }, []);

  return (
    <>
      {jobs.map((job) => (
        <JobCard
          job={job}
          key={job._id}
          userRole={currentUser?.role}
          userId={currentUser?.id}
        ></JobCard>
      ))}
    </>
  );
};

export default JobList;
