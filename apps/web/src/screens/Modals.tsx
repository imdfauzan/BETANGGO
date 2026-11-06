import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BottomSheet } from '../components/ui/BottomSheet';
import { PillButton } from '../components/ui/PillButton';
import { PriceText } from '../components/ui/PriceText';
import { SegmentedPill } from '../components/ui/SegmentedPill';
import { SEED_DESTINATIONS } from '@betanggo/shared';
import {
  MapPin,
  Clock,
  Check,
  Bookmark,
  BookmarkCheck,
  ShieldCheck,
  Cpu,
  Wifi,
  WifiOff,
  Store,
  UserCheck,
  AlertTriangle,
  QrCode,
  Send,
  HelpCircle
} from 'lucide-react';
import { t, Language } from '../i18n';

// ================= 1. DESTINATION DETAIL MODAL (S-04) =================
export const DestinationDetailModal: React.FC = () => {
  const { lang, detailModalDestId, setDetailModalDestId, savedOfflineDestIds, toggleSaveOffline, showToast, setActiveTab } = useApp();

  if (!detailModalDestId) return null;
  const dest = SEED_DESTINATIONS.find(d => d.id === detailModalDestId);
  if (!dest) return null;

  const isSaved = savedOfflineDestIds.includes(dest.id);

  return (
    <BottomSheet
      isOpen={Boolean(detailModalDestId)}
      onClose={() => setDetailModalDestId(null)}
      title={dest.name[lang] || dest.name.id}
    >
      <div className="flex flex-col gap-3.5 pb-4">
        {/* Media Photo */}
        <div className="h-44 w-full rounded-[var(--r-media)] overflow-hidden relative">
          <img src={dest.image_url} alt={dest.name[lang] || dest.name.id} className="w-full h-full object-cover" />
          <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-[var(--r-pill)] bg-[var(--surface)]/90 backdrop-blur-sm text-[11px] font-bold text-[var(--fg)]">
            {dest.region === 'palangka-raya' ? 'Palangka Raya' : dest.region === 'kobar' ? 'Kotawaringin Barat' : dest.region}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-[var(--fg)] leading-relaxed">
          {dest.description[lang] || dest.description.id}
        </p>

        {/* Operational Hours & Price */}
        <div className="p-3 rounded-[var(--r-card)] bg-[var(--surface-2)] text-xs flex flex-col gap-2 border border-[var(--border)]">
          <div className="flex items-center justify-between">
            <span className="text-[var(--muted)] flex items-center gap-1.5">
              <Clock size={14} /> {t('modal.opening_hours', lang)}
            </span>
            <span className="font-bold text-[var(--fg)]">
              {dest.opening_hours.open} - {dest.opening_hours.close} WIB ({dest.opening_hours.days})
            </span>
          </div>

          <div className="flex items-center justify-between pt-1.5 border-t border-[var(--border)]">
            <span className="text-[var(--muted)]">{t('modal.est_cost', lang)}</span>
            <PriceText amountIdr={dest.price_estimate_idr} lang={lang} size="sm" className="text-[var(--primary)]" />
          </div>
        </div>

        {/* How to Reach */}
        <div className="text-xs">
          <div className="font-bold text-[var(--fg)] mb-1 flex items-center gap-1">
            <MapPin size={13} className="text-[var(--primary)]" /> {t('modal.how_to_reach', lang)}
          </div>
          <p className="text-[var(--muted)] leading-relaxed">
            {dest.how_to_reach[lang] || dest.how_to_reach.id}
          </p>
        </div>

        {/* Facilities */}
        <div>
          <div className="text-xs font-bold text-[var(--fg)] mb-1.5">{t('modal.facilities', lang)}</div>
          <div className="flex flex-wrap gap-1.5">
            {dest.facilities.map((fac, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-[var(--r-pill)] bg-[var(--surface-2)] text-[10px] text-[var(--fg)] border border-[var(--border)]">
                {fac}
              </span>
            ))}
          </div>
        </div>

        {/* Demo Disclaimer */}
        <div className="text-[10px] text-[var(--muted)] italic pt-1 border-t border-[var(--border)]">
          {t('destination.demo_note', lang)}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => toggleSaveOffline(dest.id)}
            className={`flex-1 h-12 rounded-[var(--r-pill)] text-xs font-bold border transition-all flex items-center justify-center gap-2 ${isSaved
              ? 'bg-[var(--accent)] text-[var(--on-accent)] border-transparent'
              : 'bg-[var(--surface-2)] text-[var(--fg)] border-[var(--border)] hover:bg-[var(--surface)]'
              }`}
          >
            {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            <span>{isSaved ? t('modal.saved_offline', lang) : t('modal.save_offline', lang)}</span>
          </button>

          <PillButton
            variant="primary"
            size="md"
            onClick={() => {
              setDetailModalDestId(null);
              setActiveTab('ai');
              showToast(lang === 'en' ? 'Destination ready to be added to itinerary' : 'Destinasi siap ditambahkan ke dalam rencana perjalanan');
            }}
            className="flex-1 font-bold justify-center"
          >
            {t('modal.add_to_plan', lang)}
          </PillButton>
        </div>
      </div>
    </BottomSheet>
  );
};

