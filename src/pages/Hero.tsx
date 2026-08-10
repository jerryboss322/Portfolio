import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { ScrollLink } from '@/components/ui/ScrollLink';
import { profile } from '@/content/data';

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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
      className="min-h-[85vh] flex items-center relative overflow-hidden pt-8 pb-16"
      aria-label="Introduction"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div variants={container} initial="hidden" animate="visible">
            <motion.span className="eyebrow" variants={item}>
              Software Engineer
            </motion.span>

            <motion.h1
              className="mt-6 font-display font-bold leading-[1.05] text-[var(--fs-hero)] text-text"
              variants={item}
            >
              Building Digital Systems
            </motion.h1>

            <motion.p
              className="mt-6 max-w-lg text-lg leading-[1.7] text-muted"
              variants={item}
            >
              I build modern web applications, scalable backend systems, and polished digital experiences — from concept to deployment.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4 items-start"
              variants={item}
            >
              <ScrollLink to="work" className="primary-button px-7 py-3.5 text-base font-semibold">
                View My Work
                <ArrowRight size={18} aria-hidden="true" />
              </ScrollLink>
              <a href="#cv-download" className="secondary-button px-7 py-3.5 text-base font-semibold">
                <Download size={18} aria-hidden="true" />
                Download CV
              </a>
            </motion.div>

            <motion.div
              className="mt-10 flex flex-wrap gap-6 meta"
              variants={item}
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" aria-hidden="true" />
                Available for work
              </span>
              <span>{profile.location}</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            <div className="portrait-frame w-full max-w-[420px] aspect-[4/5] relative">
              <img
                src={profile.heroPortrait}
                alt={`Portrait of ${profile.name}`}
                className="w-full h-full object-cover"
                fetchPriority="high"
              />
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
              DEVOPS
            </motion.span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
