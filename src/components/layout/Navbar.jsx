// src/components/layout/Navbar.jsx
import { useNavigate, useLocation } from 'react-router-dom';

const BellIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const SyncIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
  </svg>
);

// Map nav tab → default dashboard route
const NAV_TABS = [
  { label: 'PERSONAL',  path: '/dashboard/omni-search' },
  { label: 'WORKSPACE', path: '/dashboard/memory-archives' },
  { label: 'ENCRYPTED', path: '/dashboard/system-config' },
];

export default function Navbar({ showSidebar = false }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const activeTab = pathname === '/profiles' ? null
    : pathname.includes('memory') ? 'WORKSPACE'
    : pathname.includes('system') ? 'ENCRYPTED'
    : 'PERSONAL';

  return (
    <nav style={{
      display: 'flex', alignItems: 'center',
      padding: '0 24px', height: 52,
      borderBottom: '1px solid var(--border-dim)',
      background: 'rgba(11,12,16,0.97)',
      backdropFilter: 'blur(8px)',
      gap: 32, position: 'sticky', top: 0, zIndex: 100,
    }}>
      <div style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: 18, letterSpacing: '0.08em',
        color: 'var(--text-primary)', cursor: 'pointer', minWidth: 160,
      }} onClick={() => navigate('/profiles')}>
        CONTEXT_SEARCH
      </div>

      <div style={{ display: 'flex', gap: 24 }}>
        {NAV_TABS.map(tab => (
          <button key={tab.label} onClick={() => navigate(tab.path)} style={{
            background: 'none', border: 'none',
            color: activeTab === tab.label ? 'var(--text-primary)' : 'var(--text-dim)',
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em',
            cursor: 'pointer', padding: '4px 0',
            borderBottom: activeTab === tab.label
              ? '1px solid var(--accent-blue)' : '1px solid transparent',
            transition: 'all 0.2s',
          }}>
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: 6 }}>
          <BellIcon />
        </button>
        <button style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: 6 }}>
          <SyncIcon />
        </button>
        {showSidebar ? (
          <button onClick={() => {
            navigate('/profiles')
            localStorage.removeItem("currentProfileId");
          }} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'var(--bg-card)', border: '1px solid var(--border-mid)',
            color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)',
            fontSize: 10, letterSpacing: '0.12em',
            padding: '6px 12px', cursor: 'pointer', transition: 'all 0.2s',
          }}>
            <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>A</span>
            PROFILE_SWITCH
          </button>
        ) : (
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))',
            cursor: 'pointer',
          }} onClick={() => navigate('/profiles')} />
        )}
      </div>
    </nav>
  );
}