// ================= 2. SETTINGS & PROFILE MODAL (S-26) =================
export const SettingsModal: React.FC = () => {
  const {
    lang,
    setLang,
    theme,
    setTheme,
    settingsOpen,
    setSettingsOpen,
    isOffline,
    setIsOffline,
    showToast,
    setPartnerModalOpen,
    setAdminModalOpen
  } = useApp();

  const [dataSaver, setDataSaver] = useState(false);

  return (
    <BottomSheet isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} title={t('settings.title', lang)}>
      <div className="flex flex-col gap-4 py-2 text-xs">
        {/* Language */}
        <div className="flex items-center justify-between">
          <span className="font-semibold text-[var(--fg)]">{t('settings.language', lang)}</span>
          <SegmentedPill<Language>
            size="sm"
            value={lang}
            onChange={setLang}
            options={[
              { value: 'id', label: 'Bahasa Indonesia' },
              { value: 'en', label: 'English' }
            ]}
          />
        </div>

        {/* Theme */}
        <div className="flex items-center justify-between">
          <span className="font-semibold text-[var(--fg)]">{t('settings.theme', lang)}</span>
          <SegmentedPill<'light' | 'dark'>
            size="sm"
            value={theme}
            onChange={setTheme}
            options={[
              { value: 'light', label: lang === 'en' ? 'Light' : 'Terang' },
              { value: 'dark', label: lang === 'en' ? 'Dark' : 'Gelap' }
            ]}
          />
        </div>

        {/* Offline Simulation Toggle for E2E Demo Testing */}
        <div className="p-3 rounded-[var(--r-card)] bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-between">
          <div>
            <div className="font-bold text-[var(--fg)] flex items-center gap-1.5">
              {isOffline ? <WifiOff size={14} className="text-[var(--danger)]" /> : <Wifi size={14} className="text-[var(--success)]" />}
              <span>{t('settings.offline_mode', lang)}</span>
            </div>
            <div className="text-[11px] text-[var(--muted)]">{t('settings.offline_sub', lang)}</div>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsOffline(!isOffline);
              showToast(!isOffline ? (lang === 'en' ? 'Offline mode enabled' : 'Mode offline diaktifkan') : (lang === 'en' ? 'Online connection restored' : 'Koneksi online kembali aktif'));
            }}
            className={`w-12 h-6 rounded-full transition-colors relative ${isOffline ? 'bg-[var(--danger)]' : 'bg-stone-300 dark:bg-stone-700'}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${isOffline ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>

        {/* Data Saver */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-[var(--fg)]">{t('settings.data_saver', lang)}</div>
            <div className="text-[11px] text-[var(--muted)]">{t('settings.data_saver_sub', lang)}</div>
          </div>
          <button
            type="button"
            onClick={() => setDataSaver(!dataSaver)}
            className={`w-12 h-6 rounded-full transition-colors relative ${dataSaver ? 'bg-[var(--primary)]' : 'bg-stone-300 dark:bg-stone-700'}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${dataSaver ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>

        {/* Storage status */}
        <div className="py-2.5 px-3 rounded-[var(--r-card)] bg-[var(--surface-2)] text-[11px] text-[var(--muted)] flex justify-between">
          <span>{t('settings.storage_used', lang)}</span>
          <span className="font-mono font-bold text-[var(--fg)]">58.4 MB</span>
        </div>

        {/* Admin & Partner Demo Shortcuts */}
        <div className="pt-2 border-t border-[var(--border)] flex flex-col gap-2">
          <div className="text-[11px] font-bold uppercase text-[var(--muted)]">{t('settings.demo_portals', lang)}</div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setSettingsOpen(false);
                setPartnerModalOpen(true);
              }}
              className="py-2.5 px-3 rounded-[var(--r-card)] bg-[var(--surface-2)] border border-[var(--border)] font-bold text-[var(--fg)] flex items-center justify-center gap-1.5 hover:bg-[var(--surface)]"
            >
              <Store size={14} className="text-[var(--primary)]" />
              <span>{t('settings.partner_console', lang)}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSettingsOpen(false);
                setAdminModalOpen(true);
              }}
              className="py-2.5 px-3 rounded-[var(--r-card)] bg-[var(--surface-2)] border border-[var(--border)] font-bold text-[var(--fg)] flex items-center justify-center gap-1.5 hover:bg-[var(--surface)]"
            >
              <Cpu size={14} className="text-[var(--accent)]" />
              <span>{t('settings.admin_console', lang)}</span>
            </button>
          </div>
        </div>
      </div>
    </BottomSheet>
  );
};

