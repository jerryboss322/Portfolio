import React from 'react';
import {
  Accessibility,
  Cloud,
  Database,
  Gauge,
  Layers,
  PenTool,
  type LucideIcon,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Section, SectionHead } from '@/components/ui/Section';
import { capabilities, type CapabilityIcon } from '@/content/data';

const ICONS: Record<CapabilityIcon, LucideIcon> = {
  layers: Layers,
  gauge: Gauge,
  database: Database,
  accessibility: Accessibility,
  cloud: Cloud,
  pen: PenTool,
};

/**
 * Six capabilities, as a rule-separated grid.
 *
 * Rule treatment, no fill: these are claims, and a claim does not need a plate.
 * Keeping this section flat is also what stops the page reading as seven
 * identical box grids — the work, testimonial and contact sections carry the
 * filled surfaces, and this one deliberately does not.
 */
export const CapabilitiesSection: React.FC = () => (
  <Section id="capabilities" tone="ground">
    <SectionHead
      title="What I do"
      lede="Six core engineering capabilities I bring to teams. Built on production experience, rigorous fundamentals, and end-to-end delivery."
    />

    <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {capabilities.map((capability, index) => {
        const Icon = ICONS[capability.icon];

        return (
          <ScrollReveal
            as="li"
            key={capability.id}
            direction="up"
            distance={20}
            delay={(index % 3) * 0.08}
          >
            <div className="group h-full rounded-2xl border border-line bg-ink-700/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-line-strong hover:bg-ink-700/80 hover:-translate-y-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-line-faint bg-tint-2 text-bright transition-colors duration-200 group-hover:border-accent/30 group-hover:bg-accent/10 group-hover:text-accent">
                <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-[16px] font-semibold text-display transition-colors group-hover:text-display">
                {capability.title}
              </h3>
              <p className="mt-2 text-[13px] leading-[1.7] text-muted">
                {capability.description}
              </p>
            </div>
          </ScrollReveal>
        );
      })}
    </ul>
  </Section>
);

export default CapabilitiesSection;
