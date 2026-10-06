import React from 'react';
import { ScrollReveal } from './ScrollReveal';

interface SectionProps {
  id: string;
  /**
   * `ground` is the page plane; `band` is the recessed plane that separates
   * groups of sections. The rhythm across the page is deliberate:
   * hero(ground) work(band) about(ground) capabilities(ground) process(band)
   * testimonials(ground) contact(band).
   */
  tone?: 'ground' | 'band';
  className?: string;
  children: React.ReactNode;
}

/**
 * A page section.
 *
 * Owns the id, the ground and the vertical rhythm so those three cannot drift
 * between sections. It used to be decided per file, which is how the page ended
 * up with two different container widths and adjacent sections sharing a ground.
 */
export const Section: React.FC<SectionProps> = ({
  id,
  tone = 'ground',
  className,
  children,
}) => (
  <section
    id={id}
    className={['py-24 md:py-32', tone === 'band' ? 'bg-ink-850' : '', className]
      .filter(Boolean)
      .join(' ')}
  >
    <div className="shell">{children}</div>
  </section>
);

interface SectionHeadProps {
  title: string;
  lede?: string;
  className?: string;
}

/**
 * The heading block every section opens with.
 *
 * One component rather than the same five lines of markup repeated eight times,
 * so the gap between the title and its lede is the same everywhere and the
 * lede measure cannot vary by a few characters per section.
 */
export const SectionHead: React.FC<SectionHeadProps> = ({ title, lede, className }) => (
  <ScrollReveal direction="up" distance={24}>
    <h2
      className={['font-display text-display-2 font-semibold', className]
        .filter(Boolean)
        .join(' ')}
    >
      {title}
    </h2>
    {lede && (
      <p className="mt-4 max-w-[54ch] text-[15px] leading-[1.75] text-body">{lede}</p>
    )}
  </ScrollReveal>
);

export default Section;
