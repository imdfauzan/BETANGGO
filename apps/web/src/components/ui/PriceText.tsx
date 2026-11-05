import React from 'react';
import { clsx } from 'clsx';

export interface PriceTextProps {
  amountIdr: number;
  lang?: 'id' | 'en';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const PriceText: React.FC<PriceTextProps> = ({
  amountIdr,
  lang = 'id',
  size = 'md',
  className
}) => {
  const formatted = lang === 'en'
    ? `IDR ${amountIdr.toLocaleString('en-US')}`
    : `Rp ${amountIdr.toLocaleString('id-ID')}`;

  const sizeClasses = {
    sm: 'text-xs font-semibold',
    md: 'text-sm font-bold',
    lg: 'text-base font-bold',
    xl: 'text-xl font-extrabold'
  };

  return (
    <span className={clsx('font-mono tabular-nums tracking-tight', sizeClasses[size], className)}>
      {formatted}
    </span>
  );
};
