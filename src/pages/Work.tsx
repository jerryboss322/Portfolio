import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, LayoutGrid, List } from 'lucide-react';
import { projects, type ProjectType } from '@/content/data';
import { Media } from '@/components/ui/Media';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import {
  projectImage_titan,
  projectImage_virtualFootball,
  projectImage_luxora,
  projectImage_sallygreen,
  projectImage_tastetrail,
  projectImage_jbet,
  type ImageAsset,
} from '@/content/images';

const IMAGES: Record<string, ImageAsset> = {
  titan: projectImage_titan,
  'virtual-football': projectImage_virtualFootball,
  luxora: projectImage_luxora,
  sallygreen: projectImage_sallygreen,
  tastetrail: projectImage_tastetrail,
  jbet: projectImage_jbet,
};

const ARCH_FLOWS: Record<string, string> = {
  titan: 'Next.js Frontend → Express REST → Prisma / PostgreSQL → Stripe / Paystack',
  'virtual-football': 'Next.js 15 → FastAPI Python → Bivariate Poisson Odds → Double-Entry Ledger',
  jbet: 'Next.js 16 → Slip State Engine → Framer Motion → Custom Canvas Ticket',
  sallygreen: 'Semantic HTML5 → Vanilla JS Modules → Scroll Choreography → Zero Deps',
  luxora: 'React 18 → Three.js / R3F WebGL → Zustand Cart → Tailwind UI',
  tastetrail: 'React 18 → Context Cart State → WhatsApp Checkout Link → LocalStorage',
};

const FILTERS: { label: string; value: ProjectType | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Client', value: 'client' },
  { label: 'Personal', value: 'personal' },
  { label: 'Experiment', value: 'experiment' },
];

export interface WorkSectionProps {
  id?: string;
  /** On the homepage, show only the top 3 projects and a "View all work" link. */
  preview?: boolean;
  previewLimit?: number;
}

