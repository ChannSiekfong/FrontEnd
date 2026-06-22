// Data Control & Erasure Center — main content sections
import { useState } from 'react';
import Button from '../ui/Button';
import { TrashIcon, CalendarIcon, ChevronDownIcon, SearchIcon } from '../ui/Icons';

export const NODES = [
  { id: 1, sender: 'Sarah\nMitchell', type: 'EMAIL', typeVariant: 'info', source: 'GMAIL / WORK', preview: 'RE: Product Strategy Q4 Review - Attach...' },
  { id: 2, sender: 'Dev Lead\n@Nexus', type: 'TELEGRAM', typeVariant: 'profile', source: 'NEXUS_MAIN', preview: 'Server deployment failed in production ...' },
  { id: 3, sender: 'Amazon.com', type: 'EMAIL', typeVariant: 'info', source: 'GMAIL / PERSONAL', preview: 'Your order #112-4456-99 has been delive...' },
];

const TOTAL_NODES = 12402;
const PAGE_SIZE = 50;

function FilterSelect({ label, flex }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
      padding: '10px 14px',
      background: 'transparent',
      border: '1px solid var(--border-mid)',
      fontSize: 10, letterSpacing: '0.1em',
      color: 'var(--text-secondary)',
      cursor: 'pointer', whiteSpace: 'nowrap',
      flex: flex || 'none'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {label.includes('21/06/2026') && <CalendarIcon />}
        {label}
      </div>
      <ChevronDownIcon />
    </div>
  );
}

function TypeBadge({ type, variant }) {
  const styles = {
    info:    { bg: 'rgba(74,158,255,0.12)',  border: '1px solid rgba(74,158,255,0.3)',  color: 'var(--accent-blue)' },
    profile: { bg: 'rgba(168,85,247,0.15)',  border: '1px solid rgba(168,85,247,0.3)',  color: '#c084fc' },
  };
  const s = styles[variant] || styles.info;

  return (
    <span style={{
      display: 'inline-block',
      background: s.bg, border: s.border, color: s.color,
      fontSize: 8, letterSpacing: '0.14em', padding: '3px 8px',
      fontFamily: 'var(--font-mono)',
    }}>
      {type}
    </span>
  );
}

export function PageTitle() {
  return (
    <div className="animate-fade-up page-title-row" style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 26, fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '0.04em',
          marginBottom: 8,
          textTransform: 'uppercase'
        }}>
          DATA CONTROL &<br/>ERASURE CENTER
        </h1>
        <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.7, maxWidth: 460 }}>
          Advanced neural node management. Query, audit, and purge ingestion fragments from your synchronized data streams.
        </p>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '6px 14px',
        background: 'rgba(74,158,255,0.05)',
        border: '1px solid rgba(74,158,255,0.2)',
        fontSize: 9, letterSpacing: '0.12em', color: 'var(--text-secondary)',
        whiteSpace: 'nowrap',
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: 'var(--accent-blue)', display: 'inline-block',
        }} />
        SYSTEM_STATUS: NOMINAL
      </div>
    </div>
  );
}

export function FilterBox({ search, onSearchChange }) {
  return (
    <div className="animate-fade-up-delay-1 filter-box" style={{ 
      marginBottom: 24, 
      border: '1px solid var(--border-dim)', 
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 14px',
        background: 'transparent',
        border: '1px solid var(--border-mid)',
      }}>
        <SearchIcon size={14} />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search your memory..."
          style={{
            flex: 1, 
            background: 'transparent',
            border: 'none',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-mono)', fontSize: 12,
            outline: 'none', letterSpacing: '0.04em',
          }}
        />
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        <FilterSelect label="SENDER: Start typing..." flex={1} />
        <FilterSelect label="TYPE: ALL" flex={1} />
        <FilterSelect label="INT: ALL" flex={1} />
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ width: '40%' }}>
          <FilterSelect label="21/06/2026 - 21/06/2026" flex={1} />
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button style={{ fontSize: 10, background: '#a0c0ff', color: '#000', border: 'none', padding: '10px 24px', letterSpacing: '0.1em', fontWeight: 600 }}>
            APPLY FILTERS
          </Button>
          <Button variant="ghost" style={{ fontSize: 10, background: '#333', border: 'none' }}>
            RESET
          </Button>
        </div>
      </div>
    </div>
  );
}

