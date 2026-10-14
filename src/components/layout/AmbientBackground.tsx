import React from 'react';

/**
 * Single solid background layer.
 *
 * Replaced the animated blurred orbs (which created the blended, drifting
 * colour effect). The page now uses a flat, solid ground with no ambient
 * motion, so everything sits crisp and undistracted.
 */
export const AmbientBackground: React.FC = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 z-0"
  >
    <div className="absolute inset-0 bg-ink-900/40" aria-hidden="true" />
  </div>
);

export default AmbientBackground;
