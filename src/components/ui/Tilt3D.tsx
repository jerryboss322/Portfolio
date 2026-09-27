import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks';

const SPRING = { stiffness: 160, damping: 20, mass: 0.5 };

interface Tilt3DProps {
  children: React.ReactNode;
  className?: string;
  /** Max rotation in degrees on each axis. */
  max?: number;
  /** Lift toward the viewer in px while hovered. */
  lift?: number;
  /** Pixels the pointer may travel from centre before the full tilt applies. */
  reach?: number;
  as?: 'div' | 'article' | 'li';
}

/**
 * Pointer-tracked 3D tilt.
 *
 * The card is rotated in a real `perspective` space and its children are
 * counter-translated along the view axis, so content at different `translateZ`
 * values parallax against each other instead of the whole card acting as a
 * flat billboard. Everything is driven by transform and opacity only, so it
 * stays on the compositor.
 */
export const Tilt3D: React.FC<Tilt3DProps> = ({
  children,
  className,
  max = 7,
  lift = 26,
  reach = 220,
  as = 'div',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [-reach, reach], [max, -max]), SPRING);
  const rotateY = useSpring(useTransform(px, [-reach, reach], [-max, max]), SPRING);
  const translateZ = useSpring(useMotionValue(0), SPRING);

  /* Glare that tracks the pointer across the surface. */
  const glareX = useTransform(px, [-reach, reach], ['18%', '82%']);
  const glareY = useTransform(py, [-reach, reach], ['12%', '88%']);

  const glare = useTransform(
    [glareX, glareY],
    ([gx, gy]: string[]) =>
      `radial-gradient(520px circle at ${gx} ${gy}, color-mix(in oklab, var(--accent) 13%, transparent), transparent 42%)`
  );

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set(event.clientX - (rect.left + rect.width / 2));
    py.set(event.clientY - (rect.top + rect.height / 2));
  };

  const handleEnter = () => {
    if (!reduced) translateZ.set(lift);
  };

  const handleLeave = () => {
    px.set(0);
    py.set(0);
    translateZ.set(0);
  };

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <div className={className} style={{ perspective: 1100 }}>
      <MotionTag
        ref={ref}
        onPointerMove={handleMove}
        onPointerEnter={handleEnter}
        onPointerLeave={handleLeave}
        style={
          reduced
            ? undefined
            : {
                rotateX,
                rotateY,
                z: translateZ,
                transformStyle: 'preserve-3d',
              }
        }
        className="relative h-full"
      >
        {children}
        {!reduced && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: glare }}
          />
        )}
      </MotionTag>
    </div>
  );
};

/** Counter-translates a child along Z so layers inside a Tilt3D separate. */
export const TiltLayer: React.FC<{
  children: React.ReactNode;
  depth: number;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, depth, className, style }) => (
  <div
    className={className}
    style={{ transform: `translateZ(${depth}px)`, transformStyle: 'preserve-3d', ...style }}
  >
    {children}
  </div>
);

export default Tilt3D;
