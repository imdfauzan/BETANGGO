import React from 'react';
import { PillButton } from '../components/ui/PillButton';
import { Language, t } from '../i18n';

export interface SplashScreenProps {
  onDismiss: () => void;
  lang: Language;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onDismiss, lang }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#0F2E21] text-[#F2F7F1] flex flex-col justify-between p-6 select-none animate-fadeIn">
      {/* Top Bar with Skip */}
      <div className="flex justify-end pt-4">
        <PillButton
          variant="ghost"
          size="sm"
          onClick={onDismiss}
          className="text-stone-300 hover:text-white border-stone-700/50"
        >
          {t('common.action.skip', lang)}
        </PillButton>
      </div>

      {/* Centerpiece: Huma Betang Architecture Graphic */}
      <div className="flex flex-col items-center text-center my-auto">
        {/* SVG Motif of Dayak Huma Betang Stilt Roof */}
        <div className="w-24 h-24 mb-6 rounded-3xl bg-[#16241C] border border-[#2F7A56] p-4 flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#9CC48C]" fill="none" stroke="currentColor" strokeWidth="3">
            {/* Curved Huma Betang Roof */}
            <path d="M10 50 Q 50 15 90 50" strokeLinecap="round" />
            <path d="M20 50 L 50 25 L 80 50" strokeWidth="2" />
            {/* Pillars and House Frame */}
            <rect x="25" y="50" width="50" height="25" rx="3" strokeWidth="2.5" />
            <line x1="32" y1="75" x2="32" y2="92" strokeWidth="3" />
            <line x1="50" y1="75" x2="50" y2="92" strokeWidth="3" />
            <line x1="68" y1="75" x2="68" y2="92" strokeWidth="3" />
          </svg>
        </div>

        <h1 className="text-3xl font-display font-extrabold tracking-tight text-white mb-2">
          Betang<span className="text-orange-500">GO</span>
        </h1>
        <p className="text-sm font-medium text-[#9CC48C] max-w-xs mb-4">
          {lang === 'en' ? 'One conversation, one trip.' : 'Satu percakapan, satu perjalanan.'}
        </p>

        <p className="text-xs text-stone-300/80 max-w-[280px] leading-relaxed">
          {lang === 'en'
            ? 'Seamless travel planning across Central Kalimantan powered by Betang AI with full offline support.'
            : 'Perjalanan terpadu di Kalimantan Tengah bersama Betang AI dengan dukungan penuh saat tanpa sinyal.'}
        </p>
      </div>

      {/* Bottom Button */}
      <div className="pb-6">
        <PillButton
          variant="accent"
          size="lg"
          onClick={onDismiss}
          className="w-full font-bold"
        >
          {lang === 'en' ? 'Start Journey' : 'Mulai Perjalanan'}
        </PillButton>
      </div>
    </div>
  );
};