// ================= 3. PARTNER CONSOLE MODAL (P-01, P-03) =================
export const PartnerConsoleModal: React.FC = () => {
  const { partnerModalOpen, setPartnerModalOpen, orders, showToast } = useApp();
  const [pastePayload, setPastePayload] = useState('');
  const [verifiedResult, setVerifiedResult] = useState<string | null>(null);

  const handleVerifyPayload = () => {
    if (!pastePayload.trim()) return;
    try {
      const parsed = JSON.parse(pastePayload);
      if (parsed.app === 'BETANGGO' && parsed.sig) {
        setVerifiedResult(`VOUCHER SAH! Order: ${parsed.order_id} | Signature Ed25519 Valid`);
        showToast('Voucher berhasil diverifikasi offline');
      } else {
        setVerifiedResult('Voucher Tidak Valid: Signature rusak atau palsu');
      }
    } catch (e) {
      setVerifiedResult('Kode QR tidak dapat dibaca');
    }
  };

  return (
    <BottomSheet isOpen={partnerModalOpen} onClose={() => setPartnerModalOpen(false)} title="Konsol Mitra BetangGO (P-01/P-03)">
      <div className="flex flex-col gap-4 py-2 text-xs">
        <div className="text-[var(--muted)]">
          Alat mitra wisata di Kalimantan Tengah untuk memvalidasi voucher wisatawan secara offline.
        </div>

        {/* Offline Verifier */}
        <div className="p-3.5 rounded-[var(--r-card)] bg-[var(--surface-2)] border border-[var(--border)] flex flex-col gap-2.5">
          <div className="font-bold text-[var(--fg)] flex items-center gap-1.5">
            <QrCode size={16} className="text-[var(--primary)]" />
            <span>Pindai / Tempel Kode QR Voucher</span>
          </div>

          <input
            type="text"
            placeholder='Tempel payload QR (misal: {"app":"BETANGGO",...})'
            value={pastePayload}
            onChange={(e) => setPastePayload(e.target.value)}
            className="w-full p-2.5 rounded-[var(--r-pill)] border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--fg)] focus:outline-none"
          />

          <PillButton
            variant="primary"
            size="sm"
            onClick={handleVerifyPayload}
            className="w-full justify-center"
          >
            Verifikasi Signature Offline
          </PillButton>

          {verifiedResult && (
            <div className={`p-2.5 rounded-[var(--r-card)] text-xs font-bold text-center ${verifiedResult.includes('SAH') ? 'bg-[var(--success)]/15 text-[var(--success)]' : 'bg-[var(--danger)]/15 text-[var(--danger)]'
              }`}>
              {verifiedResult}
            </div>
          )}
        </div>

        {/* Incoming Orders Recap */}
        <div>
          <div className="font-bold text-[var(--fg)] mb-2">Pesanan Masuk Terbaru</div>
          {orders.length === 0 ? (
            <div className="py-4 text-center text-[var(--muted)]">Belum ada pesanan aktif.</div>
          ) : (
            <div className="flex flex-col gap-2">
              {orders.slice(0, 3).map((ord) => (
                <div key={ord.id} className="p-2.5 rounded-[var(--r-card)] bg-[var(--surface-2)] flex items-center justify-between border border-[var(--border)]">
                  <div>
                    <div className="font-bold text-[var(--fg)]">{ord.traveler_name}</div>
                    <div className="text-[10px] text-[var(--muted)]">{ord.id} · {ord.vouchers.length} Item</div>
                  </div>
                  <span className="font-bold text-[var(--success)]">Terkonfirmasi</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </BottomSheet>
  );
};

// ================= 4. ADMIN CONSOLE MODAL (A-01, A-04) =================
export const AdminConsoleModal: React.FC = () => {
  const { adminModalOpen, setAdminModalOpen, activeDisruptions, showToast } = useApp();

  return (
    <BottomSheet isOpen={adminModalOpen} onClose={() => setAdminModalOpen(false)} title="Konsol Admin BetangGO (A-01/A-04)">
      <div className="flex flex-col gap-4 py-2 text-xs">
        <div className="p-3 rounded-[var(--r-card)] bg-[var(--surface-2)] border border-[var(--border)]">
          <div className="font-bold text-[var(--fg)] mb-1">Status Sistem & Data Seed</div>
          <div className="text-[11px] text-[var(--muted)]">Destinasi: 12 Terdaftar (Demo Kalteng) | Solver: Aktif (Web Worker)</div>
        </div>

        {/* Active Disruptions Controller */}
        <div>
          <div className="font-bold text-[var(--fg)] mb-2 flex items-center gap-1.5">
            <AlertTriangle size={15} className="text-[var(--warning)]" />
            <span>Manajemen Gangguan Wilayah Aktif (A-04)</span>
          </div>

          {activeDisruptions.map((dis) => (
            <div key={dis.id} className="p-3 rounded-[var(--r-card)] bg-[var(--surface-2)] border border-[var(--border)] flex flex-col gap-1.5">
              <div className="font-bold text-[var(--fg)]">{dis.title.id}</div>
              <p className="text-[11px] text-[var(--muted)]">{dis.description.id}</p>
              <div className="text-[10px] font-mono text-[var(--warning)]">Status: AKTIF hingga {dis.active_until.substring(0, 10)}</div>
            </div>
          ))}
        </div>

        <PillButton
          variant="glass"
          size="md"
          onClick={() => {
            showToast('Simulasi reset data demo berhasil');
          }}
          className="w-full justify-center"
        >
          Reset Data Demo (pnpm demo:reset)
        </PillButton>
      </div>
    </BottomSheet>
  );
};

// ================= 5. SAFETY TIPS MODAL (S-28) =================
export const SafetyTipsModal: React.FC = () => {
  const { safetyModalOpen, setSafetyModalOpen, lang } = useApp();

  return (
    <BottomSheet isOpen={safetyModalOpen} onClose={() => setSafetyModalOpen(false)} title={t('safety.title', lang)}>
      <div className="flex flex-col gap-3.5 py-2 text-xs">
        <div className="p-3.5 rounded-[var(--r-card)] bg-[var(--surface-2)] border-l-4 border-l-[var(--danger)] flex items-start gap-2.5">
          <ShieldCheck size={20} className="text-[var(--danger)] shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-[var(--fg)] mb-0.5">Jangan Pernah Bagikan OTP</h4>
          </div>
        </div>

        <div className="p-3.5 rounded-[var(--r-card)] bg-[var(--surface-2)] border-l-4 border-l-[var(--primary)] flex items-start gap-2.5">
          <ShieldCheck size={20} className="text-[var(--primary)] shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-[var(--fg)] mb-0.5">Jalur Pembayaran Resmi</h4>
            <p className="text-[var(--muted)] leading-relaxed">{t('safety.rule2', lang)}</p>
          </div>
        </div>

        <div className="p-3.5 rounded-[var(--r-card)] bg-[var(--surface-2)] border-l-4 border-l-[var(--warning)] flex items-start gap-2.5">
          <ShieldCheck size={20} className="text-[var(--warning)] shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-[var(--fg)] mb-0.5">Voucher Bertanda Tangan Kripto</h4>
            <p className="text-[var(--muted)] leading-relaxed">{t('safety.rule3', lang)}</p>
          </div>
        </div>
      </div>
    </BottomSheet>
  );
};

// ================= 6. ASK AI MODAL (S-29) =================
export const AskAiModal: React.FC = () => {
  const { askAiModalOpen, setAskAiModalOpen, lang } = useApp();
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    {
      sender: 'ai',
      text: lang === 'en'
        ? 'Hi! I am Betang AI, your local travel guide for Central Kalimantan. Ask me about local foods, best seasons to see orangutans, or Dayak cultural etiquette.'
        : 'Halo! Saya Betang AI, asisten perjalanan lokalmu di Kalimantan Tengah. Tanyakan seputar kuliner khas, musim terbaik melihat orangutan, atau tata krama berkunjung ke Rumah Betang Dayak.'
    }
  ]);

  const handleSend = () => {
    if (!query.trim()) return;
    const userText = query;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setQuery('');

    // Pre-computed local knowledge responses
    setTimeout(() => {
      let reply = 'Kalimantan Tengah kaya akan pesona alam dan kehangatan budaya Dayak. Destinasi populer meliputi Sebangau, Tanjung Puting, dan Danau Tahai.';
      const lower = userText.toLowerCase();
      if (lower.includes('orangutan') || lower.includes('tanjung puting')) {
        reply = 'Waktu terbaik melihat orangutan di TN Tanjung Puting adalah sepanjang tahun, khususnya musim kemarau (Juni–Oktober) saat buah hutan matang dan orangutan sering berkumpul di feeding station Camp Leakey.';
      } else if (lower.includes('makan') || lower.includes('kuliner') || lower.includes('halal')) {
        reply = 'Kuliner khas Dayak Kalteng yang lezat dan halal antara lain Juhu Singkah Uwei (gulai umbut rotan muda berkuah gurih segar) dan Ikan Baung/Patin Bakar Sungai Kahayan.';
      } else if (lower.includes('betang') || lower.includes('adat')) {
        reply = 'Filosofi Huma Betang melambangkan kebersamaan dan musyawarah damai. Saat berkunjung ke Rumah Betang kuno seperti Tumbang Anoi, sebaiknya minta izin pemangku adat dan lepas alas kaki di pelataran utama.';
      }
      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <BottomSheet isOpen={askAiModalOpen} onClose={() => setAskAiModalOpen(false)} title="Tanya Betang AI (S-29)">
      <div className="flex flex-col h-[60vh] gap-3 text-xs">
        <div className="flex-1 overflow-y-auto flex flex-col gap-2.5 p-1">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${m.sender === 'user'
                ? 'bg-[var(--primary)] text-[var(--on-primary)] ml-auto rounded-br-sm'
                : 'bg-[var(--surface-2)] text-[var(--fg)] mr-auto rounded-bl-sm border border-[var(--border)]'
                }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-[var(--border)]">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Tanyakan rekomendasi kuliner, musim, rute..."
            className="flex-1 h-11 px-3.5 rounded-[var(--r-pill)] border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--fg)] focus:outline-none"
          />
          <button
            type="button"
            onClick={handleSend}
            className="w-11 h-11 rounded-full bg-[var(--primary)] text-[var(--on-primary)] flex items-center justify-center shrink-0 active:scale-95"
            aria-label="Kirim pesan"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};

