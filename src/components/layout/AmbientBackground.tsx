import React from 'react';

/**
 * Subtle static architectural ambient background.
 *
 * Uses static CSS radial gradients and a faint dot matrix with zero runtime
 * blur filters or JS animations so the page has depth and atmosphere at zero
 * GPU frame cost.
 */
export const AmbientBackground: React.FC = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
  >
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        backgroundImage: `
          radial-gradient(80% 50% at 50% -15%, var(--accent-glow), transparent 70%),
          radial-gradient(50% 40% at 85% 20%, rgba(99, 102, 241, 0.06), transparent 70%)
        `,
      }}
    />
    <div
      aria-hidden="true"
      className="absolute inset-0 opacity-[0.35]"
      style={{
        backgroundImage: 'radial-gradient(var(--line-faint) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 25%, #000 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 25%, #000 30%, transparent 100%)',
      }}
    />
  </div>
);

export default AmbientBackground;
