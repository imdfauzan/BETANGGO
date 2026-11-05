import React from 'react';
import { WifiOff } from 'lucide-react';
import { t } from '../../i18n';

export interface OfflineNoticeProps {
  isOffline: boolean;
  lang?: 'id' | 'en';
}

export const OfflineNotice: React.FC<OfflineNoticeProps> = ({ isOffline, lang = 'id' }) => {
  if (!isOffline) return null;

  return (
    <div className="w-full py-2 px-3 bg-[var(--surface-2)] border-b border-[var(--border)] text-xs text-[var(--muted)] flex items-center justify-center gap-2">
      <WifiOff size={14} className="shrink-0 text-[var(--warning)]" />
      <span className="font-medium text-center">
        {t('common.offline.banner', lang)}
      </span>
    </div>
  );
};
