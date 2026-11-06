import React from 'react';
import { WelcomeScreen, WelcomeScreenProps } from './WelcomeScreen';
import { Language } from '../i18n';

export interface SplashScreenProps {
  onDismiss: () => void;
  lang: Language;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onDismiss, lang }) => {
  return <WelcomeScreen onNext={onDismiss} onLogin={onDismiss} lang={lang} />;
};

export default SplashScreen;

