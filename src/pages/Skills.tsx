import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/motion-variants';
import { Typography } from '@/components/ui/Typography';
import { skills } from '@/content/data';

export const SkillsSection: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const categories: { name: string; key: keyof typeof skills; list: string[] }[] = [
    { name: 'Frontend', key: 'frontend', list: skills.frontend },
    { name: 'Backend', key: 'backend', list: skills.backend },
    { name: 'Design', key: 'design', list: skills.design },
    { name: 'Tools', key: 'tools', list: skills.tools },
  ];

  return (
    <section ref={ref} id="skills" className="section container">
      <div className="tech-stack-header text-center mb-14">
        <Typography.Meta className="text-accent-strong mb-2">Tech Stack</Typography.Meta>
        <Typography.H2>Building with the latest technologies.</Typography.H2>
      </div>

      <div className="laser-divider mb-14" />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={staggerContainer(0.2, 0.3)}
      >
        {categories.map((category, i) => (
          <motion.div
            key={category.name}
            className="space-y-4"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <Typography.H3 className="text-center">{category.name}</Typography.H3>
            <motion.div
              className="flex flex-wrap gap-2 justify-center"
              variants={staggerContainer(0.08)}
            >
              {category.list.map((skill, j) => (
                <motion.span
                  key={skill}
                  className="skill-chip bg-surface border border-border rounded-full px-4 py-2 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: j * 0.05 + i * 0.1 }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
