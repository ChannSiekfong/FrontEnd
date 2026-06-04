// src/pages/OmniSearchPage.jsx
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import StatusBar from '../components/ui/StatusBar';

import { INITIAL_MESSAGES, UserMessage, AiMessage, TypingIndicator, ChatInput, RightPanel } from '../components/sections/OmniSearchSections';

export default function OmniSearchPage() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    const now = new Date();
    const time = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`;

    setMessages(m => [...m, { id: Date.now(), type: 'user', text, time }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, {
        id: Date.now() + 1,
        type: 'ai',
        text: `Processing query: "${text}" — Scanning integrated modules...`,
        analysisTime: (Math.random() * 0.8 + 0.2).toFixed(3) + 's',
        time,
      }]);
    }, 1400);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-base)', overflow: 'hidden' }}>
      <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em', padding: '5px 18px', background: 'rgba(10,11,14,.95)', borderBottom: '1px solid var(--border-dim)' }}>
        AI Search Dashboard
      </div>

      <Navbar activePage="workspace" onNavigate={(to) => navigate(`/${to}`)} showSidebar onProfileSwitch={() => navigate('/profile-selection')} />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar activeItem="omni-search" onNavigate={(to) => navigate(`/${to}`)} onLogout={() => navigate('/')} />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px 24px 0' }}>
            {messages.map(msg => (
              <div key={msg.id}>
                {msg.type === 'user' && (
                  <>
                    <UserMessage msg={msg} />
                    <div style={{ textAlign: 'right', fontSize: 8, letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: 14 }}>
                      USER_QUERY_SENT // {msg.time}
                    </div>
                  </>
                )}
                {msg.type === 'ai' && <AiMessage msg={msg} />}
              </div>
            ))}
            {typing && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          <ChatInput input={input} setInput={setInput} onSend={handleSend} />
        </div>

        <RightPanel />
      </div>

      <StatusBar left={[{ label: 'NEURAL_LOAD' }, { label: '64%' }]} right="SYSTEM_LIVE • v1.4.2_DELTA" />
    </div>
  );
}