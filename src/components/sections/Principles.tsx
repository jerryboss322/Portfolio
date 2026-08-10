import React from 'react';
import { motion } from 'framer-motion';
import { principles } from '@/content/data';

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const PrinciplesSection: React.FC = () => {
  return (
    <section className="section pt-0" aria-label="Working principles">
      <div className="container">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '10%' }}
        >
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              variants={item}
              className="p-5 rounded-xl border border-border bg-surface"
            >
              <div className="section-index text-[0.6rem] mb-3">0{index + 1}</div>
              <h3 className="text-sm font-bold text-text mb-2">{principle.title}</h3>
              <p className="text-xs text-muted leading-relaxed">{principle.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
