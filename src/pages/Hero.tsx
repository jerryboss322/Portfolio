import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HeroCanvas } from '@/components/canvas/HeroCanvas';
import { Reveal } from '@/components/ui/Reveal';
import { ScrollLink } from '@/components/ui/ScrollLink';
import { profile, heroWords, heroIntro } from '@/content/data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HERO_STATS = [
  { k: '5', v: 'Projects' },
  { k: '100%', v: 'Craft' },
  { k: '<100ms', v: 'Motion' },
];

export const Hero: React.FC = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <section id="home" className="relative flex min-h-[90vh] items-center overflow-hidden">
      <HeroCanvas />

      {/* Radial gradient wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(60%_60%_at_70%_30%,rgba(0,119,255,0.12),transparent_60%),radial-gradient(40%_40%_at_20%_80%,rgba(0,240,255,0.08),transparent)]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1200px] items-center gap-12 overflow-hidden px-6 py-20 md:grid-cols-[1.15fr_0.85fr] md:px-8 md:py-28">
        {/* Left column */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.08)] bg-white/[0.03] px-3 py-1 text-[11px] tracking-[0.14em] text-[#94A3B8]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00F0FF]" />
              {profile.status.toUpperCase()} — 2026
            </span>
          </Reveal>

          <div className="mt-6">
            <h1
              aria-label="Engineering detail into digital systems."
              className="font-display text-[40px] font-bold leading-[0.92] tracking-[-0.04em] md:text-[62px]"
            >
              <span className="inline-block">
                {heroWords.map((word, index) => (
                  <motion.span
                    key={`${word}-${index}`}
                    className="mr-[0.22em] inline-block"
                    initial={reduced ? false : { y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={reduced ? undefined : { duration: 0.7, delay: 0.08 * index, ease: EASE }}
                  >
                    {word + ' '}
                  </motion.span>
                ))}
              </span>
            </h1>
          </div>

          <Reveal delay={0.4}>
            <p className="mt-6 max-w-[52ch] text-[16px] leading-[1.7] text-[#94A3B8] md:text-[17px]">
              {heroIntro}
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ScrollLink
                to="work"
                className="grid h-[44px] cursor-pointer place-items-center rounded-full bg-white px-6 text-[14px] font-medium tracking-wide text-black transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_10px_30px_rgba(0,119,255,0.35)] active:translate-y-0"
              >
                View Work →
              </ScrollLink>
              <motion.a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduced ? {} : { y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="grid h-[44px] cursor-pointer place-items-center rounded-full bg-[#F8FAFC] px-5 text-[14px] font-medium tracking-wide text-black transition-colors duration-300 hover:bg-white"
              >
                GitHub — github.com/jerryboss322
              </motion.a>
            </div>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="mt-10 grid max-w-[420px] grid-cols-3 border-t border-[rgba(255,255,255,0.08)] pt-6">
              {HERO_STATS.map((stat) => (
                <div key={stat.v}>
                  <div className="font-display text-[22px] font-semibold tracking-tight">
                    {stat.k}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#94A3B8]">
                    {stat.v}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right column — profile card */}
        <motion.div
          className="relative"
          animate={reduced ? {} : { y: [-6, 6] }}
          transition={
            reduced
              ? {}
              : { duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
          }
        >
          {!reduced && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-3 rounded-[28px] border border-[#0077FF]/20"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <div
                className="absolute inset-0 rounded-[28px] border border-[#00F0FF]/15"
                style={{ transform: 'rotateX(60deg)' }}
              />
            </motion.div>
          )}

          <div className="relative overflow-hidden rounded-[24px]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[32px] bg-[radial-gradient(60%_60%_at_50%_30%,rgba(0,119,255,0.22),rgba(0,240,255,0.14)_40%,transparent_70%)] blur-[28px]"
            />
            <div className="rounded-[24px] border border-[rgba(255,255,255,0.08)] bg-[#0A0E1A]/70 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:p-6">
              <div className="flex items-center gap-4">
                <div className="relative h-[76px] w-[76px] rounded-full bg-[linear-gradient(135deg,#0077FF,#00F0FF)] p-[2px]">
                  <div className="h-full w-full overflow-hidden rounded-full bg-[#02040A]">
                    <img
                      src={profile.heroPortrait}
                      alt={`${profile.name} avatar`}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-[#02040A]">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                  </span>
                </div>
                <div>
                  <div className="font-display text-[18px] font-semibold leading-none tracking-tight">
                    Jerry — {profile.name}
                  </div>
                  <div className="mt-1.5 text-[12px] leading-[1.4] text-[#94A3B8]">
                    Software Engineer / Full-Stack
                    <br />
                    {profile.location} • UTC+1
                  </div>
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[#02040A]">
                <div className="relative aspect-[4/3]">
                  <img
                    src={profile.heroPortrait}
                    alt={profile.name}
                    className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(2,4,10,0.85)_100%)]" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[11px] tracking-[0.14em] text-white/70">
                      PROFILE — 2026
                    </span>
                    <span className="grid h-6 place-items-center rounded-full bg-white px-2.5 text-[11px] font-medium text-black">
                      Available
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-[12px]">
                <div className="rounded-full border border-[rgba(255,255,255,0.08)] bg-white/[0.03] px-3 py-2 text-[#94A3B8]">
                  <span className="text-white">Stack:</span> Next.js • React
                </div>
                <div className="rounded-full border border-[rgba(255,255,255,0.08)] bg-white/[0.03] px-3 py-2 text-[#94A3B8]">
                  <span className="text-white">Focus:</span> Systems &amp; Detail
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
