import React from 'react';

interface MarqueeProps {
  items: string[];
  /** Accessible name for the list, since the visual track is decorative motion. */
  label: string;
  className?: string;
}

/**
 * An infinite horizontal scroll of short labels.
 *
 * The track is rendered twice and translated by exactly -50%, so when the first
 * copy has scrolled fully out the second is in its place and the animation
 * restarts with no visible seam. Nothing is duplicated for screen readers: the
 * second copy is `aria-hidden`.
 *
 * The keyframes live in `tailwind.css` rather than inline so they compile once
 * instead of being re-created per instance, and so the reduced-motion override
 * has a single place to live.
 *
 * Width is `w-max` so the track is as wide as its content rather than the
 * container — without it the duplicate halves sit on top of each other and the
 * loop never appears to move.
 */
export const Marquee: React.FC<MarqueeProps> = ({ items, label, className }) => (
  <div
    className={['relative overflow-hidden', className].filter(Boolean).join(' ')}
    role="list"
    aria-label={label}
  >
    <div className="flex w-max animate-marquee gap-3">
      {[0, 1].map((copy) => (
        <div
          key={copy}
          className="flex shrink-0 gap-3"
          aria-hidden={copy === 1 ? 'true' : undefined}
        >
          {items.map((item) => (
            <span
              key={item}
              role="listitem"
              className="flex shrink-0 items-center rounded-xl border border-line bg-ink-700/70 px-4 py-2 text-[13px] font-medium text-bright backdrop-blur-sm transition-all duration-200 hover:border-line-strong hover:bg-ink-600 hover:text-display"
            >
              {item}
            </span>
          ))}
        </div>
      ))}
    </div>

    {/* Edge fades, matched to the page ground so the labels dissolve rather
        than get clipped by the container edge. */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink-900 to-transparent sm:w-24"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink-900 to-transparent sm:w-24"
    />
  </div>
);

export default Marquee;
