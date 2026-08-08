import React from 'react';
import { motion } from 'framer-motion';
import { capabilities } from '@/content/data';

const listItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const CapabilitiesSection: React.FC = () => {
  return (
    <section id="capabilities" className="section container" aria-label="What I build">
      <div className="section-head">
        <span className="section-index">03 — What I Build</span>
        <h2 className="mt-3">What I Build</h2>
      </div>

      <motion.ul
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ staggerChildren: 0.06 }}
      >
        {capabilities.map((capability, index) => (
          <motion.li
            key={capability}
            className="flex items-baseline gap-4 py-5 border-b border-border"
            variants={listItem}
          >
            <span className="section-index shrink-0">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-lg font-medium">{capability}</span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
};
