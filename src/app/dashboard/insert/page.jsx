"use client";
import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';

const CreatePostForm = () => {
  const [formData, setFormData] = useState({
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
    img: [],
  });

  const [response, setResponse] = useState(null);
  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'lat' || name === 'lon' || name === 'prix' || name === 'typeId' ? Number(value) : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Convert each file to a base64 string
    Promise.all(files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }))
    .then(base64Images => {
      setFormData(prevData => ({
        ...prevData,
        img: base64Images
      }));
    })
    .catch(error => console.error('Error converting images:', error));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure datePost is formatted correctly
    if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.datePost)) {
      setErrors({ datePost: 'Invalid date format. Expected YYYY-MM-DD.' });
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setResponse(result);
        setErrors(null);
      } else {
        setErrors(result);
      }
    } catch (error) {
      setErrors({ error: 'An error occurred while creating the post' });
    }
  };
//   "img": [
//     "https://res.cloudinary.com/dab60xyhf/image/upload/v1725353080/your_folder_name/wesp3fkez0xshlqpkum5.png",
//     "https://res.cloudinary.com/dab60xyhf/image/upload/v1725353080/your_folder_name/hazulihbeydh1e6krbwk.png"
// ],
// "datePost": "31-08-2024",
// "lat": 40.712776,
// "lon": -74.005974,
// "prix": 150,
// "adress": "123 Example St",
// "ville": "New York",
// "status": "taken",
// "title": "Sample Post Title",
// "categoryId": 1,
// "typeId": 1,
// "category": {
//     "id": 1,
//     "name": "Vente"
// },
// "type": {
//     "id": 1,
//     "type": "Home"
//         }}
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Create Post
      </Typography>
      {errors && <Alert severity="error">{JSON.stringify(errors)}</Alert>}
      {response && <Alert severity="success">{JSON.stringify(response)}</Alert>}

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          type="date"
          name="datePost"
          label="Date Post"
          value={formData.datePost}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          type="number"
          name="lat"
          label="Latitude"
          value={formData.lat}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          type="number"
          name="lon"
          label="Longitude"
          value={formData.lon}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          type="number"
          name="prix"
          label="Price"
          value={formData.prix}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="adress"
          label="Address"
          value={formData.adress}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="ville"
          label="City"
          value={formData.ville}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="status"
          label="Status"
          value={formData.status}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          type="number"
          name="categoryId"
          label="Category ID"
          value={formData.categoryId}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          type="number"
          name="typeId"
          label="Type ID"
          value={formData.typeId}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          component="label"
          sx={{ mt: 2 }}
        >
          Upload Images
          <input
            type="file"
            multiple
            hidden
            onChange={handleImageChange}
          />
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create Post
        </Button>
      </Box>
    </Container>
  );
};

export default CreatePostForm;
