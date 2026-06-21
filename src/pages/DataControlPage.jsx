// Data Control & Erasure Center — Archives > MEMORY_NODES
import DashboardShell from '../components/layout/DashboardShell';
import {
  NODES,
  PageTitle,
  FilterBar,
  BulkActionBar,
  DataTable,
  PaginationBar,
  useNodeSelection,
} from '../components/sections/DataControlSections';

export default function DataControlPage() {
  const {
    selectedIds, search, setSearch, filtered,
    toggle, toggleAll, allSelected,
  } = useNodeSelection(NODES);

  return (
    <DashboardShell mainStyle={{ padding: '28px 32px' }}>
      <PageTitle />
      <FilterBar search={search} onSearchChange={setSearch} />
      <BulkActionBar
        selectedCount={selectedIds.size}
        allSelected={allSelected}
        onSelectAll={toggleAll}
      />
      <DataTable
        nodes={filtered}
        selectedIds={selectedIds}
        onToggle={toggle}
        onToggleAll={toggleAll}
      />
      <PaginationBar />
    </DashboardShell>
  );
}
