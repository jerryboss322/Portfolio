import React, { useEffect, useRef } from 'react';

/**
 * Thin gradient bar under the header showing how far down the page you are.
 *
 * Uses native CSS Scroll-Driven Animations (`animation-timeline: scroll(root block)`)
 * on the compositor thread when supported, with a passive RAF scroll listener
 * fallback for browsers without native ScrollTimeline support.
 */
export const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      (typeof CSS !== 'undefined' &&
        typeof CSS.supports === 'function' &&
        CSS.supports('animation-timeline', 'scroll()'))
    ) {
      return;
    }

    let rafId = 0;
    const update = () => {
      rafId = 0;
      const el = barRef.current;
      if (!el) return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      el.style.transform = `scaleX(${ratio})`;
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="scroll-progress-bar pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left scale-x-0 bg-gradient-to-r from-accent via-accent-indigo to-accent-purple"
    />
  );
};

export default ScrollProgress;
