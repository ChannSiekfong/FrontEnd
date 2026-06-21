// Unified dashboard layout
import { useLocation } from 'react-router-dom';
import PageShell from './PageShell';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import StatusBar from '../ui/StatusBar';
import { SecurityIcon } from '../ui/Icons';
import { getActiveSection, STATUS_BARS } from '../../config/navigation';

export default function DashboardShell({
  children,
  mainStyle = {},
  noPadding = false,
  rightPanel = null,
  statusBar = null,
}) {
  const { pathname } = useLocation();
  const section = getActiveSection(pathname);

  const defaultStatus = STATUS_BARS[section] ?? STATUS_BARS['omni-search'];
  const statusProps = statusBar ?? {
    left: defaultStatus.left.map((item) => ({
      ...item,
      icon: item.iconKey === 'security' ? <SecurityIcon size={10} /> : item.icon,
      dot: item.dot,
    })),
    right: defaultStatus.right,
  };

  return (
    <PageShell>
      <Navbar />
      <div className="dashboard-body">
        <Sidebar />
        <div className="dashboard-content-row">
          <main
            key={pathname}
            className={`dashboard-main${noPadding ? ' dashboard-main--flush' : ''}`}
            style={{
              padding: noPadding ? 0 : '28px 32px',
              ...mainStyle,
            }}
          >
            {children}
          </main>
          {rightPanel}
        </div>
      </div>
      <StatusBar left={statusProps.left} right={statusProps.right} />
    </PageShell>
  );
}
