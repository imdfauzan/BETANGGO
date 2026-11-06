import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SkyGradient } from './SkyGradient';
import { Smartphone, Monitor } from 'lucide-react';

export interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const { theme } = useApp();
  const [isFrameMode, setIsFrameMode] = useState(true);

  return (
    <div className="min-h-screen w-full relative bg-[var(--bg)] flex flex-col items-center justify-start sm:justify-center p-0 sm:py-6 sm:px-4 transition-colors overflow-hidden">
      {/* Living Ambient Sky WebGL Gradient in App Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-45 dark:opacity-40 transition-opacity duration-500">
        <SkyGradient theme={theme} speed={35} />
      </div>

      {/* Desktop view switcher bar */}
      <div className="relative z-10 hidden sm:flex items-center justify-between w-full max-w-[420px] mb-2 px-1 text-xs text-[var(--muted)]">
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
        className={`w-full text-[var(--fg)] flex flex-col relative z-10 overflow-hidden transition-all duration-300 ${
          isFrameMode
            ? 'sm:max-w-[420px] sm:min-h-[844px] sm:max-h-[92vh] sm:rounded-[36px] sm:border sm:border-[var(--border)] sm:shadow-2xl bg-[var(--bg)]/85 backdrop-blur-xl'
            : 'max-w-2xl min-h-screen rounded-none border-none bg-[var(--bg)]/90 backdrop-blur-md'
        }`}
      >
        {/* App Content Screen Area with smooth scrolling */}
        <div className="flex-1 w-full flex flex-col overflow-y-auto no-scrollbar relative pb-20 bg-transparent">
          {children}
        </div>
      </div>
    </div>
  );
};
