"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';

const InsertDataComponent = () => {
  const [data, setData] = useState({
    img: ["https://example.com/image1.jpg"], // Handle image URLs/identifiers
    datePost: "2006-08-22",
    lat: '',
    lon: '',
    prix: '',
    adress: '',
    ville: '',
    status: 'available',
    title: '',
    categoryId: '',
    typeId: ''
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const uploadImages = async () => {
    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append('img', file);
    }
    
    try {
      const response = await axios.post('http://localhost:3001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Assuming response contains an array of image URLs or identifiers
      return response.data.imageUrls; // Modify according to your server response
    } catch (error) {
      console.error('Error uploading images:', error);
      setUploadStatus(`Image upload failed: ${error.message}`);
      return [];
    }
  };

  const insertData = async () => {
    if (!data.title || !data.adress || !data.ville || !data.lat || !data.lon || !data.prix || !data.categoryId || !data.typeId) {
      setUploadStatus('Please fill out all required fields.');
      return;
    }

    setUploadStatus('Uploading images...');
    const imageUrls = await uploadImages();

    // Update data with image URLs
    const payload = {
      ...data,
      img: imageUrls
    };

    try {
      setUploadStatus('Inserting data...');
      const response = await axios.post('http://localhost:3001/api/posts', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response data:', response.data);
      setUploadStatus(`Upload successful: ${response.data.message}`);
      // Reset form
      setData({
        img: ["https://example.com/image1.jpg"],
        datePost: "2006-08-22",
        lat: '',
        lon: '',
        prix: '',
        adress: '',
        ville: '',
        status: 'available',
        title: '',
        categoryId: '',
        typeId: ''
      });
      setSelectedFiles([]);
    } catch (error) {
      console.error('Error inserting data:', error);
      setUploadStatus(`Upload failed: ${error.message}`);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Insert Data
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={data.title}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Address"
            name="adress"
            value={data.adress}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="City"
            name="ville"
            value={data.ville}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Date Post"
            name="datePost"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={data.datePost}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Latitude"
            name="lat"
            type="number"
            value={data.lat}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Longitude"
            name="lon"
            type="number"
            value={data.lon}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Price"
            name="prix"
            type="number"
            value={data.prix}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Status"
            name="status"
            value={data.status}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Category ID"
            name="categoryId"
            type="number"
            value={data.categoryId}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Type ID"
            name="typeId"
            type="number"
            value={data.typeId}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ marginTop: '16px' }}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={insertData}
        style={{ marginTop: '16px' }}
      >
        Insert Data
      </Button>
      <Typography variant="body1" style={{ marginTop: '16px' }}>
        {uploadStatus}
      </Typography>
    </Container>
  );
};

export default InsertDataComponent;
