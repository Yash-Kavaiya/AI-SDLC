import React, { useState } from 'react';
import { Moon, Sun, Send, Code, FileText, Zap } from 'lucide-react';

const GoogleStyleUI = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [message, setMessage] = useState('');

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleSend = () => {
    console.log('Sending message:', message);
    setMessage('');
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: darkMode ? '#1a202c' : '#f7fafc',
      color: darkMode ? '#fff' : '#1a202c',
      transition: 'background-color 0.3s, color 0.3s',
      padding: '1rem',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      background: 'linear-gradient(to right, #3b82f6, #2dd4bf)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    toggleButton: {
      padding: '0.5rem',
      borderRadius: '9999px',
      backgroundColor: darkMode ? '#eab308' : '#1f2937',
      color: darkMode ? '#1f2937' : '#eab308',
      border: 'none',
      cursor: 'pointer',
    },
    main: {
      backgroundColor: darkMode ? '#2d3748' : '#fff',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      padding: '1.5rem',
      marginBottom: '2rem',
    },
    messageContainer: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: '1.5rem',
    },
    iconContainer: {
      backgroundColor: '#3b82f6',
      color: '#fff',
      padding: '0.5rem',
      borderRadius: '9999px',
      marginRight: '0.75rem',
    },
    message: {
      backgroundColor: darkMode ? '#4a5568' : '#edf2f7',
      padding: '0.75rem',
      borderRadius: '0.5rem',
      maxWidth: '20rem',
    },
    buttonContainer: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '1.5rem',
    },
    actionButton: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.5rem 1rem',
      borderRadius: '9999px',
      fontWeight: '600',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    input: {
      flexGrow: 1,
      marginRight: '1rem',
      padding: '0.75rem',
      borderRadius: '9999px',
      backgroundColor: darkMode ? '#4a5568' : '#edf2f7',
      border: 'none',
      outline: 'none',
    },
    sendButton: {
      backgroundColor: '#3b82f6',
      color: '#fff',
      padding: '0.75rem',
      borderRadius: '9999px',
      border: 'none',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={styles.header}>
          <h1 style={styles.title}>DevAssist</h1>
          <button onClick={toggleDarkMode} style={styles.toggleButton}>
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </header>
        <main style={styles.main}>
          <div style={styles.messageContainer}>
            <div style={styles.iconContainer}>
              <Code size={20} />
            </div>
            <p style={styles.message}>
              Welcome to DevAssist! How can I help you today?
            </p>
          </div>
          <div style={styles.buttonContainer}>
            <button style={{ ...styles.actionButton, backgroundColor: '#3b82f6' }}>
              <Code size={20} style={{ marginRight: '0.5rem' }} /> Generate Code
            </button>
            <button style={{ ...styles.actionButton, backgroundColor: '#10b981' }}>
              <FileText size={20} style={{ marginRight: '0.5rem' }} /> Code Review
            </button>
            <button style={{ ...styles.actionButton, backgroundColor: '#8b5cf6' }}>
              <Zap size={20} style={{ marginRight: '0.5rem' }} /> Optimize Code
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              style={styles.input}
            />
            <button onClick={handleSend} style={styles.sendButton}>
              <Send size={20} />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GoogleStyleUI;