import React from 'react';
import { motion } from 'framer-motion';
import { HeroCanvas } from '@/components/canvas/HeroCanvas';
import { Magnetic } from '@/components/ui/Magnetic';
import { Media } from '@/components/ui/Media';
import { ScrambleText } from '@/components/ui/ScrambleText';
import { Text3D } from '@/components/ui/Text3D';
import { ScrollLink } from '@/components/ui/ScrollLink';
import { useReducedMotion } from '@/lib/hooks';
import { portrait } from '@/content/images';
import { profile, coreSkills, heroIntro, heroWords } from '@/content/data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PRIMARY_CTA =
  'grid h-[46px] cursor-pointer place-items-center rounded-full bg-display px-7 text-[14px] font-medium tracking-wide text-onaccent transition-colors duration-300 hover:bg-bright';

const SECONDARY_CTA =
  'grid h-[46px] cursor-pointer place-items-center rounded-full border border-line-strong px-6 text-[14px] font-medium tracking-wide text-display transition-colors duration-300 hover:border-white/35 hover:bg-tint-3';

const MARQUEE = [...coreSkills, ...coreSkills];

export const Hero: React.FC = () => {
  const reduced = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100svh-64px)] flex-col justify-between overflow-hidden"
    >
      <HeroCanvas />

      {/* Reading scrim. The nebula is decoration; the copy has to win. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5] bg-[linear-gradient(100deg,var(--scrim)_0%,color-mix(in_oklab,var(--scrim)_78%,transparent)_38%,color-mix(in_oklab,var(--scrim)_22%,transparent)_62%,transparent_85%)]"
      />

      {/* Vertical side rail — desktop only, purely editorial texture. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 xl:block"
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] tracking-[0.3em] text-body [writing-mode:vertical-rl]">
            {profile.location.toUpperCase()} — UTC+1
          </span>
          <span className="h-16 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] min-h-0 flex-1 px-6 md:px-10">
        <div className="grid min-h-full items-center gap-12 py-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
          {/* ---- Copy column ---- */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={reduced ? false : { y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex w-fit items-center gap-2.5 rounded-full border border-line-strong bg-tint-2 px-3.5 py-1.5 text-[10px] tracking-[0.16em] text-bright backdrop-blur-md"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glow opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-glow" />
              </span>
              {profile.status.toUpperCase()}
            </motion.div>

            {/* The display line, extruded in 3D. */}
            <h1 className="font-display mt-7 text-[38px] font-bold uppercase leading-[0.88] tracking-[-0.04em] sm:text-[52px] lg:max-w-[15ch] lg:text-[68px]">
              <Text3D depth={reduced ? 1 : 18} step={1.15} tilt={5}>
                {heroWords.join(' ')}
              </Text3D>
            </h1>

            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:gap-8">
              <p className="max-w-[46ch] text-[15px] leading-[1.75] text-body md:text-[16px]">
                {heroIntro}
              </p>

              <div className="flex shrink-0 items-center gap-2.5 sm:pb-1">
                {[
                  { k: '03', v: 'Years shipping' },
                  { k: '05', v: 'Systems built' },
                ].map((s) => (
                  <div
                    key={s.v}
                    className="rounded-[12px] border border-line bg-tint-1 px-3.5 py-2.5 backdrop-blur-md"
                  >
                    <div className="font-display text-[17px] font-semibold leading-none text-signal">
                      {s.k}
                    </div>
                    <div className="mt-1 text-[9px] uppercase tracking-[0.14em] text-body">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic strength={18}>
                <ScrollLink to="work" className={PRIMARY_CTA}>
                  View Work
                </ScrollLink>
              </Magnetic>
              <Magnetic strength={14}>
                <ScrollLink to="contact" className={SECONDARY_CTA}>
                  Start a project
                </ScrollLink>
              </Magnetic>
              <motion.a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduced ? {} : { y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="ml-1 inline-flex h-[46px] cursor-pointer items-center gap-2 px-2 text-[13px] text-body transition-colors hover:text-display"
              >
                <span aria-hidden="true" className="text-[13px] leading-none">↗</span>
                GitHub
              </motion.a>
            </div>
          </div>

          {/* ---- Identity column ---- */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            className="relative hidden justify-self-end lg:block"
            style={{ perspective: 1200 }}
          >
            <div className="relative w-[290px]">
              {/* Orbital rings behind the portrait. */}
              {!reduced && (
                <>
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-glow/20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
                  >
                    <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow shadow-[0_0_14px_color-mix(in_oklab,var(--glow)_90%,transparent)]" />
                  </motion.div>
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent/25"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                  />
                </>
              )}

              <motion.div
                animate={reduced ? {} : { y: [-7, 7] }}
                transition={
                  reduced
                    ? {}
                    : { duration: 5.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
                }
                className="relative overflow-hidden rounded-[22px] border border-line-strong bg-ink-700/70 p-2 shadow-elev-5 backdrop-blur-xl"
              >
                <Media
                  asset={portrait}
                  alt={`${profile.name} — software engineer`}
                  priority
                  sizes="280px"
                  className="rounded-[16px]"
                  imgClassName="object-cover object-top"
                />

                <div className="pointer-events-none absolute inset-2 rounded-[16px] bg-[linear-gradient(180deg,transparent_45%,var(--media-scrim))]" />

                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                  <div>
                    <div className="text-[10px] tracking-[0.2em] text-glow">
                      {profile.name}
                    </div>
                    <div className="mt-1 text-[15px] font-semibold leading-tight text-onmedia">
                      {profile.role}
                    </div>
                  </div>
                  <span className="grid h-7 shrink-0 place-items-center rounded-full bg-display px-3 text-[10px] font-semibold text-onaccent">
                    Open
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ---- Tech marquee ---- */}
      <div className="relative z-10 shrink-0 border-t border-line-faint bg-ink-900/50 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-6 overflow-hidden">
          <span className="shrink-0 pl-6 text-[10px] tracking-[0.24em] text-muted">
            STACK
          </span>
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
            <div
              className="flex w-max gap-8 will-change-transform"
              style={
                reduced
                  ? undefined
                  : { animation: 'marquee 38s linear infinite' }
              }
            >
              {MARQUEE.map((skill, i) => (
                <span
                  key={`${skill}-${i}`}
                  className="flex shrink-0 items-center gap-8 text-[12px] tracking-[0.18em] text-body"
                >
                  {skill.toUpperCase()}
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-glow/50" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-24 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[10px] tracking-[0.26em] text-body lg:flex">
        <ScrambleText text="SCROLL" speed={0.05} stagger={0.03} />
        <span aria-hidden="true" className="h-10 w-px bg-gradient-to-b from-glow to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
