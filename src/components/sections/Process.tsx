import React from 'react';
import { motion } from 'framer-motion';
import { process } from '@/content/data';

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="section container" aria-label="How I work">
      <div className="section-head">
        <span className="section-index">02 — How I Work</span>
        <h2 className="mt-3">From discovery to deployment.</h2>
        <p className="mt-4 max-w-xl leading-relaxed text-muted">
          My process is engineered to give you certainty at every step. No black boxes, no surprises.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-12"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {process.map((step) => (
          <motion.div
            key={step.number}
            variants={item}
            className="p-6 rounded-xl border border-border bg-surface"
          >
            <span className="section-index">{step.number}</span>
            <h3 className="mt-3 text-lg font-semibold text-text">{step.title}</h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
