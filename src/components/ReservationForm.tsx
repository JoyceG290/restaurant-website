import React, { useState } from 'react';
import { Box, TextField, Button, Grid, Typography } from '@mui/material';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface ReservationFormProps {
  onSubmit?: (data: ReservationData) => void;
}

interface ReservationData {
  name: string;
  email: string;
  phone: string;
  guests: string;
  date: Date | null;
  time: string;
  specialRequests: string;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    email: '',
    phone: '',
    guests: '',
    date: null,
    time: '',
    specialRequests: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      guests: '',
      date: null,
      time: '',
      specialRequests: ''
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Make a Reservation
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Number of Guests"
            name="guests"
            type="number"
            value={formData.guests}
            onChange={handleChange}
            inputProps={{ min: "1", max: "10" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ 
            '& .react-datepicker-wrapper': { 
              width: '100%' 
            },
            '& .react-datepicker__input-container input': {
              width: '100%',
              padding: '16.5px 14px',
              border: '1px solid rgba(0, 0, 0, 0.23)',
              borderRadius: '4px',
              fontSize: '1rem',
              '&:hover': {
                borderColor: 'rgba(0, 0, 0, 0.87)'
              },
              '&:focus': {
                borderColor: '#1976d2',
                borderWidth: '2px',
                outline: 'none'
              }
            }
          }}>
            <DatePicker
              selected={formData.date}
              onChange={(date: Date | null) => setFormData(prev => ({ ...prev, date }))}
              dateFormat="MMMM d, yyyy"
              minDate={new Date()}
              placeholderText="Select Date"
              required
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Preferred Time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Special Requests"
            name="specialRequests"
            multiline
            rows={4}
            value={formData.specialRequests}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
          >
            Make Reservation
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReservationForm;