export const WorkSection: React.FC<WorkSectionProps> = ({
  id = 'work',
  preview = false,
  previewLimit = 3,
}) => {
  const [filter, setFilter] = useState<ProjectType | 'all'>('all');
  const [viewMode, setViewMode] = useState<'editorial' | 'ledger'>('editorial');
  const [hoveredSlug, setHoveredSlug] = useState<string>(projects[0]?.slug ?? 'titan');

  const visibleProjects = useMemo(() => {
    const list = preview ? projects.slice(0, previewLimit) : projects;
    if (preview || filter === 'all') return list;
    return list.filter((p) => p.type === filter);
  }, [preview, previewLimit, filter]);

  const activePreviewProject = useMemo(
    () => visibleProjects.find((p) => p.slug === hoveredSlug) ?? visibleProjects[0],
    [visibleProjects, hoveredSlug]
  );

  return (
    <section
      id={id}
      className="relative overflow-hidden border-t border-line-faint"
    >
      <div className="shell py-12 md:py-20 relative">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={20} className="mb-8 sm:mb-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                  INDEX 01 // SELECTED WORK
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.875rem,5vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em] text-display mb-3">
                What I&apos;ve shipped
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[1.75] text-body max-w-2xl">
                Five projects, one per problem worth solving — a full-stack e-commerce
                platform, a betting app, a marketing site for an author, a 3D shopfront, and a
                restaurant ordering app. Each one has a case study with the architecture, the
                tradeoffs, and the code behind the hard parts.
              </p>
            </div>

            {!preview && (
              <div className="inline-flex items-center self-start rounded-xl border border-line-faint bg-ink-850 p-1">
                <button
                  type="button"
                  onClick={() => setViewMode('editorial')}
                  aria-pressed={viewMode === 'editorial'}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${
                    viewMode === 'editorial'
                      ? 'bg-tint-3 text-display font-semibold'
                      : 'text-muted hover:text-display'
                  }`}
                >
                  <LayoutGrid size={13} aria-hidden="true" />
                  <span>Editorial</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('ledger')}
                  aria-pressed={viewMode === 'ledger'}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${
                    viewMode === 'ledger'
                      ? 'bg-tint-3 text-display font-semibold'
                      : 'text-muted hover:text-display'
                  }`}
                >
                  <List size={13} aria-hidden="true" />
                  <span>Ledger</span>
                </button>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Filter bar — full Work page only */}
        {!preview && (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-y border-line-faint py-3.5">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by type">
              {FILTERS.map((option) => {
                const active = filter === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFilter(option.value)}
                    aria-pressed={active}
                    className={`relative rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors duration-200 ${
                      active
                        ? 'border-accent/40 text-accent'
                        : 'border-line-faint bg-ink-850/70 text-muted hover:border-line-strong hover:text-bright'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="work-filter-pill"
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full bg-accent/10"
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{option.label}</span>
                  </button>
                );
              })}
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted tabular-nums">
              SHOWING 0{visibleProjects.length} / 0{projects.length} SYSTEMS
            </span>
          </div>
        )}

        {/* View Mode 1: Exposed Architectural Editorial Grid */}
        {viewMode === 'editorial' ? (
          <div className="arch-frame arch-corner-tl arch-corner-br rounded-2xl overflow-hidden divide-y divide-line-faint surface-inset">
            {visibleProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="group grid grid-cols-1 lg:grid-cols-12 transition-colors duration-200 hover:bg-ink-900/35"
              >
                {/* Left Column: Beveled Viewport Frame (5 cols) */}
                <div className="lg:col-span-5 p-5 sm:p-7 lg:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-line-faint bg-ink-900/25">
                  <div className="mb-3 flex items-center justify-between font-mono text-[11px] text-muted tabular-nums">
                    <span className="text-accent font-semibold">0{idx + 1} // {project.slug.toUpperCase()}</span>
                    <span>{project.year}</span>
                  </div>

                  {preview ? (
                    <div className="rounded-[16px] bg-frame-plate p-[3px] transition-colors duration-300 group-hover:bg-accent/30">
                      <div className="rounded-[13px] bg-frame-well p-[3px]">
                        <div className="relative overflow-hidden rounded-[10px] bg-ink-700">
                          <Media
                            asset={IMAGES[project.slug]}
                            alt={project.title}
                            sizes="(max-width: 640px) 100vw, 420px"
                            imgClassName="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={`/work/${project.slug}`}
                      className="block rounded-[16px] bg-frame-plate p-[3px] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/35"
                    >
                      <div className="rounded-[13px] bg-frame-well p-[3px]">
                        <div className="relative overflow-hidden rounded-[10px] bg-ink-700">
                          <Media
                            asset={IMAGES[project.slug]}
                            alt={project.title}
                            imgClassName="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                            sizes="(max-width: 640px) 100vw, 420px"
                          />
                        </div>
                      </div>
                    </Link>
                  )}

                  {/* Architecture Pipeline Strip */}
                  <div className="mt-3.5 flex items-center gap-2 rounded-lg border border-line-faint bg-ink-900/60 px-3 py-1.5 font-mono text-[10px] text-muted truncate">
                    <span className="text-accent shrink-0">ARCH:</span>
                    <span className="truncate">{ARCH_FLOWS[project.slug] ?? project.tech.join(' → ')}</span>
                  </div>
                </div>

                {/* Right Column: Specification & Actions (7 cols) */}
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-2.5 mb-3">
                      <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
                        {project.type}
                      </span>
                      <span className="font-mono text-[11px] text-muted">
                        {project.subtitle}
                      </span>
                    </div>

                    {/* Title */}
                    {preview ? (
                      <h3 className="font-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.03em] text-display mb-3">
                        {project.title}
                      </h3>
                    ) : (
                      <Link
                        to={`/work/${project.slug}`}
                        className="inline-block font-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.03em] text-display mb-3 transition-colors hover:text-accent"
                      >
                        {project.title}
                      </Link>
                    )}

                    {/* Summary */}
                    <p className="text-[14px] sm:text-[15px] leading-[1.7] text-body mb-5 max-w-2xl">
                      {project.summary}
                    </p>

                    {/* Outcome Specification Box */}
                    {project.outcome && (
                      <div className="mb-5 rounded-xl border border-line-faint bg-ink-900/50 px-4 py-2.5">
                        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-accent mb-0.5">
                          VERIFIED OUTCOME
                        </div>
                        <p className="text-[13px] font-medium text-bright">
                          {project.outcome}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-line-faint/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* Tech stack tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((techItem) => (
                        <span
                          key={techItem}
                          className="rounded-md border border-line-faint bg-ink-900/70 px-2.5 py-1 font-mono text-[11px] text-muted transition-colors group-hover:border-line group-hover:text-body"
                        >
                          {techItem}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                      {!preview && (
                        <Link
                          to={`/work/${project.slug}`}
                          className="group/btn inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[12px] font-semibold text-ink-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-bright"
                        >
                          <span>Read the case study</span>
                          <ArrowRight
                            size={13}
                            aria-hidden="true"
                            className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
                          />
                        </Link>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/live inline-flex items-center gap-1.5 rounded-full border border-line bg-ink-800/70 px-4 py-2 text-[12px] font-semibold text-bright transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:text-display"
                        >
                          <span>Visit the live site</span>
                          <ArrowUpRight
                            size={14}
                            aria-hidden="true"
                            className="transition-transform duration-200 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* View Mode 2: Interactive Split Ledger */
          <div className="arch-frame arch-corner-tl arch-corner-br rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 surface-inset">
            <div className="lg:col-span-7 divide-y divide-line-faint">
              {visibleProjects.map((project, idx) => {
                const isHovered = activePreviewProject?.slug === project.slug;
                return (
                  <div
                    key={project.slug}
                    onMouseEnter={() => setHoveredSlug(project.slug)}
                    onFocus={() => setHoveredSlug(project.slug)}
                    className={`p-5 sm:p-6 transition-colors ${
                      isHovered ? 'bg-accent/6' : 'hover:bg-ink-900/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-1.5">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[11px] text-accent tabular-nums">
                          0{idx + 1}
                        </span>
                        <Link
                          to={`/work/${project.slug}`}
                          className="font-display text-lg sm:text-xl font-bold text-display hover:text-accent transition-colors"
                        >
                          {project.title}
                        </Link>
                        <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase text-muted">
                          {project.type}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-muted tabular-nums">
                        {project.year}
                      </span>
                    </div>
                    <p className="text-[13px] text-body line-clamp-1 pl-7 mb-2">
                      {project.summary}
                    </p>
                    <div className="pl-7 flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] text-muted truncate">
                        {project.tech.join(' · ')}
                      </span>
                      <Link
                        to={`/work/${project.slug}`}
                        className="inline-flex items-center gap-1 font-mono text-[11px] text-accent hover:underline shrink-0"
                      >
                        <span>Case study</span>
                        <ArrowRight size={12} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pinned Preview Pane */}
            <div className="hidden lg:flex lg:col-span-5 flex-col justify-between border-l border-line-faint bg-ink-900/35 p-6">
              {activePreviewProject && (
                <>
                  <div>
                    <div className="mb-3 flex items-center justify-between font-mono text-[11px] text-muted">
                      <span>PREVIEW // {activePreviewProject.title.toUpperCase()}</span>
                      <span>{activePreviewProject.year}</span>
                    </div>
                    <div className="rounded-[16px] bg-frame-plate p-[3px]">
                      <div className="rounded-[13px] bg-frame-well p-[3px]">
                        <div className="overflow-hidden rounded-[10px] bg-ink-800">
                          <Media
                            asset={IMAGES[activePreviewProject.slug]}
                            alt={`${activePreviewProject.title} preview`}
                            sizes="400px"
                          />
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-[13px] leading-[1.65] text-body">
                      {activePreviewProject.outcome}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-line-faint font-mono text-[11px] text-muted">
                    {ARCH_FLOWS[activePreviewProject.slug]}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Empty state — a filter that matches nothing */}
        {visibleProjects.length === 0 && (
          <p className="py-16 text-center text-[15px] text-muted">
            No {filter} projects yet — check back soon.
          </p>
        )}

        {/* View-all link — preview only */}
        {preview && (
          <ScrollReveal direction="up" distance={16} className="mt-10 sm:mt-12 flex justify-center">
            <Link
              to="/work"
              className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-line-strong bg-ink-850 px-7 text-[14px] sm:text-[15px] font-semibold text-display transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent active:scale-[0.98]"
            >
              <span>View all work</span>
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
};

export default WorkSection;
