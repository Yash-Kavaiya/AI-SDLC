import React, { useState } from 'react';
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
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import BrushIcon from '@mui/icons-material/Brush';
import CodeIcon from '@mui/icons-material/Code';
import BugReportIcon from '@mui/icons-material/BugReport';
import PublishIcon from '@mui/icons-material/Publish';
import BuildIcon from '@mui/icons-material/Build';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import BarChartIcon from '@mui/icons-material/BarChart';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

const drawerWidth = 240;

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: theme.palette.mode === 'dark' ? '#1F2937' : '#F3F4F6',
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(to right, #1E3A8A, #5B21B6)'
    : 'linear-gradient(to right, #3B82F6, #8B5CF6)',
  boxShadow: 'none',
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.mode === 'dark' ? '#374151' : 'white',
    color: theme.palette.mode === 'dark' ? '#F9FAFB' : '#1F2937',
  },
}));

const DrawerContainer = styled('div')({
  overflow: 'auto',
});

const Content = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.mode === 'dark' ? '#1F2937' : '#F3F4F6',
  color: theme.palette.mode === 'dark' ? '#F9FAFB' : '#1F2937',
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  '& svg': {
    marginRight: theme.spacing(1),
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)',
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
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // You would typically update your theme here
  };

  return (
    <Root>
      <StyledAppBar position="fixed">
        <Toolbar>
          <Logo variant="h6" noWrap sx={{ flexGrow: 1 }}>
            <ElectricBoltIcon />
            SDLC AI Assistant
          </Logo>
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </StyledAppBar>
      <StyledDrawer variant="permanent">
        <Toolbar />
        <DrawerContainer>
          <List>
            {menuItems.map((item) => (
              <StyledListItem button key={item.text} component={RouterLink} to={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
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