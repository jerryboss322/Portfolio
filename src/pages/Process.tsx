import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks';
import { process } from '@/content/data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Each stage sits a little further back in Z than the last, alternating sides
   of a glowing spine. The result reads as steps walking away from you. */
const DEPTH_STEP = 48;
const NUDGE = 24;
const FAN = 9;

export const ProcessSection: React.FC = () => {
  const reduced = useReducedMotion();
  const spineRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: spineRef,
    offset: ['start 0.85', 'end 0.7'],
  });

  const fill = useTransform(scrollYProgress, [0, 1], [0.03, 1]);

  return (
    <section
      id="process"
      className="relative overflow-hidden border-t border-line bg-ink-850/60 py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="eyebrow">
              Process — 05 stages
            </div>
            <h2 className="font-display mt-4 text-[40px] font-semibold leading-[0.9] tracking-[-0.035em] md:text-[56px]">
              How I work
            </h2>
          </div>
          <p className="max-w-[38ch] text-[13px] leading-[1.7] text-body">
            The same five stages on every engagement, sized to the project. You
            see working software the whole way through — no black boxes.
          </p>
        </div>

        <div
          ref={spineRef}
          className="relative mt-14 [perspective:1700px]"
        >
          <div className="relative [transform-style:preserve-3d]">
            {/* Central spine */}
            <span
              aria-hidden="true"
              className="absolute left-4 top-0 h-full w-px bg-line-faint md:left-1/2 md:-translate-x-1/2"
            />
            <motion.span
              aria-hidden="true"
              className="absolute left-4 top-0 h-full w-px origin-top bg-[linear-gradient(180deg,var(--glow),var(--accent),transparent)] md:left-1/2 md:-translate-x-1/2"
              style={reduced ? undefined : { scaleY: fill }}
            />

            <ol className="space-y-5 md:space-y-2">
              {process.map((step, i) => {
                const right = i % 2 === 1;
                const depth = -i * DEPTH_STEP;

                return (
                  <motion.li
                    key={step.number}
                    initial={reduced ? false : { opacity: 0, y: 34 }}
                    whileInView={reduced ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-70px' }}
                    transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
                    className={[
                      'relative pl-12 md:grid md:grid-cols-2 md:items-center md:gap-10 md:pl-0',
                      right ? '' : '',
                    ].join(' ')}
                  >
                    {/* Node on the spine */}
                    <span
                      aria-hidden="true"
                      className={[
                        'absolute left-4 top-7 z-10 grid h-[9px] w-[9px] -translate-x-1/2 place-items-center rounded-full',
                        'border border-[var(--glow)]/70 bg-ink-850 shadow-[0_0_12px_rgba(0,240,255,0.6)]',
                        'md:left-1/2',
                      ].join(' ')}
                    />

                    <motion.div
                      style={
                        reduced
                          ? undefined
                          : {
                              /* Grid columns already alternate sides; the 3D
                                 comes from depth, so only nudge slightly. */
                              x: right ? NUDGE : -NUDGE,
                              z: depth,
                              rotateY: right ? -FAN : FAN,
                              transformStyle: 'preserve-3d',
                            }
                      }
                      className={[
                        'group relative overflow-hidden rounded-[18px] border',
                        'border-line-strong bg-ink-700/90 p-5 backdrop-blur-md',
                        'transition-[border-color,box-shadow] duration-500',
                        'hover:border-[var(--glow)]/35 hover:shadow-[0_26px_60px_-30px_rgba(0,240,255,0.5)]',
                        right ? 'md:col-start-2' : 'md:col-start-1',
                      ].join(' ')}
                    >
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_-10%,rgba(0,119,255,0.16),transparent_62%)]"
                      />

                      <div className="relative flex items-baseline gap-3">
                        <span className="font-display text-[26px] font-bold leading-none tracking-tighter text-display/12">
                          {step.number}
                        </span>
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full bg-glow shadow-[0_0_10px_rgba(0,240,255,0.8)]"
                        />
                      </div>

                      <h3 className="font-display relative mt-4 text-[17px] font-semibold tracking-tight">
                        {step.title}
                      </h3>
                      <p className="relative mt-2 max-w-[40ch] text-[12.5px] leading-[1.65] text-body md:max-w-none">
                        {step.description}
                      </p>
                    </motion.div>

                    {/* Mobile gutter so the spine does not overlap the card. */}
                    {right && <div className="hidden md:block" aria-hidden="true" />}
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
