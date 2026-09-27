import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Media } from '@/components/ui/Media';
import { Text3D } from '@/components/ui/Text3D';
import { useReducedMotion } from '@/lib/hooks';
import { portrait } from '@/content/images';
import { about, values } from '@/content/data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * About: an asymmetric two-column with a tilted 3D portrait on the left and a
 * vertical timeline whose spine fills as you scroll on the right.
 */
export const AboutSection: React.FC = () => {
  const reduced = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.85', 'end 0.6'],
  });

  /* The spine fills to match scroll progress instead of jumping on reveal. */
  const spineScale = useTransform(scrollYProgress, [0, 1], [0.04, 1]);

  return (
    <section id="about" className="relative overflow-hidden border-t border-line bg-raised">
      <div className="pointer-events-none absolute inset-0 bg-bloom-tr" aria-hidden="true" />
      <div className="mx-auto grid max-w-[1280px] gap-14 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        {/* ---- Portrait ---- */}
        <div className="relative [perspective:1300px]">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 34 }}
            whileInView={reduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative"
            style={reduced ? undefined : { transform: 'rotateY(8deg) rotateX(3deg)' }}
          >
            <div className="relative overflow-hidden rounded-[24px] border border-line-strong bg-ink-700 p-2 shadow-elev-5">
              <Media
                asset={portrait}
                alt={`Jerry Adewole — ${about.paragraphs[0]}`}
                sizes="(max-width: 1024px) 90vw, 420px"
                className="rounded-[17px]"
                imgClassName="object-cover object-top"
              />
              <div className="pointer-events-none absolute inset-2 rounded-[17px] bg-[linear-gradient(180deg,transparent_52%,color-mix(in oklab, var(--ink-900) 88%, transparent))]" />

              <div className="absolute inset-x-6 bottom-6">
                <div className="text-[15px] leading-[1.5] text-display">
                  “{about.pullQuote}”
                </div>
              </div>
            </div>

            {/* Accent plate breaking the frame. */}
            <div className="absolute -bottom-5 -right-5 rounded-[16px] border border-glow/25 bg-ink-800/90 px-5 py-3.5 backdrop-blur-xl">
              <div className="font-display text-[22px] font-bold leading-none tracking-tight">
                3<span className="text-[13px] text-glow">+</span>
              </div>
              <div className="mt-1.5 text-[9px] uppercase tracking-[0.16em] text-body">
                Years
              </div>
            </div>
          </motion.div>
        </div>

        {/* ---- Copy + timeline ---- */}
        <div>
          <div className="eyebrow">
            About
          </div>
          <h2 className="font-display mt-4 text-[34px] font-semibold leading-[0.95] tracking-[-0.03em] md:text-[48px]">
            <Text3D depth={reduced ? 1 : 14} step={0.9} tilt={3}>
              I BUILD THE WHOLE THING
            </Text3D>
          </h2>

          <p className="mt-6 max-w-[56ch] text-[15px] leading-[1.8] text-body">
            {about.paragraphs[0]}
          </p>
          <p className="mt-4 max-w-[56ch] text-[14px] leading-[1.8] text-muted">
            {about.paragraphs[2]}
          </p>

          {/* Values as inline chips. */}
          <div className="mt-8 flex flex-wrap gap-2">
            {values.map((value) => (
              <span
                key={value.title}
                title={value.description}
                className="cursor-default rounded-lg border border-line-strong bg-tint-1 px-3 py-1.5 text-[11.5px] text-bright transition-colors duration-300 hover:border-glow/30 hover:text-display"
              >
                {value.title}
              </span>
            ))}
          </div>

          {/* Timeline with a scroll-driven spine. */}
          <div ref={timelineRef} className="relative mt-11">
            <div className="relative pl-7">
              {/* Track */}
              <span
                aria-hidden="true"
                className="absolute left-[7px] top-2 bottom-2 w-px bg-line"
              />
              {/* Fill */}
              <motion.span
                aria-hidden="true"
                className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-[linear-gradient(180deg,var(--glow),var(--accent))]"
                style={reduced ? undefined : { scaleY: spineScale }}
              />

              <ol className="space-y-8">
                {about.timeline.map((entry, i) => (
                  <motion.li
                    key={entry.period}
                    initial={reduced ? false : { opacity: 0, x: -14 }}
                    whileInView={reduced ? {} : { opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                    className="relative"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -left-[25px] top-1.5 grid h-[9px] w-[9px] place-items-center rounded-full border border-glow/60 bg-ink-800 shadow-[0_0_10px_color-mix(in_oklab,var(--glow)_50%,transparent)]"
                    />
                    <div className="font-mono text-[10.5px] tracking-wider text-glow/80">
                      {entry.period}
                    </div>
                    <div className="font-display mt-1.5 text-[16px] font-semibold tracking-tight">
                      {entry.title}
                    </div>
                    <p className="mt-1.5 max-w-[52ch] text-[13px] leading-[1.65] text-body">
                      {entry.description}
                    </p>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
