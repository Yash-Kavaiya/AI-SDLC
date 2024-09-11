// src/components/Layout.js
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import BrushIcon from '@mui/icons-material/Brush';
import CodeIcon from '@mui/icons-material/Code';
import BugReportIcon from '@mui/icons-material/BugReport';
import PublishIcon from '@mui/icons-material/Publish';
import BuildIcon from '@mui/icons-material/Build';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import BarChartIcon from '@mui/icons-material/BarChart';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import IconButton from '@mui/material/IconButton';

const drawerWidth = 240;

const Root = styled('div')({
  display: 'flex',
});

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: 'linear-gradient(45deg, #0078D4 30%, #00BCF2 90%)',
}));

const StyledDrawer = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    background: 'linear-gradient(to bottom, #0078D4, #00BCF2)',
  },
});

const DrawerContainer = styled('div')({
  overflow: 'auto',
});

const Content = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: 'white',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'Design', icon: <BrushIcon />, path: '/design' },
  { text: 'Development', icon: <CodeIcon />, path: '/development' },
  { text: 'Testing', icon: <BugReportIcon />, path: '/testing' },
  { text: 'Deployment', icon: <PublishIcon />, path: '/deployment' },
  { text: 'Maintenance', icon: <BuildIcon />, path: '/maintenance' },
  { text: 'AI Insights', icon: <EmojiObjectsIcon />, path: '/ai-insights' },
  { text: 'Analytics', icon: <BarChartIcon />, path: '/analytics' },
];

export default function Layout({ children }) {
  return (
    <Root>
      <StyledAppBar position="fixed">
        <Toolbar>
          <Logo variant="h6" noWrap sx={{ flexGrow: 1 }}>
            AgileBudhi
          </Logo>
          <IconButton color="inherit" aria-label="AI Assistant">
            <SmartToyIcon />
          </IconButton>
        </Toolbar>
      </StyledAppBar>
      <StyledDrawer variant="permanent">
        <Toolbar />
        <DrawerContainer>
          <List>
            {menuItems.map((item) => (
              <StyledListItem button key={item.text} component={RouterLink} to={item.path}>
                <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: 'white' }} />
              </StyledListItem>
            ))}
          </List>
          <Divider />
        </DrawerContainer>
      </StyledDrawer>
      <Content>
        <Toolbar />
        {children}
      </Content>
    </Root>
  );
}