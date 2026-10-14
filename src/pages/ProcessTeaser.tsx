import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Section, SectionHead } from '@/components/ui/Section';
import { process, processIntro } from '@/content/data';

/**
 * A compact five-stage process strip for the homepage.
 *
 * The full process lives on /about; this is the numbered arc at a glance, so a
 * first-time visitor sees there is a method before they read the case studies.
 */
export const ProcessTeaser: React.FC = () => (
  <Section id="process-teaser" tone="band">
    <SectionHead title="How a project runs" lede={processIntro} />

    <ol className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {process.map((step, i) => (
        <ScrollReveal as="li" key={step.number} direction="up" distance={16} delay={i * 0.06}>
          <div className="flex h-full flex-col gap-2 border-t border-line pt-4">
            <span className="font-mono text-[13px] font-bold text-accent">{step.number}</span>
            <h3 className="text-[14px] font-semibold text-display">{step.title}</h3>
            <p className="text-[14px] leading-[1.6] text-muted">{step.description}</p>
          </div>
        </ScrollReveal>
      ))}
    </ol>

    <ScrollReveal direction="up" distance={16} delay={0.1}>
      <Link
        to="/about"
        className="group mt-8 inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent transition-all hover:gap-2.5"
      >
        <span>The full process</span>
        <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </ScrollReveal>
  </Section>
);

export default ProcessTeaser;
