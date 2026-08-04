import { useEffect, useState } from 'react';

interface ReducedMotionResult {
  prefersReduced: boolean;
  viewport: { width: number; height: number };
}

export const useReducedMotion = (): ReducedMotionResult => {
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateReduced = () => setPrefersReduced(mediaQuery.matches);

    setPrefersReduced(mediaQuery.matches);
    setViewport({ width: window.innerWidth, height: window.innerHeight });

    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    mediaQuery.addEventListener('change', updateReduced);
    window.addEventListener('resize', updateViewport);

    return () => {
      mediaQuery.removeEventListener('change', updateReduced);
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  return { prefersReduced, viewport };
};

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
};
