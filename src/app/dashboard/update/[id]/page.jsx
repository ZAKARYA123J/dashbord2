"use client";

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';

const UpdatePage = () => {

  const { id } = useParams(); // Get the dynamic id from the URL
  const [formData, setFormData] = useState({ title: '', address: '', city: '', category: '', status: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/api/posts/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setFormData({
            title: data.title,
            address: data.address,
            city: data.city,
            category: data.category.name, // Assuming the category is an object
            status: data.status,
          });
          setLoading(false);
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          setLoading(false);
        });
    }
  }, [id]);
  

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the updated data
    fetch(`/api/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Item updated successfully:', data);
        // Redirect back to the dashboard or show a success message
        router.push('/dashboard');
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Update Item
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="City"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </form>
    </Container>
  );
};

export default UpdatePage;
