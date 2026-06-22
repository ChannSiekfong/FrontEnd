// Data Control & Erasure Center — Archives > MEMORY_NODES
import DashboardShell from '../components/layout/DashboardShell';
import {
  NODES,
  PageTitle,
  FilterBox,
  DataTable,
  PaginationBar,
  MemoryControlRules,
  useNodeSelection,
} from '../components/sections/DataControlSections';

export default function DataControlPage() {
  const {
    selectedIds, search, setSearch, filtered,
    toggle, toggleAll, allSelected,
  } = useNodeSelection(NODES);

  return (
    <DashboardShell mainStyle={{ padding: 0, height: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', height: '100%' }}>
        {/* Left Area */}
        <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border-dim)', overflowY: 'auto' }}>
          <PageTitle />
          <FilterBox search={search} onSearchChange={setSearch} />
          <DataTable
            nodes={filtered}
            selectedIds={selectedIds}
            onToggle={toggle}
            onToggleAll={toggleAll}
          />
          <PaginationBar />
        </div>

        {/* Right Area */}
        <div style={{ padding: '28px 24px', overflowY: 'auto' }}>
          <MemoryControlRules />
        </div>
      </div>
    </DashboardShell>
  );
}
