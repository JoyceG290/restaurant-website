import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { images } from '../assets/images';
import ReservationForm from '../components/ReservationForm';

const Home: React.FC = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: '100vh',
          position: 'relative',
          backgroundImage: `url(${images.hero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }
        }}
      >
        <Container maxWidth="lg" sx={{ height: '100%', position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white',
              textAlign: 'center',
              width: '100%',
            }}
          >
            <motion.div {...fadeIn}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  mb: 2,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                }}
              >
                Experience Culinary Excellence
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  mb: 4,
                  color: 'primary.main',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                }}
              >
                Where Every Dish Tells a Story
              </Typography>
              <Button
                component={Link}
                to="/menu"
                variant="contained"
                size="large"
                sx={{
                  mr: 2,
                  bgcolor: 'primary.main',
                  color: 'background.paper',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
              >
                View Menu
              </Button>
              <Button
                component={Link}
                to="/contact"
                variant="outlined"
                size="large"
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'primary.main',
                    color: 'primary.main',
                  },
                }}
              >
                Contact Us
              </Button>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* Reservation Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div {...fadeIn}>
                <Typography variant="h2" gutterBottom>
                  Make a Reservation
                </Typography>
                <Typography variant="body1" paragraph>
                  Join us for an unforgettable dining experience. Reserve your table now and let us create a memorable evening for you and your guests.
                </Typography>
                <ReservationForm />
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div {...fadeIn}>
                <Box
                  component="img"
                  src={images.menu.main}
                  alt="Restaurant interior"
                  sx={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
