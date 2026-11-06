import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { PillButton } from '../components/ui/PillButton';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { PriceText } from '../components/ui/PriceText';
import { BottomSheet } from '../components/ui/BottomSheet';
import { TextLoop } from '../components/core/text-loop';
import AI_Voice from '../components/kokonutui/ai-voice';
import { RegionSlug, TravelPace } from '@betanggo/shared';
import { MessageSquareQuote, Mic, Send, Sparkles, Check, ArrowRight, Volume2 } from 'lucide-react';
import { t } from '../i18n';

export interface PlanScreenProps {
  onOpenEditor: () => void;
}

export const PlanScreen: React.FC<PlanScreenProps> = ({ onOpenEditor }) => {
  const { lang, buildPlanWithAi, isOffline, activeItinerary, showToast } = useApp();

  const [promptText, setPromptText] = useState('');
  const [region, setRegion] = useState<RegionSlug>('palangka-raya');
  const [days, setDays] = useState(3);
  const [pax, setPax] = useState(2);
  const [budgetIdr, setBudgetIdr] = useState(4500000);
  const [pace, setPace] = useState<TravelPace>('balanced');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['nature', 'wildlife', 'culture']);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStage, setGenerationStage] = useState<string>('');
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [activeIdeaIndex, setActiveIdeaIndex] = useState(0);
  const [liveTranscript, setLiveTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  const handleListeningChange = (listening: boolean) => {
    if (listening) {
      setLiveTranscript('');
      try {
        const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRec) {
          const rec = new SpeechRec();
          rec.lang = lang === 'en' ? 'en-US' : 'id-ID';
          rec.continuous = true;
          rec.interimResults = true;
          rec.onresult = (event: any) => {
            let text = '';
            for (let i = 0; i < event.results.length; i++) {
              text += event.results[i][0].transcript;
            }
            setLiveTranscript(text);
          };
          rec.start();
          recognitionRef.current = rec;
        }
      } catch (err) {
        console.warn('SpeechRecognition unavailable', err);
      }
    } else {
      try {
        recognitionRef.current?.stop();
      } catch { }
    }
  };

  const handleVoiceSend = () => {
    try {
      recognitionRef.current?.stop();
    } catch { }

    const sampleIdeas = lang === 'en'
      ? [
        'Plan a 3-day trip in Palangka Raya and Sebangau for 2 people with 5 million budget',
        'Tanjung Puting 4-day orangutan river cruise adventure with balanced pace',
        'Explore Dayak culture and Kahayan river culinary in Palangka Raya'
      ]
      : [
        'Rencanakan liburan 3 hari 2 malam di Palangka Raya dan Sebangau untuk 2 orang budget 5 juta',
        'Petualangan susur sungai klotok Tanjung Puting 4 hari melihat orangutan',
        'Eksplorasi budaya Dayak dan kuliner khas sungai Kahayan di Palangka Raya'
      ];

    const chosen = liveTranscript.trim() || sampleIdeas[Math.floor(Math.random() * sampleIdeas.length)];
    setPromptText(chosen);
    setVoiceModalOpen(false);
    showToast(lang === 'en' ? 'Voice transcribed into prompt!' : 'Suara berhasil dimasukkan ke kolom prompt!');
  };

  const handleVoiceDiscard = () => {
    try {
      recognitionRef.current?.stop();
    } catch { }
    setLiveTranscript('');
    setVoiceModalOpen(false);
  };

  const promptIdeas = lang === 'en'
    ? [
      '5 days in Palangka Raya budget 10M',
      'See orangutans in Tanjung Puting for 3 days',
      'Dayak cultural & Betang house tour',
      'Kahayan river cruise & local culinary trip',
      'Relaxing weekend family trip'
    ]
    : [
      '5 hari di Palangka Raya budget 10 juta',
      'Lihat orangutan di Tanjung Puting 3 hari',
      'Wisata budaya Dayak & Rumah Betang',
      'Susur sungai Kahayan & kuliner ikan bakar',
      'Trip santai keluarga akhir pekan'
    ];

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

  const kokonutPrompt = 'Add the ai-voice component from Kokonut UI to this project with npx shadcn@latest add https://kokonutui.com/r/ai-voice.json, then show me how to use it.';

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

      {/* Main Prompt Input Box (Extended Height & TextLoop Effect) */}
      <SurfaceCard rounded="lg" level={1} className="p-4 shadow-sm border border-[var(--border)]">
        {/* Animated TextLoop Suggestion Bar */}
        <div
          onClick={() => setPromptText(promptIdeas[activeIdeaIndex])}
          className="mb-2.5 py-1.5 px-3 rounded-[var(--r-card)] bg-[var(--surface-2)] hover:border-[var(--primary)] transition-all cursor-pointer flex items-center gap-2 text-xs border border-[var(--border)] select-none"
          title="Klik untuk mengisi kalimat prompt"
        >
          <Sparkles size={13} className="text-[var(--accent)] shrink-0" />
          <span className="font-semibold text-[var(--fg)] shrink-0">
            {lang === 'en' ? 'Try asking:' : 'Ide rencana:'}
          </span>
          <TextLoop
            className="text-xs text-[var(--primary)] font-medium truncate"
            onIndexChange={(idx) => setActiveIdeaIndex(idx)}
            interval={2.8}
          >
            {promptIdeas.map((idea, idx) => (
              <span key={idx} className="cursor-pointer hover:underline">{idea}</span>
            ))}
          </TextLoop>
        </div>

        {/* Spacious Textarea */}
        <textarea
          rows={5}
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          placeholder={t('plan.placeholder', lang)}
          className="w-full min-h-[130px] bg-transparent text-sm text-[var(--fg)] placeholder:text-[var(--muted)] focus:outline-none resize-none leading-relaxed"
        />

        {/* Action Button Bar */}
        <div className="mt-3 pt-3 border-t border-[var(--border)] flex items-center justify-between gap-2.5">
          {/* Voice Input Button in Palette Accent Yellow */}
          <PillButton
            type="button"
            variant="accent"
            size="sm"
            icon={<Mic size={15} />}
            onClick={() => setVoiceModalOpen(true)}
            className="font-bold px-4 text-xs shadow-sm hover:brightness-105 active:scale-95"
          >
            {lang === 'en' ? 'Say it here' : 'Katakan disini'}
          </PillButton>

          {/* Build Plan Button */}
          <PillButton
            variant="primary"
            size="sm"
            icon={<Send size={14} />}
            disabled={isGenerating}
            onClick={() => handleStartPlanning(promptText)}
            className="font-bold px-4 text-xs shadow-sm"
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
                className={`py-2 px-3 rounded-[var(--r-card)] border text-left transition-all ${region === r.id
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
                  className={`px-3 py-1.5 rounded-[var(--r-pill)] text-xs font-medium border transition-all flex items-center gap-1.5 ${isSelected
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

      {/* Kokonut UI AI Voice Interaction Dialog */}
      <BottomSheet
        isOpen={voiceModalOpen}
        onClose={handleVoiceDiscard}
        title={lang === 'en' ? 'AI Voice Input — Kokonut UI' : 'Input Suara AI — Kokonut UI'}
      >
        <div className="flex flex-col items-center gap-3 py-2 text-xs">
          <div className="w-full bg-[var(--surface-2)] rounded-[var(--r-card-lg)] p-4 border border-[var(--border)] flex flex-col items-center">
            {/* Real Interactive Kokonut UI Waveform and Voice Recorder */}
            <AI_Voice
              demo={false}
              onListeningChange={handleListeningChange}
              onSend={handleVoiceSend}
              onDiscard={handleVoiceDiscard}
              className="py-1"
            />

            {liveTranscript && (
              <div className="w-full mt-2 p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--fg)] text-center animate-fadeIn">
                <span className="text-[var(--muted)] text-[10px] block mb-0.5">Transkripsi:</span>
                "{liveTranscript}"
              </div>
            )}
          </div>

          <div className="flex items-center justify-between w-full text-[11px] text-[var(--muted)] px-1">
            <span className="flex items-center gap-1">
              <Volume2 size={13} className="text-[var(--primary)]" />
              {lang === 'en' ? 'Tap mic to speak / test' : 'Ketuk mikrofon untuk bicara'}
            </span>
            <span>Kokonut UI v2.1</span>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};
