import React from 'react';
import { clsx } from 'clsx';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  rounded?: 'lg' | 'sheet' | 'pill' | 'media';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  rounded = 'lg',
  className,
  children,
  ...props
}) => {
  const roundMap = {
    lg: 'rounded-[var(--r-card-lg)]',
    sheet: 'rounded-[var(--r-sheet)]',
    pill: 'rounded-[var(--r-pill)]',
    media: 'rounded-[var(--r-media)]'
  };

  return (
    <div
      className={clsx('glass-panel p-4', roundMap[rounded], className)}
      {...props}
    >
      {children}
    </div>
  );
};

