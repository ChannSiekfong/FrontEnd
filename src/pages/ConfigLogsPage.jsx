// Config Logs — configuration audit trail (CONFIG LOGS sidebar)
import DashboardShell from '../components/layout/DashboardShell';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import Badge from '../components/ui/Badge';

const CONFIG_LOGS = [
  { event: 'DISPLAY_NAME_UPDATED',  actor: 'CORE_USER_01', detail: 'CORE_USER_01 → CORE_USER_01', time: '2023-11-24 10:15', level: 'INFO' },
  { event: 'THEME_SWITCHED',        actor: 'CORE_USER_01', detail: 'ONYX_DIGITAL applied',        time: '2023-11-23 16:42', level: 'INFO' },
  { event: 'GOVERNANCE_EXPORT',     actor: 'CORE_USER_01', detail: 'Neural cache exported',       time: '2023-11-23 14:02', level: 'INFO' },
  { event: 'ISOLATION_VERIFIED',    actor: 'SYSTEM',       detail: 'Protocol Alpha — PASS',       time: '2023-11-23 09:00', level: 'OK' },
  { event: 'GLOW_INTENSITY_CHANGED', actor: 'CORE_USER_01', detail: '64% → 72%',                  time: '2023-11-22 20:11', level: 'INFO' },
];

export default function ConfigLogsPage() {
  return (
    <DashboardShell>
      <AnimatedSection delay={0}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700,
            color: 'var(--text-primary)', letterSpacing: '0.04em', marginBottom: 8,
          }}>
            CONFIG LOGS
          </h1>
          <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.7, maxWidth: 520 }}>
            Audit trail of all configuration changes scoped to the active profile node.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={1}>
        <div className="table-scroll">
          <div style={{ border: '1px solid var(--border-dim)', background: 'var(--bg-card)', minWidth: 560 }}>
            <div className="config-log-header" style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr 1.5fr 120px 80px',
              padding: '12px 16px',
              borderBottom: '1px solid var(--border-dim)',
              fontSize: 9, letterSpacing: '0.14em', color: 'var(--text-dim)',
            }}>
              <span>EVENT</span>
              <span>ACTOR</span>
              <span>DETAIL</span>
              <span>TIMESTAMP</span>
              <span>LEVEL</span>
            </div>
            {CONFIG_LOGS.map((log) => (
              <div key={log.time + log.event} className="config-log-row" style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr 1.5fr 120px 80px',
                padding: '14px 16px',
                borderBottom: '1px solid var(--border-dim)',
                alignItems: 'center',
                fontSize: 11,
              }}>
                <span style={{ color: 'var(--text-primary)' }}>{log.event}</span>
                <span style={{ color: 'var(--text-dim)' }}>{log.actor}</span>
                <span style={{ color: 'var(--text-dim)' }}>{log.detail}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>{log.time}</span>
                <span>
                  <Badge variant={log.level === 'OK' ? 'success' : 'info'} label={log.level} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </DashboardShell>
  );
}
