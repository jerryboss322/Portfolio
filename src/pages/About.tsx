import React from 'react';
import { motion } from 'framer-motion';
import { about, profile } from '@/content/data';

const ease = [0.16, 1, 0.3, 1] as const;

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section container" aria-label="About">
      <div className="section-head mb-8 text-center">
        <span className="section-index">04 — About</span>
        <h2 className="mt-2 text-[clamp(1.75rem,3vw,2.5rem)]">{about.heading}</h2>
      </div>

      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '10%' }}
          transition={{ duration: 0.6, ease }}
          className="flex justify-center mb-8"
        >
          <div className="aspect-[4/5] max-w-[300px]">
            <img
              src={about.portrait}
              alt={`Portrait of ${profile.name}`}
              loading="lazy"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '10%' }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
        >
          <div className="space-y-4">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-[1.7] text-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <p className="mt-6 text-xl md:text-2xl font-medium text-text italic">
            {about.pullQuote}
          </p>

          <div className="mt-6 flex flex-wrap gap-6 meta justify-center">
            <span>{profile.role}</span>
            <span>{profile.location}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
