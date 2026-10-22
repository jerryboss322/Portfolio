import React from 'react';
import { useTheme } from '@/lib/theme';

/**
 * Sun/moon switch.
 *
 * A real button with `aria-pressed` and a label that names the *action*, not
 * the state — "Switch to light theme" is what a screen reader user needs to
 * decide whether to press it. The knob moves on a plain CSS transition.
 */
export const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { theme, toggle } = useTheme();
  const light = theme === 'light';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={light}
      aria-label={`Switch to ${light ? 'dark' : 'light'} theme`}
      title={`Switch to ${light ? 'dark' : 'light'} theme`}
      className={[
        'group relative flex h-8 w-[54px] shrink-0 cursor-pointer items-center justify-between',
        'rounded-full border border-line bg-ink-800/80 p-[3px]',
        'transition-colors duration-200 hover:border-line-strong hover:bg-ink-700',
        className ?? '',
      ].join(' ')}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none flex w-full items-center justify-between px-[5px] text-muted"
      >
        <MoonGlyph />
        <SunGlyph />
      </span>

      <span
        aria-hidden="true"
        className={[
          'absolute left-[3px] top-[3px] grid h-[24px] w-[24px] place-items-center rounded-full bg-accent text-onaccent',
          'transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          light ? 'translate-x-[22px]' : 'translate-x-0',
        ].join(' ')}
      >
        {light ? <SunGlyph /> : <MoonGlyph />}
      </span>
    </button>
  );
};

const SunGlyph = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
  </svg>
);

const MoonGlyph = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

export default ThemeToggle;
