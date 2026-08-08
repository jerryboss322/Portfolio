import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ScrollLink } from '@/components/ui/ScrollLink';
import { profile } from '@/content/data';

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="hero min-h-[90vh] flex items-center relative overflow-hidden"
      aria-label="Introduction"
    >
      <div className="container grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-8 items-center py-12 lg:py-16">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.span className="eyebrow" variants={item}>
            {profile.eyebrow}
          </motion.span>

          <motion.h1
            className="mt-6 font-display font-bold leading-[1.08] text-[var(--fs-hero)]"
            variants={item}
          >
            <span className="block">I build full-stack products</span>
            <span className="block">— from interface to infrastructure.</span>
          </motion.h1>

          <motion.div className="mt-6 max-w-xl space-y-4" variants={item}>
            {profile.intro.map((paragraph) => (
              <p key={paragraph} className="text-base md:text-lg leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.div className="mt-6 meta" variants={item}>
            {profile.meta}
          </motion.div>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 items-start"
            variants={item}
          >
            <ScrollLink
              to="work"
              className="primary-button px-7 py-3.5 text-base font-semibold"
            >
              View My Work
              <ArrowRight size={18} aria-hidden="true" />
            </ScrollLink>
            <ScrollLink
              to="contact"
              className="secondary-button px-7 py-3.5 text-base font-semibold"
            >
              Let&apos;s Work Together
              <ArrowRight size={18} aria-hidden="true" />
            </ScrollLink>
          </motion.div>

          <motion.div
            className="mt-12 flex flex-col sm:flex-row gap-2 sm:gap-8 meta"
            variants={item}
          >
            <span>{profile.location}</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
              {profile.status}
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-portrait flex justify-center lg:justify-end lg:-mr-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
        >
          <img
            src={profile.heroPortrait}
            alt={`Portrait of ${profile.name}`}
            className="portrait w-full max-w-[400px] h-auto"
            fetchPriority="high"
          />
        </motion.div>
      </div>
    </section>
  );
};
