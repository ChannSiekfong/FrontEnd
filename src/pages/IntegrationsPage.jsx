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

  const bridgeId = integration?.id || "—";

  const lastSync = integration?.created_at
    ? new Date(integration.created_at).toLocaleString()
    : "NEVER";

  const activeFilters = Array.isArray(integration?.metadata?.filters)
    ? integration.metadata.filters.join(", ")
    : "NONE";

  const securityNote =
    integration?.type === "GMAIL"
      ? "SECURITY: OAUTH2 + AES-256"
      : "ENCRYPTION: PENDING";

  // ─────────────────────────────────────
  // BUTTON STYLES (SUBTLE INTERACTIONS)
  // ─────────────────────────────────────
  const baseBtn = {
    transition: "all 0.18s ease",
    cursor: "pointer",
    transform: "translateY(0px)",
  };

  const hoverLift = {
    transform: "translateY(-1px)",
  };

  const activePress = {
    transform: "translateY(0px) scale(0.98)",
  };

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-dim)",
        padding: 20,
        color: "var(--text-primary)",
      }}
    >
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              background: "var(--bg-input)",
              border: "1px solid var(--border-mid)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </div>

          <div>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{name}</h3>

            <div style={{ fontSize: 9, letterSpacing: "0.12em" }}>
              <span
                style={{
                  color:
                    status === "ACTIVE"
                      ? "var(--accent-green)"
                      : status === "DISCONNECTED"
                      ? "#f59e0b"
                      : "var(--text-dim)",
                }}
              >
                {status}
              </span>
            </div>
          </div>
        </div>

        <div style={{ fontSize: 9, color: "var(--text-muted)" }}>
          ID: {bridgeId}
        </div>
      </div>

      {/* ACTIVE */}
      {status === "ACTIVE" && (
        <>
          <div
            style={{
              background: "var(--bg-input)",
              padding: 12,
              marginBottom: 14,
              fontSize: 9,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-dim)" }}>LAST SYNC</span>
              <span>{lastSync}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <span style={{ color: "var(--text-dim)" }}>FILTERS</span>
              <span style={{ color: "var(--accent-blue)" }}>{activeFilters}</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {/* DISCONNECT */}
            <button
              onClick={onDisconnect}
              style={{
                flex: 1,
                padding: 10,
                background: "var(--bg-input)",
                border: "1px solid var(--border-mid)",
                color: "var(--text-primary)",
                ...baseBtn,
              }}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, hoverLift);
                e.currentTarget.style.borderColor = "var(--border-bright)";
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, baseBtn);
                e.currentTarget.style.borderColor = "var(--border-mid)";
              }}
              onMouseDown={(e) => Object.assign(e.currentTarget.style, activePress)}
              onMouseUp={(e) => Object.assign(e.currentTarget.style, hoverLift)}
            >
              DISCONNECT
            </button>

            {/* SYNC */}
            <button
              onClick={() => onSync?.(integration)}
              style={{
                flex: 1,
                padding: 10,
                background: "rgba(74,158,255,0.12)",
                border: "1px solid rgba(74,158,255,0.35)",
                color: "var(--accent-blue)",
                ...baseBtn,
              }}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, hoverLift);
                e.currentTarget.style.boxShadow =
                  "0 0 0 3px rgba(74,158,255,0.12)";
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, baseBtn);
                e.currentTarget.style.boxShadow = "none";
              }}
              onMouseDown={(e) => Object.assign(e.currentTarget.style, activePress)}
              onMouseUp={(e) => Object.assign(e.currentTarget.style, hoverLift)}
            >
              SYNC
            </button>
          </div>
        </>
      )}

      {/* DISCONNECTED */}
      {status === "DISCONNECTED" && (
        <>
          <div
            style={{
              border: "1px solid rgba(245, 158, 11, 0.35)",
              background: "rgba(245, 158, 11, 0.08)",
              padding: 18,
              marginBottom: 14,
            }}
          >
            <div style={{ fontSize: 11, color: "#f59e0b", marginBottom: 6 }}>
              Integration paused
            </div>

            <div style={{ fontSize: 9, color: "var(--text-muted)" }}>
              This {name} connection was previously active. You can reconnect anytime.
            </div>
          </div>

          <button
            onClick={onReconnect}
            style={{
              width: "100%",
              padding: 12,
              background: "rgba(245, 158, 11, 0.12)",
              border: "1px solid rgba(245, 158, 11, 0.35)",
              color: "#f59e0b",
              ...baseBtn,
            }}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, hoverLift);
              e.currentTarget.style.boxShadow =
                "0 0 0 3px rgba(245, 158, 11, 0.15)";
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, baseBtn);
              e.currentTarget.style.boxShadow = "none";
            }}
            onMouseDown={(e) => Object.assign(e.currentTarget.style, activePress)}
            onMouseUp={(e) => Object.assign(e.currentTarget.style, hoverLift)}
          >
            RECONNECT {name.toUpperCase()}
          </button>
        </>
      )}

      {/* NOT INTEGRATED */}
      {status === "NOT_INTEGRATED" && (
        <>
          <div
            style={{
              border: "1px solid var(--border-dim)",
              background: "rgba(255,255,255,0.02)",
              padding: 18,
              marginBottom: 14,
            }}
          >
            <div style={{ fontSize: 11, marginBottom: 6 }}>
              No integration configured
            </div>

            <div style={{ fontSize: 9, color: "var(--text-muted)" }}>
              Connect {name} to enable synchronization.
            </div>
          </div>

          <button
            onClick={() => onIntegrate?.(type)}
            style={{
              width: "100%",
              padding: 12,
              background: "rgba(168,85,247,0.12)",
              border: "1px solid rgba(168,85,247,0.35)",
              color: "#c084fc",
              ...baseBtn,
            }}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, hoverLift);
              e.currentTarget.style.boxShadow =
                "0 0 0 3px rgba(168,85,247,0.12)";
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, baseBtn);
              e.currentTarget.style.boxShadow = "none";
            }}
            onMouseDown={(e) => Object.assign(e.currentTarget.style, activePress)}
            onMouseUp={(e) => Object.assign(e.currentTarget.style, hoverLift)}
          >
            INTEGRATE {name.toUpperCase()}
          </button>
        </>
      )}

      {/* FOOTER */}
      <div
        style={{
          marginTop: 10,
          borderTop: "1px solid var(--border-dim)",
          paddingTop: 10,
          fontSize: 9,
          color: "var(--text-muted)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>{securityNote}</span>

        <span>
          {status === "ACTIVE"
            ? "LIVE"
            : status === "DISCONNECTED"
            ? "PAUSED"
            : "EMPTY"}
        </span>
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
