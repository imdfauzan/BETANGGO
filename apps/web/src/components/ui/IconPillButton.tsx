import React from 'react';
import { clsx } from 'clsx';

export interface IconPillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
  variant?: 'glass' | 'ghost' | 'primary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
}

export const IconPillButton: React.FC<IconPillButtonProps> = ({
  'aria-label': ariaLabel,
  variant = 'glass',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const sizeStyles = {
    sm: 'w-9 h-9 min-w-[36px]',
    md: 'w-11 h-11 min-w-[44px]',
    lg: 'w-14 h-14 min-w-[56px]'
  };

  const variantStyles = {
    glass: 'glass-panel text-[var(--fg)] hover:bg-[var(--surface)]',
    ghost: 'bg-transparent text-[var(--fg)] hover:bg-[var(--surface-2)]',
    primary: 'bg-[var(--primary)] text-[var(--on-primary)] shadow-sm hover:brightness-105',
    accent: 'bg-[var(--accent)] text-[var(--on-accent)] shadow-sm hover:brightness-105'
  };

  return (
    <button
      aria-label={ariaLabel}
      className={clsx(
        'inline-flex items-center justify-center rounded-full transition-all active:scale-95 disabled:opacity-50',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
