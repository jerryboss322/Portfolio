import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';
import { ContactForm } from '@/components/ui/ContactForm';
import { profile } from '@/content/data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STATUS_ROWS = [
  { k: 'Response', v: '< 24 hours' },
  { k: 'Location', v: profile.location },
  { k: 'Stack', v: 'Next.js / React / Node.js' },
];

export const ContactSection: React.FC = () => {
  const [reduced, setReduced] = useState(false);

  React.useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <section id="contact" className="mx-auto max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
      <Reveal>
        <motion.div
          initial={reduced ? false : { y: 40, rotateX: -8, opacity: 0 }}
          whileInView={reduced ? {} : { y: 0, rotateX: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative overflow-hidden rounded-[24px] border border-[rgba(255,255,255,0.08)] bg-[radial-gradient(80%_80%_at_20%_20%,rgba(0,119,255,0.18),transparent),radial-gradient(60%_60%_at_80%_80%,rgba(0,240,255,0.12),transparent),#0A0E1A] p-8 md:p-12"
        >
          <div
            aria-hidden="true"
            className="absolute right-12 top-0 h-px w-32 bg-gradient-to-r from-transparent via-[#0077FF]/60 to-transparent"
          />

          <div className="max-w-[720px]">
            <div className="text-[11px] tracking-[0.2em] text-[#94A3B8]">CONTACT — LET&apos;S BUILD</div>
            <h2 className="font-display mt-3 text-[28px] font-semibold leading-[0.95] tracking-tight md:text-[44px]">
              Engineering detail into{' '}
              <span className="text-[#94A3B8]">your next product.</span>
            </h2>

            <div className="mt-8 grid items-start gap-8 md:grid-cols-[1.2fr_0.8fr]">
              <div>
                <a
                  href={`mailto:${profile.email}`}
                  className="font-display text-[22px] font-semibold tracking-tight transition hover:text-[#00F0FF] md:text-[28px]"
                >
                  {profile.email}
                </a>
                <div className="mt-3 text-[13px] leading-[1.6] text-[#94A3B8]">
                  Based in {profile.location}. Available for freelance, product collaborations, and
                  software engineering.
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <motion.a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={reduced ? {} : { y: -2, scale: 1.02, boxShadow: '0 10px 30px rgba(0,119,255,0.35)' }}
                    whileTap={{ scale: 0.97 }}
                    className="grid h-10 cursor-pointer place-items-center rounded-full bg-white px-5 text-[13px] font-medium text-black transition-colors hover:bg-[#F8FAFC]"
                  >
                    GitHub →
                  </motion.a>
                  <motion.button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('work');
                      el?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
                    }}
                    whileHover={reduced ? {} : { y: -2, boxShadow: '0 10px 30px rgba(0,240,255,0.25)' }}
                    whileTap={{ scale: 0.97 }}
                    className="grid h-10 cursor-pointer place-items-center rounded-full bg-[#F8FAFC] px-5 text-[13px] font-medium text-black transition-colors hover:bg-white"
                  >
                    View Work
                  </motion.button>
                </div>
              </div>

              <motion.div
                whileHover={reduced ? {} : { rotateY: 5, rotateX: -2 }}
                style={{ perspective: 800, transformStyle: 'preserve-3d' }}
                className="rounded-[14px] border border-[rgba(255,255,255,0.08)] bg-[#02040A]/60 p-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={profile.heroPortrait}
                    alt="avatar small"
                    className="h-9 w-9 rounded-full object-cover ring-1 ring-white/10"
                  />
                  <div>
                    <div className="text-[13px] font-medium">{profile.name}</div>
                    <div className="text-[11px] text-[#94A3B8]">Software Engineer</div>
                  </div>
                  <div className="ml-auto h-2 w-2 rounded-full bg-emerald-400" />
                </div>
                <div className="mt-4 space-y-2 text-[12px] text-[#94A3B8]">
                  {STATUS_ROWS.map((row) => (
                    <div key={row.k} className="flex justify-between">
                      <span>{row.k}</span>
                      <span className="text-white">{row.v}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          <div className="mt-10 border-t border-[rgba(255,255,255,0.08)] pt-8">
            <ContactForm />
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
};

export default ContactSection;
