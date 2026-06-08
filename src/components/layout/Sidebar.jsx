// src/components/layout/Sidebar.jsx
import { useNavigate, useLocation } from 'react-router-dom';
import { useChat } from '../../hook/chat.hook';
import { useEffect, useState } from 'react';
import { useLogout } from '../../hook/authentication.hook';

// Helper icons matching the mock reference UI
const MessageIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 6 }}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const FileIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 6 }}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const SystemIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 6 }}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

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

// Helper function to group items by "Today", "Yesterday", or "Previous"
const groupChatsByDate = (chatsList) => {
  const groups = { TODAY: [], YESTERDAY: [], PREVIOUS: [] };
  const todayStr = new Date().toDateString();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toDateString();

  chatsList.forEach((chat) => {
    if (!chat.created_at) {
      groups.TODAY.push(chat);
      return;
    }
    const chatDateStr = new Date(chat.created_at).toDateString();
    if (chatDateStr === todayStr) {
      groups.TODAY.push(chat);
    } else if (chatDateStr === yesterdayStr) {
      groups.YESTERDAY.push(chat);
    } else {
      groups.PREVIOUS.push(chat);
    }
  });
  return groups;
};

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [chats, setChats] = useState([]);
  const { logoutUser } = useLogout();
  const searchParams = new URLSearchParams(location.search);
  const activeChatId = searchParams.get('chatId');
  const handleLogout = async () => {
    await logoutUser();
  };

  const currentProfileId = localStorage.getItem('currentProfileId');
  const { fetch_chats, create_chat } = useChat();

  const handleCreateChat = async (profileId) => {
    const newChat = await create_chat(profileId);
    const response = await fetch_chats(profileId);
    if (response && response.data) {
      setChats(response.data);
    }
  };

  useEffect(() => {
    if (!currentProfileId) return;

    const loadChats = async () => {
      try {
        const response = await fetch_chats(currentProfileId);
        if (response && response.data) {
          setChats(response.data);
        }
      } catch (err) {
        console.error("Failed to load chats:", err);
      }
    };

    loadChats();
  }, [currentProfileId]);

  // Grouping the chats dynamically
  const groupedChats = groupChatsByDate(chats);

  // Fallback metadata tags and icons to resemble the specific types in your UI mockup
  const getMockMeta = (index) => {
    const metas = [
      { tag: "WORKSPACE", icon: <MessageIcon /> },
      { tag: "ENCRYPTED", icon: <FileIcon /> },
      { tag: "SYSTEM", icon: <SystemIcon /> }
    ];
    return metas[index % metas.length];
  };

  return (
    <aside
      style={{
        position: "fixed",
        left: 0,
        top: 70,
        height: "calc(100vh - 70px)",
        width: 220, // Expanded slightly for better text scaling
        background: "#0c0d12", // Pure deep cyber-palette background
        borderRight: "1px solid #1b1d26",
        display: "flex",
        flexDirection: "column",
        padding: "16px 0",
        overflow: "hidden",
        zIndex: 50,
        fontFamily: "var(--font-mono), monospace",
      }}
    >
      {/* NEW_SEARCH Button Container with Cyber double-border styling */}
      <div style={{ padding: "0 12px", marginBottom: 20 }}>
        <div style={{ border: "1px solid #1f2330", padding: 2 }}>
          <button
            onClick={() => handleCreateChat(currentProfileId)}
            style={{
              width: "100%",
              padding: "10px 0",
              background: "#161922",
              border: "1px solid #2d3247",
              color: "#8ba2cb",
              fontFamily: "inherit",
              fontSize: 11,
              fontWeight: "600",
              letterSpacing: "0.2em",
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "6px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1f2433";
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#161922";
              e.currentTarget.style.color = "#8ba2cb";
            }}
          >
            <span>+</span> NEW_SEARCH
          </button>
        </div>
      </div>

      {/* Rendered Chats List Section */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "0 12px",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {Object.entries(groupedChats).map(([timeGroup, items]) => {
          if (items.length === 0) return null;

          return (
            <div key={timeGroup} style={{ marginBottom: 24 }}>
              {/* Category Heading Text */}
              <div
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  color: "#383d52",
                  letterSpacing: "0.15em",
                  marginBottom: 12,
                  paddingLeft: 4
                }}
              >
                {timeGroup}
              </div>

              {/* Chat Cards List */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {items.map((chat, idx) => {
                  const isActive = activeChatId === chat.id;
                  const meta = getMockMeta(idx);

                  // Format time to matches HH:MM:SS format seen in your picture
                  const timeString = chat.created_at
                    ? new Date(chat.created_at).toTimeString().split(' ')[0]
                    : "00:00:00";

                  return (
                    <button
                      key={chat.id}
                      onClick={() =>
                        navigate(`/dashboard/omni-search?profileId=${currentProfileId}&chatId=${chat.id}`)
                      }
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: isActive ? "12px" : "6px 12px",
                        background: isActive ? "#1f2433" : "transparent",
                        border: isActive ? "2px solid #2d354d" : "1px solid transparent",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        outline: "none",
                        boxSizing: "border-box"
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.border = "1px solid #1a1e29";
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.border = "1px solid transparent";
                      }}
                    >
                      {/* Top Row: Icon + Title */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: 6,
                          color: isActive ? "#ffffff" : "#a3a9be",
                        }}
                      >
                        {meta.icon}
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: isActive ? "600" : "400",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            flex: 1
                          }}
                        >
                          {chat.title || "Untitled chat"}
                        </div>
                      </div>

                      {/* Subtitle Row: Timestamp // Scope Tag */}
                      <div
                        style={{
                          fontSize: 10,
                          color: "#4e556e",
                          letterSpacing: "0.05em",
                          display: "flex",
                          alignItems: "center",
                          paddingLeft: 18 // Indents with title icon
                        }}
                      >
                        <span>{timeString}</span>
                        <span style={{ margin: "0 6px", color: "#2d3247" }}>//</span>
                        <span style={{ color: isActive ? "#637399" : "#4e556e" }}>{meta.tag}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer Operations */}
      <div style={{ padding: "0 12px", borderTop: "1px solid #161922", paddingTop: 12 }}>
        <button
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            background: "none",
            border: "none",
            color: "#4e556e",
            fontFamily: "inherit",
            fontSize: 11,
            cursor: "pointer",
            letterSpacing: "0.08em",
            marginBottom: 4,
            textAlign: "left"
          }}
        >
          <SecurityIcon />
          Security
        </button>

        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            background: "none",
            border: "none",
            color: "#4e556e",
            fontFamily: "inherit",
            fontSize: 11,
            cursor: "pointer",
            letterSpacing: "0.08em",
            textAlign: "left"
          }}
        >
          <LogoutIcon />
          Log Out
        </button>
      </div>
    </aside>
  );
}
