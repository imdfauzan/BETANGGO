import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { PillButton } from '../components/ui/PillButton';
import { PillInput } from '../components/ui/PillInput';
import { EMERGENCY_CONTACTS } from '@betanggo/shared';
import { replanForDisruption } from '@betanggo/solver';
import { Phone, ShieldAlert, AlertTriangle, Send, RefreshCw, CheckCircle2, MessageSquare } from 'lucide-react';
import { t } from '../i18n';

export const CareScreen: React.FC = () => {
  const {
    lang,
    activeDisruptions,
    activeItinerary,
    setActiveItinerary,
    showToast,
    isOffline
  } = useApp();

  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMsg, setTicketMsg] = useState('');
  const [ticketSent, setTicketSent] = useState(false);

  const activeDisruption = activeDisruptions[0];

  const handleReplanDisruption = () => {
    if (!activeItinerary || !activeDisruption) return;
    const updated = replanForDisruption(activeItinerary, activeDisruption);
    setActiveItinerary(updated);
    showToast('Itinerary berhasil disesuaikan secara otomatis menghindari area terdampak banjir.');
  };

  const handleSendTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketMsg.trim()) return;

    setTicketSent(true);
    if (isOffline) {
      showToast('Tiket tersimpan di outbox offline. Akan terkirim otomatis saat online.');
    } else {
      showToast('Tiket bantuan berhasil dikirim ke tim Betang Care.');
    }

    setTimeout(() => {
      setTicketSubject('');
      setTicketMsg('');
      setTicketSent(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-4 px-4 pt-3 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-lg font-bold font-display text-[var(--fg)]">
          {t('care.title', lang)}
        </h1>
        <p className="text-xs text-[var(--muted)]">
          {t('care.offline_safe', lang)}
        </p>
      </div>

      {/* Disruption Alert & Auto Re-plan (S-25) */}
      {activeDisruption && (
        <SurfaceCard rounded="card" level={2} className="border-2 border-[var(--warning)] p-4 flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--warning)]">
            <AlertTriangle size={18} />
            <span>{t('care.disruption_alert', lang)}</span>
          </div>

          <h3 className="font-bold text-sm text-[var(--fg)]">
            {activeDisruption.title[lang] || activeDisruption.title.id}
          </h3>

          <p className="text-xs text-[var(--muted)] leading-relaxed">
            {activeDisruption.description[lang] || activeDisruption.description.id}
          </p>

          <div className="p-2.5 rounded-[var(--r-card)] bg-[var(--surface)] text-[11px] text-[var(--fg)] border border-[var(--border)]">
            <span className="font-bold text-[var(--primary)]">{t('care.advice', lang)} </span>
            {activeDisruption.alternative_suggestion[lang] || activeDisruption.alternative_suggestion.id}
          </div>

          {activeItinerary && (
            <PillButton
              variant="accent"
              size="md"
              icon={<RefreshCw size={14} />}
              onClick={handleReplanDisruption}
              className="w-full font-bold justify-center mt-1"
            >
              {t('care.replan', lang)}
            </PillButton>
          )}
        </SurfaceCard>
      )}

      {/* 24-Hour Emergency Directory (S-22 Kartu Darurat) */}
      <div className="flex flex-col gap-2.5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
          {t('care.emergency', lang)}
        </h2>

        {EMERGENCY_CONTACTS.map((contact) => (
          <SurfaceCard key={contact.id} rounded="card" level={1} className="p-3.5 flex items-center justify-between border border-[var(--border)]">
            <div className="pr-2">
              <h4 className="font-bold text-xs text-[var(--fg)]">{contact.name}</h4>
              <div className="text-[11px] text-[var(--primary)] font-mono font-bold mt-0.5">{contact.phone}</div>
              <div className="text-[10px] text-[var(--muted)] mt-0.5">{contact.notes}</div>
            </div>

            <a
              href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`}
              className="w-10 h-10 rounded-full bg-[var(--surface-2)] text-[var(--primary)] border border-[var(--border)] flex items-center justify-center shrink-0 active:scale-95"
              aria-label={`Telepon ${contact.name}`}
            >
              <Phone size={16} />
            </a>
          </SurfaceCard>
        ))}
      </div>

      {/* Support Ticket Form & Outbox (S-23 & S-24) */}
      <SurfaceCard rounded="card" level={1} className="p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[var(--fg)]">
          <MessageSquare size={16} className="text-[var(--primary)]" />
          <span>{t('care.problem', lang)}</span>
        </div>

        <form onSubmit={handleSendTicket} className="flex flex-col gap-2.5">
          <PillInput
            placeholder={t('care.subject_placeholder', lang)}
            value={ticketSubject}
            onChange={(e) => setTicketSubject(e.target.value)}
          />

          <textarea
            rows={3}
            placeholder={t('care.message_placeholder', lang)}
            value={ticketMsg}
            onChange={(e) => setTicketMsg(e.target.value)}
            className="w-full p-3 rounded-[var(--r-card)] border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--fg)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--primary)]"
          />

          <div className="text-[10px] text-[var(--muted)] italic">
            {t('care.pin_warning', lang)}
          </div>

          <PillButton
            type="submit"
            variant="primary"
            size="md"
            icon={<Send size={14} />}
            disabled={ticketSent}
            className="w-full justify-center mt-1"
          >
            {ticketSent ? t('care.sending', lang) : t('care.send', lang)}
          </PillButton>
        </form>
      </SurfaceCard>
    </div>
  );
};

