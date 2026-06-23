// Data Control & Erasure Center — main content sections
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
          DATA CONTROL
        </h1>
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
function Checkbox({ checked, onChange }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        cursor: "pointer",
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{
          width: 16,
          height: 16,
          accentColor: "var(--accent-purple)",
          cursor: "pointer",
        }}
      />
    </label>
  );
}
export function DataTable({ nodes, selectedIds, onToggle, onToggleAll, onDeleteSelected }) {
  const allSelected =
    nodes.length > 0 && nodes.every((n) => selectedIds.has(n.id));

  return (
    <div
      className="animate-fade-up-delay-2 table-scroll"
      style={{
        marginBottom: 24,
        flex: 1,
        overflowY: "auto",
      }}
    >
      <div
        style={{
          border: "1px solid var(--border-dim)",
          background: "transparent",
        }}
      >
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 16px",
          borderBottom: "1px solid var(--border-dim)"
        }}>
          <span style={{ fontSize: 10, color: "var(--text-dim)" }}>
            {selectedIds.size} SELECTED
          </span>

          <button
            onClick={onDeleteSelected}
            disabled={selectedIds.size === 0}
            style={{
              fontSize: 10,
              padding: "6px 10px",
              background: selectedIds.size ? "#ff4d4f" : "#333",
              color: "#fff",
              border: "none",
              cursor: selectedIds.size ? "pointer" : "not-allowed",
              opacity: selectedIds.size ? 1 : 0.4,
            }}
          >
            DELETE
          </button>
        </div>
        {/* HEADER */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "40px 1.4fr 2.5fr 120px 1.2fr",
            padding: "12px 16px",
            borderBottom: "1px solid var(--border-dim)",
            fontSize: 9,
            letterSpacing: "0.14em",
            color: "var(--text-dim)",
            textTransform: "uppercase",
            alignItems: "center",
          }}
        >
          <Checkbox
            checked={allSelected}
            onChange={() => onToggleAll(nodes)}
          />

          <span>SENDER</span>
          <span>CONTENT PREVIEW</span>
          <span>TYPE</span>
          <span>SOURCE</span>
        </div>

        {/* ROWS */}
        {nodes.map((node) => (
          <div
            key={node.id}
            style={{
              display: "grid",
              gridTemplateColumns: "40px 1.4fr 2.5fr 120px 1.2fr",
              padding: "14px 16px",
              borderBottom: "1px solid var(--border-dim)",
              alignItems: "center",
              gap: "10px",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--bg-card-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            {/* checkbox */}
            <Checkbox
              checked={selectedIds.has(node.id)}
              onChange={() => onToggle(node.id)}
            />

            {/* sender */}
            <span
              style={{
                fontSize: 11,
                color: "var(--text-primary)",
                whiteSpace: "pre-line",
                lineHeight: 1.3,
                overflow: "hidden",
              }}
            >
              {node.sender}
            </span>

            {/* preview */}
            <span
              style={{
                fontSize: 11,
                color: "var(--text-dim)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }}
              title={node.preview}
            >
              {node.preview}
            </span>

            {/* type */}
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <TypeBadge type={node.type} variant={node.typeVariant} />
            </div>

            {/* source */}
            <span
              style={{
                fontSize: 10,
                color: "var(--text-secondary)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }}
              title={node.source}
            >
              {node.source}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PaginationBar({
  page = 1,
  limit = 25,
  total = 0,
  profileId = '',
}) {
  const navigate = useNavigate();

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  const goToPage = (newPage) => {
    navigate(
      `/dashboard/data-control?profileId=${profileId}&page=${newPage}&limit=${limit}`
    );
  };

  return (
    <div style={{
      padding: '14px 16px',
      border: '1px solid var(--border-dim)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>

      {/* LEFT */}
      <span style={{ width: 180, fontSize: 10 }}>
        SHOWING {start}-{end}
        <br />
        OF {total.toLocaleString()}
      </span>

      {/* CENTER */}
      <div style={{ display: 'flex', border: '1px solid var(--border-dim)', borderRadius: 6, overflow: 'hidden' }}>
        <button
          disabled={page <= 1}
          onClick={() => goToPage(page - 1)}
          style={{
            padding: '10px 16px',
            opacity: page <= 1 ? 0.3 : 1,
            cursor: page <= 1 ? 'not-allowed' : 'pointer',
            border: 'none',
          }}
        >
          PREV
        </button>

        <div style={{
          padding: '10px 16px',
          borderLeft: '1px solid var(--border-dim)',
          borderRight: '1px solid var(--border-dim)',
        }}>
          {page} / {totalPages}
        </div>

        <button
          disabled={page >= totalPages}
          onClick={() => goToPage(page + 1)}
          style={{
            padding: '10px 16px',
            opacity: page >= totalPages ? 0.3 : 1,
            cursor: page >= totalPages ? 'not-allowed' : 'pointer',
            border: 'none',
          }}
        >
          NEXT
        </button>
      </div>

      {/* RIGHT */}
      <span style={{ width: 120, fontSize: 10 }}>
        LIMIT<br />
        {limit}
      </span>
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

  const toggleAll = (items) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);

      const allSelected = items.every((n) => next.has(n.id));

      if (allSelected) {
        // remove all
        items.forEach((n) => next.delete(n.id));
      } else {
        // add all
        items.forEach((n) => next.add(n.id));
      }

      return next;
    });
  };

  const allSelected = filtered.length > 0 && filtered.every(n => selectedIds.has(n.id));

  return { selectedIds, search, setSearch, filtered, toggle, toggleAll, allSelected };
}
