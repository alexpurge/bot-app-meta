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
export const Save = createIcon('Save');
export const ChevronRight = createIcon('ChevronRight');
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
export const Menu = createIcon('Menu');
export const AlertTriangle = createIcon('AlertTriangle');
export const CheckCircle = createIcon('CheckCircle');
export const XCircle = createIcon('XCircle');
export const AlertCircle = createIcon('AlertCircle');
export const List = createIcon('List');
export const Bug = createIcon('Bug');
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
export const Filter = createIcon('Filter');
export const CheckSquare = createIcon(
  'CheckSquare',
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <polyline points="9 12 12 15 17 10" />
  </>
);
export const Square = createIcon('Square');
export const Play = createIcon('Play');
export const Pause = createIcon('Pause');
export const XSquare = createIcon('XSquare');
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
export const LayoutDashboard = createIcon('LayoutDashboard');
export const History = createIcon('History');
export const PlusCircle = createIcon('PlusCircle');
export const Calendar = createIcon('Calendar');
export const TrendingUp = createIcon('TrendingUp');
export const Activity = createIcon('Activity');
export const CheckCircle2 = createIcon(
  'CheckCircle2',
  <>
    <circle cx="12" cy="12" r="10" />
    <polyline points="9 12 12 15 16 10" />
  </>
);
export const RefreshCw = createIcon('RefreshCw');
export const ArrowUpRight = createIcon('ArrowUpRight');
export const Database = createIcon('Database');
export const Lock = createIcon('Lock');
export const Key = createIcon('Key');
export const Clock = createIcon('Clock');
export const Loader2 = createIcon('Loader2');
export const MousePointerClick = createIcon('MousePointerClick');
export const BadgeDollarSign = createIcon('BadgeDollarSign');
export const ShoppingBag = createIcon('ShoppingBag');
export const Percent = createIcon('Percent');
export const Star = createIcon('Star');
export const ChevronLeft = createIcon('ChevronLeft');
export const Power = createIcon('Power');
export const SkipForward = createIcon('SkipForward');
export const Minimize2 = createIcon('Minimize2');
