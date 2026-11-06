import React from 'react';
import { useApp } from '../context/AppContext';
import { PillButton } from '../components/ui/PillButton';
import { ShimmerButton } from '../components/magicui/shimmer-button';
import { GlassCard } from '../components/ui/GlassCard';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { PriceText } from '../components/ui/PriceText';
import { SEED_DESTINATIONS } from '@betanggo/shared';
import { Compass, MessageSquareQuote, ArrowRight } from 'lucide-react';
import { t } from '../i18n';

export const HomeScreen: React.FC = () => {
  const {
    lang,
    setActiveTab,
    activeItinerary,
    orders,
    setDetailModalDestId
  } = useApp();

  const featured = SEED_DESTINATIONS.filter(d => d.kind === 'attraction').slice(0, 4);
  const hasTrip = orders.length > 0;

  return (
    <div className="flex flex-col gap-4 px-4 pt-3 pb-8">
      {/* Hero Section (Expanded height to fill top space with beautiful nature) */}
      <div className="relative w-full rounded-[var(--r-card-lg)] overflow-hidden border border-[var(--border)] min-h-[460px] flex flex-col justify-end p-4 shadow-sm">
        {/* Scrim & Hero Image - Central Kalimantan Rainforest */}
        <img
          src="https://media.istockphoto.com/id/2150624550/id/foto/suku-dayak.jpg?s=612x612&w=0&k=20&c=nKH1KJEtoMdZpdFiRsxQSl0ISjNHbgtVt0NVHH1GYao="
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
            <ShimmerButton
              onClick={() => setActiveTab('ai')}
              background="var(--primary)"
              shimmerColor="#F6E8B8"
              className="w-full h-12 font-bold justify-center shadow-sm"
            >
              <MessageSquareQuote size={18} />
              <span>{t('home.cta.plan', lang)}</span>
            </ShimmerButton>

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
            <span>{orders[0].vouchers.length} {t('home.active_vouchers', lang)}</span>
            <span className="font-semibold text-[var(--primary)] flex items-center gap-1">
              {t('home.open_wallet', lang)} <ArrowRight size={12} />
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
            <span>{activeItinerary.days.length} {t('home.days_planned', lang)}</span>
            <span className="font-semibold text-[var(--primary)] flex items-center gap-1">
              {t('home.view_plan', lang)} <ArrowRight size={12} />
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
