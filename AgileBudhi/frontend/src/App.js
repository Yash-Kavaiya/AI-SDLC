import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Design from './components/Design';
import Development from './components/Development';
import Testing from './components/Testing';
import Deployment from './components/Deployment';
import Maintenance from './components/Maintenance';
import AIInsights from './components/AIInsights';
import Analytics from './components/Analytics';

// Create a context for the dark mode
const DarkModeContext = createContext();

// Custom hook to use the dark mode context
export const useDarkMode = () => useContext(DarkModeContext);

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Styles for the app container
  const appStyles = {
    minHeight: '100vh',
    fontFamily: 'Helvetica, Arial, sans-serif',
    backgroundColor: darkMode ? '#1F2937' : '#F3F4F6',
    color: darkMode ? '#F9FAFB' : '#1F2937',
    transition: 'background-color 0.3s, color 0.3s',
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <Router>
        <div style={appStyles}>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/design" element={<Design />} />
              <Route path="/development" element={<Development />} />
              <Route path="/testing" element={<Testing />} />
              <Route path="/deployment" element={<Deployment />} />
              <Route path="/maintenance" element={<Maintenance />} />
              <Route path="/ai-insights" element={<AIInsights />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </DarkModeContext.Provider>
  );
}

export default App;