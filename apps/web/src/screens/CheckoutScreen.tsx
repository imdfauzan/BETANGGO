import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PillButton } from '../components/ui/PillButton';
import { PillInput } from '../components/ui/PillInput';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { PriceText } from '../components/ui/PriceText';
import { SegmentedPill } from '../components/ui/SegmentedPill';
import { Clock, ShieldCheck, QrCode, CreditCard, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import QRCode from 'qrcode';
import { t } from '../i18n';

export interface CheckoutScreenProps {
  onBackToEditor: () => void;
  onViewTrips: () => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  onBackToEditor,
  onViewTrips
}) => {
  const { lang, activeItinerary, createOrder, showToast } = useApp();

  const [step, setStep] = useState<'review' | 'payment' | 'success'>('review');
  const [name, setName] = useState('Imam F.');
  const [email, setEmail] = useState('imamf@betanggo.id');
  const [agreed, setAgreed] = useState(true);
  const [paymentRail, setPaymentRail] = useState<'qris' | 'card'>('qris');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [timeLeftSec, setTimeLeftSec] = useState(15 * 60);

  // Price lock countdown
  useEffect(() => {
    if (step === 'success') return;
    const interval = setInterval(() => {
      setTimeLeftSec(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  // Generate QR code image when entering payment step
  useEffect(() => {
    if (step === 'payment') {
      const qrisPayload = `00020101021226600016ID.CO.BETANGGO.WWW01189360099990001234565204581253033605408${activeItinerary?.total_cost_idr || 100000}5802ID5914BETANGGO KALTIM6012PALANGKARAYA6304`;
      QRCode.toDataURL(qrisPayload, {
        width: 240,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      }).then(url => {
        setQrCodeDataUrl(url);
      });
    }
  }, [step, activeItinerary]);

  if (!activeItinerary) {
    return (
      <div className="p-8 text-center text-xs text-[var(--muted)]">
        Tidak ada rencana yang siap di-checkout.
      </div>
    );
  }

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSimulatePayment = () => {
    createOrder(activeItinerary, name, email, paymentRail);
    setStep('success');

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
    showToast(t('pay.result.success', lang));
  };

  return (
    <div className="flex flex-col gap-4 px-4 pt-3 pb-8">
      {/* Top back navigation */}
      {step !== 'success' && (
        <button
          type="button"
          onClick={step === 'payment' ? () => setStep('review') : onBackToEditor}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)] hover:text-[var(--fg)] w-fit"
        >
          <ArrowLeft size={16} />
          <span>{step === 'payment' ? 'Kembali ke Rincian' : 'Kembali ke Editor'}</span>
        </button>
      )}

      {/* STEP 1: REVIEW ORDER (S-14) */}
      {step === 'review' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold font-display text-[var(--fg)]">
              {t('checkout.title', lang)}
            </h1>
            <div className="flex items-center gap-1 text-xs font-bold text-[var(--warning)] bg-[var(--surface-2)] px-2.5 py-1 rounded-[var(--r-pill)] border border-[var(--border)]">
              <Clock size={13} />
              <span>{formatCountdown(timeLeftSec)}</span>
            </div>
          </div>

          {/* Price Lock Banner */}
          <div className="py-2 px-3 rounded-[var(--r-card)] bg-[var(--surface-2)] text-[11px] text-[var(--muted)] flex items-center gap-2 border border-[var(--border)]">
            <ShieldCheck size={16} className="text-[var(--success)] shrink-0" />
            <span>{t('checkout.price_lock', lang)}</span>
          </div>

          {/* Itemized Breakdown */}
          <SurfaceCard rounded="card" level={1} className="p-3.5">
            <h3 className="text-xs font-bold uppercase text-[var(--muted)] mb-3">
              Item yang Dipesan
            </h3>

            <div className="flex flex-col gap-2.5 divide-y divide-[var(--border)]">
              {activeItinerary.days.map((day) =>
                day.items
                  .filter(it => it.cost_idr > 0)
                  .map((item) => (
                    <div key={item.id} className="pt-2 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-[var(--fg)]">{item.name[lang] || item.name.id}</div>
                        <div className="text-[10px] text-[var(--muted)]">{day.date_label[lang] || day.date_label.id} · {item.time_start} WIB</div>
                      </div>
                      <PriceText amountIdr={item.cost_idr} lang={lang} size="sm" />
                    </div>
                  ))
              )}
            </div>

            <div className="mt-4 pt-3 border-t-2 border-[var(--border)] flex items-center justify-between font-bold text-sm">
              <span>Total Pembayaran</span>
              <PriceText amountIdr={activeItinerary.total_cost_idr} lang={lang} size="md" className="text-[var(--primary)]" />
            </div>
          </SurfaceCard>

          {/* Contact Details Form */}
          <SurfaceCard rounded="card" level={1} className="p-3.5 flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase text-[var(--muted)]">
              {t('checkout.contact', lang)}
            </h3>

            <div>
              <label className="text-xs font-semibold text-[var(--fg)] mb-1 block">
                {t('checkout.name', lang)}
              </label>
              <PillInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Anda"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[var(--fg)] mb-1 block">
                {t('checkout.email', lang)}
              </label>
              <PillInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
              />
            </div>
          </SurfaceCard>

          {/* Agree Policy */}
          <label className="flex items-center gap-2 text-xs text-[var(--muted)] px-1 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="accent-[var(--primary)] w-4 h-4 rounded"
            />
            <span>{t('checkout.agree', lang)}</span>
          </label>

          <PillButton
            variant="accent"
            size="lg"
            disabled={!agreed}
            onClick={() => setStep('payment')}
            className="w-full font-bold justify-center"
          >
            Lanjut ke Pembayaran
          </PillButton>
        </div>
      )}

      {/* STEP 2: DUAL-RAIL PAYMENT GATEWAY (S-15) */}
      {step === 'payment' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold font-display text-[var(--fg)]">
              Pembayaran Terpadu
            </h1>
            <PriceText amountIdr={activeItinerary.total_cost_idr} lang={lang} size="md" className="text-[var(--primary)]" />
          </div>

          {/* MANDATORY PRD SIMULATION NOTICE */}
          <div className="p-3 rounded-[var(--r-card)] bg-[var(--surface-2)] border-2 border-[var(--warning)] text-center">
            <div className="text-xs font-bold text-[var(--warning)] flex items-center justify-center gap-1.5 mb-0.5">
              <ShieldCheck size={16} />
              <span>{t('pay.sim_notice', lang)}</span>
            </div>
            <div className="text-[11px] text-[var(--muted)]">
              {t('pay.security', lang)}
            </div>
          </div>

          {/* Payment Method Switcher Tabs */}
          <SegmentedPill<'qris' | 'card'>
            value={paymentRail}
            onChange={(val) => setPaymentRail(val)}
            options={[
              { value: 'qris', label: t('pay.tab.qris', lang), icon: <QrCode size={14} /> },
              { value: 'card', label: t('pay.tab.card', lang), icon: <CreditCard size={14} /> }
            ]}
          />

          {paymentRail === 'qris' ? (
            <SurfaceCard rounded="card" level={1} className="p-4 flex flex-col items-center text-center">
              <p className="text-xs text-[var(--muted)] mb-3">
                {t('pay.qris.instructions', lang)}
              </p>

              {/* High Contrast QR Code Display */}
              <div className="p-3 bg-white rounded-2xl border border-stone-200 shadow-md mb-3">
                {qrCodeDataUrl ? (
                  <img src={qrCodeDataUrl} alt="Kode QRIS Pembayaran" className="w-52 h-52 object-contain" />
                ) : (
                  <div className="w-52 h-52 bg-stone-100 flex items-center justify-center text-xs text-stone-500">
                    Membuat QR...
                  </div>
                )}
              </div>

              <div className="text-[11px] text-[var(--muted)] font-mono">
                {t('pay.expires_at', lang)}: <span className="font-bold text-[var(--fg)]">{formatCountdown(timeLeftSec)}</span>
              </div>
            </SurfaceCard>
          ) : (
            <SurfaceCard rounded="card" level={1} className="p-4 flex flex-col gap-3">
              <div className="text-xs text-[var(--muted)]">
                Pembayaran kartu internasional (Visa, Mastercard, JCB).
              </div>
              <PillInput placeholder="4000 1234 5678 9010" />
              <div className="grid grid-cols-2 gap-2">
                <PillInput placeholder="MM / YY" />
                <PillInput placeholder="CVV" />
              </div>
            </SurfaceCard>
          )}

          {/* Simulation Action Button */}
          <PillButton
            variant="accent"
            size="lg"
            onClick={handleSimulatePayment}
            className="w-full font-bold justify-center"
          >
            {t('pay.qris.simulate_success', lang)}
          </PillButton>
        </div>
      )}

      {/* STEP 3: SUCCESS & TICKET ISSUANCE (S-16) */}
      {step === 'success' && (
        <div className="flex flex-col items-center text-center py-8 gap-4 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-[var(--success)]/20 text-[var(--success)] flex items-center justify-center">
            <CheckCircle2 size={36} />
          </div>

          <div>
            <h2 className="text-xl font-bold font-display text-[var(--fg)] mb-1">
              {t('pay.result.success', lang)}
            </h2>
            <p className="text-xs text-[var(--muted)] max-w-xs">
              {t('pay.result.voucher_ready', lang)}
            </p>
          </div>

          <SurfaceCard rounded="card" level={2} className="w-full p-4 text-left text-xs">
            <div className="flex justify-between py-1 border-b border-[var(--border)]">
              <span className="text-[var(--muted)]">Pemesan</span>
              <span className="font-bold text-[var(--fg)]">{name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[var(--border)]">
              <span className="text-[var(--muted)]">Metode</span>
              <span className="font-bold uppercase text-[var(--fg)]">{paymentRail}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[var(--muted)]">Status</span>
              <span className="font-bold text-[var(--success)]">Lunas & Terbit</span>
            </div>
          </SurfaceCard>

          <PillButton
            variant="primary"
            size="lg"
            icon={<ArrowRight size={16} />}
            onClick={onViewTrips}
            className="w-full font-bold justify-center mt-2"
          >
            Buka Dompet Trip & E-Voucher
          </PillButton>
        </div>
      )}
    </div>
  );
};
