import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Database, Server, Layers } from 'lucide-react';
import { Media } from '@/components/ui/Media';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Marquee } from '@/components/ui/Marquee';
import { InteractiveBadge } from '@/components/ui/InteractiveBadge';
import { portrait } from '@/content/images';
import { profile, heroStats, architecturePatterns, projects } from '@/content/data';

// Get Titan project for architecture showcase
const TITAN_PROJECT = projects.find(p => p.slug === 'titan')!;

export const Hero: React.FC = () => {
  const [titanExpanded, setTitanExpanded] = useState(false);

  return (
    <section id="home" className="relative border-b border-line-faint overflow-hidden">
      {/* Dramatic atmospheric lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-20 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-sky-500/25 via-indigo-500/20 to-transparent blur-[160px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -left-20 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-purple-500/20 via-pink-500/15 to-transparent blur-[160px]"
      />

      <div className="shell relative py-16 sm:py-20 md:py-28 lg:py-32">
        {/* Asymmetric Grid: 60/40 split */}
        <div className="grid items-start gap-8 sm:gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          {/* Left: Large Headline + CTA (60%) */}
          <div>
            {/* Profile Badge with Image */}
            <ScrollReveal direction="up" distance={20}>
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="relative">
                  <div className="h-12 w-12 sm:h-16 sm:w-16 overflow-hidden rounded-full ring-2 ring-line-strong ring-offset-2 ring-offset-ink-900">
                    <Media
                      asset={portrait}
                      alt={profile.fullName}
                      sizes="64px"
                      priority
                      imgClassName="object-cover object-top"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 sm:h-4 sm:w-4 rounded-full border-2 border-ink-900 bg-emerald-500 shadow-lg">
                    <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
                  </span>
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-[12px] font-semibold text-emerald-300 shadow-lg shadow-emerald-500/10 backdrop-blur-sm">
                    <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-500" />
                    </span>
                    <span>{profile.status}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={24} delay={0.05}>
              <h1 className="mt-6 sm:mt-8 font-display text-[clamp(1.75rem,8vw,5rem)] font-bold leading-[1.02] tracking-[-0.05em] text-display">
                I architect{' '}
                <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  full-stack systems
                </span>
                , database to deployment.
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={20} delay={0.1}>
              <p className="mt-6 sm:mt-8 max-w-[54ch] text-[15px] sm:text-[17px] leading-[1.75] text-bright">
                I'm Jerry, a software engineer in Ogbomoso, Nigeria. I design database schemas,
                architect APIs, and deploy to production. Every project ships with full technical
                documentation.
              </p>
            </ScrollReveal>

            {/* Architectural Stats */}
            <ScrollReveal direction="up" distance={20} delay={0.15}>
              <div className="mt-8 sm:mt-10 grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                <div className="rounded-xl border border-line-faint bg-ink-700/40 p-3 sm:p-4 backdrop-blur-sm">
                  <div className="font-display text-[24px] sm:text-[32px] font-bold tracking-tight bg-gradient-to-br from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                    5
                  </div>
                  <div className="mt-1 text-[9px] sm:text-[11px] font-medium uppercase tracking-wide text-muted">
                    Production systems
                  </div>
                </div>
                <div className="rounded-xl border border-line-faint bg-ink-700/40 p-3 sm:p-4 backdrop-blur-sm">
                  <div className="font-display text-[24px] sm:text-[32px] font-bold tracking-tight bg-gradient-to-br from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    12+
                  </div>
                  <div className="mt-1 text-[9px] sm:text-[11px] font-medium uppercase tracking-wide text-muted">
                    Database tables
                  </div>
                </div>
                <div className="rounded-xl border border-line-faint bg-ink-700/40 p-3 sm:p-4 backdrop-blur-sm">
                  <div className="font-display text-[24px] sm:text-[32px] font-bold tracking-tight bg-gradient-to-br from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                    100%
                  </div>
                  <div className="mt-1 text-[9px] sm:text-[11px] font-medium uppercase tracking-wide text-muted">
                    Full ownership
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={20} delay={0.2}>
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
                <Link
                  to="/work"
                  className="group inline-flex h-12 cursor-pointer items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 px-6 sm:px-7 text-[14px] sm:text-[15px] font-semibold text-white shadow-xl shadow-sky-500/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-indigo-500/35 hover:brightness-110 active:scale-[0.98]"
                >
                  <span>Explore architecture</span>
                  <ArrowDown size={16} className="transition-transform duration-200 group-hover:translate-y-1" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex h-12 cursor-pointer items-center justify-center rounded-full border-2 border-line-strong px-6 sm:px-7 text-[14px] sm:text-[15px] font-semibold text-display transition-all duration-200 hover:scale-[1.03] hover:border-sky-400/50 hover:bg-sky-500/10 hover:text-sky-300 active:scale-[0.98]"
                >
                  Let's talk systems
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Titan Architecture Card (40%) */}
          <ScrollReveal direction="right" distance={40} delay={0.25}>
            <div className="mx-auto w-full max-w-[400px] lg:mx-0">
              <button
                onClick={() => setTitanExpanded(!titanExpanded)}
                className="group relative w-full text-left"
              >
                {/* Vibrant glow effect */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-sky-500/40 via-indigo-500/30 to-purple-500/40 opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-90"
                />

                {/* Card */}
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.15] bg-ink-700/80 p-6 shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:border-sky-400/50 group-hover:shadow-sky-500/20">
                  {/* Header */}
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-accent">
                    <Layers size={14} />
                    <span>Featured Architecture</span>
                  </div>

                  <h3 className="mt-4 font-display text-[26px] font-bold text-display">
                    {TITAN_PROJECT.title}
                  </h3>
                  <p className="mt-2 text-[13px] text-muted">
                    {TITAN_PROJECT.architecture.style}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="mt-6 space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-muted mb-2">
                        <Server size={12} />
                        <span>Stack</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {TITAN_PROJECT.architecture.techStack.slice(0, 3).map((tech) => (
                          <InteractiveBadge
                            key={tech.name}
                            label={tech.name}
                            tooltip={tech.purpose}
                            variant="primary"
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-muted mb-2">
                        <Database size={12} />
                        <span>Database</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {TITAN_PROJECT.architecture.database.keyTables.slice(0, 3).map((table) => (
                          <InteractiveBadge
                            key={table}
                            label={table}
                            variant="default"
                          />
                        ))}
                        <InteractiveBadge
                          label={`+${TITAN_PROJECT.architecture.database.keyTables.length - 3}`}
                          variant="default"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Metrics Bar */}
                  <div className="mt-6 grid grid-cols-3 gap-3 rounded-lg border border-line-faint bg-ink-800/60 p-3">
                    <div>
                      <div className="text-[16px] font-bold text-display">
                        {TITAN_PROJECT.architecture.database.keyTables.length}
                      </div>
                      <div className="text-[9px] uppercase tracking-wide text-muted">Tables</div>
                    </div>
                    <div>
                      <div className="text-[16px] font-bold text-display">
                        {TITAN_PROJECT.architecture.api.endpoints.length}
                      </div>
                      <div className="text-[9px] uppercase tracking-wide text-muted">Endpoints</div>
                    </div>
                    <div>
                      <div className="text-[16px] font-bold text-display">
                        {TITAN_PROJECT.architecture.keyDecisions.length}
                      </div>
                      <div className="text-[9px] uppercase tracking-wide text-muted">Decisions</div>
                    </div>
                  </div>

                  {/* Expand Indicator */}
                  <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-medium text-accent">
                    <span>Click for full architecture</span>
                    <ArrowUpRight size={12} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </button>

              {/* Profile Badge */}
              <div className="mt-6 flex items-center justify-between rounded-xl border border-line-faint bg-ink-800/40 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-line">
                    <Media
                      asset={portrait}
                      alt=""
                      sizes="40px"
                      imgClassName="object-cover object-top"
                    />
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-ink-800 bg-success" />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-display">{profile.fullName}</div>
                    <div className="text-[11px] text-muted">{profile.location}</div>
                  </div>
                </div>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-center gap-1 text-[12px] font-medium text-muted transition-colors hover:text-accent"
                >
                  <span>GitHub</span>
                  <ArrowUpRight size={12} className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Architecture Patterns Marquee */}
      <div className="border-t border-line-faint bg-ink-850/70 backdrop-blur-md">
        <div className="shell flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:gap-8">
          <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.15em] text-muted">
            Architecture patterns I specialize in
          </span>
          <div className="min-w-0 flex-1">
            <Marquee items={architecturePatterns} label="Architecture patterns" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;