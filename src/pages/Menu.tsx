import React from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { images } from '../assets/images';

const Menu: React.FC = () => {
  const menuItems = [
    {
      category: 'Starters',
      items: [
        {
          name: 'Truffle Infused Wild Mushroom Soup',
          description: 'Creamy soup with assorted wild mushrooms and truffle oil',
          price: '$16',
          image: images.menu.items[0]
        },
        {
          name: 'Pan-Seared Scallops',
          description: 'With cauliflower purée and crispy pancetta',
          price: '$22',
          image: images.menu.items[1]
        },
        {
          name: 'Artisanal Cheese Board',
          description: 'Selection of premium cheeses, honey, nuts, and artisanal bread',
          price: '$24',
          image: images.menu.items[2]
        }
      ]
    },
    {
      category: 'Main Courses',
      items: [
        {
          name: 'Aged Prime Ribeye',
          description: '45-day dry-aged beef with roasted bone marrow',
          price: '$48',
          image: images.menu.items[2]
        },
        {
          name: 'Pan-Roasted Sea Bass',
          description: 'With saffron risotto and citrus beurre blanc',
          price: '$42',
          image: images.menu.items[3]
        },
        {
          name: 'Duck Breast à l\'Orange',
          description: 'With honey-glazed carrots and orange reduction',
          price: '$38',
          image: images.menu.items[0]
        },
        {
          name: 'Truffle Risotto',
          description: 'Arborio rice, wild mushrooms, parmesan, and fresh truffle',
          price: '$34',
          image: images.menu.items[1]
        }
      ]
    },
    {
      category: 'Desserts',
      items: [
        {
          name: 'Dark Chocolate Soufflé',
          description: 'With vanilla bean ice cream and warm chocolate sauce',
          price: '$16',
          image: images.menu.items[2]
        },
        {
          name: 'Crème Brûlée',
          description: 'Classic vanilla bean custard with caramelized sugar',
          price: '$14',
          image: images.menu.items[3]
        },
        {
          name: 'Seasonal Fruit Tart',
          description: 'With almond frangipane and honey lavender ice cream',
          price: '$15',
          image: images.menu.items[0]
        }
      ]
    },
    {
      category: 'Drinks',
      items: [
        {
          name: 'Signature Cocktails',
          description: 'Ask your server about our rotating selection',
          price: '$16-20',
          image: images.menu.drinks.cocktails
        },
        {
          name: 'Premium Wine Selection',
          description: 'Curated wine list from renowned vineyards',
          price: 'Market Price',
          image: images.menu.drinks.wine
        },
        {
          name: 'Craft Beer',
          description: 'Local and imported craft beers',
          price: '$8-12',
          image: images.menu.drinks.beer
        }
      ]
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
          height: '60vh',
          position: 'relative',
          backgroundImage: `url(${images.menu.main})`,
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
                Our Menu
              </Typography>
              <Typography variant="h4" sx={{ color: 'primary.main', mb: 4 }}>
                Culinary Excellence on Every Plate
              </Typography>
              <Button
                component={Link}
                to="/order"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'background.paper',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
              >
                Order Online
              </Button>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* Menu Section */}
      <Container maxWidth="lg">
        {menuItems.map((category, index) => (
          <Box key={category.category} sx={{ mb: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Typography variant="h2" gutterBottom sx={{ color: 'primary.main', mb: 4 }}>
                {category.category}
              </Typography>
              <Grid container spacing={4}>
                {category.items.map((item) => (
                  <Grid item xs={12} md={6} key={item.name}>
                    <Card sx={{ display: 'flex', height: '100%' }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 200 }}
                        image={item.image}
                        alt={item.name}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" gutterBottom>
                          {item.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                          {item.description}
                        </Typography>
                        <Typography variant="h6" color="primary" gutterBottom>
                          {item.price}
                        </Typography>
                        <Button
                          component={Link}
                          to={`/order?item=${encodeURIComponent(item.name)}`}
                          variant="outlined"
                          size="small"
                          sx={{ mt: 1 }}
                        >
                          Order Now
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default Menu;
