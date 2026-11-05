import React from 'react';
import { clsx } from 'clsx';
import { X } from 'lucide-react';

export interface PillInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  onClear?: () => void;
  error?: string;
}

export const PillInput: React.FC<PillInputProps> = ({
  icon,
  onClear,
  error,
  value,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      <div className={clsx(
        'relative flex items-center w-full h-[52px] px-4 rounded-[var(--r-pill)] border transition-all bg-[var(--surface)] text-[var(--fg)]',
        error ? 'border-[var(--danger)] focus-within:ring-2 focus-within:ring-[var(--danger)]/30' : 'border-[var(--border)] focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/20',
        className
      )}>
        {icon && <span className="mr-3 text-[var(--muted)] shrink-0">{icon}</span>}
        <input
          value={value}
          className="w-full h-full bg-transparent text-sm placeholder:text-[var(--muted)] focus:outline-none"
          {...props}
        />
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="p-1 text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
            aria-label="Hapus teks"
          >
            <X size={16} />
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1.5 ml-3 text-xs text-[var(--danger)] font-medium">
          {error}
        </p>
      )}
    </div>
  );
};
