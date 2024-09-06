import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import KanbanBoard from './pages/KanbanBoard';
import ProjectManager from './pages/ProjectManager';
import Developer from './pages/Developer';
import Tester from './pages/Tester';
import Deployment from './pages/Deployment';
import Client from './pages/Client';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<KanbanBoard />} />
            <Route path="/project-manager" element={<ProjectManager />} />
            <Route path="/developer" element={<Developer />} />
            <Route path="/tester" element={<Tester />} />
            <Route path="/deployment" element={<Deployment />} />
            <Route path="/client" element={<Client />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
