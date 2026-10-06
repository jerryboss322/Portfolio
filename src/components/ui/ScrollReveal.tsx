import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export type RevealDirection = 'up' | 'left' | 'right' | 'none';

/** The elements a reveal is allowed to become. */
const MOTION = {
  div: motion.div,
  li: motion.li,
  span: motion.span,
} as const;

export type RevealTag = keyof typeof MOTION;

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  /**
   * Render as something other than a div.
   *
   * Needed wherever the reveal is a direct child of a list — a timeline inside
   * an `<ol>` has to emit `<li>`, and a div there breaks the list semantics for
   * assistive tech even though it looks identical.
   */
  as?: RevealTag;
  /** Which edge the content travels in from. `none` is a pure fade. */
  direction?: RevealDirection;
  /** Seconds to wait before starting. Use 0.1 steps to stagger a group. */
  delay?: number;
  /** Travel distance in pixels. Larger reads as a longer, slower entrance. */
  distance?: number;
  duration?: number;
  children: React.ReactNode;
}

/** The hidden-state offset for a direction, so the caller never builds it. */
const offset = (direction: RevealDirection, distance: number) => {
  switch (direction) {
    case 'left':
      return { x: -distance };
    case 'right':
      return { x: distance };
    case 'up':
      return { y: distance };
    default:
      return {};
  }
};

/**
 * Fades content in as it scrolls into view.
 *
 * `once` matters: the sections are tall enough that a visitor reading the middle
 * of the page will scroll an element back into range, and without it the entrance
 * replays under the reader's eye mid-sentence. The negative viewport margin fires
 * slightly before the element's top edge reaches the viewport, so the motion has
 * finished by the time it is comfortably readable.
 *
 * Under `prefers-reduced-motion` the initial offset is dropped and no `whileInView`
 * target is set, so the element renders in its final state with no transform and
 * no transition applied at any point in its life.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  as = 'div',
  direction = 'up',
  delay = 0,
  distance = 30,
  duration = 0.6,
  children,
  ...rest
}) => {
  const reduced = useReducedMotion();

  /* The three tags differ only in tag-specific attributes (`value` on li,
     nothing on div/span), none of which this component accepts. Without the
     cast TypeScript widens `Component` to a union and then demands every prop
     satisfy all three members at once. */
  const Component = MOTION[as] as typeof motion.div;

  return (
    <Component
      initial={reduced ? false : { opacity: 0, ...offset(direction, distance) }}
      whileInView={reduced ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default ScrollReveal;
