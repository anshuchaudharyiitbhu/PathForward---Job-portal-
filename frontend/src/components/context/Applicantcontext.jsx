import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const AdminJobContext = createContext();

export const AdminJobProvider = ({ children }) => {
  const [ajob, setajob] = useState(null);
  const fetchApplicants = async () => {
    try {
      const res = await axios.get(`https://pathforward-job-portal-backend.onrender.com/api/v1/job/get/${jobid}`, { withCredentials: true });
      if (res.data.success) {
        setApplications(res.data.job.applications || []);
      }
    } catch (err) {
      console.error("Error fetching applicants", err);
    }
  };

  // Load data on mount
  useEffect(() => {
      fetchApplicants();
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
