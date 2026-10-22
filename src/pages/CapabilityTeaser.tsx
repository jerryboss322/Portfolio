import React from 'react';
import { Link } from 'react-router-dom';
import {
  Accessibility,
  ArrowUpRight,
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

/** The four capabilities worth naming on the homepage; the rest live on /about. */
const TEASER_IDS = ['architecture', 'performance', 'data', 'infra'];

export const CapabilityTeaser: React.FC = () => {
  const items = TEASER_IDS.map((id) => capabilities.find((c) => c.id === id)).filter(
    (c): c is (typeof capabilities)[number] => Boolean(c)
  );

  return (
    <Section id="what-i-do" tone="ground">
      <SectionHead
        title="What I do"
        lede="Four things I bring to every build. The full set is on the about page."
      />

      <ul className="mt-8 arch-frame arch-corner-tl arch-corner-br rounded-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-line-faint surface-inset">
        {items.map((capability, index) => {
          const Icon = ICONS[capability.icon];
          return (
            <li
              key={capability.id}
              className="group p-6 sm:p-8 border-b border-line-faint bg-ink-900/20 transition-colors duration-200 hover:bg-ink-900/45"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent tabular-nums">
                  CAPABILITY 0{index + 1}
                </span>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line-faint bg-ink-850 text-bright transition-colors group-hover:border-accent/40 group-hover:text-accent">
                  <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                </div>
              </div>
              <h3 className="text-[17px] font-semibold text-display mb-2">{capability.title}</h3>
              <p className="text-[14px] leading-[1.7] text-muted">{capability.description}</p>
            </li>
          );
        })}
      </ul>

      <ScrollReveal direction="up" distance={16} delay={0.08}>
        <div className="mt-6 flex items-center justify-between">
          <Link
            to="/about"
            className="group inline-flex items-center gap-1.5 font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-accent transition-all hover:gap-2.5"
          >
            <span>All capabilities</span>
            <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            to="/services"
            className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted hover:text-display transition-colors"
          >
            View service scopes →
          </Link>
        </div>
      </ScrollReveal>
    </Section>
  );
};

export default CapabilityTeaser;
