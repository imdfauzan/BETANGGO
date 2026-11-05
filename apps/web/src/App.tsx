import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { MobileFrame } from './components/ui/MobileFrame';
import { TopBar } from './components/ui/TopBar';
import { BottomNavPill } from './components/ui/BottomNavPill';
import { OfflineNotice } from './components/ui/OfflineNotice';
import { Toast } from './components/ui/Toast';

import { SplashScreen } from './screens/SplashScreen';
import { HomeScreen } from './screens/HomeScreen';
import { ExploreScreen } from './screens/ExploreScreen';
import { MapScreen } from './screens/MapScreen';
import { PlanScreen } from './screens/PlanScreen';
import { EditorScreen } from './screens/EditorScreen';
import { CheckoutScreen } from './screens/CheckoutScreen';
import { TripsScreen } from './screens/TripsScreen';
import { CareScreen } from './screens/CareScreen';

import {
  DestinationDetailModal,
  SettingsModal,
  PartnerConsoleModal,
  AdminConsoleModal,
  SafetyTipsModal,
  AskAiModal
} from './screens/Modals';

export const AppContent: React.FC = () => {
  const {
    lang,
    setLang,
    theme,
    setTheme,
    isOffline,
    activeTab,
    setActiveTab,
    toast,
    orders,
    setSettingsOpen
  } = useApp();

  // Welcome screen only shows once on first visit
  const [showSplash, setShowSplash] = useState(() => {
    return !localStorage.getItem('betanggo_welcome_seen');
  });

  const handleDismissSplash = () => {
    localStorage.setItem('betanggo_welcome_seen', 'true');
    setShowSplash(false);
  };

  const [currentView, setCurrentView] = useState<'main' | 'editor' | 'checkout'>('main');

  if (showSplash) {
    return <SplashScreen onDismiss={handleDismissSplash} lang={lang} />;
  }

  return (
    <MobileFrame>
      {/* Top Bar Navigation */}
      <TopBar
        lang={lang}
        onLangChange={setLang}
        theme={theme}
        onThemeChange={setTheme}
        onOpenSettings={() => setSettingsOpen(true)}
        onWordmarkClick={() => {
          setCurrentView('main');
          setActiveTab('home');
        }}
      />

      {/* Offline Status Notice */}
      <OfflineNotice isOffline={isOffline} lang={lang} />

      {/* Main Routing Area */}
      <main className="flex-1 w-full flex flex-col">
        {currentView === 'checkout' ? (
          <CheckoutScreen
            onBackToEditor={() => setCurrentView('editor')}
            onViewTrips={() => {
              setCurrentView('main');
              setActiveTab('trips');
            }}
          />
        ) : currentView === 'editor' ? (
          <EditorScreen
            onProceedToCheckout={() => setCurrentView('checkout')}
            onBackToPlan={() => {
              setCurrentView('main');
              setActiveTab('ai');
            }}
          />
        ) : (
          <>
            {activeTab === 'home' && <HomeScreen />}
            {activeTab === 'explore' && <ExploreScreen />}
            {activeTab === 'ai' && (
              <PlanScreen
                onOpenEditor={() => setCurrentView('editor')}
              />
            )}
            {activeTab === 'trips' && <TripsScreen />}
            {activeTab === 'care' && <CareScreen />}
          </>
        )}
      </main>

      {/* Bottom Floating Navigation Pill (Visible on Main View) */}
      {currentView === 'main' && (
        <BottomNavPill
          activeTab={activeTab}
          onChangeTab={(tab) => {
            setCurrentView('main');
            setActiveTab(tab);
          }}
          lang={lang}
          hasActiveTrip={orders.length > 0}
        />
      )}

      {/* Global Interactive Toast */}
      {toast && (
        <Toast
          message={toast.message}
          actionLabel={toast.actionLabel}
          onAction={toast.onAction}
          isVisible={Boolean(toast)}
        />
      )}

      {/* Modals & Bottom Sheets */}
      <DestinationDetailModal />
      <SettingsModal />
      <PartnerConsoleModal />
      <AdminConsoleModal />
      <SafetyTipsModal />
      <AskAiModal />
    </MobileFrame>
  );
};