export function DataTable({ nodes, selectedIds, onToggle, onToggleAll }) {
  const allSelected = nodes.length > 0 && nodes.every(n => selectedIds.has(n.id));

  return (
    <div className="animate-fade-up-delay-2 table-scroll" style={{ marginBottom: 24, flex: 1, overflowY: 'auto' }}>
    <div style={{
      border: '1px solid var(--border-dim)',
      background: 'transparent',
    }}>
      {/* Table header */}
      <div className="data-table-grid" style={{
        display: 'grid',
        gridTemplateColumns: '40px 1.2fr 2fr 80px 1fr',
        padding: '12px 16px',
        borderBottom: '1px solid var(--border-dim)',
        fontSize: 9, letterSpacing: '0.14em', color: 'var(--text-dim)',
        textTransform: 'uppercase'
      }}>
        <span>
          <input
            type="checkbox"
            checked={allSelected}
            onChange={onToggleAll}
            style={{ width: 14, height: 14, accentColor: 'var(--accent-purple)', cursor: 'pointer', background: 'transparent' }}
          />
        </span>
        <span>SENDER<br/>NAME</span>
        <span>CONTENT PREVIEW</span>
        <span>TYPE</span>
        <span>SOURCE</span>
      </div>

      {/* Table rows */}
      {nodes.map(node => (
        <div key={node.id} className="data-table-grid" style={{
          display: 'grid',
          gridTemplateColumns: '40px 1.2fr 2fr 80px 1fr',
          padding: '14px 16px',
          borderBottom: '1px solid var(--border-dim)',
          alignItems: 'center',
          transition: 'background 0.15s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card-hover)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <span>
            <input
              type="checkbox"
              checked={selectedIds.has(node.id)}
              onChange={() => onToggle(node.id)}
              style={{ width: 14, height: 14, accentColor: 'var(--accent-purple)', cursor: 'pointer', background: 'transparent' }}
            />
          </span>
          <span style={{ fontSize: 11, color: 'var(--text-primary)', whiteSpace: 'pre-line', lineHeight: 1.4 }}>{node.sender}</span>
          <span style={{ fontSize: 11, color: 'var(--text-dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {node.preview}
          </span>
          <span><TypeBadge type={node.type} variant={node.typeVariant} /></span>
          <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{node.source}</span>
        </div>
      ))}
    </div>
    </div>
  );
}

export function PaginationBar() {
  return (
    <div className="animate-fade-up-delay-3 pagination-row" style={{
      padding: '14px 16px',
      border: '1px solid var(--border-dim)',
      background: 'transparent',
      fontSize: 10, letterSpacing: '0.1em', color: 'var(--text-dim)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    }}>
      <span style={{ width: 140 }}>SHOWING 1-{PAGE_SIZE} OF {TOTAL_NODES.toLocaleString()}<br/>NODES</span>
      <div style={{ display: 'flex', gap: 0, border: '1px solid var(--border-dim)' }}>
        <button style={{
          padding: '10px 16px',
          background: 'transparent',
          border: 'none',
          borderRight: '1px solid var(--border-dim)',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)', fontSize: 9,
          letterSpacing: '0.12em', cursor: 'not-allowed',
        }}>
          &lt;<br/>PREVIOUS
        </button>
        <button style={{
          padding: '10px 16px',
          background: 'transparent',
          border: 'none',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-mono)', fontSize: 9,
          letterSpacing: '0.12em', cursor: 'pointer',
        }}>
          NEXT<br/>&gt;
        </button>
      </div>
      <span style={{ width: 100 }}>DISPLAY LIMIT:<br/>{PAGE_SIZE}</span>
    </div>
  );
}

export function MemoryControlRules() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ fontSize: 12, letterSpacing: '0.1em', color: 'var(--accent-blue)', marginBottom: 20 }}>
        MEMORY CONTROL RULES
      </div>
      
      <div style={{ border: '1px solid var(--border-dim)', padding: 16, marginBottom: 24 }}>
        <div style={{ fontSize: 10, color: 'var(--text-secondary)', letterSpacing: '0.14em', marginBottom: 16 }}>
          CREATE NEW RULE
        </div>
        
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: '0.1em', marginBottom: 6 }}>RULE TYPE</div>
          <div style={{ padding: '8px 12px', border: '1px solid var(--border-mid)', fontSize: 11, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-primary)' }}>
            <span>Block Sender</span>
            <ChevronDownIcon />
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: '0.1em', marginBottom: 6 }}>VALUE INPUT</div>
          <input type="text" placeholder="e.g. spam@domain.com" style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border-mid)', background: 'transparent', color: 'var(--text-primary)', fontSize: 11, fontFamily: 'var(--font-mono)', outline: 'none' }} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: '0.1em', marginBottom: 8 }}>SCOPE SELECTOR</div>
          <div style={{ display: 'flex', gap: 12, fontSize: 10, color: 'var(--text-secondary)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <input type="radio" name="scope" style={{ accentColor: 'var(--accent-blue)', background: 'transparent' }} /> Ingestion
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <input type="radio" name="scope" style={{ accentColor: 'var(--accent-blue)', background: 'transparent' }} /> Retrieval
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <input type="radio" name="scope" defaultChecked style={{ accentColor: 'var(--accent-blue)', background: 'transparent' }} /> Both
            </label>
          </div>
        </div>

        <Button style={{ width: '100%', background: '#a0c0ff', color: '#000', border: 'none', padding: '10px', fontSize: 10, letterSpacing: '0.1em', fontWeight: 600 }}>
          ADD RULE
        </Button>
      </div>

      <div style={{ fontSize: 10, color: 'var(--text-secondary)', letterSpacing: '0.14em', marginBottom: 12 }}>
        ACTIVE RULES (3)
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <RuleCard 
          type="BLOCK SENDER" 
          value="newsletter@marketing.io" 
          scope="INGESTION" 
          active={true} 
        />
        <RuleCard 
          type="BLOCK KEYWORD" 
          value='"Crypto Offer"' 
          scope="BOTH" 
          active={true} 
        />
        <RuleCard 
          type="BLOCK CHAT" 
          value="Family_Spam_Group" 
          scope="RETRIEVAL" 
          active={false} 
        />
      </div>
    </div>
  );
}

