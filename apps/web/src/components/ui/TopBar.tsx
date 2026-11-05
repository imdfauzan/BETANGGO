import React from 'react';
import { SegmentedPill } from './SegmentedPill';
import { Sun, Moon, Monitor, User } from 'lucide-react';
import { Language } from '../../i18n';

export interface TopBarProps {
  lang: Language;
  onLangChange: (lang: Language) => void;
  theme: 'light' | 'dark' | 'system';
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
  onOpenSettings: () => void;
  onWordmarkClick?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  lang,
  onLangChange,
  theme,
  onThemeChange,
  onOpenSettings,
  onWordmarkClick
}) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel px-3.5 py-2.5 flex items-center justify-between border-b border-[var(--glass-border)] shadow-sm">
      {/* Wordmark */}
      <div
        onClick={onWordmarkClick}
        className="flex items-center gap-1.5 cursor-pointer active:scale-95 transition-transform"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] shrink-0" />
        <span className="font-display font-extrabold text-lg tracking-tight text-[var(--primary)] dark:text-[var(--pakis-400)]">
          Betanggo
        </span>
      </div>

      {/* Controls: Language, Theme, Profile */}
      <div className="flex items-center gap-1.5">
        {/* Language switch */}
        <SegmentedPill<Language>
          size="sm"
          value={lang}
          onChange={onLangChange}
          options={[
            { value: 'id', label: 'ID' },
            { value: 'en', label: 'EN' }
          ]}
        />

        {/* Theme switch */}
        <SegmentedPill<'light' | 'dark' | 'system'>
          size="sm"
          value={theme}
          onChange={onThemeChange}
          options={[
            { value: 'light', label: '', icon: <Sun size={13} /> },
            { value: 'dark', label: '', icon: <Moon size={13} /> },
            { value: 'system', label: '', icon: <Monitor size={13} /> }
          ]}
        />

        {/* Profile Avatar */}
        <button
          type="button"
          onClick={onOpenSettings}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--surface-2)] text-[var(--fg)] border border-[var(--border)] active:scale-95 transition-all"
          aria-label="Pengaturan & Profil"
        >
          <User size={16} />
        </button>
      </div>
    </header>
  );
};
