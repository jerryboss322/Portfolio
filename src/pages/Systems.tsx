import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/motion-variants';
import { Typography } from '@/components/ui/Typography';
import { systems } from '@/content/data';

export const SystemsSection: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section ref={ref} id="systems" className="section container">
      <div className="tech-stack-header text-center mb-14">
        <Typography.Meta className="text-accent-strong mb-2">Design Principles</Typography.Meta>
        <Typography.H2>My Engineering Systems</Typography.H2>
      </div>

      <div className="laser-divider mb-14" />

      <motion.div
        className="system-grid grid grid-cols-1 md:grid-cols-3 gap-8"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={staggerContainer(0.2)}
      >
        {systems.map((system, i) => (
          <motion.div
            key={system.title}
            className="system-card bg-surface border border-border rounded-xl p-6"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="system-icon w-10 h-10 rounded-lg bg-surface-strong border border-border grid place-items-center text-accent mb-4">
              {system.icon}
            </div>
            <Typography.H3 className="mb-2">{system.title}</Typography.H3>
            <Typography.P>{system.description}</Typography.P>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
