import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./context";
import { API_END_POINT } from "@/utilis/constant";

export const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  // const {user}=useContext(UserContext)
  const [company, setcompany] = useState([]);

  const fetchcompany = async () => {
    try {
      const response = await axios.get(
        `${API_END_POINT}/company/get`,
        { withCredentials: true }
      );
      // console.log("responce",response);

      setcompany(response.data.companies || []);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  // Load data on mount
  useEffect(() => {
    fetchcompany();
  }, []);

  // console.log("comapny in context",company);

  // Store in localStorage
  useEffect(() => {
    if (company) {
      localStorage.setItem("companies", JSON.stringify(company));
    } else {
      localStorage.removeItem("companies");
    }
  }, [company]);

  return (
    <CompanyContext.Provider value={{ company, setcompany, fetchcompany }}>
      {children}
    </CompanyContext.Provider>
  );
};
