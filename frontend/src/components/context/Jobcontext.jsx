import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [job, setJob] = useState(() => {
    const storedJobs = localStorage.getItem("job");
    return storedJobs ? JSON.parse(storedJobs) : [];
  });

  // Fetch jobs function
  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        "https://pathforward-job-portal-backend.onrender.com/api/v1/job/get",
        { withCredentials: true }
      );
      setJob(response.data.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Fetch jobs on initial load (even without login)
  useEffect(() => {
    fetchJobs();
  }, []);

  // Update localStorage whenever jobs change
  useEffect(() => {
    if (job) {
      localStorage.setItem("job", JSON.stringify(job));
    } else {
      localStorage.removeItem("job");
    }
  }, [job]);

  return (
    <JobContext.Provider value={{ job, setJob, fetchJobs }}>
      {children}
    </JobContext.Provider>
  );
};
