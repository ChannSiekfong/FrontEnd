// Sync Status — system metrics (SYNC STATUS sidebar)
import DashboardShell from '../components/layout/DashboardShell';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import Badge from '../components/ui/Badge';
import { StatsRow } from '../components/sections/MemoryArchivesSections';

export default function SyncStatusPage() {
  return (
    <DashboardShell>
      <AnimatedSection delay={0}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700,
            color: 'var(--text-primary)', letterSpacing: '0.04em', marginBottom: 8,
          }}>
            SYNC STATUS
          </h1>
          <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.7, maxWidth: 520 }}>
            Real-time synchronization health across all connected neural bridges and local index nodes.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={1}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
          <Badge variant="live" label="SYSTEM_LIVE" />
          <Badge variant="success" label="SYNC_COMPLETE" />
          <Badge variant="info" label="ENC: AES-256" />
        </div>
      </AnimatedSection>

      <AnimatedSection delay={2}>
        <StatsRow />
      </AnimatedSection>
    </DashboardShell>
  );
}
