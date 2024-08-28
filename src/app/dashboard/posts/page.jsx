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

  const fetchData = async () => {
    try {
      const response = await axios.get('https://f477-196-115-75-116.ngrok-free.app/api/posts');
      setData(response.data);
      console.log('API Request was successful', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(`Error fetching data: ${error.response ? error.response.data : error.message}`);
    } finally {
      setLoading(false);
    }
  };
  fetchData()

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
              <TableRow key={row.id}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.adress}</TableCell>
                <TableCell>{row.category?.name || 'N/A'}</TableCell>
                <TableCell>{getStatusIcon(row.status)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
