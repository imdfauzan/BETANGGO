import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TimelineRiver } from '../components/ui/TimelineRiver';
import { BottomSheet } from '../components/ui/BottomSheet';
import { PillButton } from '../components/ui/PillButton';
import { PriceText } from '../components/ui/PriceText';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { alternatives, recompute } from '@betanggo/solver';
import { AlternativeOption } from '@betanggo/solver';
import { AlertCircle, Sparkles, Send, ArrowRight, ArrowLeft } from 'lucide-react';
import { t } from '../i18n';

export interface EditorScreenProps {
  onProceedToCheckout: () => void;
  onBackToPlan: () => void;
}

export const EditorScreen: React.FC<EditorScreenProps> = ({
  onProceedToCheckout,
  onBackToPlan
}) => {
  const { lang, activeItinerary, setActiveItinerary, showToast, setDetailModalDestId } = useApp();
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);

  // Alternatives Sheet state
  const [replaceTargetItemId, setReplaceTargetItemId] = useState<string | null>(null);
  const [availableAlts, setAvailableAlts] = useState<AlternativeOption[]>([]);

  // Re-plan command
  const [commandText, setCommandText] = useState('');

  if (!activeItinerary) {
    return (
      <div className="p-8 text-center text-xs text-[var(--muted)]">
        Belum ada itinerary yang dibuat. Silakan kembali ke menu Betang AI.
      </div>
    );
  }

  const currentDay = activeItinerary.days[selectedDayIdx] || activeItinerary.days[0];
  const isOverBudget = activeItinerary.total_cost_idr > activeItinerary.budget_idr;
  const budgetPct = Math.min(100, Math.round((activeItinerary.total_cost_idr / activeItinerary.budget_idr) * 100));

  // Handler for item actions
  const handleOpenReplace = (itemId: string) => {
    const alts = alternatives(activeItinerary, itemId);
    setReplaceTargetItemId(itemId);
    setAvailableAlts(alts);
  };

  const handleSelectAlternative = (newDestId: string) => {
    if (!replaceTargetItemId) return;
    const updated = recompute(activeItinerary, replaceTargetItemId, newDestId);
    setActiveItinerary(updated);
    setReplaceTargetItemId(null);
    showToast('Item berhasil diganti dan total biaya diperbarui.');
  };

  const handleTogglePin = (itemId: string) => {
    const updatedDays = activeItinerary.days.map(d => ({
      ...d,
      items: d.items.map(it => it.id === itemId ? { ...it, is_pinned: !it.is_pinned } : it)
    }));
    setActiveItinerary({ ...activeItinerary, days: updatedDays });
  };

  const handleDeleteItem = (itemId: string) => {
    const previousPlan = activeItinerary;
    const updatedDays = activeItinerary.days.map(d => ({
      ...d,
      items: d.items.filter(it => it.id !== itemId)
    }));
    const newTotal = updatedDays.reduce((acc, d) => acc + d.items.reduce((s, it) => s + it.cost_idr, 0), 0);
    setActiveItinerary({
      ...activeItinerary,
      days: updatedDays,
      total_cost_idr: newTotal
    });

    showToast('Item dihapus dari timeline', 'Urungkan', () => {
      setActiveItinerary(previousPlan);
    });
  };

  const handleExecuteCommand = () => {
    if (!commandText.trim()) return;
    // Command parser simulation
    showToast(`Menerapkan perintah: "${commandText}"`);
    setCommandText('');
  };

  return (
    <div className="flex flex-col gap-4 px-4 pt-3 pb-24">
      {/* Top Bar with Back */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToPlan}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--muted)] hover:text-[var(--fg)]"
        >
          <ArrowLeft size={16} />
          <span>{t('editor.back_params', lang)}</span>
        </button>

        <span className="text-xs font-bold text-[var(--primary)]">
          {activeItinerary.days.length} {t('editor.days_trip', lang)}
        </span>
      </div>

      {/* Title & Budget Bar (S-13) */}
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-bold font-display text-[var(--fg)]">
          {activeItinerary.title[lang] || activeItinerary.title.id}
        </h1>

        {/* Budget Progress Bar */}
        <SurfaceCard rounded="card" level={2} className="p-3">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[var(--muted)] font-medium">{t('itinerary.budget_used', lang)}</span>
            <div className="flex items-center gap-1.5">
              <PriceText amountIdr={activeItinerary.total_cost_idr} lang={lang} size="sm" />
              <span className="text-[var(--muted)]">/</span>
              <PriceText amountIdr={activeItinerary.budget_idr} lang={lang} size="sm" className="text-[var(--muted)]" />
            </div>
          </div>

          <div className="w-full h-2 rounded-full bg-[var(--surface)] overflow-hidden">
            <div
              style={{ width: `${budgetPct}%` }}
              className={`h-full transition-all ${
                isOverBudget ? 'bg-[var(--danger)]' : 'bg-[var(--primary)]'
              }`}
            />
          </div>

          {isOverBudget && (
            <div className="flex items-center gap-1.5 mt-2 text-xs text-[var(--danger)] font-medium">
              <AlertCircle size={14} />
              <span>{t('itinerary.over_budget', lang)} sebesar Rp {activeItinerary.budget_diff_idr.toLocaleString('id-ID')}</span>
            </div>
          )}
        </SurfaceCard>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {activeItinerary.days.map((day, idx) => (
          <button
            key={day.day_number}
            type="button"
            onClick={() => setSelectedDayIdx(idx)}
            className={`px-4 py-1.5 rounded-[var(--r-pill)] text-xs font-bold border transition-all whitespace-nowrap ${
              selectedDayIdx === idx
                ? 'bg-[var(--primary)] text-[var(--on-primary)] border-transparent shadow-sm'
                : 'bg-[var(--surface)] text-[var(--muted)] border-[var(--border)] hover:bg-[var(--surface-2)]'
            }`}
          >
            {day.date_label[lang] || day.date_label.id}
          </button>
        ))}
      </div>

      {/* Vertical Timeline River Component (Garis Sungai - S-11) */}
      <TimelineRiver
        day={currentDay}
        lang={lang}
        onReplaceItem={handleOpenReplace}
        onTogglePin={handleTogglePin}
        onDeleteItem={handleDeleteItem}
        onItemDetail={(id) => setDetailModalDestId(id)}
      />

      {/* Re-plan Command Bar */}
      <div className="flex items-center gap-2 mt-2">
        <input
          type="text"
          value={commandText}
          onChange={(e) => setCommandText(e.target.value)}
          placeholder={t('itinerary.command.placeholder', lang)}
          className="flex-1 h-11 px-4 rounded-[var(--r-pill)] bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--fg)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--primary)]"
        />
        <button
          type="button"
          onClick={handleExecuteCommand}
          className="w-11 h-11 rounded-full bg-[var(--primary)] text-[var(--on-primary)] flex items-center justify-center shrink-0 active:scale-95"
          aria-label="Kirim perintah replan"
        >
          <Send size={15} />
        </button>
      </div>

      {/* Alternatives Sheet Modal (S-12) */}
      <BottomSheet
        isOpen={Boolean(replaceTargetItemId)}
        onClose={() => setReplaceTargetItemId(null)}
        title={t('editor.select_alt', lang)}
      >
        <div className="flex flex-col gap-3 py-2">
          {availableAlts.length === 0 ? (
            <p className="text-xs text-[var(--muted)] py-4 text-center">
              {t('editor.no_alt', lang)}
            </p>
          ) : (
            availableAlts.map((alt) => (
              <SurfaceCard
                key={alt.destination.id}
                rounded="card"
                interactive
                onClick={() => handleSelectAlternative(alt.destination.id)}
                className="flex items-center justify-between p-3"
              >
                <div>
                  <h4 className="font-bold text-xs text-[var(--fg)]">
                    {alt.destination.name[lang] || alt.destination.name.id}
                  </h4>
                  <div className="text-[11px] text-[var(--muted)]">
                    {alt.reason === 'cheaper' ? 'Opsi lebih hemat' : 'Area berdekatan'}
                  </div>
                </div>

                <div className="text-right">
                  <PriceText amountIdr={alt.destination.price_estimate_idr} lang={lang} size="sm" />
                  <div className="text-[10px] font-bold text-[var(--primary)]">Ganti ke ini</div>
                </div>
              </SurfaceCard>
            ))
          )}
        </div>
      </BottomSheet>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-3 inset-x-0 z-40 flex justify-center pointer-events-none px-3">
        <div className="pointer-events-auto glass-panel h-16 w-full max-w-[420px] rounded-[var(--r-pill)] border border-[var(--glass-border)] px-4 flex items-center justify-between shadow-2xl">
          <div>
            <div className="text-[10px] uppercase font-bold text-[var(--muted)] tracking-wider">
              Total Rencana
            </div>
            <PriceText amountIdr={activeItinerary.total_cost_idr} lang={lang} size="md" className="text-[var(--primary)]" />
          </div>

          <PillButton
            variant="accent"
            size="md"
            icon={<ArrowRight size={16} />}
            onClick={onProceedToCheckout}
            className="font-bold"
          >
            {t('itinerary.continue_pay', lang)}
          </PillButton>
        </div>
      </div>
    </div>
  );
};

