// Data Control & Erasure Center — Archives > MEMORY_NODES
import DashboardShell from '../components/layout/DashboardShell';
import { useSearchParams } from 'react-router-dom';
import { useCommunication } from '../hook/communication.hook';
import { useMemory } from '../hook/memory.hook';
import {
  NODES,
  PageTitle,
  FilterBox,
  DataTable,
  PaginationBar,
  MemoryControlRules,
  useNodeSelection,
} from '../components/sections/DataControlSections';
import { useEffect, useState } from 'react';

export default function DataControlPage() {
  const {
    selectedIds, search, setSearch, filtered,
    toggle, toggleAll, allSelected,
  } = useNodeSelection(NODES);
  const [nodes, setNodes] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 50;
  const profileId = searchParams.get('profileId') || '';

  const { getCommunications } = useCommunication();
  const { deleteMemoryNode, searchMemory } = useMemory();
  const onDeleteSelected = async () => {
    const ids = Array.from(selectedIds);

    if (ids.length === 0) return;

    await deleteMemoryNode(ids, profileId);

    // remove from UI immediately
    setNodes(prev => prev.filter(n => !selectedIds.has(n.id)));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!profileId) return;

      setLoading(true);

      const res = await getCommunications(profileId, page, limit);

      if (res?.data) {
        const mapped = (res.data.communications || []).map((item) => ({
          id: item.id,
          sender: item.sender,
          preview: item.content?.slice(0, 80) || "",
          type: item.type,
          typeVariant: item.type === "EMAIL" ? "info" : "profile",
          source: item.integration?.type || "UNKNOWN",
        }));

        setNodes(mapped);
        setTotal(res.data.total || 0);
      }

      setLoading(false);
    };

    fetchData();
  }, [profileId, page, limit]);
  useEffect(() => {
    const runSearch = async () => {
      if (!profileId) return;

      // empty search = load normal list
      if (!search.trim()) {
        const res = await getCommunications(profileId, page, limit);

        if (res?.data) {
          const mapped = res.data.communications.map((item) => ({
            id: item.id,
            sender: item.sender,
            preview: item.content?.slice(0, 80) || "",
            type: item.type,
            typeVariant: item.type === "EMAIL" ? "info" : "profile",
            source: item.integration?.type || "UNKNOWN",
          }));

          setNodes(mapped);
          setTotal(res.data.total || 0);
        }

        return;
      }

      const res = await searchMemory(
        profileId,
        search,
        {},
        limit,
        (page - 1) * limit
      );

      if (res?.data) {
        const mapped = res.data.map((item) => ({
          id: item.id,
          sender: item.sender,
          preview: item.content?.slice(0, 80) || "",
          type: item.type,
          typeVariant: item.type === "EMAIL" ? "info" : "profile",
          source: item.integration?.type || "UNKNOWN",
        }));

        setNodes(mapped);
      }
    };

    runSearch();
  }, [search, profileId, page, limit]);

  return (
    <DashboardShell mainStyle={{ padding: 0, height: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', height: '100%' }}>
        {/* Left Area */}
        <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border-dim)', overflowY: 'auto', marginLeft: 210 }}>
          <PageTitle />
          <FilterBox search={search} onSearchChange={setSearch} />
          <DataTable
            nodes={nodes}
            selectedIds={selectedIds}
            onToggle={toggle}
            onToggleAll={toggleAll}
            onDeleteSelected={onDeleteSelected}
          />
          <PaginationBar page={page} limit={limit} total={total} profileId={profileId} />
        </div>

        {/* Right Area */}
        <div style={{ padding: '28px 24px', overflowY: 'auto' }}>
          <MemoryControlRules />
        </div>
      </div>
    </DashboardShell>
  );
}
