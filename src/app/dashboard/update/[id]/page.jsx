"use client";

import { useParams } from 'next/navigation';
import React, { useEffect, useState, useContext } from 'react';
import { Button, TextField, Container, Typography, Select, MenuItem ,InputLabel,FormControl,Grid} from '@mui/material';
import { DataContext } from '@/contexts/post';

const UpdatePage = () => {
  const { category, type } = useContext(DataContext);
  const { id } = useParams(); // Get the dynamic id from the URL
  const [formData, setFormData] = useState({datePost:'', img: '', title: '', adress: '', ville: '', category: '', status: '', lat: '', lon: '', prix: '', type: '' });
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
            datePost:data.datePost,
            title: data.title,
            adress: data.adress,
            ville: data.ville,
            category: data.category.name, // Assuming the category is an object
            status: data.status,
            lat: data.lat,
            lon: data.lon,
            prix: data.prix,
            type: data.type.type
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

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      category: e.target.value,
    });
  };

  const handleTypeChange = (e) => {
    setFormData({
      ...formData,
      type: e.target.value,
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
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Update Item
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
      <TextField
          label="Date post"
          type='date'
          name="datePost"
          value={formData.datePost}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        </Grid>
        <Grid item xs={6}>

    
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
            </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
        <TextField
          label="Address"
          name="adress"
          value={formData.adress}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        </Grid>
        <Grid item xs={6}>
        <TextField
          label="City"
          name="ville"
          value={formData.ville}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
     <FormControl fullWidth margin="normal" required>
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleCategoryChange}
          >
            {category.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </Grid>
        <Grid item xs={6}>
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <MenuItem value="available">available</MenuItem>
            <MenuItem value="unavailable">unavailable</MenuItem>
          </Select>
        </FormControl>
        </Grid>
        </Grid>
        {/* <TextField
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        /> */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
        <TextField
          label="Latitude"
          name="lat"
          value={formData.lat}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        </Grid>
        <Grid item xs={6}>
        <TextField
          label="Longitude"
          name="lon"
          value={formData.lon}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
        <TextField
          label="Prix"
          name="prix"
          value={formData.prix}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        </Grid>
        <Grid item xs={6}>
           <FormControl fullWidth margin="normal" required>
          <InputLabel>Type</InputLabel>
          <Select
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleTypeChange}
          >
            {type.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </form>
    </Container>
  );
};

export default UpdatePage;
