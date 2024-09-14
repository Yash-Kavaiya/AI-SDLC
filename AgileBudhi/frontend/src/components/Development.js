import React, { useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Typography, Button, TextField, Box, IconButton, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  background: 'linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)',
  borderRadius: 20,
  boxShadow: '0 10px 20px rgba(107, 70, 193, 0.2)',
}));

const ChatContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '60vh',
  overflowY: 'auto',
  marginBottom: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.9)',
  borderRadius: 15,
}));

const Message = styled(Box)(({ theme, isUser }) => ({
  display: 'flex',
  justifyContent: isUser ? 'flex-end' : 'flex-start',
  marginBottom: theme.spacing(1.5),
}));

const MessageContent = styled(Box)(({ theme, isUser }) => ({
  padding: theme.spacing(1.5, 2),
  borderRadius: 20,
  maxWidth: '70%',
  background: isUser 
    ? 'linear-gradient(135deg, #9F7AEA 0%, #6B46C1 100%)' 
    : 'linear-gradient(135deg, #4299E1 0%, #3182CE 100%)',
  color: 'white',
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
}));

const OptionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  background: 'linear-gradient(135deg, #9F7AEA 0%, #6B46C1 100%)',
  color: 'white',
  borderRadius: 25,
  padding: theme.spacing(1, 3),
  '&:hover': {
    background: 'linear-gradient(135deg, #805AD5 0%, #553C9A 100%)',
  },
}));

const InputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginTop: theme.spacing(2),
  alignItems: 'center',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  flexGrow: 1,
  marginRight: theme.spacing(1),
  '& .MuiOutlinedInput-root': {
    borderRadius: 30,
    background: 'rgba(255, 255, 255, 0.9)',
  },
}));

const InputOptionsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spacing(1),
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&:hover': {
    background: 'rgba(107, 70, 193, 0.1)',
  },
}));

export default function Development() {
  const [messages, setMessages] = useState([
    { text: "Welcome to the Development Assistant! How can I help you today?", isUser: false },
  ]);
  const [input, setInput] = useState('');
  const fileInputRef = useRef();

  const handleOptionClick = (option) => {
    setMessages([...messages, { text: option, isUser: true }]);
    let response;
    switch (option) {
      case "Generate Code":
        response = "Sure! I'd be happy to help you generate code. What specific functionality or feature would you like me to create code for?";
        break;
      case "Code Review":
        response = "Certainly! I can review your code for you. Please paste the code you'd like me to review, or upload a file, and I'll provide feedback on its structure, efficiency, and potential improvements.";
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
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "I've received your message. How else can I assist you with development?", isUser: false }]);
      }, 500);
    }
  };

  const handleAudioInput = () => {
    // Placeholder for audio input functionality
    setMessages([...messages, { text: "Voice input activated. Please speak now.", isUser: false }]);
  };

  const handleFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMessages([...messages, { text: `File uploaded: ${file.name}`, isUser: true }]);
      // Here you would typically process the file
      setTimeout(() => {
        setMessages(prev => [...prev, { text: `I've received the file ${file.name}. I'll analyze its contents and provide feedback shortly.`, isUser: false }]);
      }, 500);
    }
  };

  const handleImageInput = () => {
    // Placeholder for image input functionality
    setMessages([...messages, { text: "Image input activated. Please select an image to upload.", isUser: false }]);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom style={{ color: '#6B46C1' }}>
        Development Assistant
      </Typography>
      <StyledPaper>
        <ChatContainer>
          {messages.map((message, index) => (
            <Message key={index} isUser={message.isUser}>
              <Avatar sx={{ bgcolor: message.isUser ? '#9F7AEA' : '#4299E1', marginRight: message.isUser ? 1 : 0, marginLeft: message.isUser ? 0 : 1 }}>
                {message.isUser ? <PersonIcon /> : <SmartToyIcon />}
              </Avatar>
              <MessageContent isUser={message.isUser}>
                <Typography variant="body1">{message.text}</Typography>
              </MessageContent>
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
            style={{ borderRadius: 25, marginLeft: 8, background: 'linear-gradient(135deg, #9F7AEA 0%, #6B46C1 100%)' }}
          >
            Send
          </Button>
        </InputContainer>
        <InputOptionsContainer>
          <StyledIconButton onClick={handleAudioInput}>
            <MicIcon />
          </StyledIconButton>
          <StyledIconButton onClick={handleFileInput}>
            <AttachFileIcon />
          </StyledIconButton>
          <StyledIconButton onClick={handleImageInput}>
            <ImageIcon />
          </StyledIconButton>
        </InputOptionsContainer>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
      </StyledPaper>
    </div>
  );
}