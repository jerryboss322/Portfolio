import { useEffect, useState } from 'react';

const QUERY_REDUCED = '(prefers-reduced-motion: reduce)';

/**
 * Tracks `prefers-reduced-motion` and stays in sync if the user flips the
 * OS setting mid-session. Safe to read during render (always returns a boolean).
 */
export const useReducedMotion = (): boolean => {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(QUERY_REDUCED).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(QUERY_REDUCED);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    setReduced(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
};
