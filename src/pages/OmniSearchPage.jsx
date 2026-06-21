// Omni-Search — AI chat interface
import { useState, useRef, useEffect } from 'react';
import DashboardShell from '../components/layout/DashboardShell';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { INITIAL_MESSAGES, UserMessage, AiMessage, TypingIndicator, ChatInput, RightPanel } from '../components/sections/OmniSearchSections';

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
        id: Date.now() + 1,
        type: 'ai',
        text: `Processing query: "${text}" — Scanning integrated modules...`,
        analysisTime: (Math.random() * 0.8 + 0.2).toFixed(3) + 's',
        time,
      }]);
    }, 1400);
  };

  return (
    <DashboardShell noPadding rightPanel={<RightPanel />}>
      <AnimatedSection delay={0} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
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
      </AnimatedSection>
    </DashboardShell>
  );
}
