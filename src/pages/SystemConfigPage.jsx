// src/pages/SystemConfigPage.jsx
import { useState } from 'react';
import DashboardShell from '../components/layout/DashboardShell';
import PageHeader from '../components/ui/PageHeader';
import Footer from '../components/ui/Footer';

import { 
  ProfileIdentitySection, 
  DataGovernanceSection, 
  NeuralThemeSection, 
  IsolationNotice 
} from '../components/sections/SystemConfigSections';

export default function SystemConfigPage() {
  const [displayName, setDisplayName] = useState('CORE_USER_01');

  return (
    <DashboardShell topBar="Profile Settings">
      <PageHeader
        title="SYSTEM_CONFIG"
        badge="LIVE_MODE"
        badgeVariant="live"
        desc={<>Configure your neural node and data isolation protocols. All changes are scoped to the active profile [<span style={{ color: 'var(--accent-blue)' }}>CORE_USER_01</span>].</>}
      />

      <ProfileIdentitySection displayName={displayName} setDisplayName={setDisplayName} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <DataGovernanceSection />
        <NeuralThemeSection />
      </div>

      <IsolationNotice />

      <Footer variant="config" />
    </DashboardShell>
  );
}