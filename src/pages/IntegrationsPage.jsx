// src/pages/IntegrationsPage.jsx
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { useIntegration } from '../hook/integration.hook';
import { useCommunication } from '../hook/communication.hook';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import gmail from "../../asset/gmail.png";
import telegram from "../../asset/telegram.png";

// Cyberpunk-themed inline system micro-icons
const ChevronRightIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
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
  const isSyncing = integration?.syncStatus === "SYNCING";

  const status = useMemo(() => {
    if (!hasRefreshToken) return "NOT_INTEGRATED";
    if (isSyncing) return "SYNCING";
    if (isActiveFlag) return "ACTIVE";
    if (isDisconnectedFlag) return "DISCONNECTED";
    return "NOT_INTEGRATED";
  }, [hasRefreshToken, isSyncing, isActiveFlag, isDisconnectedFlag]);

  // Use crisp HH:MM:SS format matching the sidebar logs
  const lastSync = integration?.lastSyncedAt
    ? new Date(integration.lastSyncedAt).toTimeString().split(' ')[0]
    : null;

  const dateSync = integration?.lastSyncedAt
    ? new Date(integration.lastSyncedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    : null;

  const theme = {
    ACTIVE: { color: "#4ade80", bg: "rgba(74,222,128,0.03)", border: "#22c55e", label: "ONLINE" },
    SYNCING: { color: "#60a5fa", bg: "rgba(96,165,250,0.03)", border: "#3b82f6", label: "SYNCING" },
    DISCONNECTED: { color: "#f87171", bg: "rgba(248,113,113,0.03)", border: "#ef4444", label: "OFFLINE" },
    NOT_INTEGRATED: { color: "#4e556e", bg: "transparent", border: "#1f2330", label: "STANDBY" },
  };

  const s = theme[status];

  return (
    <div style={{ ...styles.cardOuter, borderColor: status === "NOT_INTEGRATED" ? "#1c202e" : `${s.border}44` }}>
      <div style={{ ...styles.cardInner, background: s.bg }}>

        {/* HEADER SECTION */}
        <div style={styles.cardHeader}>
          <div style={styles.left}>
            <div style={styles.iconContainer}>{icon}</div>
            <div>
              <div style={styles.title}>{name.toUpperCase()}</div>
              <div style={{ ...styles.sub, color: s.color }}>
                {status === "ACTIVE" && "// LINK STABLE"}
                {status === "SYNCING" && "// DOWNLOADING DATA"}
                {status === "DISCONNECTED" && "// CRITICAL BREAK"}
                {status === "NOT_INTEGRATED" && "// LINK AVAILABLE"}
              </div>
            </div>
          </div>

          {/* Terminal Matrix-style status badge */}
          <div style={{ ...styles.badge, color: s.color, border: `1px solid ${s.color}22` }}>
            <span style={{ inlineSize: 5, height: 5, borderRadius: "50%", background: s.color, display: "inline-block" }} />
            {s.label}
          </div>
        </div>

        {/* METRICS / DATA CONTAINER */}
        <div style={styles.body}>
          {(status === "ACTIVE" || status === "SYNCING") && (
            <div style={styles.metaContainer}>
              <Row label="REF_ID" value={(integration?.id || id || "UNKNOWN").slice(0, 12).toUpperCase()} isMono />
              <Row label="LAST_LOG" value={lastSync ? `${dateSync} @ ${lastSync}` : "N/A"} />
              <Row label="ENCRYPTION" value="AES_256_GCM" />
            </div>
          )}

          {status === "DISCONNECTED" && (
            <div style={styles.warnBox}>
              <span style={{ color: "#ef4444", fontWeight: "bold" }}>[ERROR]</span> Handshake credentials expired or revoked.
            </div>
          )}

          {status === "NOT_INTEGRATED" && (
            <div style={styles.emptyBox}>
              Pipeline dormant. Link this account to index files and ingest continuous background workspace metrics.
            </div>
          )}

          {/* INTERACTIVE ACTIONS PANEL */}
          <div style={styles.actions}>
            {status === "ACTIVE" && (
              <>
                <button
                  onClick={() => onSync?.(integration?.id)}
                  style={styles.syncBtn}
                >
                  RUN_SYNC
                </button>
                <button
                  onClick={onDisconnect}
                  style={styles.dangerBtn}
                >
                  DISCONNECT
                </button>
              </>
            )}

            {status === "SYNCING" && (
              <button disabled style={styles.disabledBtn}>
                EXTRACTING_DATA...
              </button>
            )}

            {status === "DISCONNECTED" && (
              <button
                onClick={onReconnect}
                style={styles.warnBtn}
              >
                REESTABLISH_LINK <ChevronRightIcon />
              </button>
            )}

            {status === "NOT_INTEGRATED" && (
              <button
                onClick={() => onIntegrate?.(type)}
                style={styles.connectBtn}
              >
                INITIALIZE_LINK <ChevronRightIcon />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

function Row({ label, value, isMono }) {
  return (
    <div style={styles.row}>
      <span style={styles.label}>{label}</span>
      <span style={{ ...styles.value, fontFamily: isMono ? "monospace" : "inherit" }}>
        {value}
      </span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   STYLES: SYSTEM SPECIFICATION PALETTE
────────────────────────────────────────────────────────────── */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#0c0d12", // Matched theme background
    color: "#fff",
    fontFamily: "var(--font-mono), monospace",
  },

  shell: {
    display: "flex",
    minHeight: "calc(100vh - 70px)",
  },

  main: {
    flex: 1,
    padding: "40px 48px",
    boxSizing: "border-box",
  },

  pageTitle: {
    fontSize: 16,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.25em",
    color: "#ffffff",
    marginBottom: 4,
  },

  pageSubtitle: {
    fontSize: 11,
    color: "#4e556e",
    letterSpacing: "0.05em",
    marginBottom: 32,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", // Adaptive layout grid
    gap: 24,
  },

  /* GEOMETRIC CYBER CARD CONTAINER */
  cardOuter: {
    background: "#0f111a",
    border: "1px solid #1f2330",
    padding: 2,
    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
  },

  cardInner: {
    padding: "20px 18px",
    background: "transparent",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    boxSizing: "border-box",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },

  left: {
    display: "flex",
    gap: 14,
    alignItems: "center",
  },

  iconContainer: {
    width: 44,
    height: 44,
    background: "#141722",
    border: "1px solid #222635",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: "0.08em",
    color: "#ffffff"
  },

  sub: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: "0.05em",
    marginTop: 3
  },

  badge: {
    fontSize: 9,
    padding: "4px 8px",
    background: "#0c0d12",
    fontWeight: "700",
    letterSpacing: "0.1em",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  },

  body: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
  },

  metaContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    background: "#08090d",
    padding: "12px 14px",
    border: "1px solid #151821",
    marginBottom: 20,
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 11,
    letterSpacing: "0.02em"
  },

  label: { color: "#4e556e", fontWeight: "600" },

  value: { color: "#a3a9be" },

  warnBox: {
    padding: "12px 14px",
    background: "rgba(239,68,68,0.02)",
    border: "1px solid rgba(239,68,68,0.15)",
    fontSize: 11,
    color: "#a3a9be",
    lineHeight: "1.5",
    marginBottom: 20,
  },

  emptyBox: {
    fontSize: 11,
    color: "#4e556e",
    lineHeight: "1.6",
    marginBottom: 26,
    padding: "0 4px"
  },

  actions: {
    display: "flex",
    gap: 12,
  },

  /* TACTICAL FLAT ACTION BUTTONS */
  connectBtn: {
    flex: 1,
    height: 38,
    background: "#161922",
    border: "1px solid #2d3247",
    color: "#8ba2cb",
    fontFamily: "inherit",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: "0.1em",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    transition: "all 0.15s ease",
  },

  syncBtn: {
    flex: 1,
    height: 38,
    background: "rgba(34, 197, 94, 0.04)",
    border: "1px solid #22c55e",
    color: "#4ade80",
    fontFamily: "inherit",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: "0.1em",
    cursor: "pointer",
    transition: "all 0.15s ease",
  },

  dangerBtn: {
    width: 110,
    height: 38,
    background: "transparent",
    border: "1px solid #383d52",
    color: "#888ea0",
    fontFamily: "inherit",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: "0.1em",
    cursor: "pointer",
    transition: "all 0.15s ease",
  },

  warnBtn: {
    flex: 1,
    height: 38,
    background: "rgba(239,68,68,0.04)",
    border: "1px solid #ef4444",
    color: "#f87171",
    fontFamily: "inherit",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: "0.1em",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    transition: "all 0.15s ease",
  },

  disabledBtn: {
    flex: 1,
    height: 38,
    background: "#0f111a",
    border: "1px solid #1f2330",
    color: "#4e556e",
    fontFamily: "inherit",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: "0.1em",
    cursor: "not-allowed",
  },
};

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
    { name: "Gmail", type: "GMAIL", icon: <img src={gmail} alt="Gmail" style={{ width: 18, height: 18 }} /> },
    { name: "Telegram", type: "TELEGRAM", icon: <img src={telegram} alt="Telegram" style={{ width: 18, height: 18 }} /> },
  ];

  return (
    <div style={styles.page}>
      <div style={{ fontSize: 10, color: '#3d4357', letterSpacing: '0.15em', padding: '6px 24px', background: '#08090d', borderBottom: '1px solid #171921', fontWeight: 'bold' }}>
        SYSTEM_PARAMETERS // EXTERNAL_PIPELINES
      </div>
      <Navbar showSidebar />

      <div style={styles.shell}>
        <Sidebar />

        <main style={{ marginLeft: 260, ...styles.main }}>
          <h1 style={styles.pageTitle}>Data Integrations</h1>
          <div style={styles.pageSubtitle}>Index external communication data pipelines into unified search indexes.</div>

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
