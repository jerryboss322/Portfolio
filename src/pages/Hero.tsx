import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { ScrollLink } from '@/components/ui/ScrollLink';
import { Marquee } from '@/components/ui/Marquee';
import { profile } from '@/content/data';

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const marqueeItems = [
  'Go', 'Next.js', 'Laravel', 'Kotlin', 'React', 'TypeScript',
  'PostgreSQL', 'Docker', 'Node.js', 'GraphQL', 'Python',
];

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="min-h-[92vh] flex flex-col justify-center relative overflow-hidden"
      aria-label="Introduction"
    >
      <div className="container flex-1 flex items-center pt-12 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-center w-full">
          <motion.div variants={container} initial="hidden" animate="visible">
            <motion.span className="eyebrow" variants={item}>
              Software Engineer
            </motion.span>

            <motion.h1
              className="mt-6 font-display font-bold text-[var(--fs-hero)] text-text"
              style={{ letterSpacing: '-0.04em', lineHeight: '0.95' }}
              variants={item}
            >
              Building Digital Systems.
            </motion.h1>

            <motion.p
              className="mt-8 max-w-lg text-lg leading-[1.7] text-muted"
              variants={item}
            >
              I design and build modern web applications, backend systems, and digital products — from concept to deployment.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4 items-start"
              variants={item}
            >
              <ScrollLink to="work" className="primary-button px-8 py-4 text-base font-semibold">
                View Selected Work
                <ArrowRight size={18} aria-hidden="true" />
              </ScrollLink>
              <ScrollLink to="contact" className="secondary-button px-8 py-4 text-base font-semibold">
                Let&apos;s Talk
              </ScrollLink>
            </motion.div>

            <motion.div
              className="mt-12 flex flex-wrap gap-6 meta"
              variants={item}
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                Available for selected projects
              </span>
              <span>{profile.location}</span>
              <span>WAT / UTC+1</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            <div className="portrait-frame w-full max-w-[380px] aspect-[4/5] relative">
              <img
                src={profile.heroPortrait}
                alt={`Portrait of ${profile.name}`}
                className="w-full h-full object-cover"
                fetchPriority="high"
              />
              {/* Subtle glow */}
              <div className="absolute inset-0 rounded-[var(--radius-lg)] border border-accent/20" />
            </div>

            {/* Floating labels */}
            <motion.span
              className="floating-label top-8 -left-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5, ease }}
            >
              FULL-STACK
            </motion.span>
            <motion.span
              className="floating-label top-1/2 -right-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.75, duration: 0.5, ease }}
            >
              BACKEND
            </motion.span>
            <motion.span
              className="floating-label bottom-12 -left-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5, ease }}
            >
              SYSTEMS
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="flex justify-center pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <ScrollLink to="work" aria-label="Scroll to work" className="text-muted hover:text-accent transition-colors">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </ScrollLink>
      </motion.div>

      {/* Marquee */}
      <div className="pb-8">
        <Marquee items={marqueeItems} speed={30} />
      </div>
    </section>
  );
};
