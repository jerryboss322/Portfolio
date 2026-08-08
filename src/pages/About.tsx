import React from 'react';
import { motion } from 'framer-motion';
import { about, whatIBring, profile } from '@/content/data';

const ease = [0.16, 1, 0.3, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section container" aria-label="About">
      <div className="section-head">
        <span className="section-index">02 — About</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <motion.div
          className="order-2 lg:order-1 flex justify-center lg:justify-start lg:sticky lg:top-24"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
        >
          <img
            src={about.portrait}
            alt={`Portrait of ${profile.name}`}
            loading="lazy"
            className="portrait w-full max-w-[380px] h-auto"
          />
        </motion.div>

        <motion.div className="order-1 lg:order-2" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <h2 className="text-2xl md:text-3xl font-bold font-display leading-snug">
            {about.heading}
          </h2>

          <div className="mt-6 space-y-5">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="max-w-xl leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <p className="mt-8 max-w-xl text-xl md:text-2xl font-semibold font-display leading-snug text-text border-l-2 border-accent pl-5">
            {about.pullQuote}
          </p>

          <div className="mt-8 meta flex flex-col sm:flex-row gap-2 sm:gap-8">
            <span>{profile.role}</span>
            <span>{profile.location}</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mt-20"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <div className="section-head">
          <span className="section-index">What I Bring</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
          {whatIBring.map((item, index) => (
            <div key={item.title} className="py-5 border-b border-border">
              <div className="flex items-baseline gap-4">
                <span className="section-index shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
              <p className="mt-2 pl-9 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
