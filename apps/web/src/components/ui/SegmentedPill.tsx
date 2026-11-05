import React from 'react';
import { clsx } from 'clsx';

export interface SegmentOption<T extends string> {
  value: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

export interface SegmentedPillProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (val: T) => void;
  className?: string;
  size?: 'sm' | 'md';
}

export function SegmentedPill<T extends string>({
  options,
  value,
  onChange,
  className,
  size = 'md'
}: SegmentedPillProps<T>) {
  return (
    <div
      role="radiogroup"
      className={clsx(
        'inline-flex items-center p-1 rounded-[var(--r-pill)] border border-[var(--border)] bg-[var(--surface-2)] select-none',
        size === 'sm' ? 'h-9' : 'h-11',
        className
      )}
    >
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(opt.value)}
            className={clsx(
              'flex items-center justify-center gap-1.5 px-3 h-full rounded-[var(--r-pill)] text-xs font-semibold transition-all',
              isActive
                ? 'bg-[var(--primary)] text-[var(--on-primary)] shadow-sm'
                : 'text-[var(--muted)] hover:text-[var(--fg)]'
            )}
          >
            {opt.icon && <span className="shrink-0">{opt.icon}</span>}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
