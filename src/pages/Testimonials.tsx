import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { about } from '@/content/data';
import { useReducedMotion } from '@/lib/hooks';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg,#0077FF,#00F0FF)',
  'linear-gradient(135deg,#00F0FF,#0077FF)',
];

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join('');

/**
 * Testimonials as 3D flip cards.
 *
 * The card is a real button, so it is reachable by keyboard and announces state
 * through `aria-pressed`. Both faces stay in the DOM, so assistive tech reads
 * the quote and the attribution together rather than only the visible face.
 *
 * Under reduced motion there is no rotation: the card renders as a flat panel
 * with the attribution details shown inline, so the same information is
 * available without any of it depending on an animation.
 */
export const TestimonialsSection: React.FC = () => {
  const reduced = useReducedMotion();
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  return (
    <section
      id="testimonials"
      className="border-y border-[rgba(255,255,255,0.08)] bg-[#070A14]/50 py-16 md:py-20"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h2 className="font-display text-[24px] font-semibold tracking-tight md:text-[30px]">
            What clients say
          </h2>
          <span className="hidden text-[11px] tracking-[0.18em] text-[#94A3B8] sm:block">
            {reduced ? 'CLIENT NOTES' : 'FLIP A CARD FOR DETAILS'}
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {about.testimonials.map((testimonial, index) => {
            const gradient = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];

            if (reduced) {
              return (
                <motion.article
                  key={testimonial.author}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: index * 0.1, ease: EASE }}
                  className="flex flex-col gap-5 rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#0A0E1A] p-6 md:p-8"
                >
                  <p className="text-[16px] leading-[1.65] tracking-tight italic md:text-[17px]">
                    “{testimonial.quote}”
                  </p>
                  <div className="flex items-center gap-3 border-t border-[rgba(255,255,255,0.08)] pt-5">
                    <span
                      aria-hidden="true"
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[12px] font-semibold text-[#02040A]"
                      style={{ background: gradient }}
                    >
                      {initials(testimonial.author)}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[13px] font-medium">
                        {testimonial.author}
                      </span>
                      <span className="block truncate text-[11px] tracking-wide text-[#94A3B8]">
                        {testimonial.role}
                        {testimonial.project ? ` — ${testimonial.project}` : ''}
                      </span>
                    </span>
                  </div>
                </motion.article>
              );
            }

            const isFlipped = Boolean(flipped[testimonial.author]);

            return (
              <motion.div
                key={testimonial.author}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: index * 0.1, ease: EASE }}
                style={{ perspective: 1400 }}
              >
                <button
                  type="button"
                  aria-pressed={isFlipped}
                  onClick={() =>
                    setFlipped((prev) => ({
                      ...prev,
                      [testimonial.author]: !prev[testimonial.author],
                    }))
                  }
                  className={[
                    'group relative block h-[264px] w-full cursor-pointer text-left',
                    'rounded-[20px] [transform-style:preserve-3d]',
                    'transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    isFlipped ? '[transform:rotateY(180deg)]' : '',
                    'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0077FF]',
                  ].join(' ')}
                >
                  {/* Front */}
                  <span
                    className={[
                      'absolute inset-0 flex flex-col justify-between rounded-[20px] border p-6 md:p-8',
                      'border-[rgba(255,255,255,0.08)] bg-[#0A0E1A]',
                      'transition-[border-color,box-shadow] duration-500',
                      'group-hover:border-[rgba(0,119,255,0.35)]',
                      'group-hover:shadow-[0_24px_60px_-28px_rgba(0,119,255,0.5)]',
                    ].join(' ')}
                  >
                    <span className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="font-display text-[32px] leading-none text-[#00F0FF]/45"
                      >
                        &ldquo;
                      </span>
                      <span className="flex-1 text-[16px] leading-[1.65] tracking-tight italic md:text-[17px]">
                        {testimonial.quote}
                      </span>
                    </span>

                    <span className="mt-6 flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[12px] font-semibold text-[#02040A]"
                        style={{ background: gradient }}
                      >
                        {initials(testimonial.author)}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[13px] font-medium">
                          {testimonial.author}
                        </span>
                        <span className="block truncate text-[11px] tracking-wide text-[#94A3B8]">
                          {testimonial.role}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="ml-auto shrink-0 text-[11px] tracking-[0.14em] text-[#94A3B8] transition-transform duration-500 group-hover:translate-x-0.5"
                      >
                        {isFlipped ? 'BACK' : 'FLIP'}
                      </span>
                    </span>
                  </span>

                  {/* Back */}
                  <span
                    aria-hidden="true"
                    className={[
                      'absolute inset-0 flex flex-col justify-center gap-5 rounded-[20px] border p-6 md:p-8',
                      'border-[rgba(0,240,255,0.30)]',
                      'bg-[radial-gradient(120%_100%_at_20%_0%,rgba(0,119,255,0.20),transparent_60%),#0A0E1A]',
                      '[transform:rotateY(180deg)_translateZ(1px)]',
                    ].join(' ')}
                  >
                    <span className="text-[11px] tracking-[0.2em] text-[#94A3B8]">
                      THE ENGAGEMENT
                    </span>
                    <span className="text-[20px] leading-tight tracking-tight">
                      {testimonial.project ?? testimonial.role}
                    </span>
                    <span className="text-[13px] leading-[1.65] text-[#94A3B8]">
                      {testimonial.author} — {testimonial.role}
                    </span>
                    <span className="text-[11px] tracking-[0.14em] text-[#7DD3FC]">
                      CLICK TO RETURN
                    </span>
                  </span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
