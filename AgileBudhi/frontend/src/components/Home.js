import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const GradientTypography = styled(Typography)(({ theme }) => ({
  background: theme.palette.mode === 'light'
    ? 'linear-gradient(45deg, #4285f4, #34a853)'
    : 'linear-gradient(45deg, #8ab4f8, #81c995)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(4),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
  '&:hover': { 
    transform: 'scale3d(1.02, 1.02, 1)',
    boxShadow: theme.shadows[4],
  },
  backgroundColor: theme.palette.background.paper,
}));

const services = [
  { title: 'AI-Powered Project Management', description: 'Leverage cutting-edge AI to optimize your project workflows.' },
  { title: 'Agile Transformation', description: 'Transform your organization with our agile methodologies and tools.' },
  { title: 'Digital Innovation', description: 'Stay ahead of the curve with our digital innovation solutions.' },
  { title: 'Cloud Services', description: 'Harness the power of cloud computing for your business needs.' },
];

function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Box textAlign="center" mb={6}>
        <GradientTypography variant="h2" component="h1" gutterBottom fontWeight="bold">
          Welcome to AgileBudhi
        </GradientTypography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Empowering your digital transformation journey with AI-driven solutions and agile methodologies.
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {services.map((service, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <StyledCard elevation={2}>
              <CardContent>
                <Typography gutterBottom variant="h6" component="h2" fontWeight="bold">
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.description}
                </Typography>
              </CardContent>
              <Button 
                size="small" 
                sx={{ 
                  mt: 'auto', 
                  mx: 2, 
                  mb: 2, 
                  borderRadius: '20px',
                  background: (theme) => 
                    theme.palette.mode === 'light'
                      ? 'linear-gradient(45deg, #4285f4, #34a853)'
                      : 'linear-gradient(45deg, #8ab4f8, #81c995)',
                  color: 'white',
                  '&:hover': {
                    background: (theme) => 
                      theme.palette.mode === 'light'
                        ? 'linear-gradient(45deg, #3367d6, #2e7d32)'
                        : 'linear-gradient(45deg, #669df6, #5bb974)',
                  },
                }}
              >
                Learn More
              </Button>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;