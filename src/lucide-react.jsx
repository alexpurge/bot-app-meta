import React from 'react';

const createIcon = (label, children) => {
  const Icon = React.forwardRef(
    (
      {
        color = 'currentColor',
        size = 20,
        strokeWidth = 2,
        className,
        ...props
      },
      ref
    ) => (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        role="img"
        aria-label={label}
        className={className}
        {...props}
      >
        {children ?? (
          <>
            <circle cx="12" cy="12" r="9" />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
          </>
        )}
      </svg>
    )
  );

  Icon.displayName = label;
  return Icon;
};

export const Search = createIcon(
  'Search',
  <>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </>
);
export const Plus = createIcon('Plus');
export const Trash2 = createIcon(
  'Trash2',
  <>
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14" />
  </>
);
export const Phone = createIcon(
  'Phone',
  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.11 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
);
export const Mail = createIcon(
  'Mail',
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </>
);
export const MapPin = createIcon(
  'MapPin',
  <>
    <path d="M20 10c0 5-8 12-8 12s-8-7-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </>
);
export const Globe = createIcon(
  'Globe',
  <>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </>
);
export const DollarSign = createIcon(
  'DollarSign',
  <>
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </>
);
export const Target = createIcon(
  'Target',
  <>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </>
);
export const Briefcase = createIcon(
  'Briefcase',
  <>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <path d="M2 13h20" />
  </>
);
export const User = createIcon(
  'User',
  <>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </>
);
export const Users = createIcon(
  'Users',
  <>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </>
);
export const UserCircle = createIcon(
  'UserCircle',
  <>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="10" r="3" />
    <path d="M6.5 18a6 6 0 0 1 11 0" />
  </>
);
export const Eye = createIcon(
  'Eye',
  <>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
    <circle cx="12" cy="12" r="3" />
  </>
);
export const X = createIcon(
  'X',
  <>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </>
);
export const Edit2 = createIcon(
  'Edit2',
  <>
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="m15 5 4 4" />
  </>
);
export const Save = createIcon(
  'Save',
  <>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </>
);
export const ChevronRight = createIcon(
  'ChevronRight',
  <polyline points="9 18 15 12 9 6" />
);
export const LogOut = createIcon(
  'LogOut',
  <>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </>
);
export const FileSpreadsheet = createIcon(
  'FileSpreadsheet',
  <>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M8 13h8" />
    <path d="M8 17h8" />
    <path d="M8 9h2" />
    <path d="M14 9h2" />
  </>
);
export const FileText = createIcon('FileText');
export const Table = createIcon('Table');
export const ShieldAlert = createIcon(
  'ShieldAlert',
  <>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </>
);
export const ShieldCheck = createIcon(
  'ShieldCheck',
  <>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </>
);
export const Menu = createIcon(
  'Menu',
  <>
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </>
);
export const AlertTriangle = createIcon(
  'AlertTriangle',
  <>
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </>
);
export const CheckCircle = createIcon(
  'CheckCircle',
  <>
    <circle cx="12" cy="12" r="10" />
    <polyline points="9 12 12 15 16 10" />
  </>
);
export const XCircle = createIcon(
  'XCircle',
  <>
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </>
);
export const AlertCircle = createIcon(
  'AlertCircle',
  <>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </>
);
export const List = createIcon(
  'List',
  <>
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </>
);
export const Bug = createIcon(
  'Bug',
  <>
    <rect x="7" y="9" width="10" height="8" rx="4" />
    <path d="M9 9V5a3 3 0 0 1 6 0v4" />
    <path d="M6 13H2" />
    <path d="M6 17H2" />
    <path d="M18 13h4" />
    <path d="M18 17h4" />
    <path d="M12 17v4" />
  </>
);
export const Check = createIcon(
  'Check',
  <polyline points="20 6 9 17 4 12" />
);
export const FileJson = createIcon(
  'FileJson',
  <>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M10 12H9a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1H6" />
    <path d="M14 12h1a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h1" />
  </>
);
export const Filter = createIcon(
  'Filter',
  <>
    <polygon points="22 3 2 3 10 12 10 19 14 21 14 12 22 3" />
  </>
);
export const CheckSquare = createIcon(
  'CheckSquare',
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <polyline points="9 12 12 15 17 10" />
  </>
);
export const Square = createIcon(
  'Square',
  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
);
export const Play = createIcon(
  'Play',
  <polygon points="5 3 19 12 5 21 5 3" />
);
export const Pause = createIcon(
  'Pause',
  <>
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </>
);
export const XSquare = createIcon(
  'XSquare',
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="9" y1="9" x2="15" y2="15" />
    <line x1="15" y1="9" x2="9" y2="15" />
  </>
);
export const ChevronDown = createIcon(
  'ChevronDown',
  <polyline points="6 9 12 15 18 9" />
);
export const ArrowRight = createIcon(
  'ArrowRight',
  <>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </>
);
export const LayoutDashboard = createIcon(
  'LayoutDashboard',
  <>
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </>
);
export const History = createIcon(
  'History',
  <>
    <path d="M3 12a9 9 0 1 0 9-9" />
    <polyline points="3 3 3 9 9 9" />
    <line x1="12" y1="7" x2="12" y2="12" />
    <line x1="12" y1="12" x2="16" y2="14" />
  </>
);
export const PlusCircle = createIcon(
  'PlusCircle',
  <>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </>
);
export const Calendar = createIcon(
  'Calendar',
  <>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </>
);
export const TrendingUp = createIcon(
  'TrendingUp',
  <>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </>
);
export const Activity = createIcon(
  'Activity',
  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
);
export const CheckCircle2 = createIcon(
  'CheckCircle2',
  <>
    <circle cx="12" cy="12" r="10" />
    <polyline points="9 12 12 15 16 10" />
  </>
);
export const RefreshCw = createIcon(
  'RefreshCw',
  <>
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.88-3.36L23 10" />
    <path d="M20.49 15a9 9 0 0 1-14.88 3.36L1 14" />
  </>
);
export const ArrowUpRight = createIcon(
  'ArrowUpRight',
  <>
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </>
);
export const Database = createIcon(
  'Database',
  <>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
  </>
);
export const Lock = createIcon(
  'Lock',
  <>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </>
);
export const Key = createIcon(
  'Key',
  <>
    <circle cx="7.5" cy="15.5" r="5.5" />
    <path d="M21 2l-9.6 9.6" />
    <path d="M15.5 7.5 18 10" />
    <path d="M12.5 10.5 15 13" />
  </>
);
export const Clock = createIcon(
  'Clock',
  <>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </>
);
export const Loader2 = createIcon(
  'Loader2',
  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
);
export const MousePointerClick = createIcon(
  'MousePointerClick',
  <>
    <path d="M9 3 20 15l-6 1-2 5-3-6-6-2z" />
    <path d="M14 4l2-2" />
    <path d="M20 8h2" />
    <path d="M4 14l-2 2" />
  </>
);
export const BadgeDollarSign = createIcon(
  'BadgeDollarSign',
  <>
    <path d="M12 2 20 6v6c0 5-8 10-8 10S4 17 4 12V6z" />
    <path d="M12 7v10" />
    <path d="M15 10H9.5a2 2 0 0 0 0 4H14a2 2 0 0 1 0 4H9" />
  </>
);
export const ShoppingBag = createIcon(
  'ShoppingBag',
  <>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </>
);
export const Percent = createIcon(
  'Percent',
  <>
    <line x1="19" y1="5" x2="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </>
);
export const Star = createIcon(
  'Star',
  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
);
export const ChevronLeft = createIcon(
  'ChevronLeft',
  <polyline points="15 18 9 12 15 6" />
);
export const Power = createIcon(
  'Power',
  <>
    <path d="M12 2v10" />
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
  </>
);
export const SkipForward = createIcon(
  'SkipForward',
  <>
    <polygon points="5 4 15 12 5 20 5 4" />
    <line x1="19" y1="5" x2="19" y2="19" />
  </>
);
export const Minimize2 = createIcon(
  'Minimize2',
  <>
    <polyline points="4 14 10 14 10 20" />
    <polyline points="20 10 14 10 14 4" />
    <line x1="10" y1="14" x2="4" y2="20" />
    <line x1="14" y1="10" x2="20" y2="4" />
  </>
);
