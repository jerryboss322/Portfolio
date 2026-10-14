import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Section } from '@/components/ui/Section';
import { availability } from '@/content/data';

/**
 * A closing call-to-action band.
 *
 * The home page used to end on a testimonial with no next step; this gives it
 * one. Uses the shared availability line so the status lives in one place.
 */
export const CtaBand: React.FC = () => (
  <Section id="cta" tone="ground">
    <ScrollReveal direction="up" distance={24}>
      <div className="relative overflow-hidden rounded-2xl border border-line bg-ink-700/50 px-6 py-12 text-center backdrop-blur-sm sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/8 via-transparent to-accent-indigo/8" aria-hidden="true" />
        <div className="relative">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3.5 py-1.5 text-[13px] font-medium text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
            {availability.status}
          </div>
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-display text-balance">
            Got something to build?
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-[15px] leading-[1.75] text-bright">
            Tell me what you are working on. If it is a fit, we will book a short call and I will
            give you an honest read on the architecture before anything is committed.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-accent px-7 text-[14px] sm:text-[15px] font-semibold text-onaccent shadow-lg transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Start a conversation</span>
              <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/work"
              className="inline-flex h-12 items-center justify-center rounded-full border-2 border-line-strong px-7 text-[14px] sm:text-[15px] font-semibold text-display transition-all duration-200 hover:border-accent hover:text-accent active:scale-[0.98]"
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
