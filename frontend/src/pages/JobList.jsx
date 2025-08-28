import { useEffect, useState } from "react";
import { getJobs } from "../services/jobApi";
import JobCard from "./JobCard";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    console.log("allJobs", jobs);
  }, [jobs]);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        console.log("jobList", data.jobs);
        setJobs(data.jobs);
      } catch (err) {
        console.log(err);
      }
    };
    fetchJobs();
  }, []);

  return (
    <>
      {jobs.map((job) => (
        <JobCard job={job} key={job._id}></JobCard>
      ))}
    </>
  );
};

export default JobList;
