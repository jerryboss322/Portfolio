import React from 'react';
import { motion } from 'framer-motion';
import { about, profile } from '@/content/data';

const ease = [0.16, 1, 0.3, 1] as const;

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section" aria-label="About">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '10%' }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="portrait-frame aspect-[4/5] max-w-[400px] mx-auto lg:mx-0">
              <img
                src={about.portrait}
                alt={`Portrait of ${profile.name}`}
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '10%' }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            <span className="section-index">03 — About</span>
            <h2 className="mt-3 text-[var(--fs-h2)] font-bold font-display text-text">
              {about.heading}
            </h2>

            <div className="mt-6 space-y-4">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-muted leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <p className="mt-6 text-lg font-medium text-text border-l-[3px] border-accent pl-5 italic">
              {about.pullQuote}
            </p>

            <div className="mt-8 flex flex-wrap gap-6 meta">
              <span>{profile.role}</span>
              <span>{profile.location}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
