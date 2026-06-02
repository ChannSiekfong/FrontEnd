// src/components/layout/Sidebar.jsx
import { useNavigate, useLocation } from 'react-router-dom';

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const ArchiveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
  </svg>
);
const LinkIcon2 = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);
const ConfigIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const SecurityIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"/>
  </svg>
);
const LogoutIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const NAV_ITEMS = [
  { path: '/dashboard/omni-search',     icon: <SearchIcon />,  label: 'Omni-Search' },
  { path: '/dashboard/memory-archives', icon: <ArchiveIcon />, label: 'Memory Archives' },
  { path: '/dashboard/neural-links',    icon: <LinkIcon2 />,   label: 'Neural Links' },
  { path: '/dashboard/system-config',   icon: <ConfigIcon />,  label: 'System Config' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <aside style={{
      width: 200,
      height: '100vh',
      position: 'sticky',
      top: 0,
      background: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border-dim)',
      display: 'flex', flexDirection: 'column',
      padding: '20px 0', flexShrink: 0,
      overflowY: 'auto',
    }}>
      <nav style={{ flex: 1, padding: '0 8px' }}>
        {NAV_ITEMS.map(item => {
          const active = pathname === item.path;
          return (
            <button key={item.path} onClick={() => navigate(item.path)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px',
              background: active ? 'rgba(74,158,255,0.08)' : 'none',
              border: 'none',
              borderLeft: active ? '2px solid var(--accent-blue)' : '2px solid transparent',
              color: active ? 'var(--text-primary)' : 'var(--text-dim)',
              fontFamily: 'var(--font-mono)', fontSize: 12,
              cursor: 'pointer', textAlign: 'left',
              transition: 'all 0.2s', letterSpacing: '0.04em', marginBottom: 2,
            }}>
              <span style={{ color: active ? 'var(--accent-blue)' : 'var(--text-dim)' }}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div style={{ padding: '0 8px' }}>
        <button style={{
          width: '100%', padding: '11px 14px',
          background: 'rgba(168,85,247,0.15)',
          border: '1px solid rgba(168,85,247,0.3)',
          color: '#c084fc', fontFamily: 'var(--font-mono)', fontSize: 11,
          letterSpacing: '0.16em', cursor: 'pointer',
          marginBottom: 12, transition: 'all 0.2s',
        }}>
          SYNC_DATA
        </button>
        <button style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 12px', background: 'none', border: 'none',
          color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: 11,
          cursor: 'pointer', letterSpacing: '0.08em', marginBottom: 4,
        }}>
          <SecurityIcon /> Security
        </button>
        <button onClick={() => navigate('/signup')} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 12px', background: 'none', border: 'none',
          color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: 11,
          cursor: 'pointer', letterSpacing: '0.08em',
        }}>
          <LogoutIcon /> Log Out
        </button>
      </div>
    </aside>
  );
}
