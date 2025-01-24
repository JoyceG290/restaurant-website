import React, { useState, FormEvent } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const ReservationForm: React.FC = () => {
  const [name, setName] = useState('');
  const [persons, setPersons] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ name, persons, date, time });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 4,
          borderRadius: 2,
          color: 'white',
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom align="center" 
          sx={{ fontFamily: "'Playfair Display', serif" }}>
          Reserve Your Table
        </Typography>
        <Typography variant="subtitle1" gutterBottom align="center" sx={{ mb: 4 }}>
          Book a table in advance to enjoy your time with friends & family
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2, input: { color: 'white' }, label: { color: 'white' } }}
            variant="outlined"
          />
          
          <TextField
            fullWidth
            label="Number of Persons"
            type="number"
            value={persons}
            onChange={(e) => setPersons(e.target.value)}
            sx={{ mb: 2, input: { color: 'white' }, label: { color: 'white' } }}
            variant="outlined"
          />
          
          <Box sx={{ mb: 2 }}>
            <DatePicker
              selected={date}
              onChange={(date: Date) => setDate(date)}
              dateFormat="MMMM d, yyyy"
              minDate={new Date()}
              placeholderText="Select Date"
              className="custom-datepicker"
            />
          </Box>
          
          <TextField
            fullWidth
            label="Preferred Time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 3, input: { color: 'white' }, label: { color: 'white' } }}
            variant="outlined"
          />
          
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#CD853F',
              '&:hover': {
                backgroundColor: '#8B4513',
              },
              py: 1.5,
            }}
          >
            Reserve A Table
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ReservationForm;
