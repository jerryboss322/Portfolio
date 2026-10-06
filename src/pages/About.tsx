import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Section, SectionHead } from '@/components/ui/Section';
import { about, values, profile } from '@/content/data';

/**
 * About Jerry: Philosophy, Principles, and Journey.
 *
 * Removes the duplicate portrait photo to keep the page clean and purposeful.
 * Pairs an interactive principles card with a modern vertical milestone timeline.
 */
export const AboutSection: React.FC = () => (
  <Section id="about" tone="ground">
    <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 items-start">
      {/* ---- Left: Developer Profile & Principles ---- */}
      <ScrollReveal direction="left" distance={30}>
        <div className="rounded-2xl border border-line bg-ink-700/60 p-6 md:p-8 backdrop-blur-sm shadow-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="font-semibold text-display text-[16px]">{profile.fullName}</div>
              <div className="text-[12px] text-muted">{profile.role} · {profile.location}</div>
            </div>
          </div>

          <div className="mt-6 border-t border-line/60 pt-6">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              Core Principles
            </div>
            <ul className="mt-3.5 space-y-2.5">
              {values.map((value) => (
                <li
                  key={value}
                  className="group flex items-center gap-2.5 rounded-xl border border-line-faint bg-ink-850/60 px-3.5 py-2.5 text-[13px] font-medium text-bright transition-all duration-200 hover:border-line hover:bg-ink-850 hover:text-display"
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

          <div className="mt-6 rounded-xl border border-line-faint bg-tint-1 p-4 text-[13px] leading-[1.7] text-muted">
            <span className="font-medium text-bright">Focus: </span>
            End-to-end web engineering with TypeScript, modern React, resilient backend architecture, and production performance.
          </div>
        </div>
      </ScrollReveal>

      {/* ---- Right: Argument + Connected Timeline ---- */}
      <div>
        <SectionHead title="About me" />

        <ScrollReveal direction="up" distance={20} delay={0.1}>
          <p className="mt-6 max-w-[58ch] text-[16px] leading-[1.8] text-bright">
            {about.paragraph}
          </p>
        </ScrollReveal>

        <div className="mt-12">
          <div className="text-[12px] font-semibold uppercase tracking-wider text-muted mb-6">
            Experience & Journey
          </div>

          <ol className="relative ml-2 space-y-8 border-l border-line/80 pl-6 sm:ml-3 sm:pl-8">
            {about.timeline.map((entry, i) => (
              <ScrollReveal
                key={entry.period}
                as="li"
                direction="up"
                distance={16}
                delay={i * 0.08}
              >
                {/* Glowing node indicator on timeline */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-ink-900 transition-transform duration-200 hover:scale-125"
                />

                <div className="group rounded-xl border border-line-faint bg-ink-700/40 p-4 sm:p-5 backdrop-blur-sm transition-all duration-200 hover:border-line hover:bg-ink-700/70">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-[15px] font-semibold text-display">
                      {entry.title}
                    </h3>
                    <span className="rounded-full border border-line-faint bg-tint-2 px-2.5 py-0.5 font-mono text-[11px] font-medium text-accent">
                      {entry.period}
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] leading-[1.7] text-muted">
                    {entry.description}
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
