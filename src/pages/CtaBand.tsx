import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Section } from '@/components/ui/Section';
import { availability } from '@/content/data';

export const CtaBand: React.FC = () => (
  <Section id="cta" tone="ground">
    <ScrollReveal direction="up" distance={20}>
      <div className="arch-frame arch-corner-tl arch-corner-br rounded-2xl overflow-hidden surface-inset">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line-faint bg-ink-900/60 px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          <div className="flex items-center gap-2 text-success font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
            <span>{availability.status}</span>
          </div>
          <span>RESPONSE WINDOW // &lt; 24 HOURS</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 items-center p-6 sm:p-10 lg:p-12 gap-8 bg-ink-900/25">
          <div className="lg:col-span-8">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.03em] text-display mb-3">
              Got something to build?
            </h2>
            <p className="max-w-[54ch] text-[15px] leading-[1.75] text-body">
              Tell me what you are working on. If it is a fit, we will book a short call and I will
              give you an honest read on the architecture before anything is committed.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-wrap lg:justify-end items-center gap-3">
            <Link
              to="/contact"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-[14px] font-semibold text-onaccent transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-bright active:scale-[0.98]"
            >
              <span>Start a conversation</span>
              <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/work"
              className="inline-flex h-12 items-center justify-center rounded-full border border-line-strong px-6 text-[14px] font-semibold text-display transition-all duration-200 hover:border-accent hover:text-accent active:scale-[0.98]"
            >
              See the work
            </Link>
          </div>
        </div>
      </div>
    </ScrollReveal>
  </Section>
);

export default CtaBand;
