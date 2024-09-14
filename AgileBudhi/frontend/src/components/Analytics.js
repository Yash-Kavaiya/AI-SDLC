import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Divider
} from '@mui/material';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';

const lineChartData = [
  { name: 'Jan', bugs: 40, features: 24 },
  { name: 'Feb', bugs: 30, features: 13 },
  { name: 'Mar', bugs: 20, features: 28 },
  { name: 'Apr', bugs: 27, features: 39 },
  { name: 'May', bugs: 18, features: 48 },
  { name: 'Jun', bugs: 23, features: 38 },
];

const barChartData = [
  { name: 'Team A', productivity: 80 },
  { name: 'Team B', productivity: 65 },
  { name: 'Team C', productivity: 95 },
  { name: 'Team D', productivity: 75 },
];

const pieChartData = [
  { name: 'Development', value: 400 },
  { name: 'Testing', value: 300 },
  { name: 'Design', value: 200 },
  { name: 'Planning', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Paper sx={{ p: 1 }}>
        <Typography variant="body2">{`${label}`}</Typography>
        {payload.map((entry, index) => (
          <Typography key={index} variant="body2" color={entry.color}>
            {`${entry.name}: ${entry.value}`}
          </Typography>
        ))}
      </Paper>
    );
  }
  return null;
};

export default function Analytics() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Project Analytics Dashboard
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Bugs vs Features Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="bugs" stroke="#8884d8" />
                <Line type="monotone" dataKey="features" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Team Productivity
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="productivity" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Time Allocation
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Key Metrics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">Sprint Velocity:</Typography>
                <Typography variant="h5">32 points</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">Code Coverage:</Typography>
                <Typography variant="h5">87%</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">Open Issues:</Typography>
                <Typography variant="h5">24</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">Customer Satisfaction:</Typography>
                <Typography variant="h5">4.7/5</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}