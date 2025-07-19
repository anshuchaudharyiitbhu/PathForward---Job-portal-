import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [job, setjob] = useState(null);

  // Load data on mount
  const fetchJobs = async () => {
    try {
      const response = await axios.get("https://pathforward-job-portal-backend.onrender.com/api/v1/job/get",{withCredentials:true});
      setjob(response.data.jobs || []);
      // console.log(job);
      
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  useEffect(() => {

    fetchJobs();
  }, []);

  // Store in localStorage
  useEffect(() => {
    if (job) {
      localStorage.setItem("job", JSON.stringify(job));
    } else {
      localStorage.removeItem("job");
    }
  }, [job]);

  return (
    <JobContext.Provider value={{ job, setjob,fetchJobs }}>
      {children}
    </JobContext.Provider>
  );
};
