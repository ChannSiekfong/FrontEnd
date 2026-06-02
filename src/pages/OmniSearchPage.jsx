// src/pages/OmniSearchPage.jsx
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import StatusBar from '../components/ui/StatusBar';

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const ExtLinkIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const INITIAL_MESSAGES = [
  {
    id: 1, type: 'user',
    text: 'Did someone mention plans for Saturday?',
    time: '10:42:01',
  },
  {
    id: 2, type: 'ai',
    text: 'Yes, I found two references to Saturday plans in your work communications:',
    sources: [
      {
        service: 'GMAIL', dot: '#4a9eff',
        title: 'Subject: Project Phoenix Sync',
        excerpt: '"Let\'s move the final sprint review to Saturday morning at 10 AM if the server migration..."',
      },
      {
        service: 'TELEGRAM', dot: '#a855f7',
        title: 'From: Sarah (Lead Engineer)',
        excerpt: '"Saturday hiking after the deployment? Thinking Mount Diablo at 1 PM."',
      },
    ],
    note: 'Note: There is a potential schedule conflict between the 10 AM review and the 1 PM hike due to commute time.',
    time: '10:42:03',
    analysisTime: '0.842s',
  },
];

function UserMessage({ msg }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 6 }}>
      <div style={{
        background: '#1a2235',
        border: '1px solid var(--border-mid)',
        padding: '10px 16px',
        maxWidth: '65%',
        fontSize: 13,
        color: 'var(--text-primary)',
        lineHeight: 1.5,
      }}>
        {msg.text}
      </div>
    </div>
  );
}

function AiMessage({ msg }) {
  return (
    <div style={{ marginBottom: 8 }}>
      {/* AI header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '6px 14px',
        background: 'var(--bg-input)',
        borderTop: '1px solid var(--border-mid)',
        borderLeft: '1px solid var(--border-mid)',
        borderRight: '1px solid var(--border-mid)',
        fontSize: 9, letterSpacing: '0.14em',
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-blue)', display: 'inline-block' }} />
          <span style={{ color: 'var(--accent-blue)' }}>AI_COPROCESSOR_LINK</span>
        </span>
        <span style={{ color: 'var(--text-muted)' }}>VER_4.2.0</span>
      </div>

      {/* AI body */}
      <div style={{
        border: '1px solid var(--border-mid)',
        background: 'var(--bg-card)',
        padding: '16px',
      }}>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14, lineHeight: 1.6 }}>
          {msg.text}
        </p>

        {msg.sources && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            {msg.sources.map((src, i) => (
              <div key={i} style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border-mid)',
                padding: '12px 14px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 9, letterSpacing: '0.14em', color: src.dot }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: src.dot, display: 'inline-block' }} />
                    {src.service}
                  </span>
                  <ExtLinkIcon />
                </div>
                <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4, fontFamily: 'var(--font-display)' }}>
                  {src.title}
                </p>
                <p style={{ fontSize: 10, color: 'var(--text-dim)', lineHeight: 1.5 }}>{src.excerpt}</p>
              </div>
            ))}
          </div>
        )}

        {msg.note && (
          <p style={{ fontSize: 12, color: 'var(--text-dim)', fontStyle: 'italic', lineHeight: 1.6 }}>
            {msg.note}
          </p>
        )}
      </div>

      {msg.analysisTime && (
        <div style={{ fontSize: 9, letterSpacing: '0.12em', color: 'var(--text-muted)', marginTop: 6 }}>
          ANALYSIS_COMPLETE // {msg.analysisTime}
        </div>
      )}
    </div>
  );
}

