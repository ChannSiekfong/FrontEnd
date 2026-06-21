// Data Control & Erasure Center — main content sections
import { useState } from 'react';
import Button from '../ui/Button';
import { TrashIcon, DownloadIcon, CalendarIcon, ChevronDownIcon } from '../ui/Icons';

export const NODES = [
  { id: 1, sender: 'sarah.m@company.ai', type: 'EMAIL',    typeVariant: 'info',    date: '2023-11-24', preview: 'RE: Product Strategy Q4 Review' },
  { id: 2, sender: '@dev_lead',          type: 'TELEGRAM', typeVariant: 'profile', date: '2023-11-24', preview: 'Server deployment failed in produc...' },
];

const TOTAL_NODES = 12402;
const PAGE_SIZE = 50;

function FilterSelect({ label }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '10px 14px',
      background: 'var(--bg-input)',
      border: '1px solid var(--border-mid)',
      fontSize: 10, letterSpacing: '0.1em',
      color: 'var(--text-secondary)',
      cursor: 'pointer', whiteSpace: 'nowrap',
    }}>
      {label}
      {label.includes('RANGE') && <CalendarIcon />}
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
    <div className="animate-fade-up page-title-row" style={{ marginBottom: 24 }}>
      <div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 26, fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '0.04em',
          marginBottom: 8,
        }}>
          DATA CONTROL & ERASURE CENTER
        </h1>
        <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.7, maxWidth: 520 }}>
          Advanced neural node management. Query, audit, and purge ingestion fragments from your synchronized data streams.
        </p>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '6px 14px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-mid)',
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

export function FilterBar({ search, onSearchChange }) {
  return (
    <div className="animate-fade-up-delay-1 filter-bar-row" style={{ marginBottom: 12 }}>
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search communications..."
        style={{
          flex: 1, padding: '10px 14px',
          background: 'var(--bg-input)',
          border: '1px solid var(--border-mid)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-mono)', fontSize: 12,
          outline: 'none', letterSpacing: '0.04em',
        }}
      />
      <FilterSelect label="SENDER: ALL SENDERS" />
      <FilterSelect label="TYPE: ALL TYPES" />
      <FilterSelect label="RANGE: ALL TIME" />
    </div>
  );
}

export function BulkActionBar({ selectedCount, allSelected, onSelectAll }) {
  return (
    <div className="animate-fade-up-delay-1 bulk-action-row" style={{
      padding: '12px 16px',
      background: 'var(--bg-card)',
      border: '1px solid var(--border-dim)',
      marginBottom: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <input
          type="checkbox"
          checked={allSelected}
          onChange={onSelectAll}
          style={{ width: 14, height: 14, accentColor: 'var(--accent-purple)', cursor: 'pointer' }}
        />
        <span style={{ fontSize: 10, letterSpacing: '0.12em', color: 'var(--text-secondary)' }}>
          SELECT_ALL_SHARDS
        </span>
        <span style={{ fontSize: 10, letterSpacing: '0.12em', color: 'var(--text-dim)' }}>
          {selectedCount}_NODES_SELECTED
        </span>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button variant="ghost" style={{ fontSize: 10 }}>
          <DownloadIcon /> EXPORT_DATA
        </Button>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '10px 14px',
          background: '#ef4444',
          border: 'none',
          color: '#fff',
          fontFamily: 'var(--font-mono)', fontSize: 10,
          letterSpacing: '0.12em', cursor: 'pointer',
        }}>
          <TrashIcon size={12} /> DELETE_SELECTED
        </button>
      </div>
    </div>
  );
}

export function DataTable({ nodes, selectedIds, onToggle, onToggleAll }) {
  const allSelected = nodes.length > 0 && nodes.every(n => selectedIds.has(n.id));

  return (
    <div className="animate-fade-up-delay-2 table-scroll">
    <div style={{
      border: '1px solid var(--border-dim)',
      borderTop: 'none',
      background: 'var(--bg-card)',
    }}>
      {/* Table header */}
      <div className="data-table-grid" style={{
        display: 'grid',
        gridTemplateColumns: '40px 1.2fr 100px 110px 1.5fr 60px',
        padding: '12px 16px',
        borderBottom: '1px solid var(--border-dim)',
        fontSize: 9, letterSpacing: '0.14em', color: 'var(--text-dim)',
      }}>
        <span>
          <input
            type="checkbox"
            checked={allSelected}
            onChange={onToggleAll}
            style={{ width: 14, height: 14, accentColor: 'var(--accent-purple)', cursor: 'pointer' }}
          />
        </span>
        <span>SENDER</span>
        <span>TYPE</span>
        <span>DATE</span>
        <span>PREVIEW</span>
        <span style={{ textAlign: 'center' }}>ACTIONS</span>
      </div>

      {/* Table rows */}
      {nodes.map(node => (
        <div key={node.id} className="data-table-grid" style={{
          display: 'grid',
          gridTemplateColumns: '40px 1.2fr 100px 110px 1.5fr 60px',
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
              style={{ width: 14, height: 14, accentColor: 'var(--accent-purple)', cursor: 'pointer' }}
            />
          </span>
          <span style={{ fontSize: 12, color: 'var(--text-primary)' }}>{node.sender}</span>
          <span><TypeBadge type={node.type} variant={node.typeVariant} /></span>
          <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{node.date}</span>
          <span style={{ fontSize: 11, color: 'var(--text-dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {node.preview}
          </span>
          <span style={{ textAlign: 'center' }}>
            <button style={{
              background: 'none', border: 'none',
              color: 'var(--text-dim)', cursor: 'pointer', padding: 4,
            }}>
              <TrashIcon />
            </button>
          </span>
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
      borderTop: 'none',
      background: 'var(--bg-card)',
      fontSize: 10, letterSpacing: '0.1em', color: 'var(--text-dim)',
    }}>
      <span>SHOWING 1-{PAGE_SIZE} OF {TOTAL_NODES.toLocaleString()} NODES</span>
      <div style={{ display: 'flex', gap: 8 }}>
        <button style={{
          padding: '6px 14px',
          background: 'var(--bg-input)',
          border: '1px solid var(--border-mid)',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)', fontSize: 9,
          letterSpacing: '0.12em', cursor: 'not-allowed',
        }}>
          &lt; PREVIOUS
        </button>
        <button style={{
          padding: '6px 14px',
          background: 'var(--bg-input)',
          border: '1px solid var(--border-mid)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-mono)', fontSize: 9,
          letterSpacing: '0.12em', cursor: 'pointer',
        }}>
          NEXT &gt;
        </button>
      </div>
      <span>LIMIT: {PAGE_SIZE}</span>
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
