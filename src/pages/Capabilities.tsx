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
import { architecturePatterns, capabilities, type CapabilityIcon } from '@/content/data';

const ICONS: Record<CapabilityIcon, LucideIcon> = {
  layers: Layers,
  gauge: Gauge,
  database: Database,
  accessibility: Accessibility,
  cloud: Cloud,
  pen: PenTool,
};

/**
 * Architecture capabilities, as a rule-separated grid.
 *
 * These are the architectural skills I bring to every project:
 * full-stack design, database-driven development, performance optimization,
 * accessibility, infrastructure, and design implementation.
 */
export const CapabilitiesSection: React.FC = () => (
  <Section id="capabilities" tone="ground">
    <SectionHead
      title="Architecture capabilities"
      lede="Six core engineering capabilities I bring to teams. Built on production experience, rigorous fundamentals, and end-to-end delivery."
    />

    <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
              <p className="mt-2 text-[14px] leading-[1.7] text-muted">
                {capability.description}
              </p>
            </div>
          </ScrollReveal>
        );
      })}
    </ul>

    {/* Architecture Pattern Tags — sourced from data.ts, the single list the
        capabilities lede and the hero marquee also draw from. */}
    <div className="mt-12 rounded-2xl border border-line-faint bg-tint-1 p-6">
      <div className="text-[12px] font-semibold uppercase tracking-wider text-muted mb-4">
        Architecture patterns I specialize in
      </div>
      <div className="flex flex-wrap gap-2">
        {architecturePatterns.map((pattern) => (
          <span
            key={pattern}
            className="rounded-lg border border-line-faint bg-ink-800/60 px-3 py-1.5 text-[12px] font-medium text-muted transition-colors hover:border-accent/30 hover:text-accent"
          >
            {pattern}
          </span>
        ))}
      </div>
    </div>
  </Section>
);

export default CapabilitiesSection;