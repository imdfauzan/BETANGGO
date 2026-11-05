import React, { useState, useEffect, Children } from 'react';
import { motion, AnimatePresence, Transition, Variants } from 'motion/react';
import { cn } from '../../lib/utils';

export type TextLoopProps = {
  children: React.ReactNode[];
  className?: string;
  interval?: number;
  transition?: Transition;
  variants?: Variants;
  onIndexChange?: (index: number) => void;
  trigger?: boolean;
  mode?: 'popLayout' | 'wait' | 'sync';
};

export function TextLoop({
  children,
  className,
  interval = 2.5,
  transition = { duration: 0.35, ease: 'easeInOut' },
  variants,
  onIndexChange,
  trigger = true,
  mode = 'popLayout',
}: TextLoopProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = Children.toArray(children);

  useEffect(() => {
    if (!trigger || items.length <= 1) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((current) => {
        const next = (current + 1) % items.length;
        onIndexChange?.(next);
        return next;
      });
    }, interval * 1000);

    return () => clearInterval(intervalId);
  }, [items.length, interval, onIndexChange, trigger]);

  const motionVariants: Variants = {
    initial: { y: 14, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -14, opacity: 0 },
  };

  return (
    <div className={cn('relative inline-block overflow-hidden', className)}>
      <AnimatePresence mode={mode} initial={false}>
        <motion.div
          key={currentIndex}
          initial='initial'
          animate='animate'
          exit='exit'
          transition={transition}
          variants={variants || motionVariants}
          className="w-full"
        >
          {items[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

