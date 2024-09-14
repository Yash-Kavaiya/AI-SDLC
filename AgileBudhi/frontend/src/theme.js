import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
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
          background: 'linear-gradient(45deg, #4285f4, #34a853)',
          '&:hover': {
            background: 'linear-gradient(45deg, #3367d6, #2e7d32)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #4285f4, #34a853)',
          boxShadow: 'none',
        },
      },
    },
  },
});

export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));