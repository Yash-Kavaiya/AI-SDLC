import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Typography, Button, TextField, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  background: 'linear-gradient(to right bottom, #ffffff, #f0f0f0)',
  boxShadow: '0 3px 5px 2px rgba(0, 120, 212, .3)',
}));

const ChatContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '60vh',
  overflowY: 'auto',
  marginBottom: theme.spacing(2),
  background: '#f5f5f5',
}));

const Message = styled(Box)(({ theme, isUser }) => ({
  padding: theme.spacing(1, 2),
  borderRadius: 20,
  maxWidth: '70%',
  marginBottom: theme.spacing(1),
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  background: isUser ? theme.palette.primary.main : theme.palette.secondary.main,
  color: 'white',
}));

const OptionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  background: 'linear-gradient(45deg, #0078D4 30%, #00BCF2 90%)',
  color: 'white',
  '&:hover': {
    background: 'linear-gradient(45deg, #006CBE 30%, #00A7D9 90%)',
  },
}));

const InputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginTop: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  flexGrow: 1,
  marginRight: theme.spacing(1),
}));

export default function Development() {
  const [messages, setMessages] = useState([
    { text: "Welcome to the Development Assistant! How can I help you today?", isUser: false },
  ]);
  const [input, setInput] = useState('');

  const handleOptionClick = (option) => {
    setMessages([...messages, { text: option, isUser: true }]);
    let response;
    switch (option) {
      case "Generate Code":
        response = "Sure! I'd be happy to help you generate code. What specific functionality or feature would you like me to create code for?";
        break;
      case "Code Review":
        response = "Certainly! I can review your code for you. Please paste the code you'd like me to review, and I'll provide feedback on its structure, efficiency, and potential improvements.";
        break;
      case "Improve Code":
        response = "Great! I can help you improve your existing code. Please share the code you'd like to enhance, and let me know what specific aspects you want to focus on (e.g., performance, readability, or specific functionality).";
        break;
      default:
        response = "I'm sorry, I didn't understand that option. Could you please try again?";
    }
    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 500);
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput('');
      // Here you would typically send the input to a backend or AI service
      // For now, we'll just echo a placeholder response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "I've received your message. How else can I assist you with development?", isUser: false }]);
      }, 500);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Development Assistant
      </Typography>
      <StyledPaper>
        <ChatContainer>
          {messages.map((message, index) => (
            <Message key={index} isUser={message.isUser}>
              <Typography variant="body1">{message.text}</Typography>
            </Message>
          ))}
        </ChatContainer>
        <Box>
          <OptionButton variant="contained" onClick={() => handleOptionClick("Generate Code")}>
            Generate Code
          </OptionButton>
          <OptionButton variant="contained" onClick={() => handleOptionClick("Code Review")}>
            Code Review
          </OptionButton>
          <OptionButton variant="contained" onClick={() => handleOptionClick("Improve Code")}>
            Improve Code
          </OptionButton>
        </Box>
        <InputContainer>
          <StyledTextField
            variant="outlined"
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            onClick={handleSend}
          >
            Send
          </Button>
        </InputContainer>
      </StyledPaper>
    </div>
  );
}