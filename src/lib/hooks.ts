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

/**
 * Sets `document.title` for the current page and restores the site title on
 * unmount. No helmet dependency — the app always owns exactly one title at a
 * time, so a plain effect is all it needs.
 */
export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
};

/**
 * Scroll-spy: returns the id of the section currently nearest the top of the
 * viewport, from a list of ids. Used to highlight the active item in an
 * in-page nav. Picks the last section whose top has passed a line a third of
 * the way down the viewport, so the highlight changes as a heading reaches the
 * reading zone rather than the very top edge.
 */
export const useActiveSection = (ids: string[]): string => {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onScroll = () => {
      const line = window.innerHeight * 0.34;
      let current = ids[0] ?? '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids]);

  return active;
};
