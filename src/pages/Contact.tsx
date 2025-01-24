import React, { useState } from 'react';
import { Box, Container, Typography, Grid, TextField, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const contactInfo = [
    {
      icon: <EmailIcon sx={{ fontSize: 40 }} />,
      title: 'Email',
      content: 'info@luxuryrestaurant.com',
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 40 }} />,
      title: 'Phone',
      content: '+1 (555) 123-4567',
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 40 }} />,
      title: 'Address',
      content: '123 Gourmet Street, Culinary District, NY 10001',
    },
  ];

  return (
    <Box sx={{ pt: 10, pb: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          height: '40vh',
          position: 'relative',
          bgcolor: 'background.paper',
          mb: 8,
        }}
      >
        <Container maxWidth="lg" sx={{ height: '100%', position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <motion.div {...fadeIn}>
              <Typography variant="h1" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="h4" sx={{ color: 'primary.main' }}>
                Get in Touch
              </Typography>
            </motion.div>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <motion.div {...fadeIn}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h2" gutterBottom>
                  Contact Info
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  We'd love to hear from you. Drop us a line or visit us at our restaurant.
                </Typography>
              </Box>
              
              {contactInfo.map((info, index) => (
                <Paper
                  key={info.title}
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'primary.main',
                  }}
                >
                  <Box sx={{ color: 'primary.main', mr: 2 }}>
                    {info.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {info.title}
                    </Typography>
                    <Typography variant="body1">
                      {info.content}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </motion.div>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <motion.div {...fadeIn}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'primary.main',
                }}
              >
                <Typography variant="h2" gutterBottom>
                  Send a Message
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        name="message"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{
                          mt: 2,
                          bgcolor: 'primary.main',
                          color: 'background.paper',
                          '&:hover': {
                            bgcolor: 'primary.dark',
                          },
                        }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
