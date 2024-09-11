import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const GradientTypography = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(4),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.15s ease-in-out',
  '&:hover': { transform: 'scale3d(1.05, 1.05, 1)' },
}));

const services = [
  { title: 'AI-Powered Project Management', description: 'Leverage cutting-edge AI to optimize your project workflows.' },
  { title: 'Agile Transformation', description: 'Transform your organization with our agile methodologies and tools.' },
  { title: 'Digital Innovation', description: 'Stay ahead of the curve with our digital innovation solutions.' },
  { title: 'Cloud Services', description: 'Harness the power of cloud computing for your business needs.' },
];

function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <GradientTypography variant="h2" component="h1" gutterBottom>
        Welcome to AgileBudhi
      </GradientTypography>
      <Typography variant="h5" color="text.secondary" paragraph>
        Empowering your digital transformation journey with AI-driven solutions and agile methodologies.
      </Typography>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {services.map((service, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <StyledCard>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.description}
                </Typography>
              </CardContent>
              <Button size="small" sx={{ mt: 'auto', ml: 1, mb: 1 }}>Learn More</Button>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;