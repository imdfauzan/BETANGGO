import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../i18n';
import './welcome.css';

const SOFT_EASE = [0.22, 1, 0.3, 1] as const;

function BreatheIcon() {
  return (
    <div className="wc-icon-breathe">
      <div className="wc-icon-halo" aria-hidden="true" />
      <div className="wc-icon-glow" aria-hidden="true" />
      <img
        src="/media/icon.gif"
        alt="BetangGO"
        className="wc-icon-img"
      />
    </div>
  );
}

export interface WelcomeScreenProps {
  playKey?: string | number;
  onNext?: () => void;
  onLogin?: () => void;
  lang?: Language;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  playKey = 'welcome',
  onNext,
  onLogin,
  lang = 'id'
}) => {
  const soft = SOFT_EASE;

  return (
    <div key={String(playKey)} className="wc">
      <motion.div
        className="wc-gradient"
        initial={{ y: '100%' }}
        animate={{ y: '0%' }}
        transition={{ delay: 0.12, duration: 0.8, ease: soft }}
      />
      <motion.div
        className="wc-orb-wrap"
        initial={{ opacity: 0, scale: 0.55, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.9, ease: [0.34, 1.2, 0.5, 1] }}
      >
        <BreatheIcon />
      </motion.div>
      <div className="wc-content">
        <motion.h3
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: soft }}
        >
          {lang === 'en' ? (
            <>
              Room to breathe,
              <br />
              Central Kalimantan awaits.
            </>
          ) : (
            <>
              Jelajahi Kalteng,
              <br />
              dengan Betang<span className="text-orange-400">GO</span>.
            </>
          )}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: soft }}
        >
          {lang === 'en'
            ? 'Plan your dream journey effortlessly.'
            : 'Rencanakan liburan impianmu dalam satu percakapan.'}
        </motion.p>
        <motion.button
          type="button"
          className="wc-btn"
          onClick={onNext}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.55, ease: soft }}
        >
          {lang === 'en' ? 'Get started' : 'Mulai Sekarang'}
        </motion.button>
        <motion.button
          type="button"
          className="wc-link"
          onClick={onLogin || onNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5, ease: soft }}
        >
          {lang === 'en' ? 'I already have an itinerary' : 'Sudah punya rencana perjalanan'}
        </motion.button>
      </div>
    </div>
  );
};

export default WelcomeScreen;

