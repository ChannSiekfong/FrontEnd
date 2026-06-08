// src/pages/IntegrationsPage.jsx
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntegration } from '../hook/integration.hook';
import { useCommunication } from '../hook/communication.hook';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import StatusBar from '../components/ui/StatusBar';
import gmail from "../../asset/gmail.png";
import telegram from "../../asset/telegram.png";

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

// src/pages/IntegrationsPage.jsx

function IntegrationCard({
  type,
  id,
  name,
  icon,
  integration,
  onIntegrate,
  onDisconnect,
  onSync,
  onReconnect,
}) {
  const hasRefreshToken = !!integration?.refreshToken;
  const isActiveFlag = integration?.isActive === true;
  const isDisconnectedFlag = integration?.isActive === false;
  const isSyncing = integration?.syncStatus === "SYNCING";

  const status = useMemo(() => {
    if (!hasRefreshToken) return "NOT_INTEGRATED";
    if (isSyncing) return "SYNCING";
    if (isActiveFlag) return "ACTIVE";
    if (isDisconnectedFlag) return "DISCONNECTED";
    return "NOT_INTEGRATED";
  }, [hasRefreshToken, isSyncing, isActiveFlag, isDisconnectedFlag]);

  const lastSync = integration?.lastSyncedAt
    ? new Date(integration.lastSyncedAt).toLocaleString()
    : null;

  const theme = {
    ACTIVE: { color: "#22c55e", bg: "rgba(34,197,94,.12)", label: "Connected" },
    SYNCING: { color: "#60a5fa", bg: "rgba(96,165,250,.12)", label: "Syncing" },
    DISCONNECTED: { color: "#f59e0b", bg: "rgba(245,158,11,.12)", label: "Disconnected" },
    NOT_INTEGRATED: { color: "#a1a1aa", bg: "rgba(255,255,255,.06)", label: "Not connected" },
  };

  const s = theme[status];

  return (
    <div style={{ ...styles.card, borderColor: `${s.color}33` }}>
      {/* HEADER */}
      <div style={styles.cardHeader}>
        <div style={styles.left}>
          <div style={styles.icon}>{icon}</div>
          <div>
            <div style={styles.title}>{name}</div>
            <div style={styles.sub}>
              {status === "ACTIVE" && "Running smoothly"}
              {status === "SYNCING" && "Updating data"}
              {status === "DISCONNECTED" && "Needs reconnection"}
              {status === "NOT_INTEGRATED" && "Not connected yet"}
            </div>
          </div>
        </div>

        <div style={{ ...styles.badge, background: s.bg, color: s.color }}>
          ● {s.label}
        </div>
      </div>

      {/* BODY */}
      <div style={styles.body}>
        {(status === "ACTIVE" || status === "SYNCING") && (
          <div style={styles.meta}>
            {status === "ACTIVE" && (
              <>
                <Row label="Last sync" value={lastSync || "Never"} />
                <Row label="ID" value={integration?.id || id} mono />
              </>
            )}

            {status === "SYNCING" && (
              <div style={styles.syncBox}>Syncing in progress…</div>
            )}
          </div>
        )}

        {status === "DISCONNECTED" && (
          <div style={styles.warn}>Connection lost. Please reconnect.</div>
        )}

        {status === "NOT_INTEGRATED" && (
          <div style={styles.empty}>
            <div style={{ fontWeight: 700 }}>Connect {name}</div>
            <div style={{ fontSize: 12, opacity: 0.6 }}>
              Enable automation in one click
            </div>
          </div>
        )}

        {/* ACTIONS */}
        <div style={styles.actions}>
          {status === "ACTIVE" && (
            <>
              <button
                onClick={() => onSync?.(integration?.id)}
                style={styles.syncBtn}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              >
                Sync
              </button>
              <button
                onClick={onDisconnect}
                style={styles.dangerBtn}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              >
                Disconnect
              </button>
            </>
          )}

          {status === "SYNCING" && (
            <button disabled style={styles.disabled}>Syncing…</button>
          )}

          {status === "DISCONNECTED" && (
            <button
              onClick={onReconnect}
              style={styles.warnBtn}
              onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
            >
              Reconnect
            </button>
          )}

          {status === "NOT_INTEGRATED" && (
            <button
              onClick={() => onIntegrate?.(type)}
              style={styles.connectBtn}
              onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
            >
              Connect {name}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, mono }) {
  return (
    <div style={styles.row}>
      <span style={styles.label}>{label}</span>
      <span style={{ ...styles.value, fontFamily: mono ? "monospace" : "" }}>
        {value}
      </span>
    </div>
  );
}


/* ─────────────────────────────
    STYLES (UPDATED LAYOUT)
───────────────────────────── */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#070a0f",
    color: "#fff",
  },

  shell: {
    display: "flex",
    minHeight: "calc(100vh - 64px)", // navbar fix
  },

  main: {
    flex: 1,
    padding: 32,
  },

  pageTitle: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 20,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 20,
  },

  /* CARD - Unchanging, static layout container */
  card: {
    borderRadius: 18,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    padding: 16,
    transition: "border-color 0.2s ease", // only color shifts smoothly if status changes
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center", // Vertically centers header items together
    marginBottom: 14,
  },

  left: {
    display: "flex",
    gap: 12,
    alignItems: "center",
  },

  icon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    background: "rgba(255,255,255,0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  title: { fontSize: 15, fontWeight: 700 },

  sub: { fontSize: 12, opacity: 0.6 },

  badge: {
    fontSize: 12,
    padding: "6px 12px",
    borderRadius: 999,
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: "fit-content",
  },

  body: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  meta: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 13,
  },

  label: { opacity: 0.5 },

  value: { color: "#fff" },

  syncBox: {
    padding: 10,
    borderRadius: 10,
    background: "rgba(96,165,250,0.08)",
    fontSize: 13,
    display: "flex",
    alignItems: "center",
  },

  warn: {
    padding: 10,
    borderRadius: 10,
    background: "rgba(245,158,11,0.08)",
    fontSize: 13,
    display: "flex",
    alignItems: "center",
  },

  empty: {
    padding: "4px 10px",
    opacity: 0.8,
  },

  actions: {
    display: "flex",
    gap: 10,
    marginTop: 6,
  },

  /* BUTTON INTERACTIVITY CONFIGURATION */
  connectBtn: {
    flex: 1,
    height: 40,
    borderRadius: 12,
    border: "none",
    background: "#7c3aed",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity 0.2s ease",
  },

  /* Matched to the Green Active Theme */
  syncBtn: {
    flex: 1,
    height: 40,
    borderRadius: 12,
    background: "rgba(34, 197, 94, 0.15)",
    border: "1px solid rgba(34, 197, 94, 0.3)",
    color: "#4ade80",
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity 0.2s ease",
  },

  dangerBtn: {
    flex: 1,
    height: 40,
    borderRadius: 12,
    background: "rgba(239,68,68,0.08)",
    border: "1px solid rgba(239,68,68,0.3)",
    color: "#f87171",
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity 0.2s ease",
  },

  warnBtn: {
    width: "100%",
    height: 40,
    borderRadius: 12,
    background: "rgba(245,158,11,0.1)",
    border: "1px solid rgba(245,158,11,0.3)",
    color: "#fbbf24",
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity 0.2s ease",
  },

  disabled: {
    width: "100%",
    height: 40,
    borderRadius: 12,
    background: "rgba(255,255,255,0.06)",
    border: "none",
    color: "rgba(255,255,255,0.4)",
    cursor: "not-allowed",
  },
};


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
  const location = useLocation();
  const profileId = new URLSearchParams(location.search).get("profileId");

  const {
    getIntegrationStatus,
    disconnectIntegration,
    reconnectIntegration,
    integrate,
  } = useIntegration();

  const { sync } = useCommunication();

  const [integrations, setIntegrations] = useState([]);

  const refresh = async () => {
    const res = await getIntegrationStatus(profileId);
    setIntegrations(res?.data || []);
  };

  useEffect(() => {
    if (!profileId) return;
    refresh();
    const interval = setInterval(refresh, 5000);
    return () => clearInterval(interval);
  }, [profileId]);

  const handleSync = async (type, profileId) => {
    await sync(type, profileId);
  };

  const handleDisconnect = async (id) => {
    await disconnectIntegration(id);
    refresh();
  };

  const handleReconnect = async (type) => {
    await reconnectIntegration(profileId, type);
    refresh();
  };

  const handleIntegrate = async (type) => {
    await integrate(profileId, type);
    refresh();
  };

  const map = useMemo(() => {
    return new Map(integrations.map((i) => [i.type, i]));
  }, [integrations]);

  const getIntegration = (type) => map.get(type);

const list = [
  { name: "Gmail", type: "GMAIL", icon: <img src={gmail} alt="Gmail" style={{ width: 22, height: 22 }} /> },
  { name: "Telegram", type: "TELEGRAM", icon: <img src={telegram} alt="Telegram" style={{ width: 22, height: 22 }} /> },
];

  return (
    <div style={styles.page}>
      <Navbar showSidebar />

      <div style={styles.shell}>
        <Sidebar />

        <main style={{marginLeft: 200, flex: 1, padding: 32 }}>
          <h1 style={styles.pageTitle}>Integrations</h1>

          <div style={styles.grid}>
            {list.map((item) => (
              <IntegrationCard
                key={item.type}
                {...item}
                integration={getIntegration(item.type)}
                onIntegrate={handleIntegrate}
                onDisconnect={() =>
                  handleDisconnect(getIntegration(item.type)?.id)
                }
                onReconnect={() => handleReconnect(item.type)}
                onSync={() => handleSync(item.type, profileId)}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
