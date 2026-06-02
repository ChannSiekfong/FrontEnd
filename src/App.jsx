// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import SignupPage from './pages/SignupPage';
import ProfileSelectionPage from './pages/ProfileSelectionPage';
import IntegrationsPage from './pages/IntegrationsPage';
import OmniSearchPage from './pages/OmniSearchPage';
import MemoryArchivesPage from './pages/MemoryArchivesPage';
import SystemConfigPage from './pages/SystemConfigPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" replace />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/profiles" element={<ProfileSelectionPage />} />
      {/* Dashboard routes — all share sidebar layout */}
      <Route path="/dashboard/omni-search" element={<OmniSearchPage />} />
      <Route path="/dashboard/memory-archives" element={<MemoryArchivesPage />} />
      <Route path="/dashboard/neural-links" element={<IntegrationsPage />} />
      <Route path="/dashboard/system-config" element={<SystemConfigPage />} />
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  );
}
