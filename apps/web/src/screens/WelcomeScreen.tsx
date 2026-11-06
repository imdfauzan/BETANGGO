import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../i18n';
import './welcome.css';

const SOFT_EASE = [0.22, 1, 0.3, 1] as const;

function CalmOrb() {
  return (
    <div className="wc-orb-breathe">
      <div className="wc-orb-halo" />
      <div className="wc-orb" />
      <span className="wc-blush wc-blush-l" aria-hidden="true" />
      <span className="wc-blush wc-blush-r" aria-hidden="true" />
      <svg className="wc-face" viewBox="0 0 100 100" aria-hidden="true">
        <path d="M31 46 C 34.5 51.2, 39.5 51.2, 43 46" />
        <path d="M57 46 C 60.5 51.2, 65.5 51.2, 69 46" />
      </svg>
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
        <CalmOrb />
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
              satu langkah bersama Betang<span className="text-orange-400">GO</span>.
            </>
          )}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: soft }}
        >
          {lang === 'en'
            ? 'Plan your dream journey from Sebangau peatlands to Tanjung Puting orangutans effortlessly.'
            : 'Rencanakan liburan impianmu dari rimba Sebangau hingga orangutan Tanjung Puting dalam satu percakapan.'}
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

