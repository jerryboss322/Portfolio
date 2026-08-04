import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/motion-variants';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  staggerDelay?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  stagger = 0.1,
  staggerDelay = 0,
}) => {
  const variants = staggerContainer(stagger, delay);

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export const RevealText: React.FC<{
  text: string;
  className?: string;
  stagger?: number;
}> = ({ text, className = '', stagger = 0.03 }) => {
  const words = text.split(' ');

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      initial="hidden"
      animate="visible"
      variants={staggerContainer(stagger)}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, delay: i * stagger }}
        >
          {word}
          {' '}
        </motion.span>
      ))}
    </motion.span>
  );
};

export const ParallaxElement: React.FC<{
  children: ReactNode;
  offset?: number;
  className?: string;
}> = ({ children, offset = 0.1, className = '' }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};
