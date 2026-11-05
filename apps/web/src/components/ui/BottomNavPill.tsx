import React from 'react';
import { Home, Compass, MessageSquareQuote, Briefcase, LifeBuoy } from 'lucide-react';
import { Language, t } from '../../i18n';

export type NavTab = 'home' | 'explore' | 'ai' | 'trips' | 'care';

export interface BottomNavPillProps {
  activeTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
  lang: Language;
  hasActiveTrip?: boolean;
}

export const BottomNavPill: React.FC<BottomNavPillProps> = ({
  activeTab,
  onChangeTab,
  lang,
  hasActiveTrip
}) => {
  const tabs = [
    { id: 'home' as NavTab, label: t('nav.home', lang), icon: Home },
    { id: 'explore' as NavTab, label: t('nav.explore', lang), icon: Compass },
    { id: 'ai' as NavTab, label: t('nav.ai', lang), icon: MessageSquareQuote },
    { id: 'trips' as NavTab, label: t('nav.trips', lang), icon: Briefcase, dot: hasActiveTrip },
    { id: 'care' as NavTab, label: t('nav.help', lang), icon: LifeBuoy }
  ];

  return (
    <div className="fixed bottom-3 inset-x-0 z-40 flex justify-center pointer-events-none px-3">
      <nav
        aria-label="Navigasi Utama"
        className="pointer-events-auto glass-panel h-16 w-full max-w-[420px] rounded-[var(--r-pill)] border border-[var(--glass-border)] px-2 py-1 flex items-center justify-between shadow-xl"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChangeTab(tab.id)}
              className={`relative flex items-center justify-center gap-1.5 transition-all select-none rounded-[var(--r-pill)] ${
                isActive
                  ? 'bg-[var(--primary)] text-[var(--on-primary)] px-3.5 py-2 shadow-sm font-semibold text-xs'
                  : 'text-[var(--muted)] hover:text-[var(--fg)] p-2 text-[11px] font-medium'
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.2 : 1.75} className="shrink-0" />
              {isActive && <span className="truncate">{tab.label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
