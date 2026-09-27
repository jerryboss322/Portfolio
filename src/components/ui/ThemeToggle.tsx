import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme';
import { useReducedMotion } from '@/lib/hooks';

/**
 * Sun/moon switch.
 *
 * A real button with `aria-pressed` and a label that names the *action*, not
 * the state — "Switch to light theme" is what a screen reader user needs to
 * decide whether to press it. The knob is a single transform, so the whole
 * thing stays on the compositor.
 */
export const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { theme, toggle } = useTheme();
  const reduced = useReducedMotion();
  const light = theme === 'light';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={light}
      aria-label={`Switch to ${light ? 'dark' : 'light'} theme`}
      title={`Switch to ${light ? 'dark' : 'light'} theme`}
      className={[
        'group relative grid h-8 w-[52px] shrink-0 cursor-pointer place-items-center',
        'rounded-full border border-line bg-ink-600/70 p-[3px]',
        'transition-colors duration-300 hover:border-line-strong',
        className ?? '',
      ].join(' ')}
    >
      {/* Track label sits under the knob and cross-fades. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid place-items-center text-[11px] opacity-70"
      >
        <span
          className={`absolute transition-opacity duration-300 ${
            light ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <MoonGlyph />
        </span>
        <span
          className={`absolute transition-opacity duration-300 ${
            light ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <SunGlyph />
        </span>
      </span>

      <motion.span
        aria-hidden="true"
        className="relative grid h-[22px] w-[22px] place-items-center rounded-full bg-display shadow-elev-1"
        animate={{ x: light ? 22 : 0 }}
        transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 520, damping: 34 }}
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
