import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { projects, type ProjectType } from '@/content/data';
import { Media } from '@/components/ui/Media';
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

const FILTERS: { label: string; value: ProjectType | 'all' }[] = [
  { label: 'All work', value: 'all' },
  { label: 'Client', value: 'client' },
  { label: 'Personal', value: 'personal' },
  { label: 'Experiment', value: 'experiment' },
];

interface WorkProps {
  id?: string;
  /**
   * Preview mode for the homepage: shows only the first `previewLimit`
   * projects and makes them non-clickable (no links to detail pages, images
   * are not anchors, and the case-study / live-site actions are dropped).
   * The full Work page leaves this off.
   */
  preview?: boolean;
  previewLimit?: number;
}

export const WorkSection = ({ id = 'work', preview = false, previewLimit = 3 }: WorkProps) => {
  const [filter, setFilter] = useState<ProjectType | 'all'>('all');

  // The filter only applies on the full Work page; the homepage preview is a
  // fixed, curated slice.
  const visibleProjects = useMemo(() => {
    const base = preview ? projects.slice(0, previewLimit) : projects;
    return filter === 'all' ? base : base.filter((p) => p.type === filter);
  }, [preview, previewLimit, filter]);

  return (
    <>
      <section
        id={id}
        className="relative overflow-hidden"
      >
        <div className="shell py-12 md:py-20 relative">
          {/* Section Header */}
          <div className="mb-10 sm:mb-14">
            <div className="flex items-baseline gap-4 mb-3">
              <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">
                Selected Work
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.875rem,5vw,3rem)] font-bold leading-[1.1] tracking-[-0.03em] text-display mb-3">
              What I&apos;ve shipped
            </h2>
            <p className="text-[15px] sm:text-[17px] leading-[1.75] text-bright max-w-2xl">
              Five projects, one per problem worth solving — a full-stack e-commerce
              platform, a betting app, a marketing site for an author, a 3D shopfront, and a
              restaurant ordering app. Each one has a case study with the architecture, the
              tradeoffs, and the code behind the hard parts.
            </p>
          </div>

          {/* Filter bar — full Work page only */}
          {!preview && (
            <div className="mb-8 sm:mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects by type">
              {FILTERS.map((option) => {
                const active = filter === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFilter(option.value)}
                    aria-pressed={active}
                    className={`rounded-full border px-4 py-1.5 text-[14px] font-medium transition-all duration-200 ${
                      active
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-line-faint bg-ink-800/60 text-muted hover:border-line-strong hover:text-bright'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Project List — vertical rows */}
          <div className="flex flex-col">
            {visibleProjects.map((project, idx) => (
              <div
                key={project.slug}
                className={`group flex flex-col sm:flex-row gap-5 sm:gap-6 py-8 sm:py-10 ${
                  idx !== visibleProjects.length - 1 ? 'border-b border-line-faint' : ''
                }`}
              >
                {/* Left: Image */}
                <div className="relative w-full sm:w-[280px] lg:w-[340px] shrink-0">
                  {preview ? (
                    <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-line-faint bg-ink-700 shadow-lg">
                      <Media
                        asset={IMAGES[project.slug]}
                        alt={project.title}
                        sizes="(max-width: 640px) 100vw, 340px"
                      />
                    </div>
                  ) : (
                    <Link
                      to={`/work/${project.slug}`}
                      className="block relative rounded-xl sm:rounded-2xl overflow-hidden border border-line-faint bg-ink-700 shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-accent-glow hover:border-accent/20"
                    >
                      <Media
                        asset={IMAGES[project.slug]}
                        alt={project.title}
                        imgClassName="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, 340px"
                      />
                    </Link>
                  )}
                </div>

                {/* Right: Content */}
                <div className="flex-1 flex flex-col min-w-0">
                  {/* Meta row */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
                      {project.type}
                    </span>
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.1em] text-muted">
                      {project.year}
                    </span>
                  </div>

                  {/* Title */}
                  {preview ? (
                    <h3 className="font-display text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.03em] text-display mb-2">
                      {project.title}
                    </h3>
                  ) : (
                    <Link
                      to={`/work/${project.slug}`}
                      className="font-display text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.03em] text-display mb-2 transition-colors hover:text-accent"
                    >
                      {project.title}
                    </Link>
                  )}

                  {/* Subtitle */}
                  <p className="text-[14px] sm:text-[16px] leading-[1.7] text-bright mb-4 max-w-2xl">
                    {project.subtitle}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-line-faint bg-ink-800/60 px-2.5 py-1 text-[11px] sm:text-[12px] font-medium text-muted backdrop-blur-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Summary */}
                  <p className="text-[14px] sm:text-[14px] leading-[1.7] text-bright mb-5 max-w-2xl">
                    {project.summary}
                  </p>

                  {/* Links — only on the full Work page */}
                  {!preview && (
                    <div className="mt-auto flex flex-wrap items-center gap-3">
                      <Link
                        to={`/work/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-[13px] sm:text-[14px] font-semibold text-accent transition-all hover:gap-2.5"
                      >
                        <span>Read the case study</span>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                      <span className="h-4 w-px bg-line" />
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[13px] sm:text-[14px] font-semibold text-bright transition-all hover:gap-2.5 hover:text-accent"
                      >
                        <span>Visit the live site</span>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-3 3m0 0l-3-3m3 3V5" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty state — a filter that matches nothing */}
          {visibleProjects.length === 0 && (
            <p className="py-16 text-center text-[15px] text-muted">
              No {filter} projects yet — check back soon.
            </p>
          )}

          {/* View-all link — preview only */}
          {preview && (
            <div className="mt-10 sm:mt-12 flex justify-center">
              <Link
                to="/work"
                className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-full border-2 border-line-strong px-7 text-[14px] sm:text-[15px] font-semibold text-display transition-all duration-200 hover:scale-[1.03] hover:border-accent/50 hover:bg-accent/10 hover:text-accent active:scale-[0.98]"
              >
                <span>View all work</span>
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default WorkSection;
