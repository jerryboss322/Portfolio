import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/motion-variants';
import { Typography } from '@/components/ui/Typography';
import { testimonials } from '@/content/data';

export const TestimonialsSection: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section ref={ref} id="testimonials" className="section container">
      <div className="section-header">
        <Typography.H2>Selected Feedback</Typography.H2>
        <a href="#contact" className="link-underline meta">
          Say hello
        </a>
      </div>

      <motion.div
        className="project-grid grid grid-cols-1 md:grid-cols-2 gap-8"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={staggerContainer(0.15)}
      >
        {testimonials.map((item, i) => (
          <motion.div
            key={item.name}
            className="project-card testimonial-card bg-surface border border-border rounded-xl p-8 relative"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <p className="text-lg md:text-xl leading-relaxed italic mb-4">
              "{item.quote}"
            </p>
            <div className="testimonial-author flex flex-col gap-1">
              <strong className="text-sm font-semibold">{item.name}</strong>
              <span className="meta">{item.role}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
