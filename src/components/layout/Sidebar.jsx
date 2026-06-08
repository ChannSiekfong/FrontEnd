// src/components/layout/Sidebar.jsx
import { useNavigate, useLocation } from 'react-router-dom';
import { useChat } from '../../hook/chat.hook';
import { useEffect, useState } from 'react'; // Added useState
import { useLogout } from '../../hook/authentication.hook';
// i want 20 mock chats for testing the UI, each with id, title, and created_at
const mock_chats = [
  { id: '1', title: 'Chat about React', created_at: '2024-01-01' },
  { id: '2', title: 'Chat about Node.js', created_at: '2024-02-15' },
  { id: '3', title: 'Chat about AI', created_at: '2024-03-10' },
  { id: '4', title: 'Chat about Databases', created_at: '2024-04-05' },
  { id: '5', title: 'Chat about DevOps', created_at: '2024-05-20' },
  { id: '6', title: 'Chat about Cloud Computing', created_at: '2024-06-18' },
  { id: '7', title: 'Chat about Cybersecurity', created_at: '2024-07-22' },
  { id: '8', title: 'Chat about Mobile Development', created_at: '2024-08-30' },
  { id: '9', title: 'Chat about Game Development', created_at: '2024-09-12' },
  { id: '10', title: 'Chat about Data Science', created_at: '2024-10-01' },
  { id: '11', title: 'Chat about Machine Learning', created_at: '2024-11-15' },
  { id: '12', title: 'Chat about Deep Learning', created_at: '2024-12-05' },
  { id: '13', title: 'Chat about Natural Language Processing', created_at: '2025-01-20' },
  { id: '14', title: 'Chat about Computer Vision', created_at: '2025-02-28' },
  { id: '15', title: 'Chat about Robotics', created_at: '2025-03-18' },
  { id: '16', title: 'Chat about Internet of Things', created_at: '2025-04-10' },
  { id: '17', title: 'Chat about Blockchain', created_at: '2025-05-25' },
  { id: '18', title: 'Chat about Quantum Computing', created_at: '2025-06-30' },
  { id: '19', title: 'Chat about Virtual Reality', created_at: '2025-07-15' },
  { id: '20', title: 'Chat about Augmented Reality', created_at: '2025-08-05' },
];

const SecurityIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Create a state variable to hold the chats array
  const [chats, setChats] = useState([]);

  const { logoutUser } = useLogout();

  const handleLogout = async () => {
    await logoutUser();
  };

  const currentProfileId = localStorage.getItem('currentProfileId');
  const { fetch_chats, create_chat } = useChat();

  const handleCreateChat = async (profileId) => {
    const newChat = await create_chat(profileId);
    // refetch chats after creating a new one
    const response = await fetch_chats(profileId);
    if (response && response.data) {
      setChats(response.data);
    }
  };

  useEffect(() => {
    if (!currentProfileId) {
      console.log("No profileId found");
      return;
    }

    const loadChats = async () => {
      try {
        const response = await fetch_chats(currentProfileId);
        console.log("Chats loaded:", response);

        // 2. Safely capture the data array matching your payload structure
        if (response && response.data) {
          setChats(response.data);
        }
      } catch (err) {
        console.error("Failed to load chats:", err);
      }
    };

    loadChats();
  }, [currentProfileId]);

  return (
<aside
  style={{
    position: "fixed",
    left: 0,
    top: 70,
    height: "calc(100vh - 70px)",
    width: 200,

    background: "var(--bg-sidebar)",
    borderRight: "1px solid var(--border-dim)",

    display: "flex",
    flexDirection: "column",

    padding: "12px 0",

    overflow: "hidden",
    zIndex: 50,
  }}
>
      <button
        onClick={() => {
          handleCreateChat(currentProfileId);
        }}
        style={{
          width: "100%",
          padding: "11px 14px",
          background: "rgba(168,85,247,0.15)",
          border: "1px solid rgba(168,85,247,0.3)",
          color: "#c084fc",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.16em",
          cursor: "pointer",
          marginBottom: 12,
          transition: "all 0.2s",
        }}
      >
        NEW_SEARCH
      </button>

      <hr style={{ border: "none", borderTop: "1px solid var(--border-dim)", margin: "12px 0" }} />

      {/* 3. Rendered Chats List Section */}
<div
  style={{
    flex: 1,

    display: "flex",
    flexDirection: "column",

    gap: 8,
    padding: "0 8px",

    overflowY: "auto",
    overflowX: "hidden",
  }}
>
        {chats.map((chat) => {
          const isActive = location.pathname.includes(chat.id);

          return (
            <button
              key={chat.id}
              onClick={() => navigate(`/dashboard/omni-search?profileId=${currentProfileId}&chatId=${chat.id}`)}
              style={{
                minHeight: 64,
                width: "100%",
                textAlign: "left",
                padding: "10px 12px",
                marginBottom: 8,
                borderRadius: 10,
                border: isActive
                  ? "1px solid rgba(168,85,247,0.6)"
                  : "1px solid rgba(255,255,255,0.06)",
                background: isActive
                  ? "linear-gradient(135deg, rgba(168,85,247,0.18), rgba(59,130,246,0.08))"
                  : "rgba(255,255,255,0.03)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: isActive
                  ? "0 8px 25px rgba(168,85,247,0.15)"
                  : "0 2px 10px rgba(0,0,0,0.15)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.06)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = "translateY(0px)";
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.03)";
                }
              }}
            >
              {/* Left accent bar */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 3,
                  background: isActive
                    ? "linear-gradient(to bottom, #a855f7, #3b82f6)"
                    : "transparent",
                }}
              />

              {/* Title */}
              <div
                style={{
                  fontSize: 13,
                  fontFamily: "var(--font-sans, inherit)",
                  color: isActive ? "#ffffff" : "rgba(255,255,255,0.75)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  marginBottom: 4,
                }}
              >
                {chat.title || "Untitled Chat"}
              </div>

              {/* Meta row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: 10,
                  fontFamily: "var(--font-mono)",
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.08em",
                }}
              >
                <span>CHAT</span>
                <span>
                  {chat.created_at
                    ? new Date(chat.created_at).toLocaleDateString()
                    : ""}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div style={{ padding: "0 8px" }}>
        <button
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            background: "none",
            border: "none",
            color: "var(--text-dim)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            cursor: "pointer",
            letterSpacing: "0.08em",
            marginBottom: 4,
          }}
        >
          <SecurityIcon />
          Security
        </button>

        <button
          onClick={() => {
            handleLogout();
          }}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            background: "none",
            border: "none",
            color: "var(--text-dim)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            cursor: "pointer",
            letterSpacing: "0.08em",
          }}
        >
          <LogoutIcon />
          Log Out
        </button>
      </div>
    </aside>
  );
}
