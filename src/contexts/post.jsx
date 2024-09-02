"use client"
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/posts');
        setData(response.data);
      } catch (error) {
        if (error.response) {
          setError(`Failed to fetch data: ${error.response.statusText}`);
        } else if (error.request) {
          setError('No response received. Please try again later.');
        } else {
          setError('Failed to fetch data. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};
