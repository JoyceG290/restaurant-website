import React from 'react';
import { Box, Container, Typography, ImageList, ImageListItem, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { images } from '../assets/images';

const Gallery: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const getColumns = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

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
                Gallery
              </Typography>
              <Typography variant="h4" sx={{ color: 'primary.main' }}>
                A Visual Journey Through Our Culinary Art
              </Typography>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* Gallery Grid */}
      <Container maxWidth="lg">
        <motion.div {...fadeIn}>
          <ImageList
            variant="masonry"
            cols={getColumns()}
            gap={16}
          >
            {images.gallery.map((item, index) => (
              <ImageListItem
                key={index}
                sx={{
                  overflow: 'hidden',
                  '& img': {
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  },
                }}
              >
                <img
                  src={item}
                  alt={`Culinary dish ${index + 1}`}
                  loading="lazy"
                  style={{ borderRadius: '4px' }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Gallery;
