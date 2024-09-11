import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ShareIcon from '@mui/icons-material/Share';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
}));

const ContentBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  backdropFilter: 'blur(10px)',
}));

const GlowingButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  margin: theme.spacing(1),
  '&:hover': {
    background: 'linear-gradient(45deg, #FE8B8B 30%, #FFAE73 90%)',
    boxShadow: '0 5px 7px 2px rgba(255, 105, 135, .5)',
  },
}));

export default function Design() {
  const [requirements, setRequirements] = useState('');
  const [deadline, setDeadline] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');

  const handleShare = () => {
    console.log('Sharing:', { requirements, deadline, aiSuggestion });
    alert('Sharing functionality would be implemented here.');
  };

  const generateAiSuggestion = () => {
    setAiSuggestion(`Based on your requirements, consider the following:
1. Prioritize user experience design
2. Implement responsive layouts
3. Use a modular component structure
4. Integrate accessibility features
5. Plan for scalability and future updates`);
  };

  return (
    <StyledPaper elevation={10}>
      <ContentBox>
        <Typography variant="h4" gutterBottom sx={{ color: '#4a4a4a', fontWeight: 'bold' }}>
          AI-Enhanced Design
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#666' }}>
          Welcome to the future of project design. Let AI assist you in managing all aspects of your project's design phase.
        </Typography>
        
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Business Requirements"
            multiline
            rows={4}
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            margin="normal"
            variant="outlined"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField
            fullWidth
            label="Project Deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            variant="outlined"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 2 }}>
            <GlowingButton
              variant="contained"
              startIcon={<AutoAwesomeIcon />}
              onClick={generateAiSuggestion}
            >
              Generate AI Suggestion
            </GlowingButton>
            <GlowingButton
              variant="contained"
              startIcon={<ShareIcon />}
              onClick={handleShare}
            >
              Share Requirements
            </GlowingButton>
          </Box>
          {aiSuggestion && (
            <Box sx={{ mt: 2, mb: 2, backgroundColor: 'rgba(0, 0, 0, 0.05)', p: 2, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#4a4a4a' }}>
                AI Suggestion:
              </Typography>
              <Typography variant="body1" sx={{ color: '#666' }}>
                {aiSuggestion}
              </Typography>
            </Box>
          )}
        </Box>
      </ContentBox>
    </StyledPaper>
  );
}