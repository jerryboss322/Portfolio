import React from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Section, SectionHead } from '@/components/ui/Section';
import { process, processIntro } from '@/content/data';

/**
 * The five architecture stages, as a horizontal strip.
 *
 * Rule treatment on a band ground to separate sections.
 * Architecture-first process: assess, design, build, test, deploy.
 */
export const ProcessSection: React.FC = () => (
  <Section id="process" tone="band">
    <SectionHead title="Architecture process" lede={processIntro} />

    <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {process.map((step, i) => (
        <ScrollReveal as="li" key={step.number} direction="up" distance={20} delay={i * 0.07}>
          <div className="group h-full rounded-2xl border border-line bg-ink-700/50 p-5 md:p-6 backdrop-blur-sm transition-all duration-300 hover:border-line-strong hover:bg-ink-700/80 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-line-faint bg-ink-850/80 font-mono text-[11px] font-bold text-accent shadow-sm transition-colors group-hover:border-accent/40 group-hover:bg-accent/10">
                {step.number}
              </span>
              <span className="text-[11px] font-medium uppercase tracking-wider text-faint">
                Phase {i + 1}
              </span>
            </div>
            <h3 className="mt-4 text-[15px] font-semibold text-display transition-colors group-hover:text-display">
              {step.title}
            </h3>
            <p className="mt-2 text-[13px] leading-[1.7] text-muted">
              {step.description}
            </p>
          </div>
        </ScrollReveal>
      ))}
    </ol>

    {/* Architecture Process Tags */}
    <div className="mt-12 rounded-2xl border border-line-faint bg-tint-1 p-6">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-4">
        What you get with each phase
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { phase: '01', title: 'Assess architecture', desc: 'Technical requirements, constraints, and goals' },
          { phase: '02', title: 'Design patterns', desc: 'Database schema, API design, deployment strategy' },
          { phase: '03', title: 'Build architecture', desc: 'Weekly demos of something running' },
          { phase: '04', title: 'Test robustness', desc: 'Empty states, bad input, security checks' },
          { phase: '05', title: 'Deploy sustainably', desc: 'Monitoring, documentation, handover walkthrough' },
        ].map((item) => (
          <div key={item.phase} className="rounded-xl border border-line-faint bg-ink-800/40 p-4">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-muted mb-1">Phase {item.phase}</div>
            <div className="text-[12px] font-semibold text-display mb-1">{item.title}</div>
            <div className="text-[11px] text-muted">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

export default ProcessSection;