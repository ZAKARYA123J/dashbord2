"use client";
import React, { useContext, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { FaPlus } from "react-icons/fa";
import Link from 'next/link';
import { DataContext } from '@/contexts/post';
import { useRouter } from 'next/navigation';
import axios from 'axios';
const DataTable = () => {
  const { data, loading, error } = useContext(DataContext);
  const router = useRouter();  // Initialize useRouter safely
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);  // Only set mounted to true after the component mounts
  }, []);

  if (!mounted) return null;  // Prevents router usage on the server-side

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Include authentication headers if needed
          // 'Authorization': `Bearer ${token}`,
        },
     
      });
        const data=await response.json()
        console.log(data)
     
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      console.log('Delete successful');
      // Optionally, you can refresh the item list or update the UI here
      // For example, you could re-fetch the data from the server
      // or remove the deleted item from the local state.
      // To remove from local state, you need to manage the data state in the component.
      setData(data.filter(item => item.id !== id));
  
    } catch (error) {
      console.error('Failed to delete item:', error);
      // Optionally show an error message to the user
    }
  };
  
  

  const handleUpdate = (id) => {
    router.push(`/dashboard/update/${id}`);  // Use router.push to navigate
  };

  const handleDetail = (id) => {
    router.push(`/dashboard/detail/${id}`);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircleIcon style={{ color: 'green', marginRight: '5px' }} />
            <span>Available</span>
          </div>
        );
      case 'unavailable':
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <HourglassEmptyIcon style={{ color: 'orange', marginRight: '5px' }} />
            <span>Unavailable</span>
          </div>
        );
      case 'taken':
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CancelIcon style={{ color: 'red', marginRight: '5px' }} />
            <span>Taken</span>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div style={{ textAlign: 'right', marginBottom: "10px" }}>
        <Link href="/dashboard/insert" passHref>
          <Button variant="outlined">Add <FaPlus style={{ marginLeft: "2px" }} /></Button>
        </Link>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
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
                  <TableCell >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IconButton onClick={() => handleDetail(row.id)}>
                        <InfoIcon />
                      </IconButton>
                      <IconButton onClick={() => handleUpdate(row.id)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(row.id)} style={{ color: "red" }}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DataTable;
