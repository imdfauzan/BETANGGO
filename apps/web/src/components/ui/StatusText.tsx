import React from 'react';
import { clsx } from 'clsx';
import { CheckCircle2, Clock, AlertCircle, XCircle } from 'lucide-react';

export interface StatusTextProps {
  status: 'confirmed' | 'pending' | 'warning' | 'error' | 'used';
  label: string;
  className?: string;
}

export const StatusText: React.FC<StatusTextProps> = ({ status, label, className }) => {
  const configs = {
    confirmed: {
      icon: <CheckCircle2 size={15} className="shrink-0 text-[var(--success)]" />,
      color: 'text-[var(--success)]'
    },
    pending: {
      icon: <Clock size={15} className="shrink-0 text-[var(--warning)]" />,
      color: 'text-[var(--warning)]'
    },
    warning: {
      icon: <AlertCircle size={15} className="shrink-0 text-[var(--warning)]" />,
      color: 'text-[var(--warning)]'
    },
    error: {
      icon: <XCircle size={15} className="shrink-0 text-[var(--danger)]" />,
      color: 'text-[var(--danger)]'
    },
    used: {
      icon: <CheckCircle2 size={15} className="shrink-0 text-[var(--muted)]" />,
      color: 'text-[var(--muted)]'
    }
  };

  const current = configs[status];

  return (
    <span className={clsx('inline-flex items-center gap-1.5 text-xs font-semibold', current.color, className)}>
      {current.icon}
      <span>{label}</span>
    </span>
  );
};
