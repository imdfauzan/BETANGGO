import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { PriceText } from '../components/ui/PriceText';
import { SEED_DESTINATIONS } from '@betanggo/shared';
import { MapPin, Download, CheckCircle, Navigation } from 'lucide-react';
import { t } from '../i18n';

export const MapScreen: React.FC = () => {
  const { lang, offlinePacks, downloadOfflinePack, setDetailModalDestId } = useApp();
  const [selectedPointId, setSelectedPointId] = useState<string>('dest-pky-01');

  const selectedDest = SEED_DESTINATIONS.find(d => d.id === selectedPointId) || SEED_DESTINATIONS[0];

  return (
    <div className="flex flex-col gap-4 px-4 pt-3 pb-8">
      <div>
        <h1 className="text-xl font-bold font-display text-[var(--fg)]">
          {t('map.title', lang)}
        </h1>
        <p className="text-xs text-[var(--muted)]">
          {t('map.attribution', lang)}
        </p>
      </div>

      {/* Interactive Map Visualizer */}
      <div className="relative w-full h-80 rounded-[var(--r-card-lg)] border border-[var(--border)] overflow-hidden bg-[#1B3224] flex items-center justify-center shadow-inner">
        {/* River paths SVG representation */}
        <svg className="absolute inset-0 w-full h-full text-[#9CC48C]/40" viewBox="0 0 400 320" fill="none">
          {/* Kahayan River */}
          <path d="M 220 10 Q 200 80 230 160 T 260 310" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          {/* Sekonyer River */}
          <path d="M 80 200 Q 110 240 90 280 T 120 315" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          {/* Peat Swamp areas */}
          <circle cx="210" cy="180" r="30" fill="currentColor" fillOpacity="0.15" />
          <circle cx="100" cy="250" r="40" fill="currentColor" fillOpacity="0.15" />
        </svg>

        {/* POI Markers */}
        <div className="absolute inset-0 pointer-events-auto">
          {SEED_DESTINATIONS.map((dest, i) => {
            // Position dynamically on the SVG map area
            const coords = [
              { top: '48%', left: '55%' }, // Sebangau
              { top: '38%', left: '52%' }, // Tugu Soekarno
              { top: '32%', left: '50%' }, // Balanga
              { top: '44%', left: '58%' }, // Kahayan
              { top: '40%', left: '46%' }, // Hotel Rimba
              { top: '35%', left: '42%' }, // Homestay
              { top: '42%', left: '60%' }, // Resto
              { top: '75%', left: '26%' }, // Tanjung Puting
              { top: '68%', left: '22%' }, // Istana Kuning
              { top: '78%', left: '28%' }, // Rimba Ecolodge
              { top: '18%', left: '42%' }, // Tumbang Anoi
              { top: '85%', left: '65%' }  // Pantai Ujung Pandaran
            ][i] || { top: '50%', left: '50%' };

            const isSelected = dest.id === selectedPointId;

            return (
              <button
                key={dest.id}
                type="button"
                onClick={() => setSelectedPointId(dest.id)}
                style={{ top: coords.top, left: coords.left }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 p-1 rounded-full transition-transform active:scale-95 ${
                  isSelected
                    ? 'bg-[var(--accent)] text-[var(--on-accent)] ring-4 ring-[var(--accent)]/30 z-20 scale-125'
                    : 'bg-[var(--primary)] text-[var(--on-primary)] ring-2 ring-white/50 z-10'
                }`}
                title={dest.name[lang] || dest.name.id}
              >
                <MapPin size={16} />
              </button>
            );
          })}
        </div>

        {/* Map controls */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-30">
          <button
            type="button"
            className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-[var(--fg)] shadow text-xs font-bold"
            aria-label="Pusatkan peta"
          >
            <Navigation size={14} />
          </button>
        </div>
      </div>

      {/* Selected Marker Detail Card */}
      {selectedDest && (
        <SurfaceCard
          rounded="card"
          interactive
          onClick={() => setDetailModalDestId(selectedDest.id)}
          className="border-2 border-[var(--primary)] p-3.5"
        >
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-sm text-[var(--fg)]">
              {selectedDest.name[lang] || selectedDest.name.id}
            </h3>
            <PriceText amountIdr={selectedDest.price_estimate_idr} lang={lang} size="sm" />
          </div>
          <p className="text-xs text-[var(--muted)] line-clamp-2 mb-2">
            {selectedDest.summary[lang] || selectedDest.summary.id}
          </p>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-[var(--border)]">
            <span className="text-[var(--muted)]">Jam buka: {selectedDest.opening_hours.open} - {selectedDest.opening_hours.close} WIB</span>
            <span className="font-bold text-[var(--primary)]">Buka Detail →</span>
          </div>
        </SurfaceCard>
      )}

      {/* Offline Map Packs (S-07) */}
      <div className="mt-2 flex flex-col gap-3">
        <h2 className="font-display font-bold text-sm text-[var(--fg)]">
          {t('map.pack.title', lang)}
        </h2>

        {offlinePacks.map((pack) => (
          <SurfaceCard key={pack.id} rounded="card" level={2} className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[var(--surface)] text-[var(--primary)] flex items-center justify-center border border-[var(--border)] shrink-0">
                {pack.isDownloaded ? <CheckCircle size={18} className="text-[var(--success)]" /> : <Download size={18} />}
              </div>
              <div>
                <div className="font-bold text-xs text-[var(--fg)]">{pack.name}</div>
                <div className="text-[11px] text-[var(--muted)]">
                  {pack.isDownloaded ? t('map.pack.ready', lang) : `${pack.sizeMb} MB · Unduh ke memori HP`}
                </div>
              </div>
            </div>

            <button
              type="button"
              disabled={pack.isDownloaded}
              onClick={() => downloadOfflinePack(pack.id)}
              className={`px-3 py-1.5 rounded-[var(--r-pill)] text-xs font-bold border transition-all ${
                pack.isDownloaded
                  ? 'bg-[var(--success)]/15 text-[var(--success)] border-transparent'
                  : 'bg-[var(--primary)] text-[var(--on-primary)] border-transparent active:scale-95'
              }`}
            >
              {pack.isDownloaded ? 'Tersimpan' : t('map.pack.download', lang)}
            </button>
          </SurfaceCard>
        ))}
      </div>
    </div>
  );
};
