"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/users', {
          // mode: 'no-cors' // This mode does not include the CORS headers in the request.
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        // Since `no-cors` mode restricts you from accessing the response content,
        // you can't directly access `response.json()` or `response.text()` here.
  
        // Assuming you want to handle this gracefully:
        const responseData = await response.json(); // Parse the response into JSON
        setData(responseData);
        console.log(responseData)
        console.log('API Request was successful');
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };
  
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
            <TableCell>Category</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.nom}</TableCell>
                {/* <TableCell>{row.address}</TableCell> */}
                {/* <TableCell>{row.category?.name || 'N/A'}</TableCell> */}
                {/* <TableCell>{getStatusIcon(row.status)}</TableCell> */}
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
