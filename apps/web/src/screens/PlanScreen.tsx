import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PillButton } from '../components/ui/PillButton';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { PriceText } from '../components/ui/PriceText';
import { RegionSlug, TravelPace } from '@betanggo/shared';
import { MessageSquareQuote, Mic, Send, Sparkles, Check, ArrowRight } from 'lucide-react';
import { t } from '../i18n';

export interface PlanScreenProps {
  onOpenEditor: () => void;
}

export const PlanScreen: React.FC<PlanScreenProps> = ({ onOpenEditor }) => {
  const { lang, buildPlanWithAi, isOffline, activeItinerary } = useApp();

  const [promptText, setPromptText] = useState('');
  const [region, setRegion] = useState<RegionSlug>('palangka-raya');
  const [days, setDays] = useState(3);
  const [pax, setPax] = useState(2);
  const [budgetIdr, setBudgetIdr] = useState(4500000);
  const [pace, setPace] = useState<TravelPace>('balanced');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['nature', 'wildlife', 'culture']);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStage, setGenerationStage] = useState<string>('');

  const interestOptions = [
    { id: 'nature', label: lang === 'en' ? 'Rainforest & Peatland' : 'Alam Gambut' },
    { id: 'wildlife', label: lang === 'en' ? 'Orangutan & Wildlife' : 'Orangutan & Satwa' },
    { id: 'culture', label: lang === 'en' ? 'Dayak Culture & Betang' : 'Budaya & Rumah Betang' },
    { id: 'culinary', label: lang === 'en' ? 'Local Dayak Cuisine' : 'Kuliner Khas Dayak' },
    { id: 'river', label: lang === 'en' ? 'River & Klotok Boat' : 'Susur Sungai & Klotok' }
  ];

  const handleToggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleStartPlanning = (customPrompt?: string) => {
    setIsGenerating(true);

    const stages = [
      t('plan.stage.intent', lang),
      t('plan.stage.retrieve', lang),
      t('plan.stage.solve', lang),
      t('plan.stage.cost', lang),
      t('plan.stage.narrate', lang)
    ];

    let current = 0;
    setGenerationStage(stages[0]);

    const timer = setInterval(() => {
      current++;
      if (current < stages.length) {
        setGenerationStage(stages[current]);
      } else {
        clearInterval(timer);
        setIsGenerating(false);

        // Build with local isomorphic solver
        buildPlanWithAi({
          region,
          days,
          nights: Math.max(1, days - 1),
          pax,
          budget_idr: budgetIdr,
          pace,
          interests: selectedInterests
        });

        onOpenEditor();
      }
    }, 700);
  };

  return (
    <div className="flex flex-col gap-4 px-4 pt-3 pb-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-[var(--on-primary)] flex items-center justify-center font-bold">
          <MessageSquareQuote size={18} />
        </div>
        <div>
          <h1 className="text-lg font-bold font-display text-[var(--fg)] leading-none">
            {t('plan.title', lang)}
          </h1>
          <p className="text-xs text-[var(--muted)]">
            {t('plan.tagline', lang)}
          </p>
        </div>
      </div>

      {/* Main Prompt Input Box */}
      <SurfaceCard rounded="lg" level={1} className="p-4 shadow-sm border border-[var(--border)]">
        <textarea
          rows={3}
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          placeholder={t('plan.placeholder', lang)}
          className="w-full bg-transparent text-sm text-[var(--fg)] placeholder:text-[var(--muted)] focus:outline-none resize-none leading-relaxed"
        />

        <div className="mt-3 pt-2.5 border-t border-[var(--border)] flex items-center justify-between">
          <button
            type="button"
            onClick={() => setPromptText(lang === 'en' ? '5 days 4 nights in Palangka Raya with 10 million budget' : '5 hari 4 malam di Palangka Raya, budget 10 juta')}
            className="flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--primary)]"
            title="Simulasi Web Speech API"
          >
            <Mic size={16} />
            <span>{lang === 'en' ? 'Preset voice prompt' : 'Input suara'}</span>
          </button>

          <PillButton
            variant="primary"
            size="sm"
            icon={<Send size={14} />}
            disabled={isGenerating}
            onClick={() => handleStartPlanning(promptText)}
            className="font-bold px-4"
          >
            {isOffline ? t('plan.submit_offline', lang) : t('plan.submit', lang)}
          </PillButton>
        </div>
      </SurfaceCard>

      {/* Multi-stage Generation Animation Indicator */}
      {isGenerating && (
        <SurfaceCard rounded="card" level={2} className="p-4 border-2 border-[var(--primary)] animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin shrink-0" />
            <div className="text-xs font-bold text-[var(--primary)]">
              {generationStage}
            </div>
          </div>
        </SurfaceCard>
      )}

      {/* Manual Travel Parameters (Klarifikasi & Penyesuaian) */}
      <div className="flex flex-col gap-3 mt-1">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
          {t('plan.manual', lang)}
        </h2>

        {/* Region Selector */}
        <div>
          <label className="text-xs font-semibold text-[var(--fg)] mb-1.5 block">
            Wilayah Tujuan
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { id: 'palangka-raya' as RegionSlug, label: 'Palangka Raya & Sebangau' },
              { id: 'kobar' as RegionSlug, label: 'Kobar (Tanjung Puting)' }
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRegion(r.id)}
                className={`py-2 px-3 rounded-[var(--r-card)] border text-left transition-all ${
                  region === r.id
                    ? 'border-[var(--primary)] bg-[var(--surface-2)] text-[var(--primary)] font-bold'
                    : 'border-[var(--border)] bg-[var(--surface)] text-[var(--fg)]'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Duration & Pax */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-[var(--fg)] mb-1.5 block">
              Durasi: <span className="text-[var(--primary)] font-bold">{days} Hari</span>
            </label>
            <input
              type="range"
              min={1}
              max={7}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full accent-[var(--primary)]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[var(--fg)] mb-1.5 block">
              Jumlah Orang: <span className="text-[var(--primary)] font-bold">{pax} Orang</span>
            </label>
            <input
              type="range"
              min={1}
              max={6}
              value={pax}
              onChange={(e) => setPax(Number(e.target.value))}
              className="w-full accent-[var(--primary)]"
            />
          </div>
        </div>

        {/* Budget Slider */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-[var(--fg)]">
              Total Budget Perjalanan
            </label>
            <PriceText amountIdr={budgetIdr} lang={lang} size="sm" className="text-[var(--primary)]" />
          </div>
          <input
            type="range"
            min={2000000}
            max={20000000}
            step={500000}
            value={budgetIdr}
            onChange={(e) => setBudgetIdr(Number(e.target.value))}
            className="w-full accent-[var(--primary)]"
          />
          <div className="flex justify-between text-[10px] text-[var(--muted)] mt-1 font-mono">
            <span>Rp 2 Juta</span>
            <span>Rp 10 Juta</span>
            <span>Rp 20 Juta</span>
          </div>
        </div>

        {/* Interest Chips */}
        <div>
          <label className="text-xs font-semibold text-[var(--fg)] mb-2 block">
            Fokus & Minat Perjalanan
          </label>
          <div className="flex flex-wrap gap-2">
            {interestOptions.map((opt) => {
              const isSelected = selectedInterests.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleToggleInterest(opt.id)}
                  className={`px-3 py-1.5 rounded-[var(--r-pill)] text-xs font-medium border transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[var(--primary)] text-[var(--on-primary)] border-transparent'
                      : 'bg-[var(--surface)] text-[var(--fg)] border-[var(--border)] hover:bg-[var(--surface-2)]'
                  }`}
                >
                  {isSelected && <Check size={12} strokeWidth={3} />}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Plan Button */}
        <div className="pt-2">
          <PillButton
            variant="accent"
            size="lg"
            disabled={isGenerating}
            onClick={() => handleStartPlanning()}
            className="w-full font-bold justify-center"
          >
            {isOffline ? t('plan.submit_offline', lang) : t('plan.submit', lang)}
          </PillButton>
        </div>

        {/* Fact Checking Note */}
        <p className="text-[11px] text-[var(--muted)] leading-relaxed text-center px-2 pt-1">
          {t('plan.note', lang)}
        </p>
      </div>

      {/* Current Active Plan Link if exists */}
      {activeItinerary && (
        <div className="mt-2 pt-4 border-t border-[var(--border)]">
          <SurfaceCard
            rounded="card"
            interactive
            onClick={onOpenEditor}
            className="flex items-center justify-between p-3.5"
          >
            <div>
              <div className="text-[11px] font-bold text-[var(--muted)] uppercase">Rencana Terakhir</div>
              <div className="text-xs font-bold text-[var(--fg)]">{activeItinerary.title[lang] || activeItinerary.title.id}</div>
            </div>
            <span className="text-xs font-bold text-[var(--primary)] flex items-center gap-1">
              Buka Editor <ArrowRight size={13} />
            </span>
          </SurfaceCard>
        </div>
      )}
    </div>
  );
};
