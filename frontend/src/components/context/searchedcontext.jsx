import { createContext, useState, useEffect } from "react";

export const SearchedContext = createContext();

export const SearchedProvider = ({ children }) => {
  // Load from localStorage if available
  const [searched, setsearched] = useState(null);

  

  return (
    <SearchedContext.Provider value={{ searched, setsearched }}>
      {children}
    </SearchedContext.Provider>
  );
};
