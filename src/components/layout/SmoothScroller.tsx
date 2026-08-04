import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollerProps {
  children: React.ReactNode;
}

export const SmoothScroller: React.FC<SmoothScrollerProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    const animate = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    const handleHashChange = () => {
      if (window.location.hash) {
        setTimeout(() => {
          const target = document.querySelector(window.location.hash);
          if (target instanceof HTMLElement) {
            lenis.scrollTo(target, { offset: 0, duration: 1.6 });
          }
        }, 100);
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return <>{children}</>;
};
