import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks';

interface Text3DProps {
  children: string;
  className?: string;
  /** Number of extrusion slices. Each one is a real DOM node. */
  depth?: number;
  /** Distance between slices along Z, in px. */
  step?: number;
  /** Back-face colour and front-face colour of the extrusion. */
  back?: string;
  front?: string;
  /** Pointer tilt strength in degrees. */
  tilt?: number;
  /** Dim the extrusion as it recedes, so the sides read as solid volume. */
  shade?: boolean;
}

const SPRING = { stiffness: 130, damping: 22, mass: 0.6 };

/**
 * Extruded 3D text built from real CSS 3D transforms.
 *
 * The word is duplicated into `depth` slices stacked along Z inside a
 * preserve-3d context. Slices darken as they recede so the form reads as solid
 * volume rather than a stack of identical copies, and the whole block leans
 * toward the pointer.
 *
 * Cost: `depth` static nodes, no per-frame work when idle, and every animated
 * property is a transform. The slices are aria-hidden and the front copy holds
 * the real text, so screen readers and crawlers get the string once.
 *
 * Slices are absolutely positioned over the front face rather than nowrap, so a
 * long string wraps identically in every slice and the block stays one heading.
 */
export const Text3D: React.FC<Text3DProps> = ({
  children,
  className,
  depth = 18,
  step = 1.15,
  back = 'var(--accent-deep)',
  front = 'var(--text-display)',
  tilt = 6,
  shade = true,
}) => {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-260, 260], [tilt, -tilt]), SPRING);
  const rotateX = useSpring(useTransform(py, [-200, 200], [-tilt * 0.7, tilt * 0.7]), SPRING);

  const interactive = !reduced && tilt > 0;

  const handleMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    if (!interactive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set(event.clientX - (rect.left + rect.width / 2));
    py.set(event.clientY - (rect.top + rect.height / 2));
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  const slices = React.useMemo(
    () => Array.from({ length: depth }, (_, i) => i),
    [depth]
  );

  return (
    <motion.span
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={
        interactive
          ? {
              // Perspective is what makes translateZ visible at all — with only
              // preserve-3d the slices would sit flat on top of each other.
              perspective: 900,
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }
          : { perspective: 900, transformStyle: 'preserve-3d' }
      }
      className={['relative inline-block', className].filter(Boolean).join(' ')}
    >
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className="relative inline-block [transform-style:preserve-3d]">
        {/* Slices, back to front. The last one is the visible face. */}
        {slices.map((i) => {
          const t = depth === 1 ? 1 : i / (depth - 1);
          const z = -(depth - 1 - i) * step;
          return (
            <span
              key={i}
              className="absolute inset-0"
              style={{
                transform: `translateZ(${z}px)`,
                color: shade ? undefined : back,
                opacity: shade ? 1 : t,
              }}
            >
              {shade ? (
                <span style={{ color: mix(back, front, t * t) }}>{children}</span>
              ) : (
                children
              )}
            </span>
          );
        })}
        {/* The front face. */}
        <span className="relative" style={{ color: front }}>
          {children}
        </span>
      </span>
    </motion.span>
  );
};

/**
/**
 * Resolve a colour to [r, g, b]. Accepts hex or any CSS colour string.
 *
 * Token values arrive as `var(--…)`, which cannot be parsed numerically, so
 * they are resolved through a throwaway element. That forces a synchronous
 * style recalc — doing it per slice meant ~80 forced reflows on first paint
 * and pushed the test suite past its timeout. Results are cached and keyed by
 * theme, because the resolved value flips with the palette.
 */
const rgbCache = new Map<string, [number, number, number]>();

const resolveColor = (value: string): [number, number, number] => {
  const v = value.trim();

  if (v.startsWith('#')) {
    const hex = v.slice(1);
    const full = hex.length === 3 ? hex.split('').map((c) => c + c).join('') : hex;
    return [
      parseInt(full.slice(0, 2), 16),
      parseInt(full.slice(2, 4), 16),
      parseInt(full.slice(4, 6), 16),
    ];
  }

  const theme = document.documentElement.dataset.theme ?? 'dark';
  const key = `${theme}:${v}`;
  const hit = rgbCache.get(key);
  if (hit) return hit;

  const probe = document.createElement('span');
  probe.style.color = v;
  document.body.appendChild(probe);
  const rgb = getComputedStyle(probe).color;
  probe.remove();

  const [r = 0, g = 0, b = 0] = rgb.match(/[\d.]+/g)?.map(Number) ?? [];
  const out: [number, number, number] = [r, g, b];
  rgbCache.set(key, out);
  return out;
};

/** Blend two colours. Resolves through the cache so tokens work as either end. */
const mix = (from: string, to: string, t: number): string => {
  const a = resolveColor(from);
  const b = resolveColor(to);
  const k = Math.min(1, Math.max(0, t));
  return `rgb(${a.map((av, i) => Math.round(av + (b[i] - av) * k)).join(' ')})`;
};

export default Text3D;
