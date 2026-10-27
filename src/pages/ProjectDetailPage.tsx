import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Code2, ExternalLink } from 'lucide-react';
import { projects } from '@/content/data';
import { useDocumentTitle } from '@/lib/hooks';
import { ProjectShot } from '@/components/ui/Media';
import TechStackCard from '@/components/ui/TechStackCard';
import CodeBlock from '@/components/ui/CodeBlock';
import { SystemSchematic } from '@/components/ui/SystemSchematic';
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

/**
 * Project Detail Page - Full architecture breakdown for a single project
 */
export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = index >= 0 ? projects[index] : undefined;
  const prev = index > 0 ? projects[index - 1] : undefined;
  const next = index >= 0 && index < projects.length - 1 ? projects[index + 1] : undefined;

  useDocumentTitle(project ? `${project.title} — Jerry Adewole` : 'Project Not Found — Jerry Adewole');

  if (!project) {
    return (
      <div className="shell py-32 text-center">
        <h1 className="font-display text-[32px] font-bold text-display mb-4">
          Project Not Found
        </h1>
        <p className="text-muted mb-8">The project you're looking for doesn't exist.</p>
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-accent hover:underline"
        >
          <ArrowLeft size={16} />
          <span>Back to Work</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-line-faint/60">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(70% 60% at 30% 20%, var(--accent-glow), transparent 70%)',
          }}
        />
        
        <div className="shell relative py-12 sm:py-16 md:py-20">
          {/* Back Button */}
          <button
            onClick={() => navigate('/work')}
            className="inline-flex items-center gap-2 text-[14px] sm:text-[14px] font-medium text-muted hover:text-accent transition-colors mb-6 sm:mb-8"
          >
            <ArrowLeft size={16} />
            <span>Back to Work</span>
          </button>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 items-center">
            {/* Left: Project Info */}
            <ScrollReveal direction="left" distance={24}>
              <div className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-wider text-accent mb-3 sm:mb-4">
                <span>{project.type}</span>
                <span>•</span>
                <span>{project.year}</span>
              </div>

              <h1 className="font-display text-[clamp(1.875rem,5vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.03em] text-display mb-3 sm:mb-4">
                {project.title}
              </h1>

              <p className="text-[16px] sm:text-[18px] leading-[1.75] text-bright mb-4 sm:mb-6">
                {project.subtitle}
              </p>

              <p className="text-[14px] sm:text-[16px] leading-[1.8] text-body mb-6 sm:mb-8 max-w-[54ch]">
                {project.summary}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 sm:px-6 py-2.5 sm:py-3 text-[14px] sm:text-[14px] font-semibold text-onaccent transition-all duration-200 hover:scale-[1.03] hover:brightness-110"
                >
                  <ExternalLink size={15} />
                  <span>View Live Site</span>
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-line-strong px-5 sm:px-6 py-2.5 sm:py-3 text-[14px] sm:text-[14px] font-semibold text-display transition-all duration-200 hover:scale-[1.03] hover:border-accent hover:bg-accent/10 hover:text-accent"
                >
                  <Code2 size={15} />
                  <span>Source Code</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Right: Project Image */}
            <ScrollReveal direction="right" distance={24} delay={0.08} className="relative">
              <ProjectShot
                asset={IMAGES[project.slug]}
                alt={project.title}
                caption={`${project.title} — ${project.liveUrl.replace(/^https?:\/\//, '')}`}
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Architecture Content */}
      <section className="shell py-12 sm:py-16 md:py-20">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8 sm:gap-10">
          {/* Left Sidebar - Quick Info (Hidden on mobile, shown as sticky on desktop) */}
          <aside className="hidden lg:block lg:sticky lg:top-24 h-fit space-y-6">
            {/* Architecture Style */}
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-wider text-muted mb-3">
                Architecture
              </div>
              <div className="rounded-lg border border-line-faint bg-ink-700/60 p-4">
                <p className="text-[14px] text-bright">{project.architecture.style}</p>
              </div>
            </div>

            {/* Metrics */}
            {project.metrics.length > 0 && (
              <div>
                <div className="text-[12px] font-semibold uppercase tracking-wider text-muted mb-3">
                  Metrics
                </div>
                <div className="space-y-2">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-lg border border-line-faint bg-ink-700/60 p-3"
                    >
                      <div className="font-display text-[20px] font-bold text-display">
                        {metric.value}
                      </div>
                      <div className="text-[12px] text-muted">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Links */}
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-wider text-muted mb-3">
                Quick Links
              </div>
              <div className="space-y-2">
                <a
                  href="#tech-stack"
                  className="block rounded-lg border border-line-faint bg-ink-700/40 px-3 py-2 text-[14px] font-medium text-body hover:bg-ink-700 hover:text-display transition-colors"
                >
                  Tech Stack
                </a>
                <a
                  href="#database"
                  className="block rounded-lg border border-line-faint bg-ink-700/40 px-3 py-2 text-[14px] font-medium text-body hover:bg-ink-700 hover:text-display transition-colors"
                >
                  Database Design
                </a>
                <a
                  href="#api"
                  className="block rounded-lg border border-line-faint bg-ink-700/40 px-3 py-2 text-[14px] font-medium text-body hover:bg-ink-700 hover:text-display transition-colors"
                >
                  API Architecture
                </a>
                <a
                  href="#decisions"
                  className="block rounded-lg border border-line-faint bg-ink-700/40 px-3 py-2 text-[14px] font-medium text-body hover:bg-ink-700 hover:text-display transition-colors"
                >
                  Key Decisions
                </a>
                <a
                  href="#lessons"
                  className="block rounded-lg border border-line-faint bg-ink-700/40 px-3 py-2 text-[14px] font-medium text-body hover:bg-ink-700 hover:text-display transition-colors"
                >
                  Lessons Learned
                </a>
                {project.process.length > 0 && (
                  <a
                    href="#build"
                    className="block rounded-lg border border-line-faint bg-ink-700/40 px-3 py-2 text-[14px] font-medium text-body hover:bg-ink-700 hover:text-display transition-colors"
                  >
                    How it was built
                  </a>
                )}
                {project.deepDive && project.deepDive.length > 0 && (
                  <a
                    href="#deep-dive"
                    className="block rounded-lg border border-line-faint bg-ink-700/40 px-3 py-2 text-[14px] font-medium text-body hover:bg-ink-700 hover:text-display transition-colors"
                  >
                    Deep Dive
                  </a>
                )}
                {project.codeSamples && project.codeSamples.length > 0 && (
                  <a
                    href="#code"
                    className="block rounded-lg border border-line-faint bg-ink-700/40 px-3 py-2 text-[14px] font-medium text-body hover:bg-ink-700 hover:text-display transition-colors"
                  >
                    Code Samples
                  </a>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="space-y-10 sm:space-y-12">
            {/* Description */}
            <ScrollReveal direction="up" distance={20}>
              <p className="text-[15px] sm:text-[17px] leading-[1.8] text-bright">
                {project.description}
              </p>
              <SystemSchematic slug={project.slug} />
            </ScrollReveal>

            {/* Tech Stack */}
            <ScrollReveal direction="up" distance={20} id="tech-stack">
              <h2 className="font-display text-[24px] sm:text-[32px] font-bold text-display mb-4 sm:mb-6">
                Technology Stack
              </h2>
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                {project.architecture.techStack.map((tech) => (
                  <TechStackCard key={tech.name} tech={tech} showWhy showAlternatives />
                ))}
              </div>
            </ScrollReveal>

            {/* Database Design */}
            <ScrollReveal direction="up" distance={20} id="database">
              <h2 className="font-display text-[32px] font-bold text-display mb-6">
                Database Design
              </h2>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="rounded-lg border border-line-faint bg-ink-700/40 p-6">
                  <h3 className="text-[14px] font-semibold text-display mb-3">
                    Schema Overview
                  </h3>
                  <p className="text-[14px] text-muted">
                    {project.architecture.database.schemaOverview}
                  </p>
                </div>
                <div className="rounded-lg border border-line-faint bg-ink-700/40 p-6">
                  <h3 className="text-[14px] font-semibold text-display mb-3">
                    Optimization Strategy
                  </h3>
                  <p className="text-[14px] text-muted">
                    {project.architecture.database.optimizationStrategy}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-[14px] font-semibold text-display mb-3">Key Tables</h3>
                <div className="flex flex-wrap gap-2">
                  {project.architecture.database.keyTables.map((table) => (
                    <span
                      key={table}
                      className="rounded-lg border border-line-faint bg-ink-700/60 px-3 py-1.5 text-[13px] font-medium text-muted"
                    >
                      {table}
                    </span>
                  ))}
                </div>
              </div>
              {project.architecture.database.relationships.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-[14px] font-semibold text-display mb-3">Relationships</h3>
                  <ul className="overflow-hidden rounded-lg border border-line-faint bg-ink-850">
                    {project.architecture.database.relationships.map((rel) => (
                      <li
                        key={rel}
                        className="border-b border-line-faint px-4 py-2.5 font-mono text-[14px] text-body last:border-b-0"
                      >
                        {rel}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </ScrollReveal>

            {/* API Design */}
            <ScrollReveal direction="up" distance={20} id="api">
              <h2 className="font-display text-[32px] font-bold text-display mb-6">
                API Architecture
              </h2>
              {project.architecture.api.endpoints.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-[14px] font-semibold text-display mb-3">Endpoints</h3>
                  <ul className="overflow-hidden rounded-lg border border-line-faint bg-ink-850">
                    {project.architecture.api.endpoints.map((endpoint) => (
                      <li
                        key={endpoint}
                        className="border-b border-line-faint px-4 py-2.5 font-mono text-[14px] text-body last:border-b-0"
                      >
                        {endpoint}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="rounded-lg border border-line-faint bg-ink-700/40 p-6 space-y-3">
                <div className="flex gap-3">
                  <span className="font-semibold text-[14px] text-display min-w-[140px]">
                    Authentication:
                  </span>
                  <span className="text-[14px] text-muted">
                    {project.architecture.api.authentication}
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold text-[14px] text-display min-w-[140px]">
                    Rate Limiting:
                  </span>
                  <span className="text-[14px] text-muted">
                    {project.architecture.api.rateLimiting}
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold text-[14px] text-display min-w-[140px]">
                    Caching:
                  </span>
                  <span className="text-[14px] text-muted">
                    {project.architecture.api.cachingStrategy}
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* Key Decisions */}
            <ScrollReveal direction="up" distance={20} id="decisions">
              <h2 className="font-display text-[32px] font-bold text-display mb-6">
                Key Architectural Decisions
              </h2>
              <ul className="space-y-4">
                {project.architecture.keyDecisions.map((decision, idx) => (
                  <li key={decision} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/20 font-mono text-[13px] font-semibold text-accent">
                      {idx + 1}
                    </span>
                    <span className="text-[15px] leading-[1.75] text-body pt-0.5">
                      {decision}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            {/* Tradeoffs */}
            <ScrollReveal direction="up" distance={20}>
              <h2 className="font-display text-[32px] font-bold text-display mb-6">
                Tradeoffs Made
              </h2>
              <ul className="space-y-4">
                {project.architecture.tradeoffs.map((tradeoff, idx) => (
                  <li key={tradeoff} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-amber/20 font-mono text-[13px] font-semibold text-accent-amber">
                      {idx + 1}
                    </span>
                    <span className="text-[15px] leading-[1.75] text-body pt-0.5">
                      {tradeoff}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            {/* Lessons Learned */}
            <ScrollReveal direction="up" distance={20} id="lessons">
              <h2 className="font-display text-[32px] font-bold text-display mb-6">
                Lessons Learned
              </h2>
              <ul className="space-y-4">
                {project.architecture.lessonsLearned.map((lesson, idx) => (
                  <li key={lesson} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-emerald/20 font-mono text-[13px] font-semibold text-accent-emerald">
                      {idx + 1}
                    </span>
                    <span className="text-[15px] leading-[1.75] text-body pt-0.5">
                      {lesson}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            {/* Technical Deep Dive — the hardest parts, in prose and code. */}
            {project.deepDive && project.deepDive.length > 0 && (
              <ScrollReveal direction="up" distance={20} id="deep-dive">
                <h2 className="font-display text-[32px] font-bold text-display mb-6">
                  Technical Deep Dive
                </h2>
                <div className="space-y-10">
                  {project.deepDive.map((item) => (
                    <div key={item.heading}>
                      <h3 className="font-display text-[20px] font-semibold text-display mb-3">
                        {item.heading}
                      </h3>
                      <p className="text-[15px] leading-[1.8] text-body max-w-[68ch]">
                        {item.body}
                      </p>
                      {item.code && (
                        <CodeBlock sample={item.code} className="mt-4" />
                      )}
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            )}

            {/* Code Samples — the decisions, shown as code. */}
            {project.codeSamples && project.codeSamples.length > 0 && (
              <ScrollReveal direction="up" distance={20} id="code">
                <h2 className="font-display text-[32px] font-bold text-display mb-6">
                  Code Samples
                </h2>
                <div className="space-y-4">
                  {project.codeSamples.map((sample) => (
                    <CodeBlock key={sample.title} sample={sample} />
                  ))}
                </div>
              </ScrollReveal>
            )}

            {/* Deployment Strategy */}
            <ScrollReveal direction="up" distance={20}>
              <h2 className="font-display text-[32px] font-bold text-display mb-6">
                Deployment Strategy
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg border border-line-faint bg-ink-700/40 p-6">
                  <h3 className="text-[14px] font-semibold text-display mb-3">Hosting</h3>
                  <p className="text-[14px] text-muted">
                    {project.architecture.deployment.hosting}
                  </p>
                </div>
                <div className="rounded-lg border border-line-faint bg-ink-700/40 p-6">
                  <h3 className="text-[14px] font-semibold text-display mb-3">CI/CD</h3>
                  <p className="text-[14px] text-muted">
                    {project.architecture.deployment.ciCd}
                  </p>
                </div>
                <div className="rounded-lg border border-line-faint bg-ink-700/40 p-6">
                  <h3 className="text-[14px] font-semibold text-display mb-3">
                    Build Process
                  </h3>
                  <p className="text-[14px] text-muted">
                    {project.architecture.deployment.buildProcess}
                  </p>
                </div>
                <div className="rounded-lg border border-line-faint bg-ink-700/40 p-6">
                  <h3 className="text-[14px] font-semibold text-display mb-3">Monitoring</h3>
                  <p className="text-[14px] text-muted">
                    {project.architecture.deployment.monitoring}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* How it was built — the process, and the outcome in one line. */}
            {project.process.length > 0 && (
              <ScrollReveal direction="up" distance={20} id="build">
                <h2 className="font-display text-[32px] font-bold text-display mb-6">
                  How it was built
                </h2>
                <ol className="space-y-4">
                  {project.process.map((step, idx) => (
                    <li key={step} className="flex gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/20 font-mono text-[13px] font-semibold text-accent">
                        {idx + 1}
                      </span>
                      <span className="text-[15px] leading-[1.75] text-body pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
                {project.outcome && (
                  <p className="mt-6 rounded-xl border border-line-faint bg-tint-1 p-5 text-[15px] leading-[1.75] text-bright">
                    <span className="font-semibold text-display">In the end: </span>
                    {project.outcome}
                  </p>
                )}
              </ScrollReveal>
            )}

            {/* Prev / next project */}
            <ScrollReveal direction="up" distance={20} className="pt-12 border-t border-line-faint">
              <div className="grid gap-4 sm:grid-cols-2">
                {prev ? (
                  <Link
                    to={`/work/${prev.slug}`}
                    className="group flex flex-col gap-1 rounded-xl border border-line-faint bg-ink-700/40 p-5 transition-colors hover:border-accent/40 hover:bg-ink-700/70"
                  >
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted">
                      <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
                      Previous
                    </span>
                    <span className="font-display text-[18px] font-semibold text-display group-hover:text-accent transition-colors">
                      {prev.title}
                    </span>
                  </Link>
                ) : (
                  <span />
                )}
                {next ? (
                  <Link
                    to={`/work/${next.slug}`}
                    className="group flex flex-col items-end gap-1 rounded-xl border border-line-faint bg-ink-700/40 p-5 text-right transition-colors hover:border-accent/40 hover:bg-ink-700/70 sm:col-start-2"
                  >
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted">
                      Next
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <span className="font-display text-[18px] font-semibold text-display group-hover:text-accent transition-colors">
                      {next.title}
                    </span>
                  </Link>
                ) : (
                  <span />
                )}
              </div>
              <div className="mt-6">
                <Link
                  to="/work"
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-accent hover:underline"
                >
                  <ArrowLeft size={16} />
                  <span>All projects</span>
                </Link>
              </div>
            </ScrollReveal>
          </main>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage;
