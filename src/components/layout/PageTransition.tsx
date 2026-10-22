import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Wraps a routed page in an enter/exit transition. Paired with
 * `AnimatePresence mode="wait"` in App so the old page fades and lifts away
 * before the new one rises in.
 *
 * Animates only compositor-friendly properties (`opacity`, `y`, `scale`) and
 * avoids CSS `filter: blur(...)` to prevent full-page GPU rasterization lag.
 * Reduced-motion users get a quick, plain fade.
 */
export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const reduced = useReducedMotion();
  const offset = reduced ? 0 : 14;

  return (
    <motion.div
      initial={{ opacity: 0, y: offset, scale: reduced ? 1 : 0.992 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -offset, scale: reduced ? 1 : 0.995 }}
      transition={{ duration: reduced ? 0.12 : 0.32, ease: EASE }}
      className="will-change-[transform,opacity]"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
