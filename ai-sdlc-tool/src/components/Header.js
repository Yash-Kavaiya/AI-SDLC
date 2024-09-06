import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => (
  <AppBar position="static" style={{ backgroundColor: '#f5f5f7', color: '#000' }}>
    <Toolbar>
      <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
        AI SDLC Project Management
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
