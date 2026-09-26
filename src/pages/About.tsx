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
    <section id="about" className="relative overflow-hidden border-t border-[rgba(255,255,255,0.08)]">
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
            <div className="relative overflow-hidden rounded-[24px] border border-[rgba(255,255,255,0.10)] bg-[#0A0E1A] p-2 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.95)]">
              <Media
                asset={portrait}
                alt={`Jerry Adewole — ${about.paragraphs[0]}`}
                sizes="(max-width: 1024px) 90vw, 420px"
                className="rounded-[17px]"
                imgClassName="object-cover object-top"
              />
              <div className="pointer-events-none absolute inset-2 rounded-[17px] bg-[linear-gradient(180deg,transparent_52%,rgba(2,4,10,0.88))]" />

              <div className="absolute inset-x-6 bottom-6">
                <div className="text-[15px] leading-[1.5] text-white">
                  “{about.pullQuote}”
                </div>
              </div>
            </div>

            {/* Accent plate breaking the frame. */}
            <div className="absolute -bottom-5 -right-5 rounded-[16px] border border-[#00F0FF]/25 bg-[#05080F]/90 px-5 py-3.5 backdrop-blur-xl">
              <div className="font-display text-[22px] font-bold leading-none tracking-tight">
                3<span className="text-[13px] text-[#00F0FF]">+</span>
              </div>
              <div className="mt-1.5 text-[9px] uppercase tracking-[0.16em] text-[#94A3B8]">
                Years
              </div>
            </div>
          </motion.div>
        </div>

        {/* ---- Copy + timeline ---- */}
        <div>
          <div className="text-[10px] uppercase tracking-[0.24em] text-[#00F0FF]/70">
            About
          </div>
          <h2 className="font-display mt-4 text-[34px] font-semibold leading-[0.95] tracking-[-0.03em] md:text-[48px]">
            <Text3D depth={reduced ? 1 : 14} step={0.9} tilt={3}>
              I BUILD THE WHOLE THING
            </Text3D>
          </h2>

          <p className="mt-6 max-w-[56ch] text-[15px] leading-[1.8] text-[#94A3B8]">
            {about.paragraphs[0]}
          </p>
          <p className="mt-4 max-w-[56ch] text-[14px] leading-[1.8] text-[#64748B]">
            {about.paragraphs[2]}
          </p>

          {/* Values as inline chips. */}
          <div className="mt-8 flex flex-wrap gap-2">
            {values.map((value) => (
              <span
                key={value.title}
                title={value.description}
                className="cursor-default rounded-lg border border-[rgba(255,255,255,0.09)] bg-white/[0.03] px-3 py-1.5 text-[11.5px] text-[#CBD5E1] transition-colors duration-300 hover:border-[#00F0FF]/30 hover:text-white"
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
                className="absolute left-[7px] top-2 bottom-2 w-px bg-[rgba(255,255,255,0.08)]"
              />
              {/* Fill */}
              <motion.span
                aria-hidden="true"
                className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-[linear-gradient(180deg,#00F0FF,#0077FF)]"
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
                      className="absolute -left-[25px] top-1.5 grid h-[9px] w-[9px] place-items-center rounded-full border border-[#00F0FF]/60 bg-[#05080F] shadow-[0_0_10px_rgba(0,240,255,0.5)]"
                    />
                    <div className="font-mono text-[10.5px] tracking-wider text-[#00F0FF]/80">
                      {entry.period}
                    </div>
                    <div className="font-display mt-1.5 text-[16px] font-semibold tracking-tight">
                      {entry.title}
                    </div>
                    <p className="mt-1.5 max-w-[52ch] text-[13px] leading-[1.65] text-[#94A3B8]">
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
