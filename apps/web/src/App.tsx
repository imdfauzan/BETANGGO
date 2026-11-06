import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { MobileFrame } from './components/ui/MobileFrame';
import { TopBar } from './components/ui/TopBar';
import { BottomNavPill } from './components/ui/BottomNavPill';
import { OfflineNotice } from './components/ui/OfflineNotice';
import { Toast } from './components/ui/Toast';

import { WelcomeScreen } from './screens/WelcomeScreen';
import { HomeScreen } from './screens/HomeScreen';
import { ExploreScreen } from './screens/ExploreScreen';
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
    return <WelcomeScreen onNext={handleDismissSplash} onLogin={handleDismissSplash} lang={lang} />;
  }

  return (
    <MobileFrame
      header={
        <div className="w-full flex flex-col">
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
          <OfflineNotice isOffline={isOffline} lang={lang} />
        </div>
      }
      footer={
        currentView === 'main' ? (
          <BottomNavPill
            activeTab={activeTab}
            onChangeTab={(tab) => {
              setCurrentView('main');
              setActiveTab(tab);
            }}
            lang={lang}
            hasActiveTrip={orders.length > 0}
          />
        ) : null
      }
      overlay={
        <>
          {/* Global Interactive Toast */}
          {toast && (
            <div className="fixed bottom-24 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
              <div className="pointer-events-auto w-full max-w-[380px] flex justify-center">
                <Toast
                  message={toast.message}
                  actionLabel={toast.actionLabel}
                  onAction={toast.onAction}
                  isVisible={Boolean(toast)}
                />
              </div>
            </div>
          )}

          {/* Modals & Bottom Sheets */}
          <DestinationDetailModal />
          <SettingsModal />
          <PartnerConsoleModal />
          <AdminConsoleModal />
          <SafetyTipsModal />
          <AskAiModal />
        </>
      }
    >
      {/* Scrollable View Area: only this area scrolls */}
      <main className="w-full min-h-full flex flex-col pt-16 pb-28">
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
    </MobileFrame>
  );
};

export default AppContent;
