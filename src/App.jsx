// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import ProfileSelectionPage from './pages/ProfileSelectionPage';
import IntegrationsPage from './pages/IntegrationsPage';
import OmniSearchPage from './pages/OmniSearchPage';
import MemoryArchivesPage from './pages/MemoryArchivesPage';
import SystemConfigPage from './pages/SystemConfigPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/SignupPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profiles" element={<ProfileSelectionPage />} />
      {/* Dashboard routes — all share sidebar layout */}
      <Route path="/dashboard/omni-search" element={<OmniSearchPage />} />
      <Route path="/dashboard/memory-archives" element={<MemoryArchivesPage />} />
      <Route path="/dashboard/neural-links" element={<IntegrationsPage />} />
      <Route path="/dashboard/system-config" element={<SystemConfigPage />} />
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
