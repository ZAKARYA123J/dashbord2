"use client";

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';

const UpdatePage = () => {

  const { id } = useParams(); // Get the dynamic id from the URL
  const [formData, setFormData] = useState({ img:'',title: '', adress: '', ville: '', category: '', status: '' ,lat:'',lon:'',prix:'',category:'',type:''});
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
            adress: data.adress,
            ville: data.ville,
            category: data.category.name, // Assuming the category is an object
            status: data.status,
            lat:data.lat,
            lon:data.lon,
            prix:data.prix,
            type:data.type.type
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
    fetch(`http://localhost:3001/api/posts/${id}`, {
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
          value={formData.adress}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="City"
          name="city"
          value={formData.ville}
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
        <TextField
          label="Latitude"
          name="lat"
          value={formData.lat}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Longitude"
          name="lon"
          value={formData.lon}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Prix"
          name="prix"
          value={formData.prix}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Prix"
          name="prix"
          value={formData.prix}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Type"
          typ
          name="type"
          value={formData.type}
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
