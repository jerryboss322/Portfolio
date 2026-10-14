import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Wraps a routed page in an enter/exit transition. Paired with
 * `AnimatePresence mode="wait"` in App so the old page fades and lifts away
 * before the new one rises in. Reduced-motion users get a plain fade.
 */
export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const reduced = useReducedMotion();
  const offset = reduced ? 0 : 24;

  return (
    <motion.div
      initial={{ opacity: 0, y: offset, filter: reduced ? 'none' : 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -offset, filter: reduced ? 'none' : 'blur(6px)' }}
      transition={{ duration: reduced ? 0.15 : 0.45, ease: EASE }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
