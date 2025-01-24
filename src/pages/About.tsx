import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { images } from '../assets/images';

const About: React.FC = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <Box sx={{ pt: 10, pb: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          height: '60vh',
          position: 'relative',
          backgroundImage: `url(${images.about})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          mb: 8,
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
            }}
          >
            <motion.div {...fadeIn}>
              <Typography variant="h1" gutterBottom>
                Our Story
              </Typography>
              <Typography variant="h4" sx={{ color: 'primary.main' }}>
                A Journey of Culinary Excellence
              </Typography>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <motion.div {...fadeIn}>
              <Typography variant="h2" gutterBottom>
                Our Philosophy
              </Typography>
              <Typography variant="body1" paragraph>
                At our restaurant, we believe in creating extraordinary dining experiences that combine culinary artistry with warm hospitality. Our journey began with a simple vision: to create a space where food becomes an adventure, and every meal tells a story.
              </Typography>
              <Typography variant="body1" paragraph>
                Our chefs draw inspiration from global cuisines while staying true to local flavors and seasonal ingredients. We work closely with local farmers and suppliers to ensure that every ingredient that enters our kitchen meets our exacting standards.
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
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
                <Typography variant="h3" gutterBottom sx={{ color: 'primary.main' }}>
                  Our Values
                </Typography>
                <Typography variant="body1" paragraph>
                  • Excellence in every detail
                </Typography>
                <Typography variant="body1" paragraph>
                  • Sustainable and responsible sourcing
                </Typography>
                <Typography variant="body1" paragraph>
                  • Innovation in tradition
                </Typography>
                <Typography variant="body1" paragraph>
                  • Warm and attentive service
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
