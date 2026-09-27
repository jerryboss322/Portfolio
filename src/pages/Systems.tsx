import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks';
import { systemsPrinciples } from '@/content/data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SPACING = 236;
const MAX_TURN = 26;
const DEPTH = 74;
const COUNT = systemsPrinciples.length;

/**
 * The six principles as a scroll-driven 3D coverflow.
 *
 * A full 360-degree ring was the obvious idea and it is the wrong one: only the
 * front 180 degrees of a ring is ever visible, so half the cards are permanently
 * hidden and the wheel reads as empty. Cards here travel *through* the centre
 * instead, so every principle is on screen, the focused card is square to the
 * viewer, and the ones either side turn away but never past 90 degrees — which
 * is what keeps their text from ever showing mirrored.
 *
 * The whole thing is transform-only, so scrolling costs no layout or paint.
 */
export const SystemsSection: React.FC = () => {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.95', 'end 0.45'],
  });

  /* 0 -> first card centred, 1 -> last card centred. */
  const travel = useTransform(scrollYProgress, [0, 1], [0, COUNT - 1]);

  return (
    <section
      ref={sectionRef}
      id="systems"
      className="relative overflow-hidden border-y border-line bg-ink-800 py-20 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_50%,rgba(0,119,255,0.13),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="eyebrow">
              Operating principles
            </div>
            <h2 className="font-display mt-4 text-[40px] font-semibold leading-[0.9] tracking-[-0.035em] md:text-[58px]">
              How I think
            </h2>
          </div>
          <p className="max-w-[36ch] text-[13px] leading-[1.7] text-body">
            Six rules I apply to every project, client or personal. They decide
            what gets cut when the timeline gets tight.
          </p>
        </div>
      </div>

      {reduced ? (
        /* Same content, no carousel — nothing is gated behind the scroll. */
        <div className="relative mx-auto mt-12 grid max-w-[1280px] gap-3 px-6 sm:grid-cols-2 lg:grid-cols-3 md:px-10">
          {systemsPrinciples.map((item, i) => (
            <PrincipleCard key={item.id} item={item} index={i} reduced />
          ))}
        </div>
      ) : (
        <>
          <div className="relative mt-16 h-[400px] overflow-hidden [perspective:1500px]">
            <div className="absolute inset-0 [transform-style:preserve-3d]">
              {systemsPrinciples.map((item, i) => (
                <FlowCard
                  key={item.id}
                  item={item}
                  index={i}
                  travel={travel}
                />
              ))}
            </div>

            {/* Depth cues at the edges. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-[linear-gradient(to_right,var(--ink-800),transparent)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-[linear-gradient(to_left,var(--ink-800),transparent)]"
            />
          </div>

          <div className="relative mx-auto -mt-2 max-w-[1280px] px-6 text-center md:px-10">
            <span className="rounded-full border border-line-strong bg-ink-800/80 px-4 py-1.5 eyebrow backdrop-blur">
              Scroll to step through
            </span>
          </div>
        </>
      )}
    </section>
  );
};

const FlowCard: React.FC<{
  item: (typeof systemsPrinciples)[number];
  index: number;
  travel: MotionValue<number>;
}> = ({ item, index, travel }) => {
  /* Signed distance from whichever card is currently centred. */
  const rel = useTransform(travel, (t) => index - t);

  const x = useTransform(rel, (r) => r * SPACING);
  const rotateY = useTransform(rel, (r) => -Math.max(-1, Math.min(1, r * 0.42)) * MAX_TURN);
  const z = useTransform(rel, (r) => -Math.abs(r) * DEPTH);
  const scale = useTransform(rel, (r) => 1 - Math.min(0.28, Math.abs(r) * 0.055));
  const opacity = useTransform(rel, (r) => 1 - Math.min(0.75, Math.abs(r) * 0.16));

  return (
    <motion.article
      style={{ x, rotateY, z, scale, opacity, transformStyle: 'preserve-3d' }}
      className="absolute left-1/2 top-1/2 w-[212px] -translate-x-1/2 -translate-y-1/2"
    >
      <div
        className={[
          'h-full overflow-hidden rounded-[20px] border p-6 backdrop-blur-md',
          'border-line-strong',
          'bg-[linear-gradient(160deg,rgba(15,23,42,0.96),rgba(8,12,22,0.96))]',
          'shadow-[0_30px_70px_-40px_rgba(0,0,0,0.95)]',
        ].join(' ')}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_0%,rgba(0,119,255,0.16),transparent_60%)]"
        />

        <div className="relative flex items-baseline justify-between">
          <span className="font-display text-[13px] font-semibold tracking-[0.18em] text-glow/75">
            {item.id}
          </span>
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-glow shadow-[0_0_10px_rgba(0,240,255,0.7)]"
          />
        </div>

        <h3 className="font-display relative mt-5 text-[18px] font-semibold leading-tight tracking-tight">
          {item.title}
        </h3>
        <p className="relative mt-3 text-[12.5px] leading-[1.7] text-body">
          {item.description}
        </p>
      </div>
    </motion.article>
  );
};

const PrincipleCard: React.FC<{
  item: (typeof systemsPrinciples)[number];
  index: number;
  reduced: boolean;
}> = ({ item, index, reduced }) => (
  <motion.article
    initial={reduced ? false : { opacity: 0, y: 22 }}
    whileInView={reduced ? {} : { opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
    className="relative overflow-hidden rounded-[18px] border border-line-strong bg-[linear-gradient(160deg,rgba(15,23,42,0.95),rgba(8,12,22,0.95))] p-5"
  >
    <div className="flex items-baseline justify-between">
      <span className="font-display text-[13px] font-semibold tracking-[0.16em] text-glow/70">
        {item.id}
      </span>
    </div>
    <h3 className="font-display mt-4 text-[17px] font-semibold leading-tight tracking-tight">
      {item.title}
    </h3>
    <p className="mt-2.5 text-[12.5px] leading-[1.65] text-body">{item.description}</p>
  </motion.article>
);

export default SystemsSection;
