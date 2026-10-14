import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin gradient bar under the header showing how far down the page you are. */
export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent via-accent-indigo to-accent-purple"
    />
  );
};

export default ScrollProgress;
