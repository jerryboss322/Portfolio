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

/**
 * What you can buy.
 *
 * The about page answers "what can he do". This answers the question a
 * visitor actually arrives with, which is "which of those do I want" — so
 * these are offerings with a price conversation attached, not a second
 * list of skills. Same card treatment as Capabilities on purpose; the
 * difference is that each of these ends in a decision rather than a nod.
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

        <ul className="mt-6 grid gap-5 lg:grid-cols-2">
          {services.map((service, index) => {
            const Icon = ICONS[service.icon];

            return (
              <ScrollReveal
                as="li"
                key={service.id}
                direction="up"
                distance={20}
                delay={(index % 2) * 0.08}
                className="h-full"
              >
                <article className="group flex h-full flex-col rounded-2xl border border-line bg-ink-700/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-line-strong hover:bg-ink-700/80">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-line-faint bg-tint-2 text-bright transition-colors duration-200 group-hover:border-accent/30 group-hover:bg-accent/10 group-hover:text-accent">
                    <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                  </div>

                  <h2 className="mt-4 text-[18px] font-semibold text-display">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-[14px] leading-[1.7] text-muted">
                    {service.summary}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {service.includes.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[14px] leading-[1.6] text-body">
                        <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 border-t border-line-faint pt-4 text-[13px] leading-[1.6] text-muted">
                    <span className="font-semibold text-bright">Best for: </span>
                    {service.bestFor}
                  </p>
                </article>
              </ScrollReveal>
            );
          })}
        </ul>
      </Section>

      <Section id="how-we-work" tone="band">
        <SectionHead
          title="How working together goes"
          lede="The parts clients usually want to know before starting: what they own, what they receive, and how the boring administrative details work."
        />

        <dl className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {engagementTerms.map((term, index) => (
            <ScrollReveal
              key={term.id}
              direction="up"
              distance={20}
              delay={(index % 3) * 0.06}
            >
              <div className="h-full rounded-2xl border border-line-faint bg-tint-1 p-6">
                {/* The heading lives inside the <dt> rather than replacing it:
                    a term/description pair is the right semantics for this, and
                    <dt> may contain flow content, so screen reader users still
                    get these as navigable headings. */}
                <dt>
                  <h3 className="text-[15px] font-semibold text-display">{term.title}</h3>
                </dt>
                <dd className="mt-2 text-[14px] leading-[1.7] text-muted">{term.detail}</dd>
              </div>
            </ScrollReveal>
          ))}
        </dl>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/contact"
            className="inline-flex h-11 cursor-pointer items-center rounded-full bg-accent px-7 text-[14px] font-semibold text-onaccent transition-all duration-200 hover:scale-[1.03] hover:brightness-110 active:scale-[0.98]"
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