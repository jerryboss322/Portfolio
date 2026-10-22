import React from 'react';
import {
  Blocks,
  LayoutTemplate,
  RefreshCw,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Section, SectionHead } from '@/components/ui/Section';
import { engagementTerms, services, type ServiceIcon } from '@/content/data';
import { useDocumentTitle } from '@/lib/hooks';

const ICONS: Record<ServiceIcon, LucideIcon> = {
  layout: LayoutTemplate,
  refresh: RefreshCw,
  stack: Blocks,
  wrench: Wrench,
};

const TIMELINES: Record<string, string> = {
  'marketing-site': 'TYPICAL WINDOW // 2–3 WEEKS',
  'web-app': 'TYPICAL WINDOW // 4–8 WEEKS',
  'redesign': 'TYPICAL WINDOW // 1–3 WEEKS',
  'retainer': 'CADENCE // ONGOING OR SPRINT',
};

/**
 * What you can buy — presented as an architectural scope blueprint matrix.
 */
export const ServicesPage: React.FC = () => {
  useDocumentTitle('Services — Jerry Adewole');

  return (
    <>
      <Section id="services" tone="ground">
        <SectionHead
          level={1}
          title="What you can hire me for"
          lede="Four ways we usually work together. Each one is scoped and priced on its own — if none of them fit, say so on the contact form and I will tell you honestly whether I am the right person."
        />

        <div className="mt-8 arch-frame arch-corner-tl arch-corner-br rounded-2xl overflow-hidden divide-y divide-line-faint surface-inset">
          {services.map((service, index) => {
            const Icon = ICONS[service.icon];

            return (
              <ScrollReveal
                key={service.id}
                direction="up"
                distance={16}
                delay={index * 0.05}
              >
                <article className="group grid grid-cols-1 lg:grid-cols-12 transition-colors duration-200 hover:bg-ink-900/35">
                  {/* Col 1: Scope Identity (4 cols) */}
                  <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-line-faint bg-ink-900/25">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent tabular-nums">
                          SCOPE 0{index + 1}
                        </span>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-line-faint bg-ink-850 text-bright transition-colors group-hover:border-accent/40 group-hover:text-accent">
                          <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                        </div>
                      </div>

                      <h2 className="font-display text-[20px] sm:text-[22px] font-bold text-display mb-2.5">
                        {service.title}
                      </h2>
                      <p className="text-[14px] leading-[1.7] text-body">
                        {service.summary}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-line-faint/70 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                      {TIMELINES[service.id] ?? 'FIXED-SCOPE DELIVERY'}
                    </div>
                  </div>

                  {/* Col 2: Deliverable Specification (5 cols) */}
                  <div className="lg:col-span-5 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-line-faint">
                    <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted mb-3.5">
                      INCLUDED DELIVERABLES
                    </div>
                    <ul className="space-y-2.5">
                      {service.includes.map((item) => (
                        <li key={item} className="flex gap-3 text-[14px] leading-[1.6] text-body">
                          <span
                            aria-hidden="true"
                            className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Col 3: Best-Fit Profile (3 cols) */}
                  <div className="lg:col-span-3 p-6 sm:p-8 flex flex-col justify-between bg-ink-900/15">
                    <div>
                      <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-accent mb-2.5">
                        BEST FIT
                      </div>
                      <p className="text-[13px] leading-[1.65] text-muted">
                        <span className="sr-only">Best for: </span>
                        {service.bestFor}
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-line-faint/60 flex items-center justify-between font-mono text-[11px] text-muted">
                      <span>OWNERSHIP</span>
                      <span className="text-bright">100% CLIENT REPO</span>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </Section>

      <Section id="how-we-work" tone="band">
        <SectionHead
          title="How working together goes"
          lede="The parts clients usually want to know before starting: what they own, what they receive, and how the boring administrative details work."
        />

        <dl className="mt-8 arch-frame arch-corner-tl arch-corner-br rounded-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line-faint surface-inset">
          {engagementTerms.map((term, index) => (
            <div
              key={term.id}
              className="p-6 sm:p-7 border-b border-line-faint bg-ink-900/20 transition-colors hover:bg-ink-900/40"
            >
              <div className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-accent tabular-nums">
                TERM 0{index + 1}
              </div>
              <dt>
                <h3 className="text-[16px] font-semibold text-display">{term.title}</h3>
              </dt>
              <dd className="mt-2 text-[14px] leading-[1.7] text-muted">{term.detail}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/contact"
            className="inline-flex h-11 cursor-pointer items-center rounded-full bg-accent px-7 text-[14px] font-semibold text-onaccent transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-bright active:scale-[0.98]"
          >
            Start a conversation
          </Link>
          <Link
            to="/work"
            className="inline-flex h-11 cursor-pointer items-center rounded-full border border-line-strong px-7 text-[14px] font-semibold text-bright transition-all duration-200 hover:border-accent/40 hover:text-accent"
          >
            See the work first
          </Link>
        </div>
      </Section>
    </>
  );
};

export default ServicesPage;
