// src/components/ui/StatusBar.jsx

export default function StatusBar({ left = [], right = '' }) {
  return (
    <div className="status-bar">
      <div className="status-bar-left">
        {left.map((item, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {item.dot && (
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: item.dot,
                animation: 'pulse-dot 2s ease-in-out infinite',
                display: 'inline-block',
              }} />
            )}
            {item.icon && <span style={{ fontSize: 10 }}>{item.icon}</span>}
            {item.label}
          </span>
        ))}
      </div>
      <span>{right}</span>
    </div>
  );
}
