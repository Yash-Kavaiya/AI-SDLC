import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';

const Sidebar = () => (
  <div style={{ width: '200px', backgroundColor: '#f5f5f7', padding: '10px' }}>
    <List>
      <ListItem button component={Link} to="/">
        <ListItemText primary="Kanban Board" />
      </ListItem>
      <ListItem button component={Link} to="/project-manager">
        <ListItemText primary="Project Manager" />
      </ListItem>
      <ListItem button component={Link} to="/developer">
        <ListItemText primary="Developer" />
      </ListItem>
      <ListItem button component={Link} to="/tester">
        <ListItemText primary="Tester" />
      </ListItem>
      <ListItem button component={Link} to="/deployment">
        <ListItemText primary="Deployment" />
      </ListItem>
      <ListItem button component={Link} to="/client">
        <ListItemText primary="Client" />
      </ListItem>
    </List>
  </div>
);

export default Sidebar;
