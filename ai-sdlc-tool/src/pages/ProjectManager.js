import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import './ProjectManager.css';

const ProjectManager = () => {
  const [requirement, setRequirement] = useState('');
  const [aiGeneratedRequirement, setAiGeneratedRequirement] = useState('');

  const handleGenerateRequirement = async () => {
    // Make an API call to your AI service for generating requirements
    const response = await axios.post('/api/generate-requirement', { text: requirement });
    setAiGeneratedRequirement(response.data.generatedText);
  };

  return (
    <div>
      <h2>Project Manager</h2>
      <TextField
        label="Business Requirement"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={requirement}
        onChange={(e) => setRequirement(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleGenerateRequirement} style={{ marginTop: '10px' }}>
        Generate AI-Based Requirement
      </Button>
      {aiGeneratedRequirement && (
        <div style={{ marginTop: '20px', backgroundColor: '#f1f1f1', padding: '15px' }}>
          <h4>AI-Generated Requirement:</h4>
          <p>{aiGeneratedRequirement}</p>
        </div>
      )}
    </div>
  );
};

export default ProjectManager;
