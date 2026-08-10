import React from 'react';
import { motion } from 'framer-motion';
import { whatIBring } from '@/content/data';

const groupItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const WhatIBuildSection: React.FC = () => {
  return (
    <section id="capabilities" className="section container" aria-label="Capabilities">
      <div className="section-head">
        <span className="section-index">05 — What I Build</span>
        <h2 className="mt-3">What I Build</h2>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ staggerChildren: 0.08 }}
      >
        {whatIBring.map((item) => (
          <motion.div key={item.title} variants={groupItem}>
            <h3 className="meta text-accent mb-4">{item.title}</h3>
            <p className="text-muted leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
