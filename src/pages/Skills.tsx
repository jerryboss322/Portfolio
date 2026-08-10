import React from 'react';
import { motion } from 'framer-motion';
import { stack } from '@/content/data';

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

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="section" aria-label="Skills">
      <div className="container">
        <div className="max-w-2xl mb-12">
          <span className="section-index">04 — Skills & Technologies</span>
          <h2 className="mt-3 text-[var(--fs-h2)] font-bold font-display text-text">
            Technical Stack
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Technologies and tools I use to build modern digital products.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '10%' }}
        >
          {stack.map((group) => (
            <motion.div key={group.group} variants={item}>
              <h3 className="meta text-accent mb-4 pb-3 border-b border-border">{group.group}</h3>
              <ul className="space-y-2.5">
                {group.items.map((tech) => (
                  <li key={tech} className="text-sm text-text font-medium">
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
