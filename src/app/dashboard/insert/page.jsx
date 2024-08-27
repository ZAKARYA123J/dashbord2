'use client'
import React, { useState } from 'react';
import { TextField, Button, MenuItem, Grid, Box, Typography } from '@mui/material';
import axios from 'axios';

const PostForm = () => {
  const [post, setPost] = useState({
    img: [],
    datePost: '',
    lat: '',
    lon: '',
    prix: '',
    adress: '',
    ville: '',
    status: '',
    title: '',
    categoryId: '',
    typeId: '',
  });

  const statuses = ['Draft', 'Published', 'Archived'];
  const categories = [{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }];
  const types = [{ id: 1, name: 'Type 1' }, { id: 2, name: 'Type 2' }];

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPost({ ...post, img: Array.from(e.target.files) });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      Object.keys(post).forEach(key => {
        if (key === 'img') {
          post[key].forEach(file => formData.append('img', file));
        } else {
          formData.append(key, post[key]);
        }
      });

      const response = await axios.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Create/Edit Post</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            name="adress"
            value={post.adress}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="City"
            name="ville"
            value={post.ville}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Price"
            name="prix"
            value={post.prix}
            onChange={handleChange}
            type="number"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Latitude"
            name="lat"
            value={post.lat}
            onChange={handleChange}
            type="number"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Longitude"
            name="lon"
            value={post.lon}
            onChange={handleChange}
            type="number"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Status"
            name="status"
            value={post.status}
            onChange={handleChange}
            select
            required
          >
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Category"
            name="categoryId"
            value={post.categoryId}
            onChange={handleChange}
            select
            required
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Type"
            name="typeId"
            value={post.typeId}
            onChange={handleChange}
            select
            required
          >
            {types.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Date Posted"
            name="datePost"
            type="date"
            value={post.datePost}
            onChange={handleChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            component="label"
            fullWidth
          >
            Upload Images
            <input
              type="file"
              multiple
              hidden
              onChange={handleFileChange}
            />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PostForm;
