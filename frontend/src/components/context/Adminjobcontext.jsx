import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const AdminJobContext = createContext();

export const AdminJobProvider = ({ children }) => {
  const [ajob, setajob] = useState(null);
  const fetchJobs = async () => {
      try {
        const response = await axios.get("https://pathforward-job-portal-backend.onrender.com/api/v1/job/getadminjobs",{withCredentials:true});
        setajob(response.data.jobs || []);
        // console.log(job);
        
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

  // Load data on mount
  useEffect(() => {
    

    fetchJobs();
  }, []);

  // Store in localStorage
  useEffect(() => {
    if (ajob) {
      localStorage.setItem("job", JSON.stringify(ajob));
    } else {
      localStorage.removeItem("job");
    }
  }, [ajob]);

  return (
    <AdminJobContext.Provider value={{ ajob, setajob,fetchJobs }}>
      {children}
    </AdminJobContext.Provider>
  );
};
