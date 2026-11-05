import React from 'react';
import { clsx } from 'clsx';

export interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'glass' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export const PillButton: React.FC<PillButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  isLoading,
  children,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all active:scale-98 select-none disabled:opacity-50 disabled:pointer-events-none rounded-[var(--r-pill)] border';

  const sizeStyles = {
    sm: 'h-10 px-4 text-xs gap-1.5 min-w-[44px]',
    md: 'h-12 px-6 text-sm gap-2 min-w-[48px]',
    lg: 'h-14 px-8 text-base gap-2.5 min-w-[56px]'
  };

  const variantStyles = {
    primary: 'bg-[var(--primary)] text-[var(--on-primary)] border-transparent shadow-sm hover:brightness-105 active:brightness-95',
    accent: 'bg-[var(--accent)] text-[var(--on-accent)] font-semibold border-transparent shadow-sm hover:brightness-105 active:brightness-95',
    glass: 'glass-panel text-[var(--fg)] hover:bg-[var(--surface)]',
    ghost: 'bg-transparent text-[var(--fg)] border-transparent hover:bg-[var(--surface-2)]',
    danger: 'bg-[var(--danger)] text-white border-transparent hover:brightness-105 active:brightness-95'
  };

  return (
    <button
      className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        icon && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
    </button>
  );
};

