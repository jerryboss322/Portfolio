import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { type Project } from '@/content/data';

interface ProjectModalProps {
  project: Project;
  markdownContent?: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Full-page modal for project architecture deep dive.
 * 
 * Left sidebar (30%): Tech stack, database, deployment
 * Right content (70%): Scrollable markdown with architecture details
 */
export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  markdownContent,
  isOpen,
  onClose,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink-900/95 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[1400px] my-8 mx-4 rounded-2xl border border-line bg-ink-850 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-ink-900/90 backdrop-blur-md px-8 py-6">
          <div>
            <h2 className="font-display text-[28px] font-bold text-display">{project.title}</h2>
            <p className="mt-1 text-[14px] text-muted">
              {project.architecture.style} · {project.year}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line-faint bg-ink-800 text-muted transition-colors hover:border-line hover:bg-ink-700 hover:text-display"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-[30%_70%]">
          {/* Left Sidebar - Architecture Summary */}
          <div className="border-r border-line bg-ink-850/60 p-8">
            <div className="sticky top-24 space-y-6">
              {/* Architecture Style */}
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-2">
                  Architecture
                </div>
                <div className="rounded-lg border border-line-faint bg-ink-800/60 p-3">
                  <p className="text-[13px] text-bright">{project.architecture.style}</p>
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-2">
                  Tech Stack
                </div>
                <div className="space-y-2">
                  {project.architecture.techStack.slice(0, 4).map((tech) => (
                    <div
                      key={tech.name}
                      className="group rounded-lg border border-line-faint bg-ink-800/40 p-3 transition-colors hover:border-indigo-500/30"
                    >
                      <div className="text-[13px] font-semibold text-display">{tech.name}</div>
                      <div className="mt-1 text-[11px] text-muted">{tech.purpose}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Database */}
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-2">
                  Database
                </div>
                <div className="rounded-lg border border-line-faint bg-ink-800/40 p-3">
                  <div className="text-[12px] font-semibold text-display mb-2">
                    {project.architecture.database.keyTables.length} tables
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.architecture.database.keyTables.slice(0, 4).map((table) => (
                      <span
                        key={table}
                        className="rounded-md bg-ink-900/60 px-2 py-0.5 text-[10px] font-medium text-muted"
                      >
                        {table}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Deployment */}
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-2">
                  Deployment
                </div>
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                  <div className="text-[13px] font-medium text-emerald-300">
                    {project.architecture.deployment.hosting}
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-2">
                  Metrics
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg border border-line-faint bg-ink-800/40 p-2 text-center">
                    <div className="text-[14px] font-bold text-display">
                      {project.architecture.keyDecisions.length}
                    </div>
                    <div className="text-[9px] uppercase tracking-wide text-muted">Decisions</div>
                  </div>
                  <div className="rounded-lg border border-line-faint bg-ink-800/40 p-2 text-center">
                    <div className="text-[14px] font-bold text-display">
                      {project.architecture.tradeoffs.length}
                    </div>
                    <div className="text-[9px] uppercase tracking-wide text-muted">Tradeoffs</div>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-2">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-lg border-2 border-accent bg-accent/10 px-3 py-2 text-center text-[12px] font-semibold text-accent transition-all hover:bg-accent hover:text-white"
                >
                  Live Site
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-lg border border-line-faint bg-ink-800/60 px-3 py-2 text-center text-[12px] font-medium text-bright transition-colors hover:bg-ink-800 hover:border-line-strong"
                >
                  Source
                </a>
              </div>
            </div>
          </div>

          {/* Right Content - Scrollable Details */}
          <div className="p-8 lg:p-12">
            <div className="prose prose-invert max-w-none">
              {/* Summary */}
              <div className="mb-8">
                <p className="text-[16px] leading-[1.8] text-bright">{project.summary}</p>
              </div>

              {/* Architecture Style */}
              <section className="mb-8">
                <h3 className="text-[20px] font-semibold text-display mb-4">Architecture Style</h3>
                <div className="rounded-lg border border-line-faint bg-ink-800/40 p-4">
                  <p className="text-[14px] text-muted">{project.architecture.style}</p>
                </div>
              </section>

              {/* Tech Stack Details */}
              <section className="mb-8">
                <h3 className="text-[20px] font-semibold text-display mb-4">Technology Stack</h3>
                <div className="space-y-4">
                  {project.architecture.techStack.map((tech) => (
                    <div
                      key={tech.name}
                      className="rounded-lg border border-line-faint bg-ink-800/40 p-4"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="font-semibold text-display text-[16px]">{tech.name}</div>
                        <span className="rounded-full bg-indigo-500/10 px-2 py-1 text-[9px] font-semibold uppercase text-indigo-300">
                          Chosen
                        </span>
                      </div>
                      <p className="text-[13px] text-muted mb-3">{tech.purpose}</p>
                      <div className="rounded bg-indigo-500/10 p-3">
                        <div className="text-[11px] font-semibold uppercase tracking-wide text-indigo-300 mb-1">
                          Why
                        </div>
                        <p className="text-[12px] text-indigo-200/80">{tech.why}</p>
                      </div>
                      {tech.alternatives.length > 0 && (
                        <div className="mt-3 text-[11px] text-muted">
                          <strong>Alternatives considered:</strong> {tech.alternatives.join(', ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Database Design */}
              <section className="mb-8">
                <h3 className="text-[20px] font-semibold text-display mb-4">Database Design</h3>
                <div className="grid gap-4 md:grid-cols-2 mb-4">
                  <div className="rounded-lg border border-line-faint bg-ink-800/40 p-4">
                    <div className="text-[13px] font-semibold text-display mb-2">Schema Overview</div>
                    <p className="text-[12px] text-muted">
                      {project.architecture.database.schemaOverview}
                    </p>
                  </div>
                  <div className="rounded-lg border border-line-faint bg-ink-800/40 p-4">
                    <div className="text-[13px] font-semibold text-display mb-2">
                      Optimization Strategy
                    </div>
                    <p className="text-[12px] text-muted">
                      {project.architecture.database.optimizationStrategy}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="text-[12px] font-semibold text-display mb-2">Key Tables</div>
                  <div className="flex flex-wrap gap-2">
                    {project.architecture.database.keyTables.map((table) => (
                      <span
                        key={table}
                        className="rounded-md border border-line-faint bg-ink-800/60 px-2.5 py-1 text-[11px] font-medium text-muted"
                      >
                        {table}
                      </span>
                    ))}
                  </div>
                </div>
              </section>

              {/* Key Decisions */}
              <section className="mb-8">
                <h3 className="text-[20px] font-semibold text-display mb-4">
                  Key Architectural Decisions
                </h3>
                <ul className="space-y-3">
                  {project.architecture.keyDecisions.map((decision, idx) => (
                    <li key={decision} className="flex gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 font-mono text-[10px] font-semibold text-indigo-300">
                        {idx + 1}
                      </span>
                      <span className="text-[14px] text-muted">{decision}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Tradeoffs */}
              <section className="mb-8">
                <h3 className="text-[20px] font-semibold text-display mb-4">Tradeoffs Made</h3>
                <ul className="space-y-3">
                  {project.architecture.tradeoffs.map((tradeoff, idx) => (
                    <li key={tradeoff} className="flex gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 font-mono text-[10px] font-semibold text-amber-300">
                        {idx + 1}
                      </span>
                      <span className="text-[14px] text-muted">{tradeoff}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Lessons Learned */}
              <section>
                <h3 className="text-[20px] font-semibold text-display mb-4">Lessons Learned</h3>
                <ul className="space-y-3">
                  {project.architecture.lessonsLearned.map((lesson, idx) => (
                    <li key={lesson} className="flex gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 font-mono text-[10px] font-semibold text-emerald-300">
                        {idx + 1}
                      </span>
                      <span className="text-[14px] text-muted">{lesson}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;