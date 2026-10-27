import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, LayoutGrid, List, Lock } from 'lucide-react';
import { projects, type ProjectType } from '@/content/data';
import { Media } from '@/components/ui/Media';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useReducedMotion } from '@/lib/hooks';
import {
  projectImage_titan,
  projectImage_virtualFootball,
  projectImage_luxora,
  projectImage_sallygreen,
  projectImage_tastetrail,
  projectImage_jbet,
  type ImageAsset,
} from '@/content/images';

interface ProjectTheme {
  glowColor: string;
  badge: string;
  watermark: string;
  domain: string;
}

const PROJECT_THEMES: Record<string, ProjectTheme> = {
  titan: {
    glowColor: 'from-teal-500/25 via-cyan-950/20 to-transparent',
    badge: 'ACID COMMERCE',
    watermark: 'POSTGRES 16 · STRIPE PAYMENTS · PRISMA',
    domain: 'titan-teal.vercel.app',
  },
  'virtual-football': {
    glowColor: 'from-emerald-500/25 via-emerald-950/20 to-transparent',
    badge: 'LIVE SIMULATOR',
    watermark: 'POISSON ENGINE · SSE TICKER · DUAL ROUND-ROBIN',
    domain: 'vfl-psi.vercel.app',
  },
  jbet: {
    glowColor: 'from-amber-500/25 via-yellow-950/20 to-transparent',
    badge: 'SPORTSBOOK',
    watermark: 'DYNAMIC ODDS · CANVAS TICKET · NGN RAILS',
    domain: 'jbet.vercel.app',
  },
  sallygreen: {
    glowColor: 'from-emerald-600/20 via-teal-950/20 to-transparent',
    badge: 'EDITORIAL CMS',
    watermark: 'SANITY CMS · ZERO RUNTIME · 100 LH',
    domain: 'sallygreenmarketing.vercel.app',
  },
  luxora: {
    glowColor: 'from-purple-500/25 via-fuchsia-950/20 to-transparent',
    badge: 'WEBGL 3D',
    watermark: 'THREE.JS · R3F · 60FPS SHADERS · ZUSTAND',
    domain: 'luxora-self-two.vercel.app',
  },
  tastetrail: {
    glowColor: 'from-orange-500/25 via-amber-950/20 to-transparent',
    badge: 'DIRECT DISPATCH',
    watermark: 'LOCALSTORAGE · WHATSAPP RECEIPT · CONTEXT',
    domain: 'tastetrail.vercel.app',
  },
};

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
  const reduced = useReducedMotion();
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
                Six projects, each solving a distinct engineering challenge — a sports simulation
                and exchange platform, a full-stack e-commerce shop, a betting app, a 3D product
                showcase, an author marketing site, and a restaurant ordering system. Each one has a
                case study with the architecture, the tradeoffs, and the code behind the hard parts.
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
            {visibleProjects.map((project, idx) => {
              const theme = PROJECT_THEMES[project.slug] ?? PROJECT_THEMES['virtual-football'];
              return (
                <motion.div
                  layout
                  key={project.slug}
                  initial={reduced ? false : { opacity: 0, y: 32 }}
                  whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: (idx % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group grid grid-cols-1 lg:grid-cols-12 transition-colors duration-200 hover:bg-ink-900/35 scroll-entry-card"
                >
                  {/* Left Column: Beveled Viewport Frame (5 cols) */}
                  <div className="lg:col-span-5 p-5 sm:p-7 lg:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-line-faint bg-ink-900/25">
                    <div className="mb-3 flex items-center justify-between font-mono text-[11px] text-muted tabular-nums">
                      <span className="text-accent font-semibold">0{idx + 1} // {project.slug.toUpperCase()}</span>
                      <span>{project.year}</span>
                    </div>

                    {/* Creative Ambient Background Stage & Browser Chrome */}
                    <div className="relative group/stage my-auto">
                      {/* Ambient Glow Aura from surrounding brand colors */}
                      <div
                        aria-hidden="true"
                        className={`pointer-events-none absolute -inset-3 rounded-2xl bg-gradient-to-tr ${theme.glowColor} opacity-40 blur-xl transition-all duration-500 group-hover/stage:opacity-85 group-hover/stage:scale-105`}
                      />

                      {/* Window Container */}
                      <div className="relative rounded-xl border border-line-strong/80 bg-ink-950/90 shadow-2xl backdrop-blur-md overflow-hidden transition-transform duration-300 ease-out group-hover/stage:-translate-y-1">
                        {/* Window Header / Browser Chrome */}
                        <div className="flex items-center justify-between border-b border-line-faint/80 bg-ink-900/80 px-3 py-2 text-[10px] font-mono">
                          {/* Traffic light buttons */}
                          <div className="flex items-center gap-1.5" aria-hidden="true">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/90 border border-[#e0443e]/40 inline-block" />
                            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/90 border border-[#dea123]/40 inline-block" />
                            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/90 border border-[#1aab29]/40 inline-block" />
                          </div>

                          {/* SSL URL Bar */}
                          <div className="mx-2 flex max-w-[200px] flex-1 items-center justify-center gap-1.5 rounded-md border border-line-faint bg-ink-950/60 px-2 py-0.5 text-[10px] text-muted truncate">
                            <Lock size={9} className="text-accent shrink-0" aria-hidden="true" />
                            <span className="truncate text-muted">{theme.domain}</span>
                          </div>

                          {/* System Status Tag */}
                          <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-accent shrink-0">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                            {theme.badge}
                          </span>
                        </div>

                        {/* Viewport Frame with Corner Crosshairs */}
                        <div className="relative bg-ink-900/50 p-2 sm:p-2.5">
                          {/* Corner Crosshairs */}
                          <span className="pointer-events-none absolute left-3 top-3 text-[10px] font-mono text-line-strong select-none leading-none z-10">+</span>
                          <span className="pointer-events-none absolute right-3 top-3 text-[10px] font-mono text-line-strong select-none leading-none z-10">+</span>
                          <span className="pointer-events-none absolute left-3 bottom-8 text-[10px] font-mono text-line-strong select-none leading-none z-10">+</span>
                          <span className="pointer-events-none absolute right-3 bottom-8 text-[10px] font-mono text-line-strong select-none leading-none z-10">+</span>

                          {preview ? (
                            <div className="relative overflow-hidden rounded-lg border border-line-faint/60 bg-ink-800">
                              <Media
                                asset={IMAGES[project.slug]}
                                alt={project.title}
                                sizes="(max-width: 640px) 100vw, 420px"
                                imgClassName="object-cover transition-transform duration-500 ease-out group-hover/stage:scale-[1.03]"
                              />
                            </div>
                          ) : (
                            <Link
                              to={`/work/${project.slug}`}
                              className="block relative overflow-hidden rounded-lg border border-line-faint/60 bg-ink-800 focus:outline-none focus:ring-2 focus:ring-accent"
                            >
                              <Media
                                asset={IMAGES[project.slug]}
                                alt={project.title}
                                sizes="(max-width: 640px) 100vw, 420px"
                                imgClassName="object-cover transition-transform duration-500 ease-out group-hover/stage:scale-[1.03]"
                              />
                            </Link>
                          )}

                          {/* Viewport Telemetry Watermark */}
                          <div className="mt-2 flex items-center justify-between px-1 font-mono text-[9px] tracking-wider text-muted/80 uppercase">
                            <span className="truncate">{theme.watermark}</span>
                            <span className="shrink-0 pl-2 tabular-nums text-muted/60">16:10 FHD</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Architecture Pipeline Strip */}
                    <div className="mt-4 flex items-center gap-2 rounded-lg border border-line-faint bg-ink-900/60 px-3 py-1.5 font-mono text-[10px] text-muted truncate">
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
              );
            })}
          </div>
        ) : (
          /* View Mode 2: Interactive Split Ledger */
          <div className="arch-frame arch-corner-tl arch-corner-br rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 surface-inset">
            <div className="lg:col-span-7 divide-y divide-line-faint">
              {visibleProjects.map((project, idx) => {
                const isHovered = activePreviewProject?.slug === project.slug;
                return (
                  <motion.div
                    key={project.slug}
                    initial={reduced ? false : { opacity: 0, x: -16 }}
                    whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.45, delay: (idx % 4) * 0.05, ease: [0.16, 1, 0.3, 1] }}
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
                  </motion.div>
                );
              })}
            </div>

            {/* Pinned Preview Pane */}
            <div className="hidden lg:flex lg:col-span-5 flex-col justify-between border-l border-line-faint bg-ink-900/35 p-6">
              {activePreviewProject && (() => {
                const previewTheme = PROJECT_THEMES[activePreviewProject.slug] ?? PROJECT_THEMES['virtual-football'];
                return (
                  <>
                    <div>
                      <div className="mb-3 flex items-center justify-between font-mono text-[11px] text-muted">
                        <span>PREVIEW // {activePreviewProject.title.toUpperCase()}</span>
                        <span>{activePreviewProject.year}</span>
                      </div>
                      <div className="relative group/preview">
                        <div
                          aria-hidden="true"
                          className={`pointer-events-none absolute -inset-2 rounded-2xl bg-gradient-to-tr ${previewTheme.glowColor} opacity-50 blur-lg`}
                        />
                        <div className="relative rounded-xl border border-line-strong/80 bg-ink-950/90 shadow-xl overflow-hidden">
                          {/* Mini Chrome Header */}
                          <div className="flex items-center justify-between border-b border-line-faint bg-ink-900/80 px-3 py-1.5 text-[10px] font-mono">
                            <div className="flex items-center gap-1.5" aria-hidden="true">
                              <span className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                              <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                              <span className="h-2 w-2 rounded-full bg-[#27c93f]" />
                            </div>
                            <span className="text-muted text-[10px] truncate max-w-[160px]">{previewTheme.domain}</span>
                            <span className="text-[9px] text-accent uppercase font-semibold">{previewTheme.badge}</span>
                          </div>
                          <div className="p-2">
                            <div className="overflow-hidden rounded-lg border border-line-faint/60 bg-ink-800">
                              <Media
                                asset={IMAGES[activePreviewProject.slug]}
                                alt={`${activePreviewProject.title} preview`}
                                sizes="400px"
                              />
                            </div>
                            <div className="mt-1.5 px-1 font-mono text-[9px] text-muted/80 truncate">
                              {previewTheme.watermark}
                            </div>
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
                );
              })()}
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
