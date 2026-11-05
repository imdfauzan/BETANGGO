import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Wifi, BatteryCharging } from 'lucide-react';

export interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const [isFrameMode, setIsFrameMode] = useState(true);
  const [currentTimeWib, setCurrentTimeWib] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // WIB is UTC+7
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const wibDate = new Date(utc + 7 * 3600000);
      const hours = String(wibDate.getHours()).padStart(2, '0');
      const minutes = String(wibDate.getMinutes()).padStart(2, '0');
      setCurrentTimeWib(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0B140F] flex flex-col items-center justify-center p-0 sm:py-6 sm:px-4">
      {/* Desktop view switcher bar */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-[440px] mb-3 px-2 text-xs text-stone-400">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
          <span>BETANGGO Mobile Preview (390×844)</span>
        </div>
        <button
          type="button"
          onClick={() => setIsFrameMode(!isFrameMode)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--r-pill)] bg-stone-800 text-stone-200 hover:bg-stone-700 transition-colors text-[11px]"
        >
          {isFrameMode ? <Monitor size={12} /> : <Smartphone size={12} />}
          <span>{isFrameMode ? 'Full View' : 'Phone Frame'}</span>
        </button>
      </div>

      {/* Main Container */}
      <div
        className={`w-full bg-[var(--bg)] text-[var(--fg)] flex flex-col relative overflow-hidden transition-all duration-300 ${
          isFrameMode
            ? 'sm:max-w-[420px] sm:min-h-[844px] sm:max-h-[92vh] sm:rounded-[44px] sm:border-[8px] sm:border-stone-800 sm:shadow-2xl'
            : 'max-w-2xl min-h-screen rounded-none border-none'
        }`}
      >
        {/* Mobile Phone Status Bar Header */}
        <div className="w-full h-8 px-6 pt-1 flex items-center justify-between text-[11px] font-semibold text-[var(--fg)] select-none shrink-0 z-50 bg-[var(--bg)]">
          <span>{currentTimeWib || '09:41'} WIB</span>
          {/* Phone speaker pill on desktop mockup */}
          <div className="hidden sm:block w-16 h-4 bg-stone-800/80 rounded-full" />
          <div className="flex items-center gap-1.5 text-[var(--fg)]">
            <span className="text-[10px] font-mono tracking-tighter">4G</span>
            <Wifi size={12} />
            <BatteryCharging size={13} />
          </div>
        </div>

        {/* App Content Screen Area with smooth scrolling */}
        <div className="flex-1 w-full flex flex-col overflow-y-auto no-scrollbar relative pb-20">
          {children}
        </div>
      </div>
    </div>
  );
};
