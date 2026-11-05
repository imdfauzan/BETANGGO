import React, { useEffect } from 'react';
import { clsx } from 'clsx';
import { X } from 'lucide-react';

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-[2px] transition-opacity">
      <div
        className="w-full max-w-[500px] max-h-[85vh] overflow-y-auto glass-panel rounded-t-[var(--r-sheet)] border-t border-[var(--glass-border)] shadow-2xl p-5 pb-8 flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Grab Handle */}
        <div className="flex justify-center mb-3">
          <div className="w-10 h-1.5 rounded-full bg-[var(--muted)]/40" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border)]">
          <h2 className="text-base font-bold text-[var(--fg)] font-display">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-2)]"
            aria-label="Tutup sheet"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
