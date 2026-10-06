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
        'relative grid h-8 w-[52px] shrink-0 cursor-pointer place-items-center',
        'rounded-full border border-line bg-ink-700/70 p-[3px]',
        'transition-colors duration-200 hover:border-line-strong',
        className ?? '',
      ].join(' ')}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 grid place-items-center text-[11px] opacity-70"
      >
        {light ? <SunGlyph /> : <MoonGlyph />}
      </span>

      <span
        aria-hidden="true"
        className={[
          'relative grid h-[22px] w-[22px] place-items-center rounded-full bg-display',
          'transition-transform duration-200',
          light ? 'translate-x-[22px]' : 'translate-x-0',
        ].join(' ')}
      />
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
