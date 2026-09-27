import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { ImageAsset } from '@/content/images';
import { useReducedMotion } from '@/lib/hooks';

interface MediaProps {
  asset: ImageAsset;
  alt: string;
  className?: string;
  /** Above-the-fold images skip lazy loading and the fade. */
  priority?: boolean;
  sizes?: string;
  imgClassName?: string;
  /** Slow parallax drift on scroll, in px. */
  drift?: number;
}

/**
 * Image with a blur-up placeholder.
 *
 * The LQIP is an inline base64 WebP painted as the element's background, so the
 * box is never empty and the layout already has the final aspect ratio. The
 * real image fades in over it once decoded. Width/height are always set, which
 * reserves the space before any bytes arrive.
 */
export const Media: React.FC<MediaProps> = ({
  asset,
  alt,
  className,
  priority = false,
  sizes = '100vw',
  imgClassName,
  drift = 0,
}) => {
  const [loaded, setLoaded] = useState(false);
  const reduced = useReducedMotion();

  return (
    <div
      className={['relative overflow-hidden', className].filter(Boolean).join(' ')}
      style={{
        backgroundImage: `url("${asset.lqip}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        aspectRatio: `${asset.width} / ${asset.height}`,
      }}
    >
      <motion.img
        src={asset.src}
        srcSet={asset.srcSet}
        sizes={sizes}
        alt={alt}
        width={asset.width}
        height={asset.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        initial={false}
        animate={reduced ? undefined : { opacity: loaded ? 1 : 0, scale: loaded ? 1 : 1.04 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={drift && !reduced ? { scale: 1.06 } : undefined}
        className={[
          'absolute inset-0 h-full w-full object-cover',
          loaded ? '' : '',
          imgClassName ?? '',
        ].join(' ')}
      />
    </div>
  );
};

interface DeviceProps {
  asset: ImageAsset;
  alt: string;
  title: string;
  className?: string;
  sizes?: string;
  children?: React.ReactNode;
}

/**
 * A browser window rendered in 3D.
 *
 * The screenshot sits in a chrome bar and a bezel inside a perspective
 * container. A masked copy below acts as a floor reflection, which is what sells
 * the object as a solid floating rather than a flat picture. Everything is
 * transform and mask, so the whole thing stays on the compositor.
 */
export const DeviceFrame: React.FC<DeviceProps> = ({
  asset,
  alt,
  title,
  className,
  sizes = '(max-width: 1024px) 100vw, 620px',
  children,
}) => {
  const reduced = useReducedMotion();

  return (
    <div
      className={['relative [perspective:1600px]', className].filter(Boolean).join(' ')}
    >
      <div
        className="relative [transform-style:preserve-3d]"
        style={reduced ? undefined : { transform: 'rotateX(6deg) rotateY(-9deg)' }}
      >
        {/* Bezel */}
        <div className="relative overflow-hidden rounded-[14px] border border-line-strong bg-ink-900 p-[6px] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95),0_0_0_1px_rgba(0,119,255,0.16)]">
          {/* Chrome */}
          <div className="flex h-[30px] items-center gap-1.5 rounded-t-[9px] bg-ink-800 px-3">
            <span className="h-[7px] w-[7px] rounded-full bg-[#FF5F56]/70" />
            <span className="h-[7px] w-[7px] rounded-full bg-[#FFBD2E]/70" />
            <span className="h-[7px] w-[7px] rounded-full bg-[#27C93F]/70" />
            <div className="ml-2 flex h-[16px] flex-1 items-center justify-center rounded-[5px] bg-tint-2 px-3">
              <span className="truncate font-mono text-[9px] tracking-wider text-faint">
                {title}
              </span>
            </div>
          </div>

          <Media asset={asset} alt={alt} sizes={sizes} className="rounded-b-[9px]" />

          {/* Screen sheen — a diagonal highlight across the glass. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[6px] rounded-b-[9px] bg-[linear-gradient(115deg,var(--sheen)_0%,transparent_28%,transparent_72%,color-mix(in oklab, var(--glow) 5%, transparent))]"
          />
        </div>

        {/* Floor reflection. Painted from the same URL as a CSS background
            rather than a second <img>, so it costs no extra decode and no extra
            DOM node — the bytes are already in cache from the screenshot above. */}
        {!reduced && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-full h-[42%] origin-top scale-y-[-1] rounded-b-[14px] opacity-30 blur-[2px]"
            style={{
              backgroundImage: `url("${asset.src}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'top center',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.75), transparent 72%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.75), transparent 72%)',
            }}
          />
        )}

        {children}
      </div>
    </div>
  );
};

export default DeviceFrame;
