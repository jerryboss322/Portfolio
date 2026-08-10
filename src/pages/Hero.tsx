import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ScrollLink } from '@/components/ui/ScrollLink';
import { Marquee } from '@/components/ui/Marquee';
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
      className="min-h-[80vh] flex items-center relative overflow-hidden py-8 lg:py-12"
      aria-label="Introduction"
    >
      <div className="container text-center">
        <motion.div variants={container} initial="hidden" animate="visible" className="max-w-4xl mx-auto">
          <motion.span className="eyebrow justify-center" variants={item}>
            Software Engineer
          </motion.span>

          <motion.h1
            className="mt-3 font-display font-bold leading-[1.08] text-[var(--fs-hero)]"
            variants={item}
          >
            <span className="block">I build full-stack products</span>
            <span className="block">— from interface to infrastructure.</span>
          </motion.h1>

          <motion.div className="mt-3" variants={item}>
            <p className="meta justify-center">
              Full-stack applications · Platforms · APIs
            </p>
          </motion.div>

          <motion.div
            className="mt-5 flex flex-col sm:flex-row gap-4 items-center justify-center"
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
              className="secondary-button px-7 py-3.5 text-base font-semibold inline-flex items-center gap-2"
            >
              Let&apos;s Work Together
            </ScrollLink>
          </motion.div>

          <motion.div
            className="mt-6 flex flex-wrap gap-6 meta justify-center"
            variants={item}
          >
            <span>{profile.location}</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
              {profile.status}
            </span>
          </motion.div>
        </motion.div>

        <div className="relative flex justify-center mt-12">
          <motion.img
            src={profile.heroPortrait}
            alt={`Portrait of ${profile.name}`}
            className="portrait w-full max-w-[350px] h-auto relative z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            fetchPriority="high"
          />

          {/* Floating labels */}
          <motion.span
            className="floating-label absolute top-8 -left-4 z-20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5, ease }}
          >
            FULL-STACK
          </motion.span>
          <motion.span
            className="floating-label absolute top-1/2 -right-4 z-20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.75, duration: 0.5, ease }}
          >
            BACKEND
          </motion.span>
          <motion.span
            className="floating-label absolute bottom-12 -left-2 z-20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.5, ease }}
          >
            SYSTEMS
          </motion.span>
        </div>

        {/* Marquee */}
        <div className="mt-16">
          <Marquee
            items={['AVAILABLE FOR WORK', 'GO', 'NEXT.JS', 'LARAVEL', 'KOTLIN', 'REACT', 'TYPESCRIPT', 'POSTGRESQL', 'DOCKER']}
            speed={30}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
