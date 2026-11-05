import React from 'react';
import { ItineraryDay, ItineraryItem, ItinerarySegment } from '@betanggo/shared';
import { SurfaceCard } from './SurfaceCard';
import { PriceText } from './PriceText';
import { Car, Ship, Plane, Footprints, Pin, PinOff, RefreshCw, Trash2, Clock } from 'lucide-react';
import { t } from '../../i18n';

export interface TimelineRiverProps {
  day: ItineraryDay;
  lang?: 'id' | 'en';
  onReplaceItem?: (itemId: string) => void;
  onTogglePin?: (itemId: string) => void;
  onDeleteItem?: (itemId: string) => void;
  onItemDetail?: (destId: string) => void;
}

export const TimelineRiver: React.FC<TimelineRiverProps> = ({
  day,
  lang = 'id',
  onReplaceItem,
  onTogglePin,
  onDeleteItem,
  onItemDetail
}) => {
  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'boat':
        return <Ship size={14} className="text-[var(--primary)]" />;
      case 'flight':
        return <Plane size={14} className="text-[var(--primary)]" />;
      case 'walk':
        return <Footprints size={14} className="text-[var(--muted)]" />;
      case 'car':
      default:
        return <Car size={14} className="text-[var(--primary)]" />;
    }
  };

  const getModeLabel = (mode: string, mins: number, cost: number) => {
    const modeName = mode === 'boat' ? (lang === 'en' ? 'Boat/Klotok' : 'Klotok/Perahu')
      : mode === 'flight' ? (lang === 'en' ? 'Flight' : 'Pesawat')
      : mode === 'walk' ? (lang === 'en' ? 'Walk' : 'Jalan kaki')
      : (lang === 'en' ? 'Drive' : 'Mobil/Darat');

    return `${modeName} · ${mins} mnt ${cost > 0 ? `· Rp ${cost.toLocaleString('id-ID')}` : ''}`;
  };

  return (
    <div className="relative pl-6 py-2">
      {day.items.map((item, idx) => {
        const seg = day.transport_segments[idx];
        const isPinned = item.is_pinned;

        return (
          <div key={item.id} className="relative mb-6 last:mb-2">
            {/* Dermaga Node */}
            <div
              className={`absolute -left-[23px] top-4 w-3.5 h-3.5 rounded-full border-2 transition-colors z-10 ${
                isPinned
                  ? 'bg-[var(--accent)] border-[var(--rotan-700)]'
                  : 'bg-[var(--surface)] border-[var(--pakis-600)]'
              }`}
            />

            {/* Item Card */}
            <SurfaceCard rounded="card" level={1} className="p-3.5 shadow-none border border-[var(--border)]">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] font-mono font-medium">
                  <Clock size={12} />
                  <span>{item.time_start} - {item.time_end} WIB</span>
                </div>
                <PriceText amountIdr={item.cost_idr} lang={lang} size="sm" />
              </div>

              <div
                className="font-bold text-sm text-[var(--fg)] hover:text-[var(--primary)] cursor-pointer"
                onClick={() => onItemDetail && onItemDetail(item.destination_id)}
              >
                {item.name[lang] || item.name.id}
              </div>

              {item.notes && (
                <p className="mt-1 text-xs text-[var(--muted)]">
                  {item.notes[lang] || item.notes.id}
                </p>
              )}

              {/* Action Buttons */}
              <div className="mt-3 pt-2.5 border-t border-[var(--border)] flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  {onReplaceItem && item.kind !== 'lodging' && (
                    <button
                      type="button"
                      onClick={() => onReplaceItem(item.id)}
                      className="inline-flex items-center gap-1 text-[var(--muted)] hover:text-[var(--primary)] font-medium"
                    >
                      <RefreshCw size={12} />
                      <span>{t('itinerary.replace', lang)}</span>
                    </button>
                  )}
                  {onTogglePin && (
                    <button
                      type="button"
                      onClick={() => onTogglePin(item.id)}
                      className={`inline-flex items-center gap-1 font-medium ${
                        isPinned ? 'text-[var(--rotan-700)] dark:text-[var(--rotan-500)]' : 'text-[var(--muted)] hover:text-[var(--fg)]'
                      }`}
                    >
                      {isPinned ? <PinOff size={12} /> : <Pin size={12} />}
                      <span>{isPinned ? t('itinerary.unpin', lang) : t('itinerary.pin', lang)}</span>
                    </button>
                  )}
                </div>

                {onDeleteItem && (
                  <button
                    type="button"
                    onClick={() => onDeleteItem(item.id)}
                    className="inline-flex items-center gap-1 text-[var(--danger)] hover:opacity-80 font-medium"
                    aria-label={t('itinerary.remove', lang)}
                  >
                    <Trash2 size={12} />
                    <span>{t('itinerary.remove', lang)}</span>
                  </button>
                )}
              </div>
            </SurfaceCard>

            {/* Transport Spine Segment to next item */}
            {idx < day.items.length - 1 && (
              <div className="relative my-2 pl-2 flex items-center gap-2">
                {/* Vertical Spine Line */}
                <div className="absolute -left-[17px] top-0 bottom-0 flex flex-col items-center">
                  {seg && seg.mode === 'boat' ? (
                    /* Wavy path for river klotok */
                    <svg width="6" height="36" className="text-[var(--pakis-600)] my-auto" viewBox="0 0 6 36" fill="none">
                      <path d="M3 0 Q5 9 3 18 Q1 27 3 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  ) : seg && seg.mode === 'flight' ? (
                    /* Dashed line for flight */
                    <div className="w-[2px] h-9 border-l-2 border-dashed border-[var(--pakis-600)]" />
                  ) : seg && seg.mode === 'walk' ? (
                    /* Dotted line for walking */
                    <div className="w-[2px] h-9 border-l-2 border-dotted border-[var(--muted)]" />
                  ) : (
                    /* Solid line for road/car */
                    <div className="w-[2px] h-9 bg-[var(--pakis-600)]" />
                  )}
                </div>

                {/* Mode Label */}
                {seg && (
                  <div className="py-1 px-2.5 rounded-[var(--r-pill)] bg-[var(--surface-2)] text-[11px] text-[var(--muted)] flex items-center gap-1.5">
                    {getModeIcon(seg.mode)}
                    <span>{getModeLabel(seg.mode, seg.minutes, seg.cost_idr)}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

