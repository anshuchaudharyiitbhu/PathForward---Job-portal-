import { createContext, useState, useEffect } from "react";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  // Load from localStorage if available
  const [filter, setfilter] = useState(null);

  

  return (
    <FilterContext.Provider value={{ filter, setfilter }}>
      {children}
    </FilterContext.Provider>
  );
};
