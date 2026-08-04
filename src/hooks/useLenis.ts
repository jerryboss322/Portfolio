import { useEffect, useState, useCallback } from 'react';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export const useLenis = () => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const instance = new Lenis({
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    setLenis(instance);
    lenisInstance = instance;

    const animate = (time: number) => {
      instance.raf(time);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    const handleHashChange = () => {
      if (window.location.hash) {
        const target = document.querySelector(window.location.hash) as HTMLElement | null;
        if (target) {
          instance.scrollTo(target, { offset: 0, duration: 1.6 });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      instance.destroy();
      lenisInstance = null;
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const scrollTo = useCallback((target: string | HTMLElement, offset = 0) => {
    if (lenisInstance) {
      lenisInstance.scrollTo(target as string | HTMLElement, { offset, duration: 1.6 });
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el instanceof HTMLElement) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, []);

  return { lenis, scrollTo };
};

export const getLenis = () => lenisInstance;
