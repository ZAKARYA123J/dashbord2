"use client";
import React, { useContext, useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import { DataContext } from '@/contexts/post'; // Adjust the path accordingly

// Define the types for your data
interface Post {
  id: number;
  img: string[];
  datePost: string;
  lat: number;
  lon: number;
  prix: number;
  adress: string;
  ville: string;
  status: string;
  title: string;
  categoryId: number;
  typeId: number;
}

interface Order {
  id: number;
  fullName: string;
  dateDebut: string;
  dateFine: string | null;
  CIN: string;
  price: string;
  postId: number;
  post: Post;
}

export function CompaniesFilters(): React.JSX.Element {
  const { order, loading, error } = useContext(DataContext); // Use context to access orders, loading, and error states

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Card >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell align="right">Customer Name</TableCell>
              <TableCell align="right">Date Debut</TableCell>
              <TableCell align="right">Date Fin</TableCell>
              <TableCell align="right">CIN</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Post Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.map((order: Order) => (
              <TableRow key={order.id}>
                <TableCell component="th" scope="row">
                ORD-{order.id}
                </TableCell>
                <TableCell align="right">{order.fullName}</TableCell>
                <TableCell align="right">{new Date(order.dateDebut).toLocaleDateString()}</TableCell>
                <TableCell align="right">{order.dateFine}</TableCell>
                <TableCell align="right">{order.CIN}</TableCell>
                <TableCell align="right">{order.price}DH</TableCell>
                <TableCell align="right">
                  {order.post ? order.post.title : 'No Post Available'}
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
