import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';
import { systemsPrinciples } from '@/content/data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const OrbBackground: React.FC = () => {
  const [reduced, setReduced] = useState(false);

  React.useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {!reduced && (
        <>
          <motion.div
            className="absolute h-72 w-72 rounded-full opacity-[0.12] blur-[80px]"
            style={{
              top: '10%',
              left: '5%',
              background: 'radial-gradient(circle at 30% 30%, #0077FF, #00F0FF 60%, transparent 70%)',
            }}
            animate={{ y: [-20, 20, -15], x: [-15, 10, -10], rotate: [0, 90, 180] }}
            transition={{ duration: 14, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute h-72 w-72 rounded-full opacity-[0.12] blur-[80px]"
            style={{
              bottom: '5%',
              right: '8%',
              background: 'radial-gradient(circle at 70% 40%, #00F0FF, #0077FF 60%, transparent 70%)',
            }}
            animate={{ y: [15, -20, 10], x: [10, -15, 5], rotate: [180, 90, 0] }}
            transition={{
              duration: 18,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: 1,
            }}
          />
          <motion.div
            className="absolute left-1/2 top-[45%] h-[22rem] w-[22rem] -translate-x-1/2 rounded-full opacity-[0.10] blur-[90px]"
            style={{ background: 'radial-gradient(circle at 50% 50%, #0077FF, transparent 70%)' }}
            animate={{ y: [-10, 15, -5], x: [-5, 8, -8], rotate: [0, 180, 360] }}
            transition={{
              duration: 16,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: 0.5,
            }}
          />
        </>
      )}
    </div>
  );
};

export const SystemsSection: React.FC = () => {
  const [reduced, setReduced] = useState(false);

  React.useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <section
      id="systems"
      className="relative mx-auto max-w-[1200px] overflow-hidden px-6 py-20 md:px-8 md:py-28"
    >
      <OrbBackground />

      <Reveal>
        <div className="relative z-10 flex items-baseline gap-3">
          <h2 className="font-display text-[28px] font-semibold tracking-tight md:text-[36px]">
            Systems thinking
          </h2>
          <span className="text-[11px] tracking-[0.18em] text-[#94A3B8]">PRINCIPLES • 06</span>
        </div>
      </Reveal>

      <div className="relative z-10 mt-10 grid gap-[1px] overflow-hidden rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.08)] md:grid-cols-3">
        {systemsPrinciples.map((item, index) => (
          <motion.div
            key={item.id}
            initial={reduced ? false : { y: 30, rotateX: -10, opacity: 0 }}
            whileInView={reduced ? {} : { y: 0, rotateX: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.07, ease: EASE }}
            whileHover={reduced ? {} : { y: -4, backgroundColor: 'rgba(10,14,26,0.9)' }}
            style={{ transformStyle: 'preserve-3d', perspective: 800 }}
            className="bg-[#0A0E1A] p-6 md:p-7"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] tracking-[0.2em] text-[#94A3B8]">{item.id}</span>
              <span className="h-px w-10 bg-[rgba(255,255,255,0.08)]" />
            </div>
            <div className="font-display mt-4 text-[18px] font-semibold tracking-tight">
              {item.title}
            </div>
            <div className="mt-2 text-[13px] leading-[1.6] text-[#94A3B8]">{item.description}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SystemsSection;
