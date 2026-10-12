import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Code2 } from 'lucide-react';
import { projects } from '../content/data';
import { Media } from '../components/ui/Media';
import InteractiveBadge from '../components/ui/InteractiveBadge';
import {
  projectImage_titan,
  projectImage_luxora,
  projectImage_sallygreen,
  projectImage_tastetrail,
  projectImage_jbet,
  type ImageAsset,
} from '../content/images';

const IMAGES: Record<string, ImageAsset> = {
  titan: projectImage_titan,
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
  const project = projects.find((p) => p.slug === slug);

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
    <div className="min-h-screen bg-ink-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-line-faint bg-ink-900">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-indigo-500/8 to-purple-500/10 blur-[120px]" />
        
        <div className="shell relative py-20">
          {/* Back Button */}
          <button
            onClick={() => navigate('/work')}
            className="inline-flex items-center gap-2 text-[14px] font-medium text-muted hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            <span>Back to Work</span>
          </button>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Project Info */}
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-accent mb-4">
                <span>{project.type}</span>
                <span>•</span>
                <span>{project.year}</span>
              </div>

              <h1 className="font-display text-[clamp(2.5rem,1.5rem+4vw,4.5rem)] font-bold leading-[1.1] tracking-[-0.04em] text-display mb-4">
                {project.title}
              </h1>

              <p className="text-[18px] leading-[1.75] text-bright mb-6">
                {project.subtitle}
              </p>

              <p className="text-[16px] leading-[1.8] text-body mb-8 max-w-[54ch]">
                {project.summary}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 px-6 py-3 text-[14px] font-semibold text-white shadow-xl shadow-sky-500/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-indigo-500/35 hover:brightness-110"
                >
                  <ExternalLink size={16} />
                  <span>View Live Site</span>
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-line-strong px-6 py-3 text-[14px] font-semibold text-display transition-all duration-200 hover:scale-[1.03] hover:border-accent hover:bg-accent/10 hover:text-accent"
                >
                  <Code2 size={16} />
                  <span>Source Code</span>
                </a>
              </div>
            </div>

            {/* Right: Project Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-line-faint shadow-2xl">
                <Media
                  asset={IMAGES[project.slug]}
                  alt={project.title}
                  sizes="(max-width: 1024px) 100vw, 600px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Content */}
      <section className="shell py-20">
        <div className="grid lg:grid-cols-[280px_1fr] gap-12">
          {/* Left Sidebar - Quick Info */}
          <aside className="lg:sticky lg:top-24 h-fit space-y-6">
            {/* Architecture Style */}
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-3">
                Architecture
              </div>
              <div className="rounded-lg border border-line-faint bg-ink-700/60 p-4">
                <p className="text-[13px] text-bright">{project.architecture.style}</p>
              </div>
            </div>

            {/* Metrics */}
            {project.metrics.length > 0 && (
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-3">
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
                      <div className="text-[11px] text-muted">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Links */}
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-3">
                Quick Links
              </div>
              <div className="space-y-2">
                <a
                  href="#tech-stack"
                  className="block rounded-lg border border-line-faint bg-ink-700/40 px-3 py-2 text-[13px] font-medium text-body hover:bg-ink-700 hover:text-display transition-colors"
                >
                  Tech Stack
                </a>
                <a
                  href="#database"
                  className="block rounded-lg border border-line-faint bg-ink-700/40 px-3 py-2 text-[13px] font-medium text-body hover:bg-ink-700 hover:text-display transition-colors"
                >
                  Database Design
                </a>
                <a
                  href="#decisions"
                  className="block rounded-lg border border-line-faint bg-ink-700/40 px-3 py-2 text-[13px] font-medium text-body hover:bg-ink-700 hover:text-display transition-colors"
                >
                  Key Decisions
                </a>
                <a
                  href="#lessons"
                  className="block rounded-lg border border-line-faint bg-ink-700/40 px-3 py-2 text-[13px] font-medium text-body hover:bg-ink-700 hover:text-display transition-colors"
                >
                  Lessons Learned
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="space-y-16">
            {/* Description */}
            <div>
              <p className="text-[17px] leading-[1.8] text-bright">
                {project.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div id="tech-stack">
              <h2 className="font-display text-[32px] font-bold text-display mb-6">
                Technology Stack
              </h2>
              <div className="space-y-4">
                {project.architecture.techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="rounded-lg border border-line-faint bg-ink-700/40 p-6"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-[18px] text-display">{tech.name}</h3>
                      <InteractiveBadge label="Chosen" variant="primary" />
                    </div>
                    <p className="text-[14px] text-muted mb-4">{tech.purpose}</p>
                    <div className="rounded-lg bg-indigo-500/10 border border-indigo-500/20 p-4">
                      <div className="text-[11px] font-semibold uppercase tracking-wide text-indigo-300 mb-2">
                        Why this choice
                      </div>
                      <p className="text-[13px] text-indigo-200/80">{tech.why}</p>
                    </div>
                    {tech.alternatives.length > 0 && (
                      <div className="mt-4 text-[12px] text-muted">
                        <strong>Alternatives considered:</strong> {tech.alternatives.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Database Design */}
            <div id="database">
              <h2 className="font-display text-[32px] font-bold text-display mb-6">
                Database Design
              </h2>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="rounded-lg border border-line-faint bg-ink-700/40 p-6">
                  <h3 className="text-[14px] font-semibold text-display mb-3">
                    Schema Overview
                  </h3>
                  <p className="text-[13px] text-muted">
                    {project.architecture.database.schemaOverview}
                  </p>
                </div>
                <div className="rounded-lg border border-line-faint bg-ink-700/40 p-6">
                  <h3 className="text-[14px] font-semibold text-display mb-3">
                    Optimization Strategy
                  </h3>
                  <p className="text-[13px] text-muted">
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
                      className="rounded-lg border border-line-faint bg-ink-700/60 px-3 py-1.5 text-[12px] font-medium text-muted"
                    >
                      {table}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* API Design */}
            <div>
              <h2 className="font-display text-[32px] font-bold text-display mb-6">
                API Architecture
              </h2>
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
            </div>

            {/* Key Decisions */}
            <div id="decisions">
              <h2 className="font-display text-[32px] font-bold text-display mb-6">
                Key Architectural Decisions
              </h2>
              <ul className="space-y-4">
                {project.architecture.keyDecisions.map((decision, idx) => (
                  <li key={decision} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 font-mono text-[12px] font-semibold text-indigo-300">
                      {idx + 1}
                    </span>
                    <span className="text-[15px] leading-[1.75] text-body pt-0.5">
                      {decision}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tradeoffs */}
            <div>
              <h2 className="font-display text-[32px] font-bold text-display mb-6">
                Tradeoffs Made
              </h2>
              <ul className="space-y-4">
                {project.architecture.tradeoffs.map((tradeoff, idx) => (
                  <li key={tradeoff} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500/20 font-mono text-[12px] font-semibold text-amber-300">
                      {idx + 1}
                    </span>
                    <span className="text-[15px] leading-[1.75] text-body pt-0.5">
                      {tradeoff}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lessons Learned */}
            <div id="lessons">
              <h2 className="font-display text-[32px] font-bold text-display mb-6">
                Lessons Learned
              </h2>
              <ul className="space-y-4">
                {project.architecture.lessonsLearned.map((lesson, idx) => (
                  <li key={lesson} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 font-mono text-[12px] font-semibold text-emerald-300">
                      {idx + 1}
                    </span>
                    <span className="text-[15px] leading-[1.75] text-body pt-0.5">
                      {lesson}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deployment Strategy */}
            <div>
              <h2 className="font-display text-[32px] font-bold text-display mb-6">
                Deployment Strategy
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg border border-line-faint bg-ink-700/40 p-6">
                  <h3 className="text-[14px] font-semibold text-display mb-3">Hosting</h3>
                  <p className="text-[13px] text-muted">
                    {project.architecture.deployment.hosting}
                  </p>
                </div>
                <div className="rounded-lg border border-line-faint bg-ink-700/40 p-6">
                  <h3 className="text-[14px] font-semibold text-display mb-3">CI/CD</h3>
                  <p className="text-[13px] text-muted">
                    {project.architecture.deployment.ciCd}
                  </p>
                </div>
                <div className="rounded-lg border border-line-faint bg-ink-700/40 p-6">
                  <h3 className="text-[14px] font-semibold text-display mb-3">
                    Build Process
                  </h3>
                  <p className="text-[13px] text-muted">
                    {project.architecture.deployment.buildProcess}
                  </p>
                </div>
                <div className="rounded-lg border border-line-faint bg-ink-700/40 p-6">
                  <h3 className="text-[14px] font-semibold text-display mb-3">Monitoring</h3>
                  <p className="text-[13px] text-muted">
                    {project.architecture.deployment.monitoring}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigate to other projects */}
            <div className="pt-12 border-t border-line-faint">
              <Link
                to="/work"
                className="inline-flex items-center gap-2 text-[15px] font-semibold text-accent hover:underline"
              >
                <ArrowLeft size={16} />
                <span>View All Projects</span>
              </Link>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage;
