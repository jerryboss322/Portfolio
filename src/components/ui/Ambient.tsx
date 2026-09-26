import React from 'react';
import { useReducedMotion } from '@/lib/hooks';

/* feTurbulence noise, inlined as a data URI. ~300 bytes, rasterised once by the
   compositor, and it removes the flat "plastic" look of large dark gradients. */
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.42'/%3E%3C/svg%3E")`;

const AURORA = [
  {
    background:
      'radial-gradient(closest-side, rgba(0,119,255,0.20), transparent 70%)',
    width: 720,
    height: 720,
    top: '-18%',
    left: '-12%',
    animation: 'drift-a 34s ease-in-out infinite',
  },
  {
    background:
      'radial-gradient(closest-side, rgba(0,240,255,0.14), transparent 70%)',
    width: 620,
    height: 620,
    top: '38%',
    right: '-16%',
    animation: 'drift-b 46s ease-in-out infinite',
  },
  {
    background:
      'radial-gradient(closest-side, rgba(88,80,236,0.13), transparent 70%)',
    width: 560,
    height: 560,
    bottom: '-14%',
    left: '28%',
    animation: 'drift-c 40s ease-in-out infinite',
  },
];

/**
 * Fixed ambient backdrop: drifting aurora blooms under a film-grain wash.
 *
 * Both layers are `transform`/`opacity` only, so they never trigger layout or
 * paint after the first frame, and the whole thing is skipped under reduced
 * motion. The grain sits above page content at very low opacity to unify the
 * surfaces; the aurora sits below everything at `z-index: -1`.
 */
export const Ambient: React.FC = () => {
  const reduced = useReducedMotion();

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {AURORA.map((blob, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-[90px] will-change-transform"
            style={{
              background: blob.background,
              width: blob.width,
              height: blob.height,
              top: blob.top,
              left: blob.left,
              right: blob.right,
              bottom: blob.bottom,
              animation: reduced ? undefined : blob.animation,
            }}
          />
        ))}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[70] opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundRepeat: 'repeat' }}
      />
    </>
  );
};

export default Ambient;
