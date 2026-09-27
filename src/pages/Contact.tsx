import React from 'react';
import { motion } from 'framer-motion';
import { ContactForm } from '@/components/ui/ContactForm';
import { Magnetic } from '@/components/ui/Magnetic';
import { Media } from '@/components/ui/Media';
import { Text3D } from '@/components/ui/Text3D';
import { useReducedMotion } from '@/lib/hooks';
import { portrait } from '@/content/images';
import { profile } from '@/content/data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const FACTS = [
  { k: 'Response', v: 'Under 24 hours' },
  { k: 'Based in', v: profile.location },
  { k: 'Timezone', v: 'WAT / UTC+1' },
  { k: 'Engagement', v: 'Freelance · Contract' },
];

export const ContactSection: React.FC = () => {
  const reduced = useReducedMotion();

  return (
    <section id="contact" className="relative bg-ground px-6 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-bloom-bottom" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1280px]">
      <div className="relative overflow-hidden rounded-[28px] border border-line-strong bg-ink-850">
        {/* Lit corner + grid, so the panel reads as a lit surface. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_12%_0%,color-mix(in oklab, var(--accent) 24%, transparent),transparent_58%),radial-gradient(70%_60%_at_92%_100%,color-mix(in oklab, var(--glow) 12%, transparent),transparent_60%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(var(--line-faint)_1px,transparent_1px),linear-gradient(90deg,var(--line-faint)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(70%_70%_at_50%_30%,black,transparent)]"
        />

        <div className="relative grid gap-12 p-8 md:p-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          {/* ---- Pitch ---- */}
          <div>
            <div className="eyebrow">
              Contact
            </div>

            <h2 className="font-display mt-5 text-[40px] font-bold leading-[0.86] tracking-[-0.04em] md:text-[68px]">
              <Text3D
                depth={reduced ? 1 : 18}
                step={1.1}
                tilt={5}
                back="var(--accent-deep)"
                front="var(--text-display)"
              >
                LET&apos;S BUILD IT
              </Text3D>
            </h2>

            <p className="mt-6 max-w-[46ch] text-[15px] leading-[1.8] text-body">
              Tell me what you are building and where it is stuck. I will reply
              with a straight read on scope, a realistic timeline, and whether I
              am the right person for it.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic strength={18}>
                <a
                  href={`mailto:${profile.email}`}
                  className="relative inline-flex h-12 cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-display pl-6 pr-3 text-[13.5px] font-medium text-onaccent"
                >
                  <span className="relative z-10">{profile.email}</span>
                  <span
                    aria-hidden="true"
                    className="relative z-10 grid h-7 w-7 place-items-center rounded-full bg-black/10 text-[11px] transition-transform duration-300 hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-left scale-x-0 bg-[linear-gradient(90deg,var(--glow),var(--accent))] transition-transform duration-500 ease-out hover:scale-x-100"
                  />
                </a>
              </Magnetic>

              <Magnetic strength={12}>
                <motion.a
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={reduced ? {} : { y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex h-12 cursor-pointer items-center rounded-full border border-line-strong px-5 text-[13.5px] text-bright transition-colors duration-300 hover:border-white/35 hover:bg-tint-2 hover:text-display"
                >
                  WhatsApp
                </motion.a>
              </Magnetic>
            </div>

            <div className="mt-10 border-t border-line pt-8">
              <ContactForm />
            </div>
          </div>

          {/* ---- Side panel ---- */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={reduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:pt-4"
          >
            <div className="rounded-[20px] border border-line-strong bg-ink-900/60 p-5 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <Media
                  asset={portrait}
                  alt=""
                  sizes="48px"
                  className="h-12 w-12 shrink-0 rounded-full ring-1 ring-glow/25"
                  imgClassName="object-cover object-top"
                />
                <div className="min-w-0">
                  <div className="truncate text-[13.5px] font-medium">
                    {profile.fullName}
                  </div>
                  <div className="truncate text-[11px] text-body">{profile.role}</div>
                </div>
                <span
                  aria-hidden="true"
                  className="ml-auto h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_10px_color-mix(in_oklab,var(--success)_80%,transparent)]"
                />
              </div>

              <dl className="mt-5 space-y-0 border-t border-line pt-2">
                {FACTS.map((fact) => (
                  <div
                    key={fact.k}
                    className="flex items-center justify-between gap-3 border-b border-line-faint py-2.5 text-[12px] last:border-b-0"
                  >
                    <dt className="text-muted">{fact.k}</dt>
                    <dd className="truncate text-right text-bright">{fact.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { label: 'GitHub', href: profile.github },
                { label: 'LinkedIn', href: profile.linkedin },
                { label: 'WhatsApp', href: profile.whatsapp },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 cursor-pointer items-center rounded-full border border-line-strong px-3.5 text-[11.5px] text-body transition-colors duration-300 hover:border-glow/30 hover:text-display"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default ContactSection;
