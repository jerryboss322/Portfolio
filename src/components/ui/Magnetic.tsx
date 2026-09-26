import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks';

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** How far the element is allowed to travel toward the pointer, in px. */
  strength?: number;
  /** How far outside the element the pointer still counts, in px. */
  radius?: number;
}

/**
 * Magnetic hover: the element leans toward the pointer and springs back on
 * exit. Purely a delight affordance — it never gates a state change, so it is
 * skipped entirely for touch pointers, narrow viewports and reduced motion.
 */
export const Magnetic: React.FC<MagneticProps> = ({
  children,
  className,
  strength = 14,
  radius = 40,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const dist = Math.hypot(dx, dy);
    const limit = Math.max(rect.width, rect.height) / 2 + radius;
    if (dist > limit) {
      x.set(0);
      y.set(0);
      return;
    }
    const falloff = 1 - Math.min(1, dist / limit);
    x.set(dx * falloff * strength * 0.1);
    y.set(dy * falloff * strength * 0.1);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={reduced ? undefined : { x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
