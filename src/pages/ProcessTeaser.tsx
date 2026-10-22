import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Section, SectionHead } from '@/components/ui/Section';
import { process, processIntro } from '@/content/data';

export const ProcessTeaser: React.FC = () => (
  <Section id="process-teaser" tone="band">
    <SectionHead title="How a project runs" lede={processIntro} />

    <ol className="mt-8 arch-frame arch-corner-tl arch-corner-br rounded-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-line-faint surface-inset">
      {process.map((step) => (
        <li
          key={step.number}
          className="flex flex-col justify-between p-5 sm:p-6 bg-ink-900/20 transition-colors hover:bg-ink-900/45"
        >
          <div>
            <div className="mb-3 flex items-center justify-between font-mono text-[11px]">
              <span className="font-bold text-accent tabular-nums">STAGE {step.number}</span>
              <span className="text-faint" aria-hidden="true">→</span>
            </div>
            <h3 className="text-[15px] font-semibold text-display mb-2">{step.title}</h3>
            <p className="text-[13px] leading-[1.65] text-muted">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>

    <ScrollReveal direction="up" distance={16} delay={0.08}>
      <Link
        to="/about"
        className="group mt-6 inline-flex items-center gap-1.5 font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-accent transition-all hover:gap-2.5"
      >
        <span>The full process</span>
        <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </ScrollReveal>
  </Section>
);

export default ProcessTeaser;
