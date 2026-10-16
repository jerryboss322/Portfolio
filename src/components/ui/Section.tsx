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
    className={['py-12 md:py-20', tone === 'band' ? 'bg-gradient-to-b from-transparent via-ink-850/80 to-transparent' : '', className]
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
  /**
   * Heading level. Defaults to 2 because SectionHead is usually mid-page. A
   * standalone page route should pass 1, because a route that renders no Hero
   * has no other source of an h1 and every page should have exactly one.
   */
  level?: 1 | 2;
}

/**
 * The heading block every section opens with.
 *
 * One component rather than the same five lines of markup repeated eight times,
 * so the gap between the title and its lede is the same everywhere and the
 * lede measure cannot vary by a few characters per section.
 */
export const SectionHead: React.FC<SectionHeadProps> = ({
  title,
  lede,
  className,
  level = 2,
}) => {
  const Heading = level === 1 ? 'h1' : 'h2';

  return (
    <ScrollReveal direction="up" distance={24}>
      <Heading
        className={['font-display text-display-2 font-semibold', className]
          .filter(Boolean)
          .join(' ')}
      >
        {title}
      </Heading>
      {lede && (
        <p className="mt-4 max-w-[54ch] text-[15px] leading-[1.75] text-body">{lede}</p>
      )}
    </ScrollReveal>
  );
};

export default Section;
