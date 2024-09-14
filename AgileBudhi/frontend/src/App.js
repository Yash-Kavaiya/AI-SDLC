// src/App.js
import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Layout from './components/Layout';
import Home from './components/Home';
import Design from './components/Design';
import Development from './components/Development';
import Testing from './components/Testing';
import Deployment from './components/Deployment';
import Maintenance from './components/Maintenance';
import AIInsights from './components/AIInsights';
import Analytics from './components/Analytics';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode
          primary: {
            main: '#1a73e8',
            light: '#4285f4',
            dark: '#0d47a1',
          },
          secondary: {
            main: '#34a853',
            light: '#66bb6a',
            dark: '#1b5e20',
          },
          background: {
            default: '#ffffff',
            paper: '#f1f3f4',
          },
        }
      : {
          // Dark mode
          primary: {
            main: '#8ab4f8',
            light: '#aecbfa',
            dark: '#669df6',
          },
          secondary: {
            main: '#81c995',
            light: '#a8dab5',
            dark: '#5bb974',
          },
          background: {
            default: '#202124',
            paper: '#303134',
          },
        }),
  },
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          padding: '8px 24px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
        },
      },
    },
  },
});

function App() {
  const [mode, setMode] = useState('light');

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <IconButton
            sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1100 }}
            onClick={toggleTheme}
            color="inherit"
          >
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/design" element={<Design />} />
            <Route path="/development" element={<Development />} />
            <Route path="/testing" element={<Testing />} />
            <Route path="/deployment" element={<Deployment />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/ai-insights" element={<AIInsights />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;