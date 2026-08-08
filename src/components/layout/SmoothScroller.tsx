import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { setLenis } from '@/lib/scroll';

interface SmoothScrollerProps {
  children: React.ReactNode;
}

export const SmoothScroller: React.FC<SmoothScrollerProps> = ({ children }) => {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setLenis(null);
      return;
    }

    const lenis = new Lenis({
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    setLenis(lenis);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    let rafId = 0;
    const loop = (time: number) => {
      update(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return <>{children}</>;
};
