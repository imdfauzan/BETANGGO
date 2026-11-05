import React from 'react';
import { clsx } from 'clsx';

export interface FilterChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  isActive,
  onClick,
  icon,
  className
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'inline-flex items-center gap-1.5 h-9 px-4 rounded-[var(--r-pill)] text-xs font-medium border transition-all active:scale-96 shrink-0',
        isActive
          ? 'bg-[var(--primary)] text-[var(--on-primary)] border-transparent shadow-sm'
          : 'bg-[var(--surface)] text-[var(--fg)] border-[var(--border)] hover:bg-[var(--surface-2)]',
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

