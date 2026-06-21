// Memory Archives — search history (SYSTEM LOGS sidebar)
import DashboardShell from '../components/layout/DashboardShell';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import Badge from '../components/ui/Badge';
import { HISTORY, HistoryItem, StatsRow } from '../components/sections/MemoryArchivesSections';

export default function MemoryArchivesPage() {
  return (
    <DashboardShell>
      <AnimatedSection delay={0}>
        <div style={{ maxWidth: 620 }}>
          {Object.entries(HISTORY).map(([day, items]) => (
            <div key={day}>
              <Badge variant="dim" label={day} style={{ marginBottom: 14, marginTop: 8 }} />
              {items.map(item => <HistoryItem key={item.id} item={item} />)}
            </div>
          ))}
        </div>
      </AnimatedSection>
      <AnimatedSection delay={1}>
        <StatsRow />
      </AnimatedSection>
    </DashboardShell>
  );
}
