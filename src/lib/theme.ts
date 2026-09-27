import { useCallback, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

const KEY = 'jboss-theme';
const isTheme = (v: unknown): v is Theme => v === 'dark' || v === 'light';

const current = (): Theme =>
  isTheme(document.documentElement.dataset.theme) ? document.documentElement.dataset.theme : 'dark';

/**
 * Theme switch.
 *
 * The initial value comes from `data-theme` on <html>, which
 * public/theme-init.js sets before first paint — so there is no flash and no
 * hydration mismatch. This component only owns *changes* after that.
 */
export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(current);

  useEffect(() => {
    // Follow the OS only while the visitor has not made an explicit choice.
    if (localStorage.getItem(KEY)) return;

    const mql = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = (event: MediaQueryListEvent) => {
      const next: Theme = event.matches ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem(KEY, next);
      } catch {
        /* private mode — the toggle still works for this session */
      }
      return next;
    });
  }, []);

  return { theme, toggle };
};
