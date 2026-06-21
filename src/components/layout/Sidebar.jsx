// Left sidebar — shared 6-item navigation on every dashboard page
import { useNavigate, useLocation } from 'react-router-dom';
import {
  TerminalIcon, ChartIcon, ListIcon, RefreshIcon,
  HelpIcon, LogoutIcon, ChipIcon, ConfigIcon,
} from '../ui/Icons';
import { getActiveSidebarItem, getSidebarItems } from '../../config/navigation';

const ICON_MAP = {
  'current-thread': TerminalIcon,
  'memory-nodes':   ChipIcon,
  'data-streams':   ChartIcon,
  'system-logs':    ListIcon,
  'config-logs':    ConfigIcon,
  'sync-status':    RefreshIcon,
};

export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeItem = getActiveSidebarItem(pathname);
  const items = getSidebarItems();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand-card" style={{
        margin: '0 12px 20px',
        padding: '12px 14px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-dim)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <div style={{
            width: 28, height: 28,
            background: 'rgba(74,158,255,0.15)',
            border: '1px solid rgba(74,158,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--accent-blue)',
          }}>
            <ChipIcon size={14} />
          </div>
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 13, letterSpacing: '0.06em', color: 'var(--text-primary)',
          }}>
            NEURAL_STRIP
          </span>
        </div>
        <div style={{ fontSize: 9, letterSpacing: '0.12em', color: 'var(--accent-pink)' }}>
          STATUS: ENCRYPTED
        </div>
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => {
          const active = activeItem === item.id;
          const Icon = ICON_MAP[item.id] ?? TerminalIcon;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`sidebar-nav-btn${active ? ' sidebar-nav-btn--active' : ''}`}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '11px 12px',
                background: active ? 'rgba(168,85,247,0.18)' : 'none',
                border: 'none',
                borderLeft: active ? '3px solid var(--accent-purple)' : '3px solid transparent',
                color: active ? 'var(--text-primary)' : 'var(--text-dim)',
                fontFamily: 'var(--font-mono)', fontSize: 11,
                cursor: 'pointer', textAlign: 'left',
                transition: 'all 0.2s', letterSpacing: '0.08em', marginBottom: 2,
              }}
            >
              <span style={{ color: active ? 'var(--accent-purple)' : 'var(--text-dim)' }}>
                <Icon size={14} />
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button
          className="sidebar-new-query"
          onClick={() => navigate('/dashboard/omni-search')}
          style={{
            width: '100%', padding: '12px 14px',
            background: 'var(--accent-blue)',
            border: 'none',
            color: '#0b0c10', fontFamily: 'var(--font-mono)', fontSize: 11,
            fontWeight: 700, letterSpacing: '0.16em', cursor: 'pointer',
            marginBottom: 16, transition: 'all 0.2s',
          }}
        >
          NEW_QUERY
        </button>
        <button className="sidebar-help" style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 12px', background: 'none', border: 'none',
          color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: 11,
          cursor: 'pointer', letterSpacing: '0.08em', marginBottom: 4,
        }}>
          <HelpIcon /> HELP
        </button>
        <button className="sidebar-logout" onClick={() => navigate('/signup')} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 12px', background: 'none', border: 'none',
          color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: 11,
          cursor: 'pointer', letterSpacing: '0.08em',
        }}>
          <LogoutIcon /> LOGOUT
        </button>
      </div>
    </aside>
  );
}
