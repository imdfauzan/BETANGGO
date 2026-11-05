import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Itinerary,
  Order,
  Destination,
  Disruption,
  SEED_DESTINATIONS,
  SEED_DISRUPTIONS,
  TripIntent
} from '@betanggo/shared';
import { solve, recompute } from '@betanggo/solver';
import { Language } from '../i18n';
import { NavTab } from '../components/ui/BottomNavPill';

export interface ToastState {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export interface OfflineMapPack {
  id: string;
  name: string;
  sizeMb: number;
  isDownloaded: boolean;
  progressPct: number;
}

export interface AppContextType {
  lang: Language;
  setLang: (l: Language) => void;
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  isOffline: boolean;
  setIsOffline: (val: boolean) => void;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  activeItinerary: Itinerary | null;
  setActiveItinerary: (it: Itinerary | null) => void;
  orders: Order[];
  createOrder: (itinerary: Itinerary, name: string, email: string, method: 'qris' | 'card') => Order;
  savedOfflineDestIds: string[];
  toggleSaveOffline: (id: string) => void;
  activeDisruptions: Disruption[];
  offlinePacks: OfflineMapPack[];
  downloadOfflinePack: (packId: string) => void;
  toast: ToastState | null;
  showToast: (msg: string, actionLabel?: string, onAction?: () => void) => void;
  detailModalDestId: string | null;
  setDetailModalDestId: (id: string | null) => void;
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
  partnerModalOpen: boolean;
  setPartnerModalOpen: (open: boolean) => void;
  adminModalOpen: boolean;
  setAdminModalOpen: (open: boolean) => void;
  safetyModalOpen: boolean;
  setSafetyModalOpen: (open: boolean) => void;
  askAiModalOpen: boolean;
  setAskAiModalOpen: (open: boolean) => void;
  buildPlanWithAi: (intent: TripIntent) => Itinerary;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem('betanggo_lang') as Language) || 'id';
  });

  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('betanggo_theme') as 'light' | 'dark') || 'light';
  });

  const [isOffline, setIsOffline] = useState(false);
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [activeItinerary, setActiveItinerary] = useState<Itinerary | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [savedOfflineDestIds, setSavedOfflineDestIds] = useState<string[]>(['dest-pky-01', 'dest-pky-02']);
  const [activeDisruptions, setActiveDisruptions] = useState<Disruption[]>(SEED_DISRUPTIONS);
  const [toast, setToast] = useState<ToastState | null>(null);

  const [detailModalDestId, setDetailModalDestId] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [safetyModalOpen, setSafetyModalOpen] = useState(false);
  const [askAiModalOpen, setAskAiModalOpen] = useState(false);

  const [offlinePacks, setOfflinePacks] = useState<OfflineMapPack[]>([
    {
      id: 'pack-pky',
      name: 'Palangka Raya & Sebangau (52 MB)',
      sizeMb: 52,
      isDownloaded: true,
      progressPct: 100
    },
    {
      id: 'pack-kbr',
      name: 'Kotawaringin Barat & Tanjung Puting (78 MB)',
      sizeMb: 78,
      isDownloaded: false,
      progressPct: 0
    }
  ]);

  // Apply theme to HTML tag
  useEffect(() => {
    localStorage.setItem('betanggo_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('betanggo_lang', newLang);
    document.documentElement.setAttribute('lang', newLang);
  };

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
  };

  const showToast = (message: string, actionLabel?: string, onAction?: () => void) => {
    setToast({ message, actionLabel, onAction });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const toggleSaveOffline = (id: string) => {
    setSavedOfflineDestIds(prev => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter(x => x !== id) : [...prev, id];
      showToast(exists ? 'Dihapus dari penyimpanan offline' : 'Disimpan untuk dibuka tanpa sinyal');
      return updated;
    });
  };

  const downloadOfflinePack = (packId: string) => {
    setOfflinePacks(prev =>
      prev.map(p => {
        if (p.id === packId) {
          return { ...p, progressPct: 100, isDownloaded: true };
        }
        return p;
      })
    );
    showToast('Paket peta offline berhasil diunduh');
  };

  const buildPlanWithAi = (intent: TripIntent): Itinerary => {
    const plan = solve(intent);
    setActiveItinerary(plan);
    return plan;
  };

  const createOrder = (
    itinerary: Itinerary,
    travelerName: string,
    travelerEmail: string,
    method: 'qris' | 'card'
  ): Order => {
    const orderId = `ORD-${Date.now()}`;
    const vouchers = itinerary.days.flatMap(day =>
      day.items
        .filter(item => item.cost_idr > 0)
        .map((item, idx) => ({
          id: `VCH-${orderId}-${day.day_number}-${idx + 1}`,
          booking_code: `BG-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
          order_id: orderId,
          destination_name: item.name,
          item_name: item.name,
          partner_name: 'Mitra Terverifikasi BETANGGO',
          date_wib: `${day.date_label.id} · ${item.time_start} WIB`,
          pax: itinerary.intent.pax || 1,
          amount_idr: item.cost_idr,
          qr_payload: JSON.stringify({
            app: 'BETANGGO',
            order_id: orderId,
            item_id: item.id,
            sig: `ed25519:${Math.random().toString(36).substring(2, 12)}`
          }),
          signature: `ed25519:${Math.random().toString(36).substring(2, 14)}`,
          is_used: false,
          status: 'confirmed' as const
        }))
    );

    const newOrder: Order = {
      id: orderId,
      created_at: new Date().toISOString(),
      traveler_name: travelerName || 'Wisatawan BetangGo',
      traveler_email: travelerEmail || 'wisatawan@betanggo.id',
      total_idr: itinerary.total_cost_idr,
      payment_method: method,
      status: 'paid',
      vouchers,
      itinerary
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  // Provide initial demo plan if none
  useEffect(() => {
    if (!activeItinerary) {
      const demoPlan = solve({
        region: 'palangka-raya',
        days: 3,
        nights: 2,
        pax: 2,
        budget_idr: 4500000,
        interests: ['nature', 'wildlife', 'culture'],
        pace: 'balanced'
      });
      setActiveItinerary(demoPlan);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        theme,
        setTheme,
        isOffline,
        setIsOffline,
        activeTab,
        setActiveTab,
        activeItinerary,
        setActiveItinerary,
        orders,
        createOrder,
        savedOfflineDestIds,
        toggleSaveOffline,
        activeDisruptions,
        offlinePacks,
        downloadOfflinePack,
        toast,
        showToast,
        detailModalDestId,
        setDetailModalDestId,
        settingsOpen,
        setSettingsOpen,
        partnerModalOpen,
        setPartnerModalOpen,
        adminModalOpen,
        setAdminModalOpen,
        safetyModalOpen,
        setSafetyModalOpen,
        askAiModalOpen,
        setAskAiModalOpen,
        buildPlanWithAi
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

