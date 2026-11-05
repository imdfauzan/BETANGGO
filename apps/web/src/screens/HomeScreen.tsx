import React from 'react';
import { useApp } from '../context/AppContext';
import { PillButton } from '../components/ui/PillButton';
import { GlassCard } from '../components/ui/GlassCard';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { PriceText } from '../components/ui/PriceText';
import { SEED_DESTINATIONS } from '@betanggo/shared';
import { Compass, MessageSquareQuote, Download, ShieldCheck, AlertTriangle, ArrowRight, MapPin } from 'lucide-react';
import { t } from '../i18n';

export const HomeScreen: React.FC = () => {
  const {
    lang,
    setActiveTab,
    activeDisruptions,
    activeItinerary,
    orders,
    downloadOfflinePack,
    setDetailModalDestId,
    setSafetyModalOpen,
    offlinePacks
  } = useApp();

  const featured = SEED_DESTINATIONS.filter(d => d.kind === 'attraction').slice(0, 5);
  const activeDisruption = activeDisruptions[0];
  const hasTrip = orders.length > 0;

  const promptPresets = [
    {
      id: 'p1',
      label: lang === 'en' ? '5D4N Palangka Raya · 10M Budget' : '5H4M di Palangka Raya · Budget 10 Jt',
      region: 'palangka-raya' as const,
      days: 5,
      budget: 10000000
    },
    {
      id: 'p2',
      label: lang === 'en' ? '3D2N Tanjung Puting Orangutan' : 'Lihat Orangutan di Tanjung Puting 3 Hari',
      region: 'kobar' as const,
      days: 3,
      budget: 8500000
    },
    {
      id: 'p3',
      label: lang === 'en' ? 'Dayak Cultural & Culinary Tour' : 'Wisata Budaya & Kuliner Dayak',
      region: 'palangka-raya' as const,
      days: 2,
      budget: 3500000
    }
  ];

  return (
    <div className="flex flex-col gap-5 px-4 pt-3 pb-8">
      {/* Active Disruption Banner */}
      {activeDisruption && (
        <div
          onClick={() => setActiveTab('care')}
          className="w-full py-2.5 px-3.5 rounded-[var(--r-card)] bg-[var(--surface-2)] border border-[var(--warning)]/50 flex items-center justify-between cursor-pointer active:scale-98 transition-all"
        >
          <div className="flex items-center gap-2.5">
            <AlertTriangle size={16} className="text-[var(--warning)] shrink-0" />
            <span className="text-xs font-medium text-[var(--fg)] line-clamp-1">
              {activeDisruption.title[lang] || activeDisruption.title.id}
            </span>
          </div>
          <span className="text-xs font-bold text-[var(--primary)] shrink-0 ml-2">
            {lang === 'en' ? 'Details' : 'Detail'}
          </span>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative w-full rounded-[var(--r-card-lg)] overflow-hidden shadow-md border border-[var(--border)] min-h-[360px] flex flex-col justify-end p-4">
        {/* Flat Scrim & Hero Image without gradient */}
        <img
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80"
          alt="Hutan Hujan Tropis Kalteng"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Flat Scrim Layer (No gradient) */}
        <div className="absolute inset-0 bg-[#0F1A14]/45 backdrop-brightness-90" />

        {/* Floating Glass Panel */}
        <GlassCard rounded="lg" className="relative z-10 p-5 border border-white/40">
          <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--fg)] leading-tight mb-2 font-display">
            {t('home.hero.title', lang)}
          </h1>
          <p className="text-xs text-[var(--muted)] leading-relaxed mb-4">
            {t('home.hero.subtitle', lang)}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5">
            <PillButton
              variant="primary"
              size="md"
              icon={<MessageSquareQuote size={18} />}
              onClick={() => setActiveTab('ai')}
              className="w-full font-bold justify-center"
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

      {/* Prompt Chips Scrollable */}
      <div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {promptPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setActiveTab('ai')}
              className="h-9 px-3.5 rounded-[var(--r-pill)] border border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] text-xs font-medium whitespace-nowrap active:scale-95 transition-all hover:border-[var(--primary)]"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Continue Active Trip / Plan */}
      {hasTrip ? (
        <SurfaceCard
          rounded="card"
          interactive
          onClick={() => setActiveTab('trips')}
          className="border-l-4 border-l-[var(--success)]"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-[var(--success)] uppercase tracking-wider">
              {t('home.continue.trip', lang)}
            </span>
            <span className="text-xs text-[var(--muted)]">{orders[0].id}</span>
          </div>
          <div className="font-bold text-sm text-[var(--fg)]">
            {orders[0].itinerary.title[lang] || orders[0].itinerary.title.id}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-[var(--muted)]">
            <span>{orders[0].vouchers.length} E-Voucher Siap</span>
            <span className="font-bold text-[var(--primary)] flex items-center gap-1">
              Buka Dompet <ArrowRight size={12} />
            </span>
          </div>
        </SurfaceCard>
      ) : activeItinerary ? (
        <SurfaceCard
          rounded="card"
          interactive
          onClick={() => setActiveTab('ai')}
          className="border-l-4 border-l-[var(--accent)]"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-[var(--rotan-700)] dark:text-[var(--rotan-500)] uppercase tracking-wider">
              {t('home.continue.draft', lang)}
            </span>
            <PriceText amountIdr={activeItinerary.total_cost_idr} lang={lang} size="sm" />
          </div>
          <div className="font-bold text-sm text-[var(--fg)]">
            {activeItinerary.title[lang] || activeItinerary.title.id}
          </div>
          <div className="mt-2 text-xs text-[var(--muted)] flex items-center justify-between">
            <span>{activeItinerary.days.length} Hari Perjalanan Disusun</span>
            <span className="font-semibold text-[var(--primary)] flex items-center gap-1">
              Lihat Itinerary <ArrowRight size={12} />
            </span>
          </div>
        </SurfaceCard>
      ) : null}

      {/* Featured Destinations Carousel */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-base text-[var(--fg)]">
            {t('home.featured.title', lang)}
          </h2>
          <button
            type="button"
            onClick={() => setActiveTab('explore')}
            className="text-xs font-bold text-[var(--primary)] hover:underline"
          >
            {t('home.featured.all', lang)}
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {featured.map((dest) => (
            <div
              key={dest.id}
              onClick={() => setDetailModalDestId(dest.id)}
              className="w-60 shrink-0 rounded-[var(--r-card)] border border-[var(--border)] bg-[var(--surface)] overflow-hidden cursor-pointer active:scale-98 transition-all"
            >
              <div className="h-32 w-full relative">
                <img
                  src={dest.image_url}
                  alt={dest.name[lang] || dest.name.id}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-[var(--r-pill)] bg-[var(--surface)]/90 backdrop-blur-sm text-[10px] font-bold text-[var(--fg)] border border-[var(--border)]">
                  {dest.region === 'palangka-raya' ? 'Palangka Raya' : 'Kobar'}
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-xs text-[var(--fg)] line-clamp-1 mb-1">
                  {dest.name[lang] || dest.name.id}
                </h3>
                <p className="text-[11px] text-[var(--muted)] line-clamp-2 leading-snug mb-2">
                  {dest.summary[lang] || dest.summary.id}
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-[var(--border)]">
                  <span className="text-[10px] text-[var(--muted)]">Tiket mulai</span>
                  <PriceText amountIdr={dest.price_estimate_idr} lang={lang} size="sm" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Offline Maps Banner */}
      <SurfaceCard rounded="card" level={2} className="p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/15 text-[var(--primary)] flex items-center justify-center shrink-0">
            <Download size={20} />
          </div>
          <div>
            <div className="font-bold text-xs text-[var(--fg)]">
              {t('home.offline_maps', lang)}
            </div>
            <div className="text-[11px] text-[var(--muted)]">
              {offlinePacks[0].isDownloaded ? 'Paket Palangka Raya Siap Offline' : 'Unduh paket data peta se-Kalteng'}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => downloadOfflinePack('pack-kbr')}
          className="text-xs font-bold px-3 py-1.5 rounded-[var(--r-pill)] bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-2)] shrink-0"
        >
          {offlinePacks[1].isDownloaded ? 'Tersimpan' : 'Unduh'}
        </button>
      </SurfaceCard>

      {/* Safe Payment Tips Footer Link */}
      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={() => setSafetyModalOpen(true)}
          className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--fg)] font-medium underline-offset-4 hover:underline"
        >
          <ShieldCheck size={14} className="text-[var(--success)]" />
          <span>{t('home.safety_link', lang)}</span>
        </button>
      </div>
    </div>
  );
};
