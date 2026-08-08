import React from 'react';
import { motion } from 'framer-motion';
import { about, profile } from '@/content/data';

const ease = [0.16, 1, 0.3, 1] as const;

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section container" aria-label="About">
      <div className="section-head">
        <span className="section-index">02 — About</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          className="order-2 lg:order-1 flex justify-center lg:justify-start"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
        >
          <img
            src={about.portrait}
            alt={`Portrait of ${profile.name}`}
            loading="lazy"
            className="portrait w-full max-w-[400px] h-auto"
          />
        </motion.div>

        <motion.div
          className="order-1 lg:order-2"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          <h2 className="text-2xl md:text-3xl font-bold font-display leading-snug">
            {about.heading}
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-muted">{about.narrative}</p>
          <div className="mt-8 meta flex flex-col sm:flex-row gap-2 sm:gap-8">
            <span>{profile.role}</span>
            <span>{profile.location}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
