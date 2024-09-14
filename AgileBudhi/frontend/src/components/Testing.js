import React, { useState } from 'react';
import { 
  Typography, Box, TextField, Button, Paper, Grid, 
  CircularProgress, Fade
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  BugReport, Speed, Security, Mood
} from '@mui/icons-material';

const GradientPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  margin: theme.spacing(1),
  '&:hover': {
    background: 'linear-gradient(45deg, #2196F3 60%, #21CBF3 90%)',
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const Testing = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const simulateProcessing = async (actionType) => {
    setLoading(true);
    setResult('');
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing time
    setLoading(false);
    setResult(`${actionType} completed. Here are the results...`);
  };

  const createTestCases = () => simulateProcessing('Test case creation');
  const findBugs = () => simulateProcessing('Bug finding');
  const testScalability = () => simulateProcessing('Scalability testing');
  const testSecurityAndPrivacy = () => simulateProcessing('Security and privacy testing');
  const testUserExperience = () => simulateProcessing('User experience testing');

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#FE6B8B', fontWeight: 'bold' }}>
        Advanced Testing Suite
      </Typography>
      <GradientPaper elevation={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              label="Enter your code or test scenario"
              value={input}
              onChange={handleInputChange}
              sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 1
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledButton 
              fullWidth
              startIcon={<BugReport />}
              onClick={findBugs}
            >
              Find Bugs
            </StyledButton>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledButton
              fullWidth
              startIcon={<Speed />}
              onClick={testScalability}
            >
              Scalability Test
            </StyledButton>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledButton
              fullWidth
              startIcon={<Security />}
              onClick={testSecurityAndPrivacy}
            >
              Security & Privacy
            </StyledButton>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledButton
              fullWidth
              startIcon={<Mood />}
              onClick={testUserExperience}
            >
              UX Testing
            </StyledButton>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledButton
              fullWidth
              onClick={createTestCases}
            >
              Create Test Cases
            </StyledButton>
          </Grid>
        </Grid>
      </GradientPaper>
      <Fade in={loading || result !== ''}>
        <ContentBox>
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <Typography variant="body1">{result}</Typography>
          )}
        </ContentBox>
      </Fade>
    </Box>
  );
};

export default Testing;