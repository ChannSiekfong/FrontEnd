// Top navbar — main section navigation
import { useNavigate, useLocation } from 'react-router-dom';
import { SecurityIcon, ConfigIcon } from '../ui/Icons';
import { MAIN_NAV, getActiveSection } from '../../config/navigation';

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeSection = getActiveSection(pathname);

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate('/profiles')}>
        NEURAL_HUD_V1.0
      </div>

      <div className="navbar-tabs">
        {MAIN_NAV.map((tab) => (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className={`navbar-tab${activeSection === tab.id ? ' navbar-tab--active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="navbar-actions">
        <button
          className="navbar-icon-btn"
          onClick={() => navigate('/dashboard/system-config')}
          style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: 6 }}
        >
          <SecurityIcon size={16} />
        </button>
        <button
          className="navbar-icon-btn"
          onClick={() => navigate('/dashboard/system-config')}
          style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: 6 }}
        >
          <ConfigIcon size={16} />
        </button>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))',
          cursor: 'pointer',
        }} onClick={() => navigate('/profiles')} />
      </div>
    </nav>
  );
}
