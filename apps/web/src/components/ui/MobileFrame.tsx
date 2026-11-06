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
    <div className="h-screen h-[100dvh] w-full bg-[var(--bg)] flex flex-col items-center justify-start sm:justify-center p-0 sm:py-6 sm:px-4 transition-colors overflow-hidden">
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
            ? 'h-screen h-[100dvh] sm:h-[844px] sm:max-h-[92vh] sm:max-w-[420px] sm:rounded-[36px] sm:border sm:border-[var(--border)] sm:shadow-2xl'
            : 'h-screen h-[100dvh] max-w-2xl sm:border-x sm:border-[var(--border)]'
        }`}
      >
        {/* Fixed Top Section: TopBar, Alerts, Offline Notice (Non-scrolling) */}
        {header && <div className="shrink-0 z-30 w-full">{header}</div>}

        {/* Scrollable View Content (Only this container scrolls!) */}
        <div className="flex-1 w-full overflow-y-auto no-scrollbar relative bg-[var(--bg)]">
          {children}
        </div>

        {/* Floating Bottom Nav (Pinned fixed at bottom of screen/frame) */}
        {footer && (
          <div className="absolute bottom-3 inset-x-0 z-40 flex justify-center pointer-events-none px-3">
            {footer}
          </div>
        )}

        {/* Floating Overlays / Modals / Toast */}
        {overlay}
      </div>
    </div>
  );
};
