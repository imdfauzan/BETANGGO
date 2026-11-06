import React, { useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';

export interface MobileFrameProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  overlay?: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  header,
  footer,
  overlay
}) => {
  const [isFrameMode, setIsFrameMode] = useState(true);

  return (
    <div className="h-full w-full bg-[var(--bg)] flex flex-col items-center justify-start sm:justify-center p-0 sm:py-6 sm:px-4 transition-colors overflow-hidden select-none">
      {/* Desktop view switcher bar */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-[420px] mb-2 px-1 text-xs text-[var(--muted)]">
        <div className="font-semibold text-xs">
          Betang<span className="text-orange-500">GO</span> Mobile Preview
        </div>
        <button
          type="button"
          onClick={() => setIsFrameMode(!isFrameMode)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--r-pill)] bg-[var(--surface-2)] text-[var(--fg)] border border-[var(--border)] hover:bg-[var(--surface)] transition-colors text-[11px] font-medium"
        >
          {isFrameMode ? <Monitor size={12} /> : <Smartphone size={12} />}
          <span>{isFrameMode ? 'Full View' : 'Phone Frame'}</span>
        </button>
      </div>

      {/* Main Container */}
      <div
        className={`w-full bg-[var(--bg)] text-[var(--fg)] flex flex-col relative overflow-hidden transition-all duration-300 ${
          isFrameMode
            ? 'h-full sm:h-[844px] sm:max-h-[92vh] sm:max-w-[420px] sm:rounded-[36px] sm:border sm:border-[var(--border)] sm:shadow-2xl sm:[transform:translateZ(0)]'
            : 'h-full max-w-2xl sm:border-x sm:border-[var(--border)] sm:[transform:translateZ(0)]'
        }`}
      >
        {/* Fixed Top Section: TopBar, Alerts (Pinned fixed to top of mobile screen / frame) */}
        {header && (
          <div className="fixed top-0 inset-x-0 z-40 flex justify-center pointer-events-none">
            <div className="pointer-events-auto w-full max-w-[420px]">
              {header}
            </div>
          </div>
        )}

        {/* Scrollable View Content (Only this container scrolls!) */}
        <div className="flex-1 w-full overflow-y-auto overscroll-contain no-scrollbar relative bg-[var(--bg)]">
          {children}
        </div>

        {/* Floating Bottom Nav (Pinned fixed to bottom of mobile screen / frame) */}
        {footer && (
          <div className="fixed bottom-3 inset-x-0 z-40 flex justify-center pointer-events-none px-3">
            <div className="pointer-events-auto w-full max-w-[420px] flex justify-center">
              {footer}
            </div>
          </div>
        )}

        {/* Floating Overlays / Modals / Toast */}
        {overlay}
      </div>
    </div>
  );
};
