import React, { useEffect, useRef, useState } from 'react';
import type { ImageAsset } from '@/content/images';

interface MediaProps {
  asset: ImageAsset;
  alt: string;
  className?: string;
  /** Above-the-fold images skip lazy loading and the fade. */
  priority?: boolean;
  sizes?: string;
  imgClassName?: string;
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
}) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  /**
   * The `load` event is not enough on its own.
   *
   * When an image is already in the browser cache the event fires *before*
   * React attaches `onLoad`, so the handler never runs. The image would sit at
   * opacity 0 for the rest of the session and the visitor would only ever see
   * the 24px-wide placeholder. `complete` is already true in that case, so
   * checking it on mount closes the race. `naturalWidth` keeps a genuinely
   * broken image hidden behind its placeholder, which is what we want anyway.
   */
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, [asset.src]);

  return (
    <div
      className={['relative overflow-hidden', className].filter(Boolean).join(' ')}
      style={{
        /* The placeholder is dropped the moment the real image is there.
           For an opaque screenshot it is hidden behind the image anyway, but
           for a transparent cut-out it is not: the 24px blur scaled up to fill
           the box stays visible around the subject as a permanent halo, which
           reads as a glow behind the figure. */
        backgroundImage: loaded ? 'none' : `url("${asset.lqip}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        aspectRatio: `${asset.width} / ${asset.height}`,
      }}
    >
      <img
        ref={imgRef}
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
        className={[
          'absolute inset-0 h-full w-full object-cover transition-opacity duration-300',
          loaded ? 'opacity-100' : 'opacity-0',
          imgClassName ?? '',
        ]
          .filter(Boolean)
          .join(' ')}
      />
    </div>
  );
};

interface ProjectShotProps {
  asset: ImageAsset;
  alt: string;
  /** Short caption under the image — the app's name and its address. */
  caption: string;
  className?: string;
  sizes?: string;
}

/**
 * A project screenshot in a beveled plate.
 *
 * A raised plate with the screenshot recessed into it: the plate is lighter
 * than the page ground and the well is darker again, so the frame reads as depth
 * in both themes without any theme-conditional class here. `frame-plate` and
 * `frame-well` exist as separate tokens because the general surface ramp is too
 * tightly spaced to carry a bevel on a near-black ground.
 *
 * The rings are padding, not absolutely positioned insets. Absolute layers have
 * no intrinsic height and would collapse to nothing, so the frame would only
 * work with hand-written pixel dimensions per breakpoint — the fragile
 * Figma-export pattern this design otherwise avoids. Padding lets each layer
 * take its height from the image inside it.
 *
 * The radii step down 16 → 13 → 10 to match the 3px rings, keeping the corners
 * concentric; at one radius the corners fan out instead of stacking.
 */
export const ProjectShot: React.FC<ProjectShotProps> = ({
  asset,
  alt,
  caption,
  className,
  sizes = '(max-width: 1024px) 100vw, 560px',
}) => (
  <figure className={className}>
    <div className="rounded-[16px] bg-frame-plate p-[3px]">
      <div className="rounded-[13px] bg-frame-well p-[3px]">
        <div className="overflow-hidden rounded-[10px]">
          <Media asset={asset} alt={alt} sizes={sizes} />
        </div>
      </div>
    </div>
    {/* Inset to line up with the screenshot's left edge, not the plate's. */}
    <figcaption className="mt-2 pl-[7px] text-[12px] text-muted">
      {caption}
    </figcaption>
  </figure>
);

export default Media;
