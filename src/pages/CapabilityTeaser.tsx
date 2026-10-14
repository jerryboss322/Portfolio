import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
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

/** The four capabilities worth naming on the homepage; the rest live on /about. */
const TEASER_IDS = ['architecture', 'performance', 'data', 'infra'];

/**
 * A compact "what I do" strip for the homepage.
 *
 * Four of the six capabilities, linked through to the full set on /about. It
 * gives the homepage a second thought between the hero and the work preview
 * without repeating the whole capabilities grid.
 */
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

      <ul className="mt-6 grid gap-5 sm:grid-cols-2">
        {items.map((capability, index) => {
          const Icon = ICONS[capability.icon];
          return (
            <ScrollReveal as="li" key={capability.id} direction="up" distance={20} delay={(index % 2) * 0.08}>
              <div className="group flex h-full gap-4 rounded-2xl border border-line bg-ink-700/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-line-strong hover:bg-ink-700/80">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line-faint bg-tint-2 text-bright transition-colors duration-200 group-hover:border-accent/30 group-hover:bg-accent/10 group-hover:text-accent">
                  <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[16px] font-semibold text-display">{capability.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.7] text-muted">{capability.description}</p>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </ul>

      <ScrollReveal direction="up" distance={16} delay={0.1}>
        <Link
          to="/about"
          className="group mt-8 inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent transition-all hover:gap-2.5"
        >
          <span>All capabilities</span>
          <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </ScrollReveal>
    </Section>
  );
};

export default CapabilityTeaser;
