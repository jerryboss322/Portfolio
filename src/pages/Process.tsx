import React from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Section, SectionHead } from '@/components/ui/Section';
import { process, processIntro } from '@/content/data';

/**
 * The five stages, as a horizontal strip.
 *
 * Rule treatment again, but on a band ground so the section separates from
 * About and Capabilities without a fill. A row with dividers reads as a
 * sequence; a fifth grid of boxes would just be more of the same.
 */
export const ProcessSection: React.FC = () => (
  <Section id="process" tone="band">
    <SectionHead title="How a project goes" lede={processIntro} />

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
  </Section>
);

export default ProcessSection;
