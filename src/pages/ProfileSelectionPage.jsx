// src/pages/ProfileSelectionPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import StatusBar from '../components/ui/StatusBar';
import CornerBrackets from '../components/ui/CornerBrackets';

const BriefcaseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
  </svg>
);

const PersonIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/>
  </svg>
);

const MailIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);

const CloudIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
  </svg>
);

const PlayIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

const MusicIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4af0c4" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

function ProfileCard({ profile, onSelect }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onSelect(profile)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: hovered ? 'var(--bg-card-hover)' : 'var(--bg-card)',
        border: `1px solid ${hovered ? 'var(--border-bright)' : 'var(--border-dim)'}`,
        padding: '24px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        minWidth: 0,
      }}
    >
      <CornerBrackets color={hovered ? '#4a9eff' : '#2e3a4f'} />

      {/* Type badge */}
      <div style={{
        position: 'absolute', top: 14, right: 14,
        fontSize: 8, letterSpacing: '0.16em',
        color: 'var(--text-dim)',
        border: '1px solid var(--border-mid)',
        padding: '2px 6px',
        background: 'var(--bg-base)',
      }}>
        {profile.type.toUpperCase()}
      </div>

      {/* Icon */}
      <div style={{
        width: 52, height: 52,
        border: '1px solid var(--border-bright)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--accent-blue)',
        marginBottom: 16,
        background: 'var(--bg-input)',
      }}>
        {profile.type === 'workspace' ? <BriefcaseIcon /> : <PersonIcon />}
      </div>

      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 22, fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: 4,
      }}>
        {profile.name}
      </h3>
      <p style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: '0.06em', marginBottom: 20 }}>
        Last Sync: {profile.lastSync}
      </p>

      {/* App icons */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {profile.apps.map((app, i) => (
          <div key={i} style={{
            width: 22, height: 22,
            border: '1px solid var(--border-mid)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-dim)',
            background: 'var(--bg-input)',
          }}>
            {app}
          </div>
        ))}
        {/* Progress bar */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <div style={{
            height: 2, flex: 1,
            background: 'var(--border-dim)',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', left: 0, top: 0,
              height: '100%',
              width: `${profile.progress}%`,
              background: `linear-gradient(90deg, var(--accent-blue), var(--accent-purple))`,
            }} />
          </div>
        </div>
      </div>

      {/* Sync status */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 16,
      }}>
        <span style={{ fontSize: 9, letterSpacing: '0.14em', color: 'var(--accent-green)' }}>
          SYNC_COMPLETE
        </span>
        <CheckIcon />
      </div>

      {/* Initialize button */}
      <button style={{
        width: '100%', padding: '10px',
        background: 'var(--bg-input)', border: '1px solid var(--border-mid)',
        color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)',
        fontSize: 10, letterSpacing: '0.16em', cursor: 'pointer',
        transition: 'all 0.2s',
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-blue)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-mid)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
      >
        INITIALIZE_PROFILE
      </button>

      {/* Corner indicator */}
      <div style={{
        position: 'absolute', bottom: 8, right: 8,
        width: 6, height: 6,
        background: 'var(--border-bright)',
      }} />
    </div>
  );
}

function CreateProfileCard({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px dashed ${hovered ? 'var(--accent-blue)' : 'var(--border-mid)'}`,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'all 0.2s',
        minHeight: 260,
        background: hovered ? 'rgba(74,158,255,0.03)' : 'transparent',
      }}
    >
      <div style={{
        width: 52, height: 52,
        border: `1px solid ${hovered ? 'var(--accent-blue)' : 'var(--border-mid)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: hovered ? 'var(--accent-blue)' : 'var(--text-dim)',
        marginBottom: 16, transition: 'all 0.2s',
      }}>
        <PlusIcon />
      </div>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 20, fontWeight: 700,
        color: hovered ? 'var(--text-primary)' : 'var(--text-secondary)',
        marginBottom: 6, transition: 'color 0.2s',
      }}>
        Create New Profile
      </h3>
      <p style={{ fontSize: 9, letterSpacing: '0.18em', color: 'var(--text-dim)' }}>
        ALLOCATE_NEURAL_SLOT
      </p>
    </div>
  );
}

const profiles = [
  {
    id: 1, name: 'Work', type: 'workspace',
    lastSync: '14:32:01 UTC',
    apps: [<MailIcon />, <CloudIcon />],
    progress: 78,
  },
  {
    id: 2, name: 'Personal', type: 'personal',
    lastSync: '09:12:44 UTC',
    apps: [<PlayIcon />, <MusicIcon />],
    progress: 55,
  },
];

export default function ProfileSelectionPage() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-base)' }}>
      {/* Top mini bar */}
      <div style={{
        padding: '6px 20px',
        background: 'rgba(10,11,16,0.95)',
        borderBottom: '1px solid var(--border-dim)',
        fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em',
      }}>
        Profile Selection
      </div>

      <Navbar />

      {/* Main */}
      <div style={{ flex: 1, padding: '60px 48px 40px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ borderTop: '1px solid var(--border-dim)', marginBottom: 48 }} />

          <div className="animate-fade-up" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
          }}>
            {profiles.map((p, i) => (
              <div key={p.id} className={`animate-fade-up-delay-${i}`}>
                <ProfileCard
                  profile={p}
                  onSelect={() => navigate('/dashboard/omni-search')}
                />
              </div>
            ))}
            <div className="animate-fade-up-delay-2">
              <CreateProfileCard onClick={() => {}} />
            </div>
          </div>
        </div>
      </div>

      {/* Status footer */}
      <div style={{
        margin: '0 48px 40px',
        maxWidth: 960,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <StatusBar
          left={[
            { dot: '#4af0c4', label: 'SYSTEM_LOAD: 12%' },
            { icon: '▣', label: 'SERVER: EDGE_NODE_09' },
          ]}
          right="© 2024 NEURAL_SEARCH_PROTOCOL  ▪ ▪ ▪"
        />
      </div>
    </div>
  );
}
