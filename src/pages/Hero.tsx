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
      className="min-h-[85vh] flex items-center relative overflow-hidden py-16 lg:py-24"
      aria-label="Introduction"
    >
      <div className="container grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-12 lg:gap-8 items-center">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.span className="eyebrow" variants={item}>
            Software Engineer
          </motion.span>

          <motion.h1
            className="mt-6 font-display font-bold leading-[1.08] text-[var(--fs-hero)]"
            variants={item}
          >
            <span className="block">I build digital products</span>
            <span className="block">that solve real problems.</span>
          </motion.h1>

          <motion.div className="mt-6 max-w-xl" variants={item}>
            <p className="text-base md:text-lg leading-relaxed text-muted">
              Full-stack applications · Platforms · APIs
            </p>
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
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-button px-7 py-3.5 text-base font-semibold inline-flex items-center gap-2"
            >
              GitHub
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div
            className="mt-12 flex flex-wrap gap-6 meta"
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
          className="flex justify-center lg:justify-end lg:-mr-10"
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