function RuleCard({ type, value, scope, active }) {
  return (
    <div style={{ border: '1px solid var(--border-dim)', padding: 12, position: 'relative' }}>
      <button style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
        <TrashIcon size={12} />
      </button>
      <div style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: '0.1em', marginBottom: 4 }}>{type}</div>
      <div style={{ fontSize: 11, color: 'var(--text-primary)', marginBottom: 8 }}>{value}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 8, padding: '2px 6px', border: '1px solid var(--border-mid)', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>SCOPE: {scope}</span>
        <div style={{ width: 24, height: 12, borderRadius: 6, background: active ? 'var(--accent-blue)' : 'var(--border-mid)', position: 'relative', opacity: active ? 0.7 : 0.4 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff', position: 'absolute', top: 1, left: active ? 13 : 1 }} />
        </div>
      </div>
    </div>
  );
}

export function useNodeSelection(nodes) {
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [search, setSearch] = useState('');

  const filtered = nodes.filter(n =>
    !search || n.sender.toLowerCase().includes(search.toLowerCase()) ||
    n.preview.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (filtered.every(n => selectedIds.has(n.id))) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map(n => n.id)));
    }
  };

  const allSelected = filtered.length > 0 && filtered.every(n => selectedIds.has(n.id));

  return { selectedIds, search, setSearch, filtered, toggle, toggleAll, allSelected };
}
