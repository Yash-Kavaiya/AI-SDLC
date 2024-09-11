import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Button,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { 
  BugReport, 
  CheckCircle, 
  Warning, 
  Schedule
} from '@mui/icons-material';

const mockIssues = [
  { id: 1, title: 'Database connection timeout', severity: 'High', status: 'Open' },
  { id: 2, title: 'UI rendering slow on mobile devices', severity: 'Medium', status: 'In Progress' },
  { id: 3, title: 'Incorrect data shown in reports', severity: 'High', status: 'Open' },
  { id: 4, title: 'Login page not responsive', severity: 'Low', status: 'Closed' },
];

const mockSystemHealth = [
  { name: 'Server Uptime', value: 99.9 },
  { name: 'Database Performance', value: 87 },
  { name: 'API Response Time', value: 95 },
  { name: 'Memory Usage', value: 68 },
];

const mockMaintenanceSchedule = [
  { id: 1, task: 'Database Optimization', date: '2024-09-15', status: 'Scheduled' },
  { id: 2, task: 'Security Patch Update', date: '2024-09-20', status: 'In Progress' },
  { id: 3, task: 'Backup System Check', date: '2024-09-25', status: 'Completed' },
];

const IssueSeverityChip = ({ severity }) => {
  const color = severity === 'High' ? 'error' : severity === 'Medium' ? 'warning' : 'success';
  return <Chip label={severity} color={color} size="small" />;
};

const SystemHealthItem = ({ name, value }) => (
  <Box mb={2}>
    <Box display="flex" justifyContent="space-between" mb={1}>
      <Typography variant="body2">{name}</Typography>
      <Typography variant="body2">{value}%</Typography>
    </Box>
    <LinearProgress 
      variant="determinate" 
      value={value} 
      color={value > 90 ? 'success' : value > 70 ? 'primary' : 'error'}
    />
  </Box>
);

export default function Maintenance() {
  const [selectedIssue, setSelectedIssue] = useState(null);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        System Maintenance Dashboard
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Open Issues
            </Typography>
            <List>
              {mockIssues.map((issue) => (
                <ListItem 
                  key={issue.id} 
                  button 
                  onClick={() => setSelectedIssue(issue)}
                  selected={selectedIssue && selectedIssue.id === issue.id}
                >
                  <ListItemIcon>
                    <BugReport color={issue.severity === 'High' ? 'error' : 'inherit'} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={issue.title}
                    secondary={
                      <React.Fragment>
                        <IssueSeverityChip severity={issue.severity} />
                        {' '}
                        <Chip label={issue.status} size="small" />
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
            {selectedIssue && (
              <Box mt={2}>
                <Typography variant="subtitle1">Selected Issue Details:</Typography>
                <Typography variant="body2">{selectedIssue.title}</Typography>
                <Button variant="contained" color="primary" size="small" sx={{ mt: 1 }}>
                  Start Working
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              System Health
            </Typography>
            {mockSystemHealth.map((item) => (
              <SystemHealthItem key={item.name} name={item.name} value={item.value} />
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Maintenance Schedule
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Task</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockMaintenanceSchedule.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.task}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>
                        <Chip 
                          icon={row.status === 'Completed' ? <CheckCircle /> : row.status === 'In Progress' ? <Warning /> : <Schedule />}
                          label={row.status} 
                          color={row.status === 'Completed' ? 'success' : row.status === 'In Progress' ? 'warning' : 'default'}
                        />
                      </TableCell>
                      <TableCell>
                        <Button variant="outlined" size="small">
                          {row.status === 'Completed' ? 'View Report' : 'Manage'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}