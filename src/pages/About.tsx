import React from 'react';
import { CheckCircle2, Code2, Database, Server } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Section, SectionHead } from '@/components/ui/Section';
import { about, values, profile } from '@/content/data';

/**
 * About Jerry: Architecture Philosophy and Technical Journey.
 *
 * Technical journey timeline replacing personal timeline.
 * Architecture principles card showing core engineering values.
 */
export const AboutSection: React.FC = () => (
  <Section id="about" tone="ground">
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 items-start">
      {/* ---- Left: Developer Profile & Architecture Principles ---- */}
      <ScrollReveal direction="left" distance={30}>
        <div className="rounded-2xl border border-line bg-ink-700/60 p-6 md:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent">
              <Code2 size={20} />
            </div>
            <div>
              <div className="font-semibold text-display text-[16px]">{profile.fullName}</div>
              <div className="text-[13px] text-muted">{profile.role} · {profile.location}</div>
            </div>
          </div>

          <div className="mt-6 border-t border-line/60 pt-6">
            <div className="text-[12px] font-semibold uppercase tracking-wider text-muted">
              Architecture Principles
            </div>
            <ul className="mt-3.5 space-y-2.5">
              {values.map((value) => (
                <li
                  key={value}
                  className="group flex items-center gap-2.5 rounded-xl border border-line-faint bg-ink-850/60 px-3.5 py-2.5 text-[14px] font-medium text-bright transition-all duration-200 hover:border-line hover:bg-ink-850 hover:text-display"
                >
                  <CheckCircle2
                    size={15}
                    className="shrink-0 text-accent transition-transform duration-200 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-xl border border-line-faint bg-tint-1 p-4 text-[14px] leading-[1.7] text-muted">
            <span className="font-medium text-bright">Focus: </span>
            Full-stack architecture design with database-driven development, RESTful APIs, serverless deployment, and production-grade performance.
          </div>

          {/* Architecture Skills Showcase */}
          <div className="mt-6">
            <div className="text-[12px] font-semibold uppercase tracking-wider text-muted mb-3">
              Technical expertise
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-line-faint bg-ink-800/40 p-3">
                <Database size={16} className="mb-2 text-accent" />
                <div className="text-[13px] font-semibold text-display">Database Design</div>
                <div className="text-[11px] text-muted mt-1">PostgreSQL, MySQL, schema design</div>
              </div>
              <div className="rounded-lg border border-line-faint bg-ink-800/40 p-3">
                <Server size={16} className="mb-2 text-success" />
                <div className="text-[13px] font-semibold text-display">Deployment</div>
                <div className="text-[11px] text-muted mt-1">Vercel, Railway, CI/CD</div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ---- Right: Technical Journey Timeline ---- */}
      <div>
        <SectionHead title="Technical journey" />

        <ScrollReveal direction="up" distance={20} delay={0.1}>
          <p className="mt-6 max-w-[58ch] text-[16px] leading-[1.8] text-bright">
            {about.paragraph}
          </p>
        </ScrollReveal>

        <div className="mt-8">
          <div className="text-[13px] font-semibold uppercase tracking-wider text-muted mb-6">
            Technical milestones
          </div>

          <ol className="relative ml-2 space-y-8 border-l border-line/80 pl-6 sm:ml-3 sm:pl-8">
            {about.timeline.map((entry, i) => (
              <ScrollReveal
                key={entry.period}
                as="li"
                direction="up"
                distance={16}
                delay={i * 0.08}
                className="relative"
              >
                {/* Node on the timeline rail — the anchor for each era. */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[calc(1.5rem+5px)] top-6 h-2.5 w-2.5 rounded-full border-2 border-ink-900 bg-line-strong transition-colors duration-200 group-hover:bg-accent sm:-left-[calc(2rem+5px)]"
                />
                <div className="group rounded-xl border border-line-faint bg-ink-700/45 p-4 sm:p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-line hover:bg-ink-700/75">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-[15px] font-semibold text-display">
                      {entry.title}
                    </h3>
                    <span className="rounded-full border border-line-faint bg-tint-2 px-2.5 py-0.5 font-mono text-[12px] font-medium text-accent">
                      {entry.period}
                    </span>
                  </div>
                  <p className="mt-2 text-[14px] leading-[1.7] text-muted">
                    {entry.description}
                  </p>
                  <p className="mt-2 text-[12px] font-medium text-accent/80">
                    {entry.technicalFocus}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </div>
    </div>
  </Section>
);

export default AboutSection;