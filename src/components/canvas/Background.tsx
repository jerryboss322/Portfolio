import React from 'react';

const usePrefersReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
};

export const Background: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Grain layer */}
      <div className="bg-grain absolute inset-0" />

      {/* Floating orbs */}
      <div className="bg-orb bg-orb-1 absolute rounded-full" />
      <div className="bg-orb bg-orb-2 absolute rounded-full" />
      <div className="bg-orb bg-orb-3 absolute rounded-full" />
    </div>
  );
};

export default Background;
