import React from 'react';
import { Quote } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Section, SectionHead } from '@/components/ui/Section';
import { about } from '@/content/data';

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

export const TestimonialsSection: React.FC = () => (
  <Section id="testimonials" tone="ground">
    <SectionHead
      title="Kind words"
      lede="Feedback from collaborators and clients who have shipped projects with me."
    />

    <ul className="mt-12 grid gap-6 md:grid-cols-2">
      {about.testimonials.map((testimonial, index) => (
        <ScrollReveal as="li" key={testimonial.author} direction="up" distance={24} delay={index * 0.08}>
          <figure className="group relative flex h-full flex-col justify-between rounded-2xl border border-line bg-ink-700/60 p-7 md:p-8 backdrop-blur-sm transition-all duration-300 hover:border-line-strong hover:bg-ink-700/90 hover:-translate-y-1 shadow-lg">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <Quote size={28} className="text-accent/40 transition-colors group-hover:text-accent/70" />
                <div className="flex gap-1" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[12px] text-amber-400">★</span>
                  ))}
                </div>
              </div>
              <blockquote className="text-[15px] leading-[1.8] text-bright">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
            </div>

            <figcaption className="mt-8 flex items-center gap-3 border-t border-line/60 pt-5 text-[13px] text-muted">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-ink-850 font-mono text-[12px] font-bold text-accent">
                {getInitials(testimonial.author)}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-display">{testimonial.author}</div>
                <div className="text-[12px] text-muted">
                  {testimonial.role}
                  {testimonial.project ? ` · ${testimonial.project}` : ''}
                </div>
              </div>
            </figcaption>
          </figure>
        </ScrollReveal>
      ))}
    </ul>
  </Section>
);

export default TestimonialsSection;
