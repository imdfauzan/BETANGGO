import React from 'react';
import { clsx } from 'clsx';

export interface SurfaceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  rounded?: 'card' | 'lg' | 'media';
  level?: 1 | 2;
  interactive?: boolean;
}

export const SurfaceCard: React.FC<SurfaceCardProps> = ({
  rounded = 'card',
  level = 1,
  interactive = false,
  className,
  children,
  ...props
}) => {
  const roundMap = {
    card: 'rounded-[var(--r-card)]',
    lg: 'rounded-[var(--r-card-lg)]',
    media: 'rounded-[var(--r-media)]'
  };

  const bgClass = level === 1 ? 'bg-[var(--surface)]' : 'bg-[var(--surface-2)]';

  return (
    <div
      className={clsx(
        bgClass,
        roundMap[rounded],
        'border border-[var(--border)] p-4 transition-all',
        interactive && 'cursor-pointer active:scale-[0.99] hover:border-[var(--muted)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

