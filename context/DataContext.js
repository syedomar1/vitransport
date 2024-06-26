// context/DataContext.js

import React, { createContext, useState, useEffect } from 'react';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [apiData, setApiData] = useState(null);
  const [busRoutes, setBusRoutes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/data'); // Adjust URL as needed
      const data = await response.json();
      setApiData(data);
      setBusRoutes(data.busRoutes);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DataContext.Provider value={{ apiData, busRoutes }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
