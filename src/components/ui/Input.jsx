// src/components/ui/Input.jsx
// All text input variants used across the app.
// Usage: <Input label="EMAIL" placeholder="..." value={v} onChange={fn} />

import { useState } from 'react';

export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  readOnly = false,
  style = {},
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: 8,
          letterSpacing: '0.2em',
          color: 'var(--text-dim)',
          marginBottom: 6,
          fontFamily: 'var(--font-mono)',
        }}>
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          padding: '10px 12px',
          background: 'var(--bg-input)',
          border: `1px solid ${focused ? 'var(--accent-blue)' : readOnly ? 'var(--border-dim)' : 'var(--border-mid)'}`,
          color: readOnly ? 'var(--text-muted)' : 'var(--text-primary)',
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          outline: 'none',
          letterSpacing: '0.05em',
          cursor: readOnly ? 'not-allowed' : 'text',
          transition: 'border-color 0.2s',
          boxShadow: focused ? '0 0 0 2px rgba(74,158,255,0.08)' : 'none',
          ...style,
        }}
      />
    </div>
  );
}
