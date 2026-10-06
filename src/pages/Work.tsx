import React from 'react';
import { Media } from '@/components/ui/Media';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Section, SectionHead } from '@/components/ui/Section';
import { projects, type Project } from '@/content/data';
import {
  projectImage_titan,
  projectImage_luxora,
  projectImage_sallygreen,
  projectImage_tastetrail,
  projectImage_jbet,
  type ImageAsset,
} from '@/content/images';

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

/** The bare host of a project URL, for the screenshot caption. */
const host = (url: string) => {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
};

const pad = (n: number) => String(n + 1).padStart(2, '0');

/**
 * One project.
 *
 * The card alternates which side the screenshot sits on. That is the whole
 * reason the grid reads as composed rather than as a list — a visitor's eye
 * zig-zags down the column instead of tracking one edge the whole way, and it
 * means no two adjacent cards have their screenshot cropped the same way.
 *
 * The card edge is dissolved into the page with a gradient on the screenshot's
 * outer side only. It is decorative and sits above the card, so it carries
 * `pointer-events-none` — without it it would swallow the hover on the card
 * underneath wherever it overlaps.
 *
 * The `<details>` is a sibling of the card, not a child of its link. A
 * disclosure is interactive content and an `<a>` may not contain interactive
 * content; nesting them would produce a control inside a control, which breaks
 * both the click target and the keyboard path.
 */
const ProjectCard: React.FC<{ project: Project; index: number }> = ({
  project,
  index,
}) => {
  const isEven = index % 2 === 0;

  return (
    <ScrollReveal direction="up" distance={30} duration={0.6}>
      <article className="relative">
        <div className="group relative overflow-hidden rounded-2xl border border-line bg-ink-700/60 backdrop-blur-sm transition-all duration-300 hover:border-line-strong hover:bg-ink-700/80">
          <div className="grid items-center gap-6 p-6 md:p-8 lg:grid-cols-12 lg:gap-8">
            {/* ---- Screenshot Showcase (Browser Frame) ---- */}
            <div
              className={[
                'relative flex flex-col justify-center lg:col-span-6',
                isEven ? 'lg:order-1' : 'lg:order-2',
              ].join(' ')}
            >
              <div className="relative overflow-hidden rounded-xl border border-line-faint bg-frame-well shadow-xl">
                {/* Browser top chrome */}
                <div className="flex h-8 items-center justify-between border-b border-line-faint bg-ink-850/80 px-3.5 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-line-strong transition-colors group-hover:bg-danger/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-line-strong transition-colors group-hover:bg-amber-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-line-strong transition-colors group-hover:bg-success/80" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-md border border-line-faint bg-ink-900/50 px-2 py-0.5 text-[10px] text-faint">
                    <span className="h-1.5 w-1.5 rounded-full bg-success/60" aria-hidden="true" />
                    <span className="max-w-[140px] truncate">{host(project.liveUrl)}</span>
                  </div>
                  <div className="w-8" aria-hidden="true" />
                </div>

                {/* Screenshot viewport */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-900">
                  <Media
                    asset={IMAGES[project.slug]}
                    alt={`${project.title} — ${project.subtitle}`}
                    sizes="(max-width: 1024px) 100vw, 540px"
                    imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            </div>

            {/* ---- Project Content ---- */}
            <div
              className={[
                'flex flex-col lg:col-span-6',
                isEven ? 'lg:order-2 lg:pl-4' : 'lg:order-1 lg:pr-4',
              ].join(' ')}
            >
              <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                <span className="font-mono text-accent">{pad(index)}</span>
                <span aria-hidden="true" className="text-line-strong">|</span>
                <span>{TYPE_LABEL[project.type]}</span>
                <span aria-hidden="true" className="text-line-strong">|</span>
                <span>{project.year}</span>
              </div>

              <h3 className="font-display text-display-3 mt-3 font-semibold">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  {project.title}
                </a>
              </h3>

              <div className="mt-1 text-[13px] font-medium text-muted">
                {project.subtitle}
              </div>

              <p className="mt-4 text-[14px] leading-[1.75] text-body">
                {project.summary}
              </p>

              {/* Metrics */}
              {project.metrics.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-3">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-line-faint bg-ink-850/60 px-3.5 py-2 backdrop-blur-sm"
                    >
                      <div className="font-display text-[16px] font-bold text-display">
                        {m.value}
                      </div>
                      <div className="text-[11px] text-muted">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full bg-display px-4 text-[13px] font-medium text-onaccent shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-bright active:scale-[0.98]"
                >
                  <span>Live site</span>
                  <span aria-hidden="true" className="text-[11px] leading-none transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                    ↗
                  </span>
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Source"
                  className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border border-line-strong px-4 text-[13px] font-medium text-bright transition-all duration-200 hover:scale-[1.02] hover:border-display/40 hover:bg-tint-2 hover:text-display active:scale-[0.98]"
                >
                  Source
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* The write-up: native details disclosure */}
        <details className="group/details mt-3 overflow-hidden rounded-xl border border-line/60 bg-tint-1 transition-colors duration-200 hover:border-line">
          <summary className="flex cursor-pointer items-center justify-between px-5 py-3.5 text-[13px] font-medium text-muted transition-colors hover:text-display">
            <span className="flex items-center gap-2">
              <span className="font-mono text-accent text-[11px]">&lt;/&gt;</span>
              <span>How I built {project.title}</span>
            </span>
            <span
              aria-hidden="true"
              className="inline-block text-[14px] text-muted transition-transform duration-200 group-open/details:rotate-90"
            >
              ›
            </span>
          </summary>

          <div className="border-t border-line/60 bg-ink-850/40 p-5 md:p-6">
            <p className="max-w-[64ch] text-[14px] leading-[1.75] text-body">
              {project.description}
            </p>

            <div className="mt-5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                Key Engineering Steps
              </div>
              <ul className="mt-3 max-w-[64ch] space-y-2.5">
                {project.process.map((step, stepIndex) => (
                  <li key={step} className="flex items-start gap-3 text-[13px] leading-[1.7] text-muted">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-tint-2 font-mono text-[9px] font-semibold text-accent"
                    >
                      {stepIndex + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-line-faint bg-ink-700/60 px-2.5 py-1 text-[11px] font-medium text-bright"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-5 rounded-lg border-l-2 border-accent bg-tint-1 py-2.5 pl-4 pr-3">
              <div className="text-[11px] font-medium uppercase tracking-wider text-accent">
                Outcome
              </div>
              <p className="mt-1 max-w-[60ch] text-[13px] leading-[1.7] text-bright">
                {project.outcome}
              </p>
            </div>
          </div>
        </details>
      </article>
    </ScrollReveal>
  );
};

export const WorkSection: React.FC = () => (
  <Section id="work" tone="band">
    <SectionHead
      title="Some things I’ve built"
      lede="Front end, back end, and the deployment — all mine. Open any one for how it was put together."
    />

    <div className="mt-12 flex flex-col gap-6">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  </Section>
);

export default WorkSection;
