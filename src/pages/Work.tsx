import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DeviceFrame } from '@/components/ui/Media';
import { ScrambleText } from '@/components/ui/ScrambleText';
import { Text3D } from '@/components/ui/Text3D';
import { useReducedMotion } from '@/lib/hooks';
import { projects, type Project } from '@/content/data';
import {
  projectImage_titan,
  projectImage_luxora,
  projectImage_sallygreen,
  projectImage_tastetrail,
  projectImage_jbet,
  type ImageAsset,
} from '@/content/images';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const IMAGES: Record<string, ImageAsset> = {
  titan: projectImage_titan,
  luxora: projectImage_luxora,
  sallygreen: projectImage_sallygreen,
  tastetrail: projectImage_tastetrail,
  jbet: projectImage_jbet,
};

const TYPE_LABEL: Record<Project['type'], string> = {
  client: 'Client work',
  personal: 'Personal build',
  experiment: 'Experiment',
};

/**
 * One project, laid out as an alternating editorial spread.
 *
 * Odd rows put the device on the right, even rows flip it, so the section has
 * rhythm instead of five identical stacked cards. Each row drifts its own
 * device slightly against the scroll to build vertical parallax between the
 * screenshot and the copy.
 */
const ProjectRow: React.FC<{
  project: Project;
  index: number;
  reduced: boolean;
}> = ({ project, index, reduced }) => {
  const rowRef = React.useRef<HTMLElement>(null);
  const flip = index % 2 === 1;

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start end', 'end start'],
  });

  const deviceY = useTransform(scrollYProgress, [0, 1], [54, -54]);
  const copyY = useTransform(scrollYProgress, [0, 1], [-22, 22]);

  return (
    <motion.article
      ref={rowRef}
      initial={reduced ? false : { opacity: 0, y: 46 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 0.75, ease: EASE }}
      className="group relative border-t border-line py-14 first:border-t-0 md:py-20"
    >
      {/* Oversized index numeral, behind everything. It is wrapped in its own
          clipping layer: the numeral deliberately bleeds past the text edge, and
          clipping the whole section instead would cut the device reflections
          and the 3D tilt. */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span
          className="font-display absolute -top-2 select-none text-[120px] font-bold leading-none tracking-tighter text-display/[0.035] md:text-[170px]"
          style={{ [flip ? 'right' : 'left']: '-0.06em' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </span>

      <div
        className={[
          'relative grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16',
          flip ? 'lg:[direction:rtl]' : '',
        ].join(' ')}
      >
        {/* ---- Copy ---- */}
        <motion.div
          style={reduced ? undefined : { y: copyY }}
          className={flip ? 'lg:[direction:ltr]' : ''}
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="eyebrow rounded-full border border-glow/25 bg-glow/[0.07] px-2.5 py-1 text-glow">
              {TYPE_LABEL[project.type]}
            </span>
            <span className="eyebrow">
              {project.year}
            </span>
          </div>

          <h3 className="font-display mt-5 text-[34px] font-semibold leading-[0.94] tracking-[-0.03em] md:text-[46px]">
            {project.title}
          </h3>
          <div className="mt-2 text-[14px] text-glow/80">{project.subtitle}</div>

          <p className="mt-5 max-w-[48ch] text-[14px] leading-[1.75] text-body md:text-[15px]">
            {project.summary}
          </p>

          {/* Challenge / outcome — the two things a client actually cares about. */}
          <div className="mt-7 grid gap-px overflow-hidden rounded-[14px] border border-line bg-line sm:grid-cols-2">
            <div className="bg-ink-850 p-4">
              <div className="text-[9px] uppercase tracking-[0.18em] text-muted">
                The problem
              </div>
              <p className="mt-2 text-[12.5px] leading-[1.6] text-bright">
                {project.challenge[0]}
              </p>
            </div>
            <div className="bg-ink-850 p-4">
              <div className="text-[9px] uppercase tracking-[0.18em] text-muted">
                What shipped
              </div>
              <p className="mt-2 text-[12.5px] leading-[1.6] text-bright">
                {project.solution[0]}
              </p>
            </div>
          </div>

          {project.metrics.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <div className="font-display text-[20px] font-semibold leading-none tracking-tight text-display">
                    {m.value}
                  </div>
                  <div className="mt-1.5 eyebrow">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md border border-line-strong bg-tint-1 px-2.5 py-1 font-mono text-[10.5px] text-body transition-colors duration-300 hover:border-glow/30 hover:text-glow"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative inline-flex h-11 cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-transparent bg-display pl-5 pr-3 text-[13px] font-medium text-onaccent"
            >
              <span className="relative z-10">Live site</span>
              <span
                aria-hidden="true"
                className="relative z-10 grid h-6 w-6 place-items-center rounded-full bg-black/10 text-[11px] transition-transform duration-300 group-hover/btn:translate-x-0.5"
              >
                ↗
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-left scale-x-0 bg-[linear-gradient(90deg,var(--glow),var(--accent))] transition-transform duration-500 ease-out group-hover/btn:scale-x-100"
              />
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 cursor-pointer items-center rounded-full border border-line-strong px-5 text-[13px] text-bright transition-colors duration-300 hover:border-white/35 hover:bg-tint-2 hover:text-display"
            >
              Source
            </a>
          </div>
        </motion.div>

        {/* ---- Device ---- */}
        <motion.div
          style={reduced ? undefined : { y: deviceY }}
          className={[
            'relative lg:[direction:ltr]',
            flip ? 'lg:-order-1' : '',
          ].join(' ')}
        >
          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[32px] bg-[radial-gradient(60%_60%_at_50%_40%,color-mix(in oklab, var(--accent) 22%, transparent),transparent_70%)] opacity-0 blur-[48px] transition-opacity duration-700 group-hover:opacity-100" />
          <DeviceFrame
            asset={IMAGES[project.slug]}
            alt={`${project.title} — ${project.subtitle} interface`}
            title={`${project.slug}.app`}
            sizes="(max-width: 1024px) 100vw, 620px"
          />
        </motion.div>
      </div>
    </motion.article>
  );
};

export const WorkSection: React.FC = () => {
  const reduced = useReducedMotion();

  return (
    <section id="work" className="mx-auto max-w-[1280px] px-6 md:px-10 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6 pb-10">
        <div>
          <div className="eyebrow">
            Selected work — 2024 / 2026
          </div>
          <h2 className="font-display mt-4 text-[40px] font-semibold leading-[0.9] tracking-[-0.035em] md:text-[64px]">
            <Text3D depth={reduced ? 1 : 16} step={1} tilt={4} className="block">
              SYSTEMS I SHIPPED
            </Text3D>
          </h2>
        </div>
        <p className="max-w-[34ch] text-[13px] leading-[1.7] text-body">
          <ScrambleText text="Each one built end to end" speed={0.03} />{' '}
          — schema, API, interface, and the deployment that runs it.
        </p>
      </div>

      <div>
        {projects.map((project, index) => (
          <ProjectRow
            key={project.slug}
            project={project}
            index={index}
            reduced={reduced}
          />
        ))}
      </div>
    </section>
  );
};

export default WorkSection;
