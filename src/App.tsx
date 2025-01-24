import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Team from './pages/Team';
import Gallery from './pages/Gallery';
import Order from './pages/Order';
import Contact from './pages/Contact';

// Luxurious color scheme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#C9A57C', // Elegant gold
      light: '#E5C6A0',
      dark: '#A67C52',
    },
    secondary: {
      main: '#2C3E50', // Deep blue-gray
      light: '#34495E',
      dark: '#2C3E50',
    },
    background: {
      default: '#1A1A1A',
      paper: '#262626',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#C9A57C',
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    h1: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 600,
      letterSpacing: 1,
    },
    h2: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 600,
    },
    h3: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 500,
    },
    h4: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 500,
    },
    body1: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: '1.1rem',
      lineHeight: 1.7,
    },
    button: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 500,
      letterSpacing: 1,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: '12px 24px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/team" element={<Team />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/order" element={<Order />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
