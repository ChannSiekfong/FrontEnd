// src/pages/ProfileSelectionPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutButton } from "../components/ui/Logout";
import { CreateProfilePopup } from "../components/ui/CreateProfile";
import { useGetProfiles } from "../hook/profile.hook";
import StatusBar from "../components/ui/StatusBar";
import CornerBrackets from "../components/ui/CornerBrackets";

/* ---------------- ICONS ---------------- */

const BriefcaseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
);

const PersonIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M12 8v8M8 12h8" />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4af0c4" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ---------------- PROFILE CARD ---------------- */

function ProfileCard({ profile, onSelect }) {
  const [hovered, setHovered] = useState(false);

  function getColor(color) {
    if (color === "BLUE") return "#4a9eff";
    if (color === "CYAN") return "#00d4ff";
    if (color === "GREEN") return "#00ff9d";
    if (color === "ORANGE") return "#e8a04a";
    if (color === "RED") return "#ff5f7a";
    if (color === "PURPLE") return "#b07cff";
    return "#4a9eff";
  }

  const color = getColor(profile.color);

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered ? "var(--bg-card-hover)" : "var(--bg-card)",
        border: `1px solid var(--border-dim)`,
        padding: "24px",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      {/* ONLY corner accents become dynamic */}
      <CornerBrackets color={hovered ? color : "#2e3a4f"} />

      {/* type badge (KEEP NEUTRAL) */}
      <div
        style={{
          position: "absolute",
          top: 14,
          right: 14,
          fontSize: 8,
          letterSpacing: "0.16em",
          color: "var(--text-dim)",
          border: "1px solid var(--border-mid)",
          padding: "2px 6px",
          background: "var(--bg-base)",
        }}
      >
        {profile.type}
      </div>

      {/* icon box (ONLY BORDER + ICON COLOR changes) */}
      <div
        style={{
          width: 52,
          height: 52,
          border: `1px solid ${color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: color,
          marginBottom: 16,
          background: "var(--bg-input)",
        }}
      >
        {profile.type === "STANDARD" ? <BriefcaseIcon /> : <PersonIcon />}
      </div>

      {/* name (ONLY optional accent, rest unchanged) */}
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 22,
          marginBottom: 4,
          color: "var(--text-primary)",
        }}
      >
        {profile.name}
      </h3>

      {/* sync text (unchanged) */}
      <p style={{ fontSize: 10, color: "var(--text-dim)", marginBottom: 16 }}>
        Last Sync: {profile.lastSync}
      </p>

      {/* status (ONLY label becomes dynamic accent if you want subtle UX) */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <span style={{ fontSize: 9, color: color }}>SYNC_COMPLETE</span> {/* optional accent */}
        <CheckIcon />
      </div>

      {/* button (ONLY border accent changes, not background) */}
      <button
        style={{
          width: "100%",
          padding: "10px",
          border: `1px solid ${color}`,
          background: "var(--bg-input)",
          fontSize: 10,
          letterSpacing: "0.16em",
          cursor: "pointer",
          color: "var(--text-primary)",
        }}
      >
        INITIALIZE_PROFILE
      </button>
    </div>
  );
}

/* ---------------- CREATE CARD ---------------- */

function CreateProfileCard({ onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px dashed ${hovered ? "var(--accent-blue)" : "var(--border-mid)"}`,
        minHeight: 260,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        background: hovered ? "rgba(74,158,255,0.03)" : "transparent",
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          border: `1px solid ${hovered ? "var(--accent-blue)" : "var(--border-mid)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: hovered ? "var(--accent-blue)" : "var(--text-dim)",
          marginBottom: 16,
        }}
      >
        <PlusIcon />
      </div>

      <h3 style={{ fontSize: 18, marginBottom: 6 }}>Create New Profile</h3>
      <p style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--text-dim)" }}>
        ALLOCATE_NEURAL_SLOT
      </p>
    </div>
  );
}

/* ---------------- MAIN PAGE ---------------- */


export default function ProfileSelectionPage() {
  const navigate = useNavigate();
  const [refreshFlag, setRefreshFlag] = useState(0);
  const { getProfiles } = useGetProfiles();

  const [profiles, setProfiles] = useState([]);

  const hasProfiles = profiles.length > 0;
  const [showCreatePopup, setShowCreatePopup] = useState(false);

  const triggerRefresh = () => setRefreshFlag((prev) => prev + 1);

  useEffect(() => {
    const fetchProfiles = async () => {
      const data = await getProfiles();
      setProfiles(data);
    };
    fetchProfiles();
  }, [refreshFlag]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg-base)",
      }}
    >
      {/* TOP BAR */}
      <div
        style={{
          padding: "6px 20px",
          background: "rgba(10,11,16,0.95)",
          borderBottom: "1px solid var(--border-dim)",
          fontSize: 10,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>Profile Selection</span>
        <LogoutButton />
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: "60px 48px 40px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ borderTop: "1px solid var(--border-dim)", marginBottom: 48 }} />

          {/* ================= EMPTY STATE ================= */}
          {!hasProfiles ? (
            <div
              style={{
                minHeight: 420,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                border: "1px solid var(--border-dim)",
                background: "linear-gradient(180deg, rgba(74,158,255,0.04), transparent)",
                padding: 40,
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  border: "1px solid var(--border-mid)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 18,
                  color: "var(--accent-blue)",
                  background: "var(--bg-input)",
                }}
              >
                <PlusIcon />
              </div>

              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 10 }}>
                No Profiles Found
              </h2>

              <p style={{ fontSize: 11, color: "var(--text-dim)", maxWidth: 320, marginBottom: 24 }}>
                Initialize your first profile to begin syncing workspace data and AI memory layers.
              </p>

              <button
                onClick={() => setShowCreatePopup(true)}
                style={{
                  padding: "12px 18px",
                  border: "1px solid var(--accent-blue)",
                  background: "rgba(74,158,255,0.08)",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  cursor: "pointer",
                  color: "var(--accent-blue)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(74,158,255,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(74,158,255,0.08)";
                }}
                hoverEffect={{
                  border: "1px solid var(--accent-blue)",
                  color: "var(--accent-blue)",
                }}
              >
                CREATE_FIRST_PROFILE
              </button>
            </div>
          ) : (
            /* ================= GRID ================= */
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 20,
              }}
            >
              {profiles.map((p, i) => (
                <ProfileCard
                  key={p.id}
                  profile={p}
                  onSelect={() => {
                    localStorage.setItem("currentProfileId", p.id);
                    navigate(`/dashboard/omni-search?profileId=${p.id}`)
                  }}
                />
              ))}

              <CreateProfileCard onClick={() => setShowCreatePopup(true)} />
            </div>
          )}

          {showCreatePopup && <CreateProfilePopup onClose={() => setShowCreatePopup(false)} triggerRefresh={triggerRefresh} />}
        </div>
      </div>

      {/* STATUS BAR */}
      <div style={{ margin: "0 auto 40px", maxWidth: 960 }}>
        <StatusBar
          left={[
            { dot: "#4af0c4", label: "SYSTEM_LOAD: 12%" },
            { icon: "▣", label: "SERVER: EDGE_NODE_09" },
          ]}
          right="© 2024 NEURAL_SEARCH_PROTOCOL  ▪ ▪ ▪"
        />
      </div>
    </div>
  );
}
