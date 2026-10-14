import React from 'react';
import { Quote } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Section } from '@/components/ui/Section';
import { about } from '@/content/data';

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/**
 * A single featured quote for the homepage.
 *
 * One testimonial, large, as social proof between the work preview and the
 * footer. The full set lives on /about — this is the one worth putting in
 * front of a first-time visitor.
 */
export const FeaturedTestimonial: React.FC = () => {
  const featured = about.testimonials[0];
  if (!featured) return null;

  return (
    <Section id="featured-testimonial" tone="band">
      <ScrollReveal direction="up" distance={24}>
        <figure className="mx-auto max-w-3xl text-center">
          <Quote size={32} className="mx-auto mb-6 text-accent/40" aria-hidden="true" />
          <blockquote className="font-display text-[clamp(1.25rem,3vw,1.875rem)] font-medium leading-[1.4] tracking-[-0.01em] text-display text-balance">
            &ldquo;{featured.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-8 flex items-center justify-center gap-3 text-[14px] text-muted">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-ink-850 font-mono text-[13px] font-bold text-accent">
              {getInitials(featured.author)}
            </span>
            <span className="text-left">
              <span className="block font-semibold text-display">{featured.author}</span>
              <span className="block text-[13px]">
                {featured.role}
                {featured.project ? ` · ${featured.project}` : ''}
              </span>
            </span>
          </figcaption>
        </figure>
      </ScrollReveal>
    </Section>
  );
};

export default FeaturedTestimonial;
