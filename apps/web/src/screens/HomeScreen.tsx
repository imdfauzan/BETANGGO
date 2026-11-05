import React from 'react';
import { useApp } from '../context/AppContext';
import { PillButton } from '../components/ui/PillButton';
import { GlassCard } from '../components/ui/GlassCard';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { PriceText } from '../components/ui/PriceText';
import { SEED_DESTINATIONS } from '@betanggo/shared';
import { Compass, MessageSquareQuote, ArrowRight, AlertTriangle } from 'lucide-react';
import { t } from '../i18n';

export const HomeScreen: React.FC = () => {
  const {
    lang,
    setActiveTab,
    activeDisruptions,
    activeItinerary,
    orders,
    setDetailModalDestId
  } = useApp();

  const featured = SEED_DESTINATIONS.filter(d => d.kind === 'attraction').slice(0, 4);
  const activeDisruption = activeDisruptions[0];
  const hasTrip = orders.length > 0;

  const promptPresets = [
    {
      id: 'p1',
      label: lang === 'en' ? '5D4N Palangka Raya' : '5 Hari di Palangka Raya',
    },
    {
      id: 'p2',
      label: lang === 'en' ? 'Tanjung Puting Orangutan 3D' : 'Orangutan Tanjung Puting 3 Hari',
    },
    {
      id: 'p3',
      label: lang === 'en' ? 'Dayak Cultural Tour' : 'Wisata Budaya Dayak',
    }
  ];

  return (
    <div className="flex flex-col gap-4 px-4 pt-3 pb-8">
      {/* Active Disruption Banner (Minimal) */}
      {activeDisruption && (
        <div
          onClick={() => setActiveTab('care')}
          className="w-full py-2 px-3 rounded-[var(--r-card)] bg-[var(--surface-2)] border border-[var(--warning)]/40 flex items-center justify-between cursor-pointer active:scale-98 transition-all"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle size={15} className="text-[var(--warning)] shrink-0" />
            <span className="text-xs text-[var(--fg)] line-clamp-1">
              {activeDisruption.title[lang] || activeDisruption.title.id}
            </span>
          </div>
          <span className="text-[11px] font-bold text-[var(--primary)] shrink-0 ml-2">
            {lang === 'en' ? 'Info' : 'Detail'}
          </span>
        </div>
      )}

      {/* Hero Section (Clean & Minimal) */}
      <div className="relative w-full rounded-[var(--r-card-lg)] overflow-hidden border border-[var(--border)] min-h-[350px] flex flex-col justify-end p-4">
        {/* Scrim & Hero Image */}
        <img
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80"
          alt="Kalimantan Tengah"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Floating Minimal Glass Card */}
        <GlassCard rounded="lg" className="relative z-10 p-4 border border-white/30 backdrop-blur-md">
          <h1 className="text-lg sm:text-xl font-bold text-[var(--fg)] leading-tight mb-1 font-display">
            {t('home.hero.title', lang)}
          </h1>
          <p className="text-xs text-[var(--muted)] leading-relaxed mb-3">
            {t('home.hero.subtitle', lang)}
          </p>

          {/* Action Buttons: Stacked vertically for clean mobile ergonomics */}
          <div className="flex flex-col gap-2.5 w-full">
            <PillButton
              variant="primary"
              size="md"
              icon={<MessageSquareQuote size={18} />}
              onClick={() => setActiveTab('ai')}
              className="w-full font-bold justify-center shadow-sm"
            >
              {t('home.cta.plan', lang)}
            </PillButton>

            <PillButton
              variant="glass"
              size="md"
              icon={<Compass size={18} />}
              onClick={() => setActiveTab('explore')}
              className="w-full justify-center"
            >
              {t('home.cta.explore', lang)}
            </PillButton>
          </div>
        </GlassCard>
      </div>

      {/* Quick Prompt Presets */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        {promptPresets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => setActiveTab('ai')}
            className="h-8 px-3 rounded-[var(--r-pill)] border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--fg)] text-xs font-medium whitespace-nowrap active:scale-95 transition-all"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Continue Active Trip / Plan (Clean, NO orange left border) */}
      {hasTrip ? (
        <SurfaceCard
          rounded="card"
          interactive
          onClick={() => setActiveTab('trips')}
          className="p-3.5 border border-[var(--border)] shadow-sm bg-[var(--surface)]"
        >
          <div className="flex items-center justify-between mb-1 text-xs">
            <span className="font-semibold text-[var(--success)]">
              {t('home.continue.trip', lang)}
            </span>
            <span className="text-[var(--muted)] font-mono">{orders[0].id}</span>
          </div>
          <div className="font-bold text-sm text-[var(--fg)]">
            {orders[0].itinerary.title[lang] || orders[0].itinerary.title.id}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-[var(--muted)] pt-1.5 border-t border-[var(--border)]">
            <span>{orders[0].vouchers.length} E-Voucher Aktif</span>
            <span className="font-semibold text-[var(--primary)] flex items-center gap-1">
              Buka Dompet <ArrowRight size={12} />
            </span>
          </div>
        </SurfaceCard>
      ) : activeItinerary ? (
        <SurfaceCard
          rounded="card"
          interactive
          onClick={() => setActiveTab('ai')}
          className="p-3.5 border border-[var(--border)] shadow-sm bg-[var(--surface)]"
        >
          <div className="flex items-center justify-between mb-1 text-xs">
            <span className="font-semibold text-[var(--muted)] uppercase tracking-wide text-[10px]">
              {t('home.continue.draft', lang)}
            </span>
            <PriceText amountIdr={activeItinerary.total_cost_idr} lang={lang} size="sm" />
          </div>
          <div className="font-bold text-sm text-[var(--fg)]">
            {activeItinerary.title[lang] || activeItinerary.title.id}
          </div>
          <div className="mt-2 text-xs text-[var(--muted)] flex items-center justify-between pt-1.5 border-t border-[var(--border)]">
            <span>{activeItinerary.days.length} Hari Perjalanan Disusun</span>
            <span className="font-semibold text-[var(--primary)] flex items-center gap-1">
              Lihat Rencana <ArrowRight size={12} />
            </span>
          </div>
        </SurfaceCard>
      ) : null}

      {/* Featured Destinations (Clean & Simple) */}
      <section className="flex flex-col gap-2.5 mt-1">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-sm text-[var(--fg)]">
            {t('home.featured.title', lang)}
          </h2>
          <button
            type="button"
            onClick={() => setActiveTab('explore')}
            className="text-xs font-semibold text-[var(--primary)] hover:underline"
          >
            {t('home.featured.all', lang)}
          </button>
        </div>

        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {featured.map((dest) => (
            <div
              key={dest.id}
              onClick={() => setDetailModalDestId(dest.id)}
              className="w-48 shrink-0 rounded-[var(--r-card)] border border-[var(--border)] bg-[var(--surface)] overflow-hidden cursor-pointer active:scale-98 transition-all"
            >
              <div className="h-28 w-full relative">
                <img
                  src={dest.image_url}
                  alt={dest.name[lang] || dest.name.id}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2.5">
                <h3 className="font-bold text-xs text-[var(--fg)] line-clamp-1 mb-0.5">
                  {dest.name[lang] || dest.name.id}
                </h3>
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-[var(--muted)]">{dest.region === 'palangka-raya' ? 'Palangka Raya' : 'Kobar'}</span>
                  <PriceText amountIdr={dest.price_estimate_idr} lang={lang} size="sm" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
