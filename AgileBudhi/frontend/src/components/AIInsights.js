import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box,
  LinearProgress,
  Divider
} from '@mui/material';
import { 
  Timeline,
  AssignmentTurnedIn,
  TrendingUp,
  AttachMoney,
  Speed,
  Group,
  BugReport,
  Star
} from '@mui/icons-material';

const KPICard = ({ title, value, icon, color, subtext }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" component="div" color="text.secondary">
          {title}
        </Typography>
        {React.createElement(icon, { sx: { color: color, fontSize: 40 } })}
      </Box>
      <Typography variant="h4" component="div" gutterBottom>
        {value}
      </Typography>
      {subtext && (
        <Typography variant="body2" color="text.secondary">
          {subtext}
        </Typography>
      )}
    </CardContent>
  </Card>
);

const ProgressKPICard = ({ title, value, max, icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" component="div" color="text.secondary">
          {title}
        </Typography>
        {React.createElement(icon, { sx: { color: color, fontSize: 40 } })}
      </Box>
      <Typography variant="h4" component="div" gutterBottom>
        {value}/{max}
      </Typography>
      <LinearProgress 
        variant="determinate" 
        value={(value / max) * 100} 
        sx={{ height: 10, borderRadius: 5 }}
      />
    </CardContent>
  </Card>
);

export default function AIInsights() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        AI Insights Dashboard
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard 
            title="Project Duration" 
            value="120 days" 
            icon={Timeline}
            color="#1a73e8"
            subtext="5 days ahead of schedule"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ProgressKPICard 
            title="Tasks Completed" 
            value={75} 
            max={100}
            icon={AssignmentTurnedIn}
            color="#34a853"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard 
            title="Productivity Index" 
            value="1.2" 
            icon={TrendingUp}
            color="#fbbc04"
            subtext="20% increase"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard 
            title="Budget Variance" 
            value="-$5,000" 
            icon={AttachMoney}
            color="#ea4335"
            subtext="Under budget"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard 
            title="Sprint Velocity" 
            value="32 points" 
            icon={Speed}
            color="#46bdc6"
            subtext="Avg. over last 3 sprints"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard 
            title="Team Utilization" 
            value="87%" 
            icon={Group}
            color="#ab47bc"
            subtext="Optimal range: 80-90%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ProgressKPICard 
            title="Defect Density" 
            value={3} 
            max={10}
            icon={BugReport}
            color="#f06292"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard 
            title="Customer Satisfaction" 
            value="4.8/5" 
            icon={Star}
            color="#ffa000"
            subtext="Based on recent surveys"
          />
        </Grid>
      </Grid>
    </Box>
  );
}