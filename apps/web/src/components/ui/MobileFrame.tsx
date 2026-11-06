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
    <div className="min-h-screen w-full relative bg-[#0B140F] flex flex-col items-center justify-start sm:justify-center p-0 sm:py-6 sm:px-4 transition-colors overflow-hidden">
      {/* Desktop view switcher bar */}
      <div className="relative z-20 hidden sm:flex items-center justify-between w-full max-w-[420px] mb-2.5 px-2 text-xs text-stone-400">
        <div className="font-semibold text-xs text-stone-300 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Betang<span className="text-orange-500">GO</span> Mobile Preview</span>
        </div>
        <button
          type="button"
          onClick={() => setIsFrameMode(!isFrameMode)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--r-pill)] bg-stone-800/90 text-stone-200 border border-stone-700/80 hover:bg-stone-700 transition-colors text-[11px] font-medium"
        >
          {isFrameMode ? <Monitor size={12} /> : <Smartphone size={12} />}
          <span>{isFrameMode ? 'Full View' : 'Phone Frame'}</span>
        </button>
      </div>

      {/* Main Mobile Screen Container (Tampilan HP) */}
      <div
        className={`w-full text-[var(--fg)] flex flex-col relative z-10 overflow-hidden transition-all duration-300 [transform:translateZ(0)] ${
          isFrameMode
            ? 'sm:max-w-[420px] sm:h-[844px] sm:max-h-[92vh] sm:rounded-[44px] sm:border-[8px] sm:border-stone-800 sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]'
            : 'max-w-2xl min-h-screen rounded-none border-none'
        } h-[100dvh] sm:h-[844px]`}
      >
        {/* Living Ambient Sky WebGL Gradient - Directly inside the Mobile Phone Screen */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <SkyGradient theme={theme} speed={35} />
        </div>

        {/* Subtle contrast tint so cards and text remain razor-sharp */}
        <div className="absolute inset-0 pointer-events-none z-0 bg-black/[0.03] dark:bg-black/20" />

        {/* App Content Screen Area with smooth native momentum scrolling */}
        <div className="flex-1 w-full flex flex-col overflow-y-auto no-scrollbar relative z-10 pb-20 bg-transparent">
          {children}
        </div>
      </div>
    </div>
  );
};
