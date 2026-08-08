import React from 'react';
import { motion } from 'framer-motion';
import { stack } from '@/content/data';

const groupItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const StackSection: React.FC = () => {
  return (
    <section id="stack" className="section container" aria-label="Tech stack">
      <div className="section-head">
        <span className="section-index">04 — Tech Stack</span>
        <h2 className="mt-3">Tech Stack</h2>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ staggerChildren: 0.08 }}
      >
        {stack.map((group) => (
          <motion.div key={group.group} variants={groupItem}>
            <h3 className="meta text-accent mb-4">{group.group}</h3>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item} className="text-text">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
