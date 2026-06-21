// System Config — settings page (navbar Config tab)
import { useState } from 'react';
import DashboardShell from '../components/layout/DashboardShell';
import PageHeader from '../components/ui/PageHeader';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import {
  ProfileIdentitySection,
  DataGovernanceSection,
  NeuralThemeSection,
  IsolationNotice,
} from '../components/sections/SystemConfigSections';

export default function SystemConfigPage() {
  const [displayName, setDisplayName] = useState('CORE_USER_01');

  return (
    <DashboardShell>
      <PageHeader
        title="SYSTEM_CONFIG"
        badge="LIVE_MODE"
        badgeVariant="live"
        desc={<>Configure your neural node and data isolation protocols. All changes are scoped to the active profile [<span style={{ color: 'var(--accent-blue)' }}>CORE_USER_01</span>].</>}
      />

      <AnimatedSection delay={1}>
        <ProfileIdentitySection displayName={displayName} setDisplayName={setDisplayName} />
      </AnimatedSection>

      <AnimatedSection delay={2}>
        <div className="grid-2" style={{ marginBottom: 20 }}>
          <DataGovernanceSection />
          <NeuralThemeSection />
        </div>
      </AnimatedSection>

      <AnimatedSection delay={3}>
        <IsolationNotice />
      </AnimatedSection>
    </DashboardShell>
  );
}
