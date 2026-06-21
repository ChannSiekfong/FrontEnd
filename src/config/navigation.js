// Central navigation — navbar sections + shared sidebar

export const MAIN_NAV = [
  {
    id: 'omni-search',
    label: 'Omni-Search',
    path: '/dashboard/omni-search',
    match: (p) => p.startsWith('/dashboard/omni-search'),
  },
  {
    id: 'neural-links',
    label: 'Neural-Links',
    path: '/dashboard/neural-links',
    match: (p) => p.startsWith('/dashboard/neural-links'),
  },
  {
    id: 'memory-archives',
    label: 'Memory-Archives',
    path: '/dashboard/memory-archives',
    match: (p) =>
      p.startsWith('/dashboard/memory-archives') ||
      p.startsWith('/dashboard/sync-status'),
  },
  {
    id: 'data-control',
    label: 'Data-Control',
    path: '/dashboard/data-control',
    match: (p) => p.startsWith('/dashboard/data-control'),
  },
  {
    id: 'config-logs',
    label: 'Config-Logs',
    path: '/dashboard/config-logs',
    match: (p) => p.startsWith('/dashboard/config-logs'),
  },

];

export const SIDEBAR_ITEMS = [
  { id: 'current-thread', label: 'CURRENT_THREAD', path: '/dashboard/omni-search' },
  { id: 'data-streams',   label: 'DATA_STREAMS',   path: '/dashboard/neural-links' },
  { id: 'system-logs',    label: 'SYSTEM_LOGS',    path: '/dashboard/memory-archives' },
  { id: 'memory-nodes',   label: 'MEMORY_NODES',   path: '/dashboard/data-control' },
  { id: 'config-logs',    label: 'CONFIG_LOGS',    path: '/dashboard/config-logs' },
  { id: 'sync-status',    label: 'SYNC_STATUS',    path: '/dashboard/sync-status' },
];

export const STATUS_BARS = {
  'omni-search': {
    left: [{ label: 'NEURAL_LOAD' }, { label: '64%' }],
    right: 'SYSTEM_LIVE • v1.4.2_DELTA',
  },
  archives: {
    left: [
      { label: 'PRIVACY_LOCK: ENABLED', iconKey: 'security' },
      { label: 'LAST_AUDIT: 2023-11-23 14:02:55' },
    ],
    right: 'SESSION_ID: 0X9F-228-442-BA-C1',
  },
  'memory-nodes': {
    left: [
      { label: 'PRIVACY_LOCK: ENABLED', iconKey: 'security' },
      { label: 'NODES_INDEXED: 12,402' },
    ],
    right: 'SESSION_ID: 0X9F-228-442-BA-C1',
  },
  'neural-links': {
    left: [{ label: 'NODE_HASH 0xAF82...9931' }, { label: 'SYSTEM_LOAD 0.04 MS' }],
    right: 'PROTOCOL_STABLE // NO_LEAKS_DETECTED',
  },
  'config-logs': {
    left: [{ label: 'AUDIT_CHAIN: VERIFIED' }, { label: 'ENTRIES: 847' }],
    right: 'RETENTION: 90 DAYS // SECURE_NODE_129',
  },
  config: {
    left: [{ label: 'LATENCY: 12MS', dot: 'var(--accent-green)' }, { label: 'NEURAL LOAD: 4%', dot: 'var(--accent-blue)' }],
    right: '© 2024 CONTEXT_SEARCH_SYSTEMS // SECURE_NODE_129',
  },
};

export function getActiveSection(pathname) {
  const section = MAIN_NAV.find((nav) => nav.match(pathname));
  return section?.id ?? 'omni-search';
}

export function getActiveSidebarItem(pathname) {
  const exact = SIDEBAR_ITEMS.find((item) => item.path === pathname);
  if (exact) return exact.id;

  if (pathname.startsWith('/dashboard/omni-search')) return 'current-thread';
  if (pathname.startsWith('/dashboard/neural-links')) return 'data-streams';
  if (pathname.startsWith('/dashboard/data-control')) return 'memory-nodes';
  if (pathname.startsWith('/dashboard/memory-archives')) return 'system-logs';
  if (pathname.startsWith('/dashboard/config-logs')) return 'config-logs';
  if (pathname.startsWith('/dashboard/sync-status')) return 'sync-status';

  return null;
}

export function getSidebarItems() {
  return SIDEBAR_ITEMS;
}
