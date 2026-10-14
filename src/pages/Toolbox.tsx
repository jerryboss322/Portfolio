import React from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Section, SectionHead } from '@/components/ui/Section';
import { toolbox } from '@/content/data';

/**
 * The stack, grouped by what it is for.
 *
 * A toolbox rather than a tag cloud: each column names a layer (frontend,
 * backend, data, infra) so the list reads as a working set rather than a
 * pile of logos. Rule treatment — a border-top per group, no cards — so it
 * stays quiet next to the capabilities grid.
 */
export const Toolbox: React.FC = () => (
  <Section id="toolbox" tone="ground">
    <SectionHead
      title="The toolbox"
      lede="What I reach for, grouped by the job it does. Boring and reliable by design."
    />

    <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {toolbox.map((group, index) => (
        <ScrollReveal key={group.category} direction="up" distance={20} delay={(index % 4) * 0.07}>
          <div className="h-full border-t border-line pt-5">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">
              {group.category}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {group.items.map((item) => (
                <li key={item} className="text-[14px] font-medium text-bright">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </Section>
);

export default Toolbox;
