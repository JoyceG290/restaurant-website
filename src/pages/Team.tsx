import React from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { images } from '../assets/images';

const Team: React.FC = () => {
  const teamMembers = [
    {
      name: 'Chef Michael Roberts',
      position: 'Executive Chef',
      bio: 'With over 20 years of culinary experience in Michelin-starred restaurants across Europe and Asia, Chef Michael brings his passion for innovative cuisine to our kitchen.',
      image: images.team[0]
    },
    {
      name: 'Sarah Chen',
      position: 'Pastry Chef',
      bio: 'A graduate of Le Cordon Bleu Paris, Sarah specializes in creating unique desserts that blend classical French techniques with modern presentation.',
      image: images.team[1]
    },
    {
      name: 'James Wilson',
      position: 'Sommelier',
      bio: 'Certified by the Court of Master Sommeliers, James curates our extensive wine collection and creates perfect pairings for our seasonal menus.',
      image: images.team[2]
    }
  ];

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
                Meet Our Team
              </Typography>
              <Typography variant="h4" sx={{ color: 'primary.main' }}>
                The Culinary Artists Behind Your Experience
              </Typography>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* Team Members Section */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} md={4} key={member.name}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="400"
                    image={member.image}
                    alt={member.name}
                    sx={{
                      objectFit: 'cover',
                    }}
                  />
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" color="primary.main" gutterBottom>
                      {member.position}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {member.bio}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Team;
