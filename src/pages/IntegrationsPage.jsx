// src/pages/IntegrationsPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import StatusBar from '../components/ui/StatusBar';

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a9eff" strokeWidth="1.5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const TelegramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#a855f7" strokeWidth="1.5"/>
    <path d="M8 12l2 2 4-4" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6 12l4 4 8-8" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SyncIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
  </svg>
);

const LinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

const DBIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4a9eff" strokeWidth="1.2">
    <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
);

const ShieldIcon2 = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.2">
    <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"/>
  </svg>
);

const DiamondIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e8a04a" strokeWidth="1.2">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

function IntegrationCard({ name, icon, connected, lastSync, activeFilters, bridgeId, securityNote, onDisconnect, onSync, onConnect }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-dim)',
      padding: 20,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36,
            background: 'var(--bg-input)',
            border: '1px solid var(--border-mid)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {icon}
          </div>
          <div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 20, fontWeight: 700,
              color: 'var(--text-primary)', marginBottom: 2,
            }}>{name}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 9, letterSpacing: '0.12em' }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: connected ? 'var(--accent-green)' : 'var(--text-muted)',
                display: 'inline-block',
              }} />
              <span style={{ color: connected ? 'var(--accent-green)' : 'var(--text-dim)' }}>
                {connected ? 'CONNECTED' : 'DISCONNECTED'}
              </span>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontSize: 8, letterSpacing: '0.14em',
            border: '1px solid var(--border-mid)',
            padding: '2px 8px',
            color: 'var(--text-dim)',
            marginBottom: 4,
          }}>
            STRICTLY ISOLATED
          </div>
          <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
            BRIDGE_ID: {bridgeId}
          </div>
        </div>
      </div>

      {/* Body */}
      {connected ? (
        <>
          <div style={{
            background: 'var(--bg-input)',
            border: '1px solid var(--border-dim)',
            padding: '12px 16px',
            marginBottom: 14,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 9, letterSpacing: '0.14em', color: 'var(--text-dim)' }}>LAST SYNC EVENT</span>
              <span style={{ fontSize: 9, letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>{lastSync}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 9, letterSpacing: '0.14em', color: 'var(--text-dim)' }}>ACTIVE FILTERS</span>
              <span style={{ fontSize: 9, letterSpacing: '0.1em', color: 'var(--accent-blue)' }}>{activeFilters}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
            <button onClick={onDisconnect} style={{
              flex: 1, padding: '10px',
              background: 'var(--bg-input)', border: '1px solid var(--border-mid)',
              color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)',
              fontSize: 10, letterSpacing: '0.14em', cursor: 'pointer',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#ef4444'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-mid)'}
            >
              DISCONNECT
            </button>
            <button onClick={onSync} style={{
              flex: 1, padding: '10px',
              background: 'rgba(74,158,255,0.15)',
              border: '1px solid rgba(74,158,255,0.4)',
              color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)',
              fontSize: 10, letterSpacing: '0.14em', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(74,158,255,0.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(74,158,255,0.15)'; }}
            >
              <SyncIcon /> SYNC NOW
            </button>
          </div>
        </>
      ) : (
        <>
          <div style={{
            background: 'var(--bg-input)',
            border: '1px dashed var(--border-mid)',
            padding: '28px 16px',
            marginBottom: 14,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--border-mid)" strokeWidth="1.5">
              <path d="M3 15a4 4 0 0 0 4 4h9a5 5 0 0 0 1.8-9.7 7 7 0 0 0-13.3-2.4A4 4 0 0 0 3 15z"/>
            </svg>
            <p style={{ fontSize: 9, letterSpacing: '0.14em', color: 'var(--text-muted)' }}>
              NO ACTIVE BRIDGE ESTABLISHED
            </p>
          </div>

          <button onClick={onConnect} style={{
            width: '100%', padding: '12px',
            background: 'rgba(168,85,247,0.15)',
            border: '1px solid rgba(168,85,247,0.4)',
            color: '#c084fc', fontFamily: 'var(--font-mono)',
            fontSize: 10, letterSpacing: '0.14em', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            marginBottom: 14, transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(168,85,247,0.25)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(168,85,247,0.15)'; }}
          >
            <LinkIcon /> CONNECT ACCOUNT
          </button>
        </>
      )}

      {/* Footer */}
      <div style={{
        borderTop: '1px solid var(--border-dim)',
        paddingTop: 10,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 9, letterSpacing: '0.1em', color: 'var(--text-muted)',
      }}>
        <span>{securityNote}</span>
        {connected ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"/>
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        )}
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, gradient }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-dim)',
      overflow: 'hidden',
      cursor: 'default',
      transition: 'border-color 0.2s',
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-bright)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-dim)'}
    >
      <div style={{
        height: 80,
        background: gradient,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {icon}
      </div>
      <div style={{ padding: '14px 16px' }}>
        <p style={{ fontSize: 9, letterSpacing: '0.18em', color: 'var(--text-secondary)', marginBottom: 6 }}>
          {title}
        </p>
        <p style={{ fontSize: 10, color: 'var(--text-dim)', lineHeight: 1.5 }}>{desc}</p>
      </div>
    </div>
  );
}

export default function IntegrationsPage() {
  const [gmailConnected, setGmailConnected] = useState(true);
  const [telegramConnected, setTelegramConnected] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-base)' }}>
      <Navbar showSidebar />

      <div style={{ display: 'flex', flex: 1, alignItems: 'flex-start' }}>
        <Sidebar />

        {/* Main content */}
        <main style={{ flex: 1, padding: '32px 36px', overflowY: 'auto' }}>
          {/* Page header */}
          <div className="animate-fade-up" style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10 }}>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 32, fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '0.04em',
              }}>
                NEURAL_INTEGRATIONS
              </h1>
              <div style={{
                background: 'rgba(168,85,247,0.15)',
                border: '1px solid rgba(168,85,247,0.3)',
                padding: '3px 10px',
                fontSize: 9, letterSpacing: '0.14em',
                color: '#c084fc',
              }}>
                ACTIVE_PROFILE: ADMIN_NODE_01
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.6, maxWidth: 580 }}>
              Manage data bridges for the current neural container. All integrated streams are{' '}
              <span style={{ color: 'var(--accent-blue)' }}>strictly isolated</span>{' '}
              to this profile's memory archives.
            </p>
          </div>

          {/* Integration cards */}
          <div className="animate-fade-up-delay-1" style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 20, marginBottom: 28,
          }}>
            <IntegrationCard
              name="Gmail"
              icon={<MailIcon />}
              connected={gmailConnected}
              lastSync="2 MIN AGO"
              activeFilters="Primary, Updates"
              bridgeId="GM-0021"
              securityNote="SECURITY PROTOCOL: AES-256-GCM"
              onDisconnect={() => setGmailConnected(false)}
              onSync={() => {}}
            />
            <IntegrationCard
              name="Telegram"
              icon={<TelegramIcon />}
              connected={telegramConnected}
              bridgeId="TG-0000"
              securityNote="ENCRYPTION LEVEL: PENDING"
              onConnect={() => setTelegramConnected(true)}
            />
          </div>

          {/* Feature cards */}
          <div className="animate-fade-up-delay-2" style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
          }}>
            <FeatureCard
              icon={<DBIcon />}
              title="LOCAL STORAGE"
              desc="All sync data is encrypted with local keys."
              gradient="linear-gradient(135deg, #0d1a2e, #152035)"
            />
            <FeatureCard
              icon={<ShieldIcon2 />}
              title="PERMISSION GUARD"
              desc="Granular control over specific folder syncs."
              gradient="linear-gradient(135deg, #1a0d2e, #251535)"
            />
            <FeatureCard
              icon={<DiamondIcon />}
              title="API INTEGRITY"
              desc="Direct bridge connection, no middleware."
              gradient="linear-gradient(135deg, #2a1a08, #1e1408)"
            />
          </div>
        </main>
      </div>

      {/* Status bar */}
      <StatusBar
        left={[
          { label: 'NODE_HASH' },
          { label: '0xAF82...9931' },
          { label: 'SYSTEM_LOAD' },
          { label: '0.04 MS / 0PS' },
        ]}
        right="PROTOCOL_STABLE // NO_LEAKS_DETECTED"
      />
    </div>
  );
}
