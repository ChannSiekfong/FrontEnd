// Neural Links — integrations (DATA STREAMS sidebar)
import { useState } from 'react';
import DashboardShell from '../components/layout/DashboardShell';
import PageHeader from '../components/ui/PageHeader';
import { IntegrationCard, FeatureTiles } from '../components/sections/IntegrationsSections';
import { MailIcon, TelegramIcon } from '../components/ui/Icons';

export default function IntegrationsPage() {
  const [gmailConnected,    setGmailConnected]    = useState(true);
  const [telegramConnected, setTelegramConnected] = useState(false);

  return (
    <DashboardShell>
      <PageHeader
        title="NEURAL_INTEGRATIONS"
        badge="ACTIVE_PROFILE: ADMIN_NODE_01"
        desc={<>Manage data bridges for the current neural container. All integrated streams are <span style={{ color: 'var(--accent-blue)' }}>strictly isolated</span> to this profile's memory archives.</>}
      />

      <div className="animate-fade-up-delay-1 grid-2" style={{ marginBottom: 28 }}>
        <IntegrationCard
          name="Gmail" icon={<MailIcon size={18} color="var(--accent-blue)" />}
          connected={gmailConnected}
          lastSync="2 MIN AGO" activeFilters="Primary, Updates"
          bridgeId="GM-0021" securityNote="SECURITY PROTOCOL: AES-256-GCM"
          onDisconnect={() => setGmailConnected(false)}
          onSync={() => {}}
        />
        <IntegrationCard
          name="Telegram" icon={<TelegramIcon size={18} />}
          connected={telegramConnected}
          bridgeId="TG-0000" securityNote="ENCRYPTION LEVEL: PENDING"
          onConnect={() => setTelegramConnected(true)}
        />
      </div>

      <div className="animate-fade-up-delay-2">
        <FeatureTiles />
      </div>
    </DashboardShell>
  );
}
