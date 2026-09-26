import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/lib/hooks';

const GLYPHS = '▚▞█▓▒░<>/\\|=+-*#%$@01';

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** Seconds a full character takes to lock in after the sweep passes it. */
  speed?: number;
  /** Stagger in seconds per character. */
  stagger?: number;
  delay?: number;
}

/**
 * Decodes a string into place when it first enters the viewport.
 *
 * The real string is always present in the DOM behind a visually-hidden node
 * and on the wrapper's aria-label, so assistive tech and crawlers read the
 * finished text rather than the scramble. With reduced motion the effect is
 * skipped and the text renders immediately.
 */
export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className,
  speed = 0.028,
  stagger = 0.014,
  delay = 0,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [output, setOutput] = useState(text);
  const started = useRef(false);

  useEffect(() => {
    if (reduced) {
      setOutput(text);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const chars = Array.from(text);
    let raf = 0;
    let timer = 0;
    let startTime = 0;

    const run = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = (now - startTime) / 1000;

      let settled = true;
      const next = chars.map((char, i) => {
        if (char === ' ') return ' ';
        const lockAt = delay + i * stagger;
        if (elapsed < lockAt) {
          settled = false;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        const since = (elapsed - lockAt) / speed;
        if (since >= 1) return char;
        settled = false;
        /* Last few frames still jittering before the character locks. */
        return Math.random() < 0.5
          ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          : char;
      });

      setOutput(next.join(''));

      if (settled) {
        setOutput(text);
        return;
      }
      raf = requestAnimationFrame(run);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();
        timer = window.setTimeout(() => {
          raf = requestAnimationFrame(run);
        }, delay * 1000);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [text, speed, stagger, delay, reduced]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{output}</span>
    </span>
  );
};

export default ScrambleText;
