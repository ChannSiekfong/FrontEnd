// src/pages/ProfileSelectionPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutButton } from "../components/ui/Logout";
import { CreateProfilePopup } from "../components/ui/CreateProfile";
import { useGetProfiles } from "../hook/profile.hook";
import StatusBar from "../components/ui/StatusBar";
import CornerBrackets from "../components/ui/CornerBrackets";
import { useDeleteProfile } from "../hook/profile.hook";

/* ---------------- DYNAMIC CSS INJECTION ---------------- */
// Goldilocks Zone: Balanced iOS shake — noticeable but controlled
if (typeof document !== "undefined") {
  const styleId = "profile-shake-keyframes";
  let styleElement = document.getElementById(styleId);

  if (styleElement) {
    styleElement.remove();
  }

  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    @keyframes profile-shake {
      0% { transform: translate(0.3px, 0.3px) rotate(0deg); }
      16% { transform: translate(-0.3px, -0.2px) rotate(-0.1deg); }
      32% { transform: translate(-0.2px, 0px) rotate(0.1deg); }
      48% { transform: translate(0px, 0.3px) rotate(0deg); }
      64% { transform: translate(0.3px, -0.2px) rotate(0.1deg); }
      80% { transform: translate(-0.3px, 0.3px) rotate(-0.1deg); }
      100% { transform: translate(0.3px, -0.2px) rotate(-0.1deg); }
    }
    .shake-active {
      /* 0.5s is the sweet spot between a frantic vibrate (0.35s) and a lazy drift (0.75s) */
      animation: profile-shake 0.5s infinite ease-in-out;
    }
  `;
  document.head.appendChild(style);
}

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

/* ---------------- CONFIRM DELETION MODAL ---------------- */

function ConfirmDeleteModal({ profileName, onConfirm, onCancel }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(10, 11, 16, 0.85)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-mid)",
          padding: "32px",
          maxWidth: "420px",
          width: "100%",
          position: "relative",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
        }}
      >
        <CornerBrackets color="#ff5f7a" />

        <h3
          style={{
            fontFamily: "var(--font-display)",
            color: "#ff5f7a",
            fontSize: 18,
            letterSpacing: "0.1em",
            marginBottom: 12,
            textAlign: "center"
          }}
        >
          CRITICAL_DELETION_PROTOCOL
        </h3>

        <p
          style={{
            fontSize: 12,
            color: "var(--text-dim)",
            lineHeight: "1.6",
            marginBottom: 28,
            textAlign: "center"
          }}
        >
          Are you certain you want to permanently purge profile <strong style={{ color: "var(--text-primary)" }}>{profileName}</strong>? All workspace instances, cache arrays, and AI memory sub-layers will be permanently unlinked.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button
            onClick={onCancel}
            style={{
              padding: "10px 20px",
              background: "transparent",
              border: "1px solid var(--border-mid)",
              color: "var(--text-primary)",
              cursor: "pointer",
              fontSize: 10,
              letterSpacing: "0.12em",
            }}
          >
            ABORT_ACTION
          </button>

          <button
            onClick={onConfirm}
            style={{
              padding: "10px 20px",
              background: "rgba(255, 95, 122, 0.1)",
              border: "1px solid #ff5f7a",
              color: "#ff5f7a",
              cursor: "pointer",
              fontSize: 10,
              letterSpacing: "0.12em",
            }}
          >
            CONFIRM_DELETE
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- PROFILE CARD ---------------- */

function ProfileCard({ profile, onSelect, isEditMode, onDeleteClick }) {
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
      className={isEditMode ? "shake-active" : ""}
      onClick={isEditMode ? null : onSelect}
      onMouseEnter={() => !isEditMode && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered ? "var(--bg-card-hover)" : "var(--bg-card)",
        border: `1px solid ${isEditMode ? "#ff5f7a" : "var(--border-dim)"}`,
        padding: "24px",
        cursor: isEditMode ? "default" : "pointer",
        transition: "background 0.2s, border 0.2s",
      }}
    >
      {/* EXPLICIT REMOVE ICON FOR EDIT MODE */}
      {isEditMode && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Avoid triggering selections or navigations
            onDeleteClick();
          }}
          style={{
            position: "absolute",
            top: "-10px",
            left: "-10px",
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            background: "#ff5f7a",
            border: "none",
            color: "#0a0b10",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            fontSize: 11,
            boxShadow: "0 0 10px rgba(255, 95, 122, 0.4)",
          }}
        >
          ✕
        </button>
      )}

      {/* Dynamic system hooks depending on mode state */}
      <CornerBrackets color={isEditMode ? "#ff5f7a" : hovered ? color : "#2e3a4f"} />

      {/* type badge */}
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

      {/* icon box */}
      <div
        style={{
          width: 52,
          height: 52,
          border: `1px solid ${isEditMode ? "#ff5f7a" : color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isEditMode ? "#ff5f7a" : color,
          marginBottom: 16,
          background: "var(--bg-input)",
        }}
      >
        {profile.type === "STANDARD" ? <BriefcaseIcon /> : <PersonIcon />}
      </div>

      {/* name */}
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

      {/* sync text */}
      <p style={{ fontSize: 10, color: "var(--text-dim)", marginBottom: 16 }}>
        Last Sync: {profile.lastSync}
      </p>

      {/* status layer */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <span style={{ fontSize: 9, color: isEditMode ? "#ff5f7a" : color }}>
          {isEditMode ? "PENDING_MUTATION" : "SYNC_COMPLETE"}
        </span>
        <CheckIcon />
      </div>

      {/* action visualizer */}
      <button
        disabled={isEditMode}
        style={{
          width: "100%",
          padding: "10px",
          border: `1px solid ${isEditMode ? "var(--border-dim)" : color}`,
          background: "var(--bg-input)",
          fontSize: 10,
          letterSpacing: "0.16em",
          cursor: isEditMode ? "not-allowed" : "pointer",
          color: isEditMode ? "var(--text-dim)" : "var(--text-primary)",
        }}
      >
        {isEditMode ? "TERMINATE_ACCESS" : "INITIALIZE_PROFILE"}
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
  const { deleteProfile } = useDeleteProfile();

  const [profiles, setProfiles] = useState([]);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState(null);

  const hasProfiles = profiles.length > 0;
  const triggerRefresh = () => setRefreshFlag((prev) => prev + 1);

  useEffect(() => {
    const fetchProfiles = async () => {
      const data = await getProfiles();
      setProfiles(data);
    };
    fetchProfiles();
  }, [refreshFlag]);


  // Handle actual destruction sequences here
  const handleDeleteConfirm = async () => {
    if (!profileToDelete) return;
    try {
      // Connect to your respective database delete hook here if necessary
      // Example: await deleteProfileById(profileToDelete.id);
      await deleteProfile(profileToDelete.id);
      setProfileToDelete(null);
      triggerRefresh();
    } catch (err) {
      console.error("Purge failure:", err);
    }
  };

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
          alignItems: "center"
        }}
      >
        <span>Profile Selection</span>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {hasProfiles && (
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              style={{
                background: isEditMode ? "rgba(255, 95, 122, 0.1)" : "transparent",
                border: `1px solid ${isEditMode ? "#ff5f7a" : "var(--border-mid)"}`,
                color: isEditMode ? "#ff5f7a" : "var(--text-primary)",
                padding: "4px 10px",
                fontSize: 9,
                cursor: "pointer",
                letterSpacing: "0.1em",
                transition: "all 0.2s"
              }}
            >
              {isEditMode ? "EXIT_MANAGE_MODE" : "MANAGE_PROFILES"}
            </button>
          )}
          <LogoutButton />
        </div>
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
              {profiles.map((p) => (
                <ProfileCard
                  key={p.id}
                  profile={p}
                  isEditMode={isEditMode}
                  onDeleteClick={() => setProfileToDelete(p)}
                  onSelect={() => {
                    localStorage.setItem("currentProfileId", p.id);
                    navigate(`/dashboard/omni-search?profileId=${p.id}`);
                  }}
                />
              ))}

              {!isEditMode && <CreateProfileCard onClick={() => setShowCreatePopup(true)} />}
            </div>
          )}

          {showCreatePopup && (
            <CreateProfilePopup
              onClose={() => setShowCreatePopup(false)}
              triggerRefresh={triggerRefresh}
            />
          )}

          {/* SYSTEM OVERLAY MODALS */}
          {profileToDelete && (
            <ConfirmDeleteModal
              profileName={profileToDelete.name}
              onConfirm={handleDeleteConfirm}
              onCancel={() => setProfileToDelete(null)}
            />
          )}
        </div>
      </div>

      {/* STATUS BAR */}
      <div style={{ margin: "0 auto 40px", maxWidth: 960 }}>
        <StatusBar
          left={[
            {
              dot: isEditMode ? "#ff5f7a" : "#4af0c4",
              label: isEditMode ? "SYSTEM_STATUS: MUTATION_MODE_ACTIVE" : "SYSTEM_LOAD: 12%"
            },
            { icon: "▣", label: "SERVER: EDGE_NODE_09" },
          ]}
          right="© 2024 NEURAL_SEARCH_PROTOCOL  ▪ ▪ ▪"
        />
      </div>
    </div>
  );
}
