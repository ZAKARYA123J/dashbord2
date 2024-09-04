"use client";
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [order, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/posts');
        setData(response.data);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3001/api/DateReserve');
        setOrders(response.data);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Handle errors
  const handleError = (error) => {
    if (error.response) {
      setError(`Failed to fetch data: ${error.response.statusText}`);
    } else if (error.request) {
      setError('No response received. Please try again later.');
    } else {
      setError('Failed to fetch data. Please try again later.');
    }
  };

  // Create new data
  const createData = async (newData) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/posts', newData);
      setData((prevData) => [...prevData, response.data]);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Update existing data
  const updateData = async (id, updatedData) => {
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:3001/api/posts/${id}`, updatedData);
      setData((prevData) =>
        prevData.map((item) => (item.id === id ? response.data : item))
      );
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Delete data
  const deleteData = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3001/api/posts/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Create new order
  const createOrder = async (newOrder) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/DateReserve', newOrder);
      setOrders((prevOrders) => [...prevOrders, response.data]);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Update existing order
  const updateOrder = async (id, updatedOrder) => {
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:3001/api/DateReserve/${id}`, updatedOrder);
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === id ? response.data : order))
      );
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Delete order
  const deleteOrder = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3001/api/DateReserve/${id}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        data,
        order, // Provide orders state
        loading,
        error,
        createData,
        updateData,
        deleteData,
        createOrder, // Provide order manipulation functions
        updateOrder,
        deleteOrder
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