export default function OmniSearchPage() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

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
        id: Date.now() + 1, type: 'ai',
        text: `Processing query: "${text}" — Scanning integrated modules across all connected sources...`,
        analysisTime: (Math.random() * 0.8 + 0.2).toFixed(3) + 's',
        time,
      }]);
    }, 1400);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-base)' }}>
      <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em', padding: '5px 18px', background: 'rgba(10,11,14,.95)', borderBottom: '1px solid var(--border-dim)' }}>
        AI Search Dashboard
      </div>
      <Navbar showSidebar />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />

        {/* Main chat area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px 24px 0' }}>
            {/* User query timestamp */}
            {messages.map((msg, i) => (
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
            {typing && (
              <div style={{ border: '1px solid var(--border-mid)', background: 'var(--bg-card)', padding: '14px 16px', marginBottom: 8 }}>
                <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                  {[0,1,2].map(i => (
                    <span key={i} style={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: 'var(--accent-blue)',
                      animation: `blink 1.2s ${i * 0.2}s ease-in-out infinite`,
                      display: 'inline-block',
                    }} />
                  ))}
                  <span style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.14em', marginLeft: 8 }}>
                    PROCESSING_QUERY...
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div style={{ padding: '14px 24px', borderTop: '1px solid var(--border-dim)' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              border: '1px solid var(--border-mid)',
              background: 'var(--bg-input)',
              padding: '0 14px',
            }}>
              <span style={{ fontSize: 9, letterSpacing: '0.12em', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ verticalAlign: 'middle', marginRight: 4 }}>
                  <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
                </svg>
                QUERY_SYSTEM &gt;
              </span>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Type your command or search query..."
                style={{
                  flex: 1, background: 'none', border: 'none',
                  color: 'var(--text-primary)', fontFamily: 'var(--font-mono)',
                  fontSize: 12, padding: '13px 0', outline: 'none',
                  letterSpacing: '0.04em',
                }}
              />
              <button onClick={handleSend} style={{
                background: 'none', border: 'none',
                color: input.trim() ? 'var(--accent-blue)' : 'var(--text-muted)',
                cursor: 'pointer', padding: '6px', display: 'flex',
                transition: 'color 0.2s',
              }}>
                <SendIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{
          width: 180, borderLeft: '1px solid var(--border-dim)',
          padding: '20px 14px', background: 'var(--bg-sidebar)',
          display: 'flex', flexDirection: 'column', gap: 20,
        }}>
          {/* Active context */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 8, letterSpacing: '0.14em', color: 'var(--text-muted)', marginBottom: 10 }}>
              <span>ACTIVE_CONTEXT</span>
              <span style={{ color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-green)', display: 'inline-block', animation: 'pulse-dot 2s ease-in-out infinite' }} />
                SYNCING...
              </span>
            </div>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-mid)',
              padding: '10px 12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{ width: 24, height: 24, background: 'rgba(168,85,247,0.2)', border: '1px solid rgba(168,85,247,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>
                  💼
                </div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                  WORK_PROFILE
                </span>
              </div>
              <div style={{ fontSize: 8, color: 'var(--text-muted)', lineHeight: 1.6, letterSpacing: '0.08em' }}>
                ENCRYPTION: AES_256_ACTIVE<br />
                NODE_US_EAST_CLUSTER_01
              </div>
            </div>
          </div>

          {/* Integrated modules */}
          <div>
            <div style={{ fontSize: 8, letterSpacing: '0.14em', color: 'var(--text-muted)', marginBottom: 10 }}>
              INTEGRATED_MODULES
            </div>
            {[
              { name: 'GMAIL', status: 'LIVE', color: 'var(--accent-blue)' },
              { name: 'TELEGRAM', status: 'LIVE', color: 'var(--accent-purple)' },
              { name: 'JIRA', status: 'LINK_OFFLINE', color: 'var(--text-muted)' },
            ].map(mod => (
              <div key={mod.name} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '8px 10px',
                border: '1px solid var(--border-dim)',
                background: 'var(--bg-input)',
                marginBottom: 4,
              }}>
                <span style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>{mod.name}</span>
                <span style={{ fontSize: 7, letterSpacing: '0.12em', color: mod.color }}>
                  {mod.status === 'LIVE' && <span style={{ width: 4, height: 4, borderRadius: '50%', background: mod.color, display: 'inline-block', marginRight: 3 }} />}
                  {mod.status}
                </span>
              </div>
            ))}
          </div>

          {/* Neural load */}
          <div style={{ marginTop: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 8, letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: 8 }}>
              <span>NEURAL_LOAD</span>
              <span style={{ color: 'var(--text-dim)' }}>64%</span>
            </div>
            <div style={{ height: 3, background: 'var(--border-dim)', marginBottom: 4 }}>
              <div style={{ height: '100%', width: '64%', background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple))' }} />
            </div>
            <div style={{ display: 'flex', gap: 2 }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: 3,
                  background: i < 8 ? (i < 4 ? 'var(--accent-blue)' : 'var(--accent-purple)') : 'var(--border-dim)',
                }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
