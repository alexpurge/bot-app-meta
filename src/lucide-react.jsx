import React from 'react';

const createIcon = (label) => {
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
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
      </svg>
    )
  );

  Icon.displayName = label;
  return Icon;
};

export const Search = createIcon('Search');
export const Plus = createIcon('Plus');
export const Trash2 = createIcon('Trash2');
export const Phone = createIcon('Phone');
export const Mail = createIcon('Mail');
export const MapPin = createIcon('MapPin');
export const Globe = createIcon('Globe');
export const DollarSign = createIcon('DollarSign');
export const Target = createIcon('Target');
export const Briefcase = createIcon('Briefcase');
export const User = createIcon('User');
export const X = createIcon('X');
export const Edit2 = createIcon('Edit2');
export const Save = createIcon('Save');
export const ChevronRight = createIcon('ChevronRight');
export const LogOut = createIcon('LogOut');
export const FileSpreadsheet = createIcon('FileSpreadsheet');
export const FileText = createIcon('FileText');
export const Table = createIcon('Table');
export const ShieldAlert = createIcon('ShieldAlert');
export const ShieldCheck = createIcon('ShieldCheck');
export const Menu = createIcon('Menu');
export const AlertTriangle = createIcon('AlertTriangle');
export const CheckCircle = createIcon('CheckCircle');
export const XCircle = createIcon('XCircle');
export const AlertCircle = createIcon('AlertCircle');
export const List = createIcon('List');
export const Bug = createIcon('Bug');
export const Check = createIcon('Check');
export const FileJson = createIcon('FileJson');
export const Filter = createIcon('Filter');
export const CheckSquare = createIcon('CheckSquare');
export const Square = createIcon('Square');
export const Play = createIcon('Play');
export const Pause = createIcon('Pause');
export const XSquare = createIcon('XSquare');
export const ChevronDown = createIcon('ChevronDown');
export const ArrowRight = createIcon('ArrowRight');
