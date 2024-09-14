import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const lineChartData = [
  { name: 'Sprint 1', productivity: 65, quality: 78 },
  { name: 'Sprint 2', productivity: 70, quality: 82 },
  { name: 'Sprint 3', productivity: 75, quality: 85 },
  { name: 'Sprint 4', productivity: 80, quality: 88 },
  { name: 'Sprint 5', productivity: 85, quality: 90 },
];

const barChartData = [
  { name: 'Coding', time: 40 },
  { name: 'Testing', time: 25 },
  { name: 'Planning', time: 20 },
  { name: 'Review', time: 15 },
];

const pieChartData = [
  { name: 'Features', value: 60 },
  { name: 'Bugs', value: 25 },
  { name: 'Tech Debt', value: 15 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

const Icon = ({ name }) => {
  const icons = {
    sun: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
    moon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
    activity: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    code: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    bug: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="6" width="8" height="14" rx="4" /><path d="M19 7v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7" /><path d="M13 5V3" /><path d="M8 21v-2" /><path d="M16 21v-2" />
      </svg>
    ),
    users: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    zap: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  };
  return icons[name] || null;
};

const MetricCard = ({ icon, title, value, trend }) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '1rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ color: '#3B82F6' }}>{icon}</span>
        <h3 style={{ marginLeft: '0.5rem', fontSize: '1.125rem', fontWeight: '600' }}>{title}</h3>
      </div>
      <span style={{
        fontSize: '0.875rem',
        fontWeight: '500',
        color: trend > 0 ? '#10B981' : '#EF4444',
      }}>
        {trend > 0 ? '+' : ''}{trend}%
      </span>
    </div>
    <p style={{ marginTop: '0.5rem', fontSize: '1.875rem', fontWeight: '700' }}>{value}</p>
  </div>
);

const SDLCAIDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const styles = {
    container: {
      fontFamily: 'Helvetica, Arial, sans-serif',
      backgroundColor: darkMode ? '#1F2937' : '#F3F4F6',
      color: darkMode ? '#F9FAFB' : '#1F2937',
      minHeight: '100vh',
    },
    header: {
      background: darkMode ? 
        'linear-gradient(to right, #1E3A8A, #5B21B6)' :
        'linear-gradient(to right, #3B82F6, #8B5CF6)',
      padding: '1rem',
      color: 'white',
    },
    headerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1280px',
      margin: '0 auto',
    },
    main: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '2rem 1rem',
    },
    grid: {
      display: 'grid',
      gap: '1.5rem',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    },
    card: {
      backgroundColor: darkMode ? '#374151' : 'white',
      borderRadius: '0.5rem',
      padding: '1rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    },
    cardTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '1rem',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
    },
    listItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '0.5rem',
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Icon name="zap" />
            <span style={{ marginLeft: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold' }}>SDLC AI Assistant</span>
          </div>
          <button onClick={toggleDarkMode} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}>
            <Icon name={darkMode ? 'sun' : 'moon'} />
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem' }}>SDLC Performance Dashboard</h1>
        
        <div style={styles.grid}>
          <MetricCard icon={<Icon name="activity" />} title="Sprint Velocity" value="32 pts" trend={5} />
          <MetricCard icon={<Icon name="code" />} title="Code Coverage" value="87%" trend={2} />
          <MetricCard icon={<Icon name="bug" />} title="Open Issues" value="24" trend={-10} />
          <MetricCard icon={<Icon name="users" />} title="Team Satisfaction" value="4.7/5" trend={3} />
        </div>

        <div style={{ ...styles.grid, marginTop: '2rem' }}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Productivity & Quality Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="productivity" stroke="#3B82F6" />
                <Line type="monotone" dataKey="quality" stroke="#10B981" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Time Allocation</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="time" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ ...styles.grid, marginTop: '2rem' }}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Work Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>AI-Powered Insights</h2>
            <ul style={styles.list}>
              {['Code quality improved by 15% this sprint',
                'Suggested refactoring for 3 critical modules',
                'Detected potential security vulnerability in API',
                'Recommended 2 new unit tests for edge cases'].map((insight, index) => (
                <li key={index} style={styles.listItem}>
                  <Icon name="zap" />
                  <span style={{ marginLeft: '0.5rem' }}>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SDLCAIDashboard;