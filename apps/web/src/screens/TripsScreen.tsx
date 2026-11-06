import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { PriceText } from '../components/ui/PriceText';
import { StatusText } from '../components/ui/StatusText';
import { PillButton } from '../components/ui/PillButton';
import { SegmentedPill } from '../components/ui/SegmentedPill';
import { BottomSheet } from '../components/ui/BottomSheet';
import { Voucher } from '@betanggo/shared';
import { QrCode, FileText, CheckCircle, WifiOff, ArrowRight } from 'lucide-react';
import QRCode from 'qrcode';
import { t } from '../i18n';

export const TripsScreen: React.FC = () => {
  const { lang, orders, setActiveTab } = useApp();
  const [activeTabSub, setActiveTabSub] = useState<'active' | 'upcoming' | 'history'>('active');

  // Selected voucher for full view
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [voucherQrDataUrl, setVoucherQrDataUrl] = useState<string>('');

  // Selected order for invoice view
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<typeof orders[0] | null>(null);

  const handleOpenVoucher = (vch: Voucher) => {
    setSelectedVoucher(vch);
    QRCode.toDataURL(vch.qr_payload, {
      width: 260,
      margin: 2,
      color: { dark: '#000000', light: '#FFFFFF' }
    }).then(url => setVoucherQrDataUrl(url));
  };

  const currentOrder = orders[0];

  return (
    <div className="flex-1 flex flex-col gap-4 px-4 pt-3 pb-8 bg-[var(--bg)] min-h-full">
      {/* Header */}
      <div>
        <h1 className="text-lg font-bold font-display text-[var(--fg)]">
          {t('trip.title', lang)}
        </h1>
        <p className="text-xs text-[var(--muted)]">
          {t('trip.offline_sub', lang)}
        </p>
      </div>

      {/* Tabs */}
      <SegmentedPill<'active' | 'upcoming' | 'history'>
        value={activeTabSub}
        onChange={(v) => setActiveTabSub(v)}
        options={[
          { value: 'active', label: t('trip.tab.active', lang) },
          { value: 'upcoming', label: t('trip.tab.upcoming', lang) },
          { value: 'history', label: t('trip.tab.history', lang) }
        ]}
      />

      {/* Empty State */}
      {!currentOrder || orders.length === 0 ? (
        <div className="py-16 text-center flex flex-col items-center bg-[var(--bg)]">
          <div className="w-14 h-14 rounded-full bg-[var(--surface-2)] text-[var(--muted)] flex items-center justify-center mb-3 border border-[var(--border)]">
            <QrCode size={26} />
          </div>
          <h3 className="font-bold text-sm text-[var(--fg)] mb-1">
            {t('trip.empty', lang)}
          </h3>
          <p className="text-xs text-[var(--muted)] max-w-xs mb-5">
            {t('trip.empty_sub', lang)}
          </p>
          <PillButton
            variant="primary"
            size="md"
            icon={<ArrowRight size={16} />}
            onClick={() => setActiveTab('ai')}
          >
            {t('trip.open_ai', lang)}
          </PillButton>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Active Trip Summary Card */}
          <SurfaceCard rounded="card" level={1} className="border border-[var(--border)] p-4 shadow-sm">
            <div className="flex items-center justify-between mb-1.5">
              <StatusText status="confirmed" label={t('trip.voucher.confirmed', lang)} />
              <span className="text-[11px] font-mono font-bold text-[var(--muted)]">{currentOrder.id}</span>
            </div>

            <h3 className="font-bold text-sm text-[var(--fg)] mb-1">
              {currentOrder.itinerary.title[lang] || currentOrder.itinerary.title.id}
            </h3>

            <div className="flex items-center justify-between text-xs text-[var(--muted)] mt-2 pt-2 border-t border-[var(--border)]">
              <span>{currentOrder.vouchers.length} {t('trip.vouchers_issued', lang)}</span>
              <button
                type="button"
                onClick={() => setSelectedInvoiceOrder(currentOrder)}
                className="text-xs font-bold text-[var(--primary)] flex items-center gap-1 hover:underline"
              >
                <FileText size={13} />
                <span>{t('trip.invoice.view', lang)}</span>
              </button>
            </div>
          </SurfaceCard>

          {/* Dompet Trip (Trip Wallet) Vouchers List (S-19) */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-bold text-[var(--fg)]">
              <span>{t('trip.wallet.title', lang)}</span>
              <span className="text-[var(--muted)] font-normal flex items-center gap-1">
                <WifiOff size={12} className="text-[var(--success)]" /> Offline ready
              </span>
            </div>

            {currentOrder.vouchers.map((vch) => (
              <SurfaceCard
                key={vch.id}
                rounded="card"
                interactive
                onClick={() => handleOpenVoucher(vch)}
                className="p-3.5 flex items-center justify-between border border-[var(--border)]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--surface-2)] text-[var(--primary)] flex items-center justify-center border border-[var(--border)] shrink-0">
                    <QrCode size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[var(--fg)] line-clamp-1">
                      {vch.item_name[lang] || vch.item_name.id}
                    </h4>
                    <div className="text-[11px] text-[var(--muted)] font-mono">
                      {vch.booking_code} · {vch.date_wib}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <PriceText amountIdr={vch.amount_idr} lang={lang} size="sm" />
                  <div className="text-[10px] text-[var(--success)] font-bold">Buka QR →</div>
                </div>
              </SurfaceCard>
            ))}
          </div>
        </div>
      )}

      {/* Offline Voucher Detail Bottom Sheet (S-19) */}
      <BottomSheet
        isOpen={Boolean(selectedVoucher)}
        onClose={() => setSelectedVoucher(null)}
        title="E-Voucher Tiket Digital"
      >
        {selectedVoucher && (
          <div className="flex flex-col items-center text-center py-2 gap-3">
            <div className="text-xs text-[var(--muted)]">
              Tunjukkan QR ini untuk di Scan petugas.
            </div>

            {/* QR Code Container */}
            <div className="p-4 bg-white rounded-3xl border border-stone-200 shadow-md">
              {voucherQrDataUrl ? (
                <img src={voucherQrDataUrl} alt="Voucher QR Code" className="w-56 h-56 object-contain" />
              ) : (
                <div className="w-56 h-56 bg-stone-100 flex items-center justify-center text-xs">
                  Memuat QR...
                </div>
              )}
            </div>

            <div className="w-full text-left py-2 px-3 rounded-[var(--r-card)] bg-[var(--surface-2)] text-xs flex flex-col gap-1.5 border border-[var(--border)]">
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Kode Booking</span>
                <span className="font-mono font-bold text-[var(--fg)]">{selectedVoucher.booking_code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Item</span>
                <span className="font-bold text-[var(--fg)]">{selectedVoucher.item_name[lang] || selectedVoucher.item_name.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Tanda Tangan Kripto</span>
                <span className="font-mono text-[10px] text-[var(--muted)]">{selectedVoucher.signature}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-[var(--border)]">
                <span className="text-[var(--muted)]">Status Verifikasi</span>
                <span className="font-bold text-[var(--success)] flex items-center gap-1">
                  <CheckCircle size={13} /> Terverifikasi Ed25519
                </span>
              </div>
            </div>
          </div>
        )}
      </BottomSheet>

      {/* Digital Invoice Bottom Sheet (S-20) */}
      <BottomSheet
        isOpen={Boolean(selectedInvoiceOrder)}
        onClose={() => setSelectedInvoiceOrder(null)}
        title="Invoice Pembayaran Resmi"
      >
        {selectedInvoiceOrder && (
          <div className="flex flex-col gap-3 py-2 text-xs">
            <div className="p-3 rounded-[var(--r-card)] bg-[var(--surface-2)] border border-[var(--border)] flex justify-between items-center">
              <div>
                <div className="font-bold text-[var(--fg)]">Betang<span className="text-orange-500">GO</span> Invoice</div>
                <div className="text-[11px] text-[var(--muted)]">{selectedInvoiceOrder.id}</div>
              </div>
              <span className="px-2 py-0.5 rounded-[var(--r-pill)] bg-[var(--success)]/20 text-[var(--success)] font-bold text-[10px]">
                LUNAS
              </span>
            </div>

            <div className="divide-y divide-[var(--border)]">
              {selectedInvoiceOrder.vouchers.map((v) => (
                <div key={v.id} className="py-2 flex justify-between">
                  <span>{v.item_name[lang] || v.item_name.id}</span>
                  <PriceText amountIdr={v.amount_idr} lang={lang} size="sm" />
                </div>
              ))}
            </div>

            <div className="pt-2 border-t-2 border-[var(--border)] flex justify-between font-bold text-sm">
              <span>Total Bersih</span>
              <PriceText amountIdr={selectedInvoiceOrder.total_idr} lang={lang} size="md" className="text-[var(--primary)]" />
            </div>

            <div className="mt-3">
              <PillButton
                variant="primary"
                size="md"
                onClick={() => {
                  window.print();
                }}
                className="w-full justify-center"
              >
                {t('trip.invoice.download', lang)}
              </PillButton>
            </div>
          </div>
        )}
      </BottomSheet>
    </div>
  );
};

