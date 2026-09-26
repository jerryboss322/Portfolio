import { useEffect, useRef, useState, type DependencyList } from 'react';

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

/**
 * True when the viewport is wide enough for pointer-driven and multi-column
 * layouts. Cached at mount — this only ever gates an initial decision, never
 * animates, so reacting to live resize would be wasted work.
 */
export const useCoarsePointer = (breakpoint = 1024): boolean => {
  const [coarse, setCoarse] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < breakpoint;
  });

  useEffect(() => {
    setCoarse(window.innerWidth < breakpoint);
  }, [breakpoint]);

  return coarse;
};

/**
 * `useEffect` that defers its work to idle time, with a timeout fallback for
 * Safari. Runs whatever cleanup the deferred work returns if the component
 * unmounts (or re-runs) first. `deps` works exactly like `useEffect`'s.
 */
export const useIdleCallback = (
  handler: () => void | (() => void),
  deps: DependencyList = [],
  timeout = 1200
): void => {
  const latest = useRef(handler);

  useEffect(() => {
    latest.current = handler;
  }, [handler]);

  useEffect(() => {
    let dispose: void | (() => void);

    const run = () => {
      dispose = latest.current();
    };

    const idle = window.requestIdleCallback;
    if (typeof idle === 'function') {
      const id = idle(run, { timeout });
      return () => {
        window.cancelIdleCallback(id);
        dispose?.();
      };
    }

    const id = window.setTimeout(run, 200);
    return () => {
      window.clearTimeout(id);
      dispose?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
