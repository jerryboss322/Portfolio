import React from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Section, SectionHead } from '@/components/ui/Section';
import { principles } from '@/content/data';

/**
 * How I work, in four principles with the reasoning attached.
 *
 * The About page's `values` chips are the short version; this is the long one.
 * Rule treatment — a left rule per item, no card — so a section that makes an
 * argument does not get a box, per the plates-vs-rules distinction.
 */
export const Principles: React.FC = () => (
  <Section id="principles" tone="ground">
    <SectionHead
      title="How I work"
      lede="Four principles that decide the tradeoffs when a project gets hard."
    />

    <div className="mt-6 grid gap-x-12 gap-y-10 md:grid-cols-2">
      {principles.map((principle, index) => (
        <ScrollReveal key={principle.title} direction="up" distance={20} delay={(index % 2) * 0.08}>
          <div className="border-l-2 border-line pl-6">
            <h3 className="font-display text-[19px] font-semibold text-display">
              {principle.title}
            </h3>
            <p className="mt-3 text-[14px] leading-[1.8] text-muted">{principle.body}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </Section>
);

export default Principles;
