"use client"
import React, { useState, ChangeEvent, useContext } from 'react';
import { Select, MenuItem, InputLabel, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { DataContext } from '@/contexts/post';

interface AddOrderDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddOrderDialog: React.FC<AddOrderDialogProps> = ({ open, onClose }) => {
  const [newCustomer, setNewCustomer] = useState({
    fullName: '',
    dateDebut: '',
    dateFine: '',
    price: '',
    CIN: '',
    postId: ''
  });
  const { data } = useContext(DataContext);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewCustomer({
      ...newCustomer,
      [event.target.name]: event.target.value,
    });
  };

  const handlePostChange = (event: ChangeEvent<{ value: unknown }>) => {
    setNewCustomer({ ...newCustomer, postId: event.target.value as string });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/DateReserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCustomer),
      });

      if (!response.ok) {
        throw new Error('Failed to save the order');
      }

      const result = await response.json();
      console.log('Order saved successfully:', result);
      onClose(); // Close the dialog after successful save
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Order</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          name="fullName"
          fullWidth
          variant="outlined"
          value={newCustomer.fullName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="dateDebut"
          name="dateDebut"
          type="date"
          fullWidth
          variant="outlined"
          value={newCustomer.dateDebut}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="dense"
          label="dateFine"
          name="dateFine"
          type="date"
          fullWidth
          variant="outlined"
          value={newCustomer.dateFine}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="dense"
          label="CIN"
          name="CIN"
          fullWidth
          variant="outlined"
          value={newCustomer.CIN}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="price"
          name="price"
          fullWidth
          variant="outlined"
          value={newCustomer.price}
          onChange={handleChange}
        />
        <InputLabel style={{ marginLeft: '10px' }}>Select available Post</InputLabel>
        <Select
          fullWidth
          variant="outlined"
          label="Post"
          value={newCustomer.postId}
          onChange={handlePostChange}
        >
          {data
            .filter((item) => item.status !== 'unavailable' && item.status !== 'taken')
            .map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.title}
                <span style={{ color: 'red', marginLeft: '10px' }}>
                  {item.status} {item.category.name}
                </span>
              </MenuItem>
            ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrderDialog;
