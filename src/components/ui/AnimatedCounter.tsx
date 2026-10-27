import React, { useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks';

interface AnimatedCounterProps {
  value: string;
  className?: string;
  duration?: number;
}

/**
 * Parses numeric strings like '100%', '4+ yrs', '< 24h', '6'
 * into prefix, target number, and suffix.
 */
function parseValue(val: string): { prefix: string; target: number | null; suffix: string } {
  const match = val.match(/^([^0-9]*)([0-9]+)(.*)$/);
  if (!match) {
    return { prefix: '', target: null, suffix: val };
  }
  return {
    prefix: match[1],
    target: parseInt(match[2], 10),
    suffix: match[3],
  };
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  className,
  duration = 1.2,
}) => {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const [current, setCurrent] = useState<number>(0);

  const parsed = parseValue(value);

  useEffect(() => {
    if (reduced || parsed.target === null || !isInView) {
      if (parsed.target !== null) {
        setCurrent(parsed.target);
      }
      return;
    }

    const start = 0;
    const end = parsed.target;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    let frameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Ease out expo: 1 - 2^(-10t)
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const nextVal = Math.round(start + (end - start) * ease);

      setCurrent(nextVal);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, parsed.target, duration, reduced]);

  if (reduced || parsed.target === null) {
    return <span ref={ref} className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      {current}
      {parsed.suffix}
    </span>
  );
};

export default AnimatedCounter;
