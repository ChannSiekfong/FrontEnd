// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import SignupPage from './pages/SignupPage';
import ProfileSelectionPage from './pages/ProfileSelectionPage';
import IntegrationsPage from './pages/IntegrationsPage';
import OmniSearchPage from './pages/OmniSearchPage';
import MemoryArchivesPage from './pages/MemoryArchivesPage';
import DataControlPage from './pages/DataControlPage';
import SyncStatusPage from './pages/SyncStatusPage';
import ConfigLogsPage from './pages/ConfigLogsPage';
import SystemConfigPage from './pages/SystemConfigPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" replace />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/profiles" element={<ProfileSelectionPage />} />

      <Route path="/dashboard/omni-search/*" element={<OmniSearchPage />} />
      <Route path="/dashboard/neural-links" element={<IntegrationsPage />} />
      <Route path="/dashboard/data-control" element={<DataControlPage />} />
      <Route path="/dashboard/memory-archives" element={<MemoryArchivesPage />} />
      <Route path="/dashboard/sync-status" element={<SyncStatusPage />} />
      <Route path="/dashboard/config-logs" element={<ConfigLogsPage />} />
      <Route path="/dashboard/system-config" element={<SystemConfigPage />} />

      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  );
}
