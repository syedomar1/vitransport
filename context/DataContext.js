// context/dataContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [busRoutes, setBusRoutes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/data');
                const result = await response.json();
                setData(result.data);
                setBusRoutes(result.busRoutes);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ data, busRoutes, loading, error }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
