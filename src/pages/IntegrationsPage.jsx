// src/pages/IntegrationsPage.jsx
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntegration } from '../hook/integration.hook';
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
  const [isHoverDisconnect, setIsHoverDisconnect] = useState(false);

  const hasRefreshToken = !!integration?.refreshToken;
  const isActiveFlag = integration?.isActive === true;
  const isDisconnectedFlag = integration?.isActive === false;

  const isActive = hasRefreshToken && isActiveFlag;
  const isDisconnected = hasRefreshToken && isDisconnectedFlag;

  const status = isActive
    ? "ACTIVE"
    : isDisconnected
    ? "DISCONNECTED"
    : "NOT_INTEGRATED";

  const bridgeId = integration?.id || id || "—";

  const lastSync = integration?.synced_at
    ? new Date(integration.synced_at).toLocaleString()
    : "—";

  const activeFilters = Array.isArray(integration?.metadata?.filters)
    ? integration.metadata.filters.join(", ")
    : "None";

  const statusStyles = {
    ACTIVE: {
      label: "Active",
      color: "#22c55e",
      bg: "rgba(34,197,94,.08)",
      border: "rgba(34,197,94,.18)",
      description: "Connected and syncing normally",
    },
    DISCONNECTED: {
      label: "Disconnected",
      color: "#f59e0b",
      bg: "rgba(245,158,11,.08)",
      border: "rgba(245,158,11,.18)",
      description: "Connection requires attention",
    },
    NOT_INTEGRATED: {
      label: "Not Integrated",
      color: "var(--text-muted)",
      bg: "rgba(255,255,255,.03)",
      border: "rgba(255,255,255,.08)",
      description: "No integration configured",
    },
  };

  const currentStatus = statusStyles[status];

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid rgba(255,255,255,.05)",
  };

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-dim)",
        borderRadius: 16,
        overflow: "hidden",
        transition: "border-color .15s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-mid)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border-dim)";
      }}
    >
      {/* TOP STATUS BAR */}
      <div style={{ height: 3, background: currentStatus.color }} />

      {/* HEADER */}
      <div style={{ padding: 20, paddingBottom: 16 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "var(--bg-input)",
                border: "1px solid var(--border-dim)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {icon}
            </div>

            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: 17,
                  fontWeight: 700,
                  color: "var(--text-primary)",
                }}
              >
                {name}
              </h3>

              <div
                style={{
                  marginTop: 4,
                  fontSize: 13,
                  color: "var(--text-muted)",
                }}
              >
                {currentStatus.description}
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "5px 10px",
              borderRadius: 999,
              background: currentStatus.bg,
              border: `1px solid ${currentStatus.border}`,
              color: currentStatus.color,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            ● {currentStatus.label}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ padding: "0 20px 20px" }}>
        {status === "ACTIVE" && (
          <>
            <div
              style={{
                background: "rgba(255,255,255,.02)",
                border: "1px solid rgba(255,255,255,.05)",
                borderRadius: 12,
                padding: "0 14px",
                marginBottom: 18,
              }}
            >
              <div style={rowStyle}>
                <span style={{ color: "var(--text-muted)", fontSize: 13 }}>
                  Last Sync
                </span>
                <span style={{ color: "var(--text-primary)", fontSize: 13 }}>
                  {lastSync}
                </span>
              </div>

              {/* <div style={rowStyle}>
                <span style={{ color: "var(--text-muted)", fontSize: 13 }}>
                  Filters
                </span>
                <span style={{ color: "#60a5fa", fontSize: 13 }}>
                  {activeFilters}
                </span>
              </div> */}

              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>
                <span style={{ color: "var(--text-muted)", fontSize: 13 }}>
                  Bridge ID
                </span>
                <span style={{ fontFamily: "monospace", fontSize: 13 }}>
                  {bridgeId}
                </span>
              </div>
            </div>

            {/* DISCONNECT BUTTON WITH HOVER FIX */}
            <button
              onClick={onDisconnect}
              onMouseEnter={() => setIsHoverDisconnect(true)}
              onMouseLeave={() => setIsHoverDisconnect(false)}
              style={{
                flex: 1,
                height: 42,
                width: "100%",
                borderRadius: 10,
                fontWeight: 600,
                cursor: "pointer",
                border: isHoverDisconnect
                  ? "1px solid rgba(239,68,68,.25)"
                  : "1px solid var(--border-mid)",
                background: isHoverDisconnect
                  ? "rgba(239,68,68,.08)"
                  : "transparent",
                color: isHoverDisconnect ? "#ef4444" : "var(--text-primary)",
                transition: "all .15s ease",
              }}
            >
              Disconnect
            </button>
          </>
        )}

        {status === "DISCONNECTED" && (
          <>
            <div
              style={{
                background: "rgba(245,158,11,.06)",
                border: "1px solid rgba(245,158,11,.15)",
                borderRadius: 12,
                padding: 16,
                marginBottom: 18,
              }}
            >
              <div style={{ fontWeight: 600, color: "#f59e0b" }}>
                Authentication Required
              </div>
              <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                Reconnect to resume syncing.
              </div>
            </div>

            <button
              onClick={onReconnect}
              style={{
                width: "100%",
                height: 44,
                border: "none",
                borderRadius: 10,
                background: "#f59e0b",
                color: "#111827",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all .15s ease",
              }}
            >
              Reconnect Account
            </button>
          </>
        )}

        {status === "NOT_INTEGRATED" && (
          <>
            <div
              style={{
                border: "1px dashed rgba(255,255,255,.08)",
                borderRadius: 12,
                padding: 24,
                textAlign: "center",
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                Integrate {name}
              </div>

              <div
                style={{
                  fontSize: 13,
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                }}
              >
                Enable synchronization by connecting your {name} account.
              </div>
            </div>

            <button
              onClick={() => onIntegrate?.(type)}
              style={{
                width: "100%",
                height: 44,
                border: "none",
                borderRadius: 10,
                background: "#7c3aed",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all .15s ease",
              }}
            >
              Integrate {name}
            </button>
          </>
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
  const location = useLocation();
  const profileId = new URLSearchParams(location.search).get("profileId");

  const {
    getIntegrationStatus,
    disconnectIntegration,
    reconnectIntegration,
    integrate,
  } = useIntegration();

  const [integrations, setIntegrations] = useState([]);

  // ─────────────────────────────────────
  // SINGLE SOURCE OF TRUTH
  // ─────────────────────────────────────
  const refreshIntegrations = async () => {
    try {
      const res = await getIntegrationStatus(profileId);
      setIntegrations(res?.data || []);
    } catch (err) {
      console.error("Failed to fetch integrations:", err);
    }
  };

  // ─────────────────────────────────────
  // FIXED HANDLERS (MISSING BEFORE = CRASH)
  // ─────────────────────────────────────

  const handleDisconnect = async (integrationId) => {
    try {
      if (!integrationId) return;

      await disconnectIntegration(integrationId);
      await refreshIntegrations();
    } catch (err) {
      console.error("Disconnect error:", err);
    }
  };

  const handleReconnect = async (type) => {
    try {
      if (!type) return;

      await reconnectIntegration(profileId, type);
      await refreshIntegrations();
    } catch (err) {
      console.error("Reconnect error:", err);
    }
  };

  const handleIntegrate = async (type) => {
    try {
      await integrate(profileId, type);
      await refreshIntegrations();
    } catch (err) {
      console.error("Integrate error:", err);
    }
  };

  // ─────────────────────────────────────
  // INIT LOAD
  // ─────────────────────────────────────
  useEffect(() => {
    if (!profileId) return;
    refreshIntegrations();
  }, [profileId]);

  const integrationMap = useMemo(() => {
    return new Map(integrations.map((i) => [i.type, i]));
  }, [integrations]);

  const getIntegration = (type) => integrationMap.get(type);

  const integrationList = [
    {
      name: "Gmail",
      type: "GMAIL",
      icon: (
        <img
          src="/asset/gmail.png"
          alt="Gmail"
          style={{ width: 22, height: 22, objectFit: "contain" }}
        />
      ),
    },
    {
      name: "Telegram",
      type: "TELEGRAM",
      icon: (
        <img
          src="/asset/telegram.png"
          alt="Telegram"
          style={{ width: 22, height: 22, objectFit: "contain" }}
        />
      ),
    },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em', padding: '5px 18px', background: 'rgba(10,11,14,.95)', borderBottom: '1px solid var(--border-dim)' }}>
        Integration Management
      </div>
      <Navbar showSidebar />

      <div style={{ display: "flex", flex: 1 }}>

        <Sidebar />

        <main style={{ flex: 1, padding: 32 }}>
          <h1>NEURAL INTEGRATIONS</h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              marginTop: 20,
            }}
          >
            {integrationList.map((item) => {
              const integration = getIntegration(item.type);

              return (
                <IntegrationCard
                  key={item.type}
                  name={item.name}
                  type={item.type}
                  icon={item.icon}
                  integration={integration}
                  onIntegrate={handleIntegrate}
                  onDisconnect={() => handleDisconnect(integration?.id)}
                  onSync={() => {}}
                  onReconnect={() => handleReconnect(item.type)}
                />
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
