// src/pages/MemoryArchivesPage.jsx
import { useNavigate } from 'react-router-dom';
import DashboardShell from '../components/layout/DashboardShell';
import PageHeader from '../components/ui/PageHeader';
import Footer from '../components/ui/Footer';
import Badge from '../components/ui/Badge';

import { HISTORY, HistoryItem, StatsRow } from '../components/sections/MemoryArchivesSections';

export default function MemoryArchivesPage() {
  const navigate = useNavigate();

  return (
    <DashboardShell topBar="Search History">
      <div style={{ maxWidth: 620 }}>
        {Object.entries(HISTORY).map(([day, items]) => (
          <div key={day}>
            <Badge variant="dim" label={day} style={{ marginBottom: 14, marginTop: 8 }} />
            {items.map(item => <HistoryItem key={item.id} item={item} />)}
          </div>
        ))}
      </div>

      <StatsRow />

      <Footer variant="memory" />
    </DashboardShell>
  );
}