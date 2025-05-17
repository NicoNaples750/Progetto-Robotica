import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/login';
import Dashboard from './pages/dashboard';
import MissionControl from './pages/missioni';
import ReportPage from './pages/report';
import TemperatureMonitor from './pages/temperature';
import SkillList from './pages/skills';
import ImageGallery from './pages/immagini';
import TimelinePage from './pages/timeline';
import MissionCharts from './pages/grafici-missioni';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
        <Route path="/missioni" element={<ProtectedRoute element={MissionControl} />} />
        <Route path="/report" element={<ProtectedRoute element={ReportPage} />} />
        <Route path="/temperature" element={<ProtectedRoute element={TemperatureMonitor} />} />
        <Route path="/skills" element={<ProtectedRoute element={SkillList} />} />
        <Route path="/immagini" element={<ProtectedRoute element={ImageGallery} />} />
        <Route path="/timeline" element={<ProtectedRoute element={TimelinePage} />} />
        <Route path="/grafici-missioni" element={<ProtectedRoute element={MissionCharts} />} />
      </Routes>
    </Router>
  );
}

export default App;

