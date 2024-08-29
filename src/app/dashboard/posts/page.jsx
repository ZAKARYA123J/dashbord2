"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

const DataTable = () => {
  const [data, setData] = useState([]); // Initial state as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      console.log('Starting API request...');
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'GET',
      });
  
      if (!response.ok) {
        const errorDetails = await response.text(); // Read the response body for more details
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}. Details: ${errorDetails}`);
      }
  
      const data = await response.json();
      console.log('API response received:', data);
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  
  
  useEffect(() => {
    fetchData();
  }, []);
  
  

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return <CheckCircleIcon style={{ color: 'green' }} />;
      case 'unavailable':
        return <HourglassEmptyIcon style={{ color: 'orange' }} />;
      case 'taken':
        return <CancelIcon style={{ color: 'red' }} />;
      default:
        return null;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.adress}</TableCell>
                <TableCell>{row.ville}</TableCell>
                <TableCell>{row.category?.name || 'N/A'}</TableCell>
                <TableCell>{getStatusIcon(row.status)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
