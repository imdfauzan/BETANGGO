import React, { useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';

export interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const [isFrameMode, setIsFrameMode] = useState(true);

  return (
    <div className="min-h-screen w-full bg-[var(--bg)] flex flex-col items-center justify-start sm:justify-center p-0 sm:py-6 sm:px-4 transition-colors">
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
            ? 'sm:max-w-[420px] sm:min-h-[844px] sm:max-h-[92vh] sm:rounded-[36px] sm:border sm:border-[var(--border)] sm:shadow-xl'
            : 'max-w-2xl min-h-screen rounded-none border-none'
        }`}
      >
        {/* App Content Screen Area with smooth scrolling */}
        <div className="flex-1 w-full flex flex-col overflow-y-auto no-scrollbar relative pb-20 bg-[var(--bg)]">
          {children}
        </div>
      </div>
    </div>
  );
};
