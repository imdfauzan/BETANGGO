import React from 'react';

export interface ToastProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  isVisible: boolean;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  actionLabel,
  onAction,
  isVisible
}) => {
  if (!isVisible) return null;

  return (
    <div className="pointer-events-auto w-[90%] max-w-[380px] transition-all duration-200">
      <div className="glass-panel py-3 px-4 rounded-[var(--r-pill)] flex items-center justify-between shadow-lg text-xs font-medium text-[var(--fg)] border border-[var(--glass-border)]">
        <span className="truncate mr-2">{message}</span>
        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="text-[var(--accent)] font-bold hover:underline shrink-0 px-2 py-0.5 rounded"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};
