// src/components/layout/Navbar.jsx
import { useNavigate, useLocation } from 'react-router-dom';


const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const ArchiveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
  </svg>
);

const LinkIcon2 = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const ConfigIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
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



export default function Navbar({ showSidebar = false }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const location = useLocation();
  const currentProfileId = localStorage.getItem('currentProfileId');
  const NAV_TABS = [
    { label: 'OMNI-SEARCH',  path: `/dashboard/omni-search?profileId=${currentProfileId}`, icon: <SearchIcon /> },
    { label: 'MEMORY-ARCHIVES', path: `/dashboard/memory-archives?profileId=${currentProfileId}`, icon: <ArchiveIcon /> },
    {label: 'NEURAL-LINKS', path: `/dashboard/neural-links?profileId=${currentProfileId}`, icon: <LinkIcon2 /> },
    { label: 'SYSTEM-CONFIG', path: `/dashboard/system-config?profileId=${currentProfileId}`, icon: <ConfigIcon /> },
  ];
  const activeTab = (() => {
    if (pathname.includes('/omni-search')) {
      return 'OMNI-SEARCH';
    }

    if (pathname.includes('/memory-archives')) {
      return 'MEMORY-ARCHIVES';
    }

    if (pathname.includes('/neural-links')) {
      return 'NEURAL-LINKS';
    }

    if (pathname.includes('/system-config')) {
      return 'SYSTEM-CONFIG';
    }

    return null;
  })();

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

      <div style={{ display: 'flex', gap: 10 }}>
        {NAV_TABS.map(tab => {
          const isActive = activeTab === tab.label;

          return (
            <button
              key={tab.label}
              onClick={() => navigate(tab.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,

                background: isActive
                  ? 'rgba(59,130,246,0.15)'
                  : 'transparent',

                border: isActive
                  ? '1px solid rgba(59,130,246,0.3)'
                  : '1px solid transparent',

                color: isActive
                  ? '#ffffff'
                  : 'rgba(255,255,255,0.55)',

                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: isActive ? 600 : 500,
                letterSpacing: '0.14em',

                cursor: 'pointer',
                padding: '8px 12px',


                transition: 'all 0.2s ease',
              }}

              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
                }
              }}

              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
                }
              }}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: isActive
                    ? '#ffffff'
                    : 'rgba(255,255,255,0.55)',
                }}
              >
                {tab.icon}
              </span>

              <span>{tab.label}</span>
            </button>
          );
        })}
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
