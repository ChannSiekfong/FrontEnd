// src/pages/SystemConfigPage.jsx
import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';

const FingerprintBg = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" fill="none" style={{ opacity: 0.06, position: 'absolute', right: 16, top: 10 }}>
    <path d="M50 10 C28 10 10 28 10 50 C10 72 28 90 50 90" stroke="white" strokeWidth="2" fill="none"/>
    <path d="M50 18 C32 18 18 32 18 50 C18 68 32 82 50 82" stroke="white" strokeWidth="2" fill="none"/>
    <path d="M50 26 C36 26 26 36 26 50 C26 64 36 74 50 74" stroke="white" strokeWidth="2" fill="none"/>
    <path d="M50 34 C40 34 34 40 34 50 C34 60 40 66 50 66" stroke="white" strokeWidth="2" fill="none"/>
    <path d="M50 42 C44 42 42 46 42 50 C42 54 44 58 50 58" stroke="white" strokeWidth="2" fill="none"/>
  </svg>
);

export default function SystemConfigPage() {
  const [displayName, setDisplayName] = useState('CORE_USER_01');
  const [glowIntensity, setGlowIntensity] = useState(64);
  const [highContrast, setHighContrast] = useState(false);
  const [theme, setTheme] = useState('ONYX_DIGITAL');
  const [saved, setSaved] = useState(false);

  const handleCommit = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-base)' }}>
      <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em', padding: '5px 18px', background: 'rgba(10,11,14,.95)', borderBottom: '1px solid var(--border-dim)' }}>
        Profile Settings
      </div>
      <Navbar showSidebar />

      <div style={{ display: 'flex', flex: 1, alignItems: 'flex-start' }}>
        <Sidebar />

        <main style={{ flex: 1, padding: '28px 32px', overflowY: 'auto', marginLeft: 200 }}>
          {/* Page header */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, letterSpacing: '0.04em', color: 'var(--text-primary)' }}>
                SYSTEM_CONFIG
              </h1>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 9, letterSpacing: '0.14em', color: 'var(--accent-green)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-green)', display: 'inline-block', animation: 'pulse-dot 2s ease-in-out infinite' }} />
                LIVE_MODE
              </span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.6, maxWidth: 520 }}>
              Configure your neural node and data isolation protocols. All changes are scoped to the active profile [<span style={{ color: 'var(--accent-blue)' }}>CORE_USER_01</span>].
            </p>
          </div>

          {/* Profile Identity */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-mid)',
            padding: '22px 24px',
            marginBottom: 20,
            position: 'relative', overflow: 'hidden',
          }}>
            <FingerprintBg />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: 'var(--text-secondary)', marginBottom: 20 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              PROFILE IDENTITY
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 12, alignItems: 'end' }}>
              <div>
                <label style={{ display: 'block', fontSize: 8, letterSpacing: '0.18em', color: 'var(--text-dim)', marginBottom: 6 }}>
                  DISPLAY NAME
                </label>
                <input
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 12px',
                    background: 'var(--bg-input)', border: '1px solid var(--border-mid)',
                    color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: 12,
                    outline: 'none', letterSpacing: '0.06em',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border-mid)'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 8, letterSpacing: '0.18em', color: 'var(--text-dim)', marginBottom: 6 }}>
                  NEURAL ID
                </label>
                <input
                  defaultValue="NX-8842-SYST"
                  readOnly
                  style={{
                    width: '100%', padding: '10px 12px',
                    background: 'var(--bg-input)', border: '1px solid var(--border-dim)',
                    color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 12,
                    outline: 'none', letterSpacing: '0.06em', cursor: 'not-allowed',
                  }}
                />
              </div>
              <button onClick={handleCommit} style={{
                padding: '10px 18px',
                background: saved ? 'rgba(74,240,196,0.15)' : 'rgba(74,158,255,0.15)',
                border: `1px solid ${saved ? 'rgba(74,240,196,0.4)' : 'rgba(74,158,255,0.4)'}`,
                color: saved ? 'var(--accent-green)' : 'var(--accent-blue)',
                fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em',
                cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s',
              }}>
                {saved ? 'SAVED ✓' : 'COMMIT_CHANGES'}
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 9, letterSpacing: '0.12em', color: 'var(--accent-amber)' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                Danger Zone
              </span>
              <button style={{
                background: 'none', border: 'none',
                color: '#ef4444', fontFamily: 'var(--font-mono)',
                fontSize: 9, letterSpacing: '0.12em', cursor: 'pointer',
              }}>
                DELETE_PROFILE_PERMANENTLY
              </button>
            </div>
          </div>

          {/* Two-col row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            {/* Data Governance */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-mid)', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: 'var(--text-secondary)', marginBottom: 18 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                </svg>
                DATA GOVERNANCE
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <div>
                    <p style={{ fontSize: 12, color: 'var(--text-primary)', marginBottom: 3 }}>Neural Cache</p>
                    <p style={{ fontSize: 10, color: 'var(--text-dim)', lineHeight: 1.5 }}>Export your indexed memories into a portable JSON matrix.</p>
                  </div>
                  <button style={{
                    padding: '5px 10px', background: 'var(--bg-input)',
                    border: '1px solid var(--border-mid)',
                    color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)',
                    fontSize: 9, letterSpacing: '0.12em', cursor: 'pointer',
                    whiteSpace: 'nowrap', marginLeft: 12, transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-blue)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-mid)'}
                  >
                    EXPORT_DATA
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <div>
                    <p style={{ fontSize: 12, color: '#ef4444', marginBottom: 3 }}>Purge History</p>
                    <p style={{ fontSize: 10, color: 'var(--text-dim)', lineHeight: 1.5 }}>Instant wipe of all localized search data and context history.</p>
                  </div>
                  <button style={{
                    padding: '5px 10px',
                    background: 'rgba(239,68,68,0.15)',
                    border: '1px solid rgba(239,68,68,0.4)',
                    color: '#ef4444', fontFamily: 'var(--font-mono)',
                    fontSize: 9, letterSpacing: '0.12em', cursor: 'pointer',
                    whiteSpace: 'nowrap', marginLeft: 12,
                  }}>
                    PURGE_SYST
                  </button>
                </div>
              </div>

              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 12px', background: 'var(--bg-input)',
                border: '1px solid var(--border-dim)',
                fontSize: 9, letterSpacing: '0.1em', color: 'var(--text-muted)',
              }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#e8a04a', display: 'inline-block' }} />
                Last backup: 2024-05-22 14:00 UTC
              </div>
            </div>

            {/* Neural Theme */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-mid)', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: 'var(--text-secondary)', marginBottom: 18 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
                NEURAL THEME
              </div>

              {/* Theme selector */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
                {['ONYX_DIGITAL', 'PAPER_LIGHT'].map(t => (
                  <button key={t} onClick={() => setTheme(t)} style={{
                    padding: '14px 10px',
                    background: theme === t ? 'rgba(74,158,255,0.1)' : 'var(--bg-input)',
                    border: `1px solid ${theme === t ? 'var(--accent-blue)' : 'var(--border-mid)'}`,
                    cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
                  }}>
                    <div style={{
                      width: 32, height: 20,
                      background: t === 'ONYX_DIGITAL' ? '#111318' : '#f5f5f0',
                      border: '1px solid var(--border-mid)',
                      margin: '0 auto 8px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <div style={{ width: 16, height: 3, background: t === 'ONYX_DIGITAL' ? 'var(--accent-blue)' : '#888' }} />
                    </div>
                    <span style={{ fontSize: 8, letterSpacing: '0.12em', color: theme === t ? 'var(--text-primary)' : 'var(--text-dim)' }}>
                      {t}
                    </span>
                  </button>
                ))}
              </div>

              {/* Glow slider */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-secondary)', marginBottom: 8 }}>
                  <span>Ambient Glow Intensity</span>
                  <span style={{ color: 'var(--text-primary)' }}>{glowIntensity}%</span>
                </div>
                <input
                  type="range" min="0" max="100" value={glowIntensity}
                  onChange={e => setGlowIntensity(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-blue)', height: 4, cursor: 'pointer' }}
                />
              </div>

              {/* HUD toggle */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>High-Contrast HUD Mode</span>
                <button onClick={() => setHighContrast(v => !v)} style={{
                  width: 36, height: 20,
                  background: highContrast ? 'var(--accent-blue)' : 'var(--border-mid)',
                  border: 'none', borderRadius: 10,
                  cursor: 'pointer', position: 'relative', transition: 'background 0.2s',
                }}>
                  <span style={{
                    position: 'absolute',
                    top: 2, left: highContrast ? 18 : 2,
                    width: 16, height: 16, borderRadius: '50%',
                    background: 'white', transition: 'left 0.2s',
                  }} />
                </button>
              </div>
            </div>
          </div>

          {/* Isolation Protocol Alpha */}
          <div style={{
            background: '#0d1420',
            border: '1px solid rgba(74,158,255,0.2)',
            padding: '22px 24px',
            display: 'flex', gap: 18, alignItems: 'flex-start',
          }}>
            <div style={{
              width: 44, height: 44, flexShrink: 0,
              background: 'rgba(74,158,255,0.1)',
              border: '1px solid rgba(74,158,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="1.5">
                <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', color: 'var(--accent-blue)', marginBottom: 8 }}>
                ISOLATION PROTOCOL ALPHA
              </p>
              <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.7 }}>
                Settings on this screen are strictly encapsulated. No data from{' '}
                <span style={{ color: 'var(--accent-blue)' }}>CORE_USER_01</span>{' '}
                leaks to shared neural repositories. Your local search index is encrypted using AES-256 and salt-derived keys stored in your browser's private vault.
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Bottom status */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '8px 20px', borderTop: '1px solid var(--border-dim)',
        background: 'rgba(10,11,14,.9)',
        fontSize: 8, letterSpacing: '0.12em', color: 'var(--text-muted)',
      }}>
        <div style={{ display: 'flex', gap: 16 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-green)', display: 'inline-block' }} />
            LATENCY: 12MS
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-blue)', display: 'inline-block' }} />
            NEURAL LOAD: 4%
          </span>
        </div>
        <span>© 2024 CONTEXT_SEARCH_SYSTEMS // SECURE_NODE_129</span>
      </div>
    </div>
  );
}
