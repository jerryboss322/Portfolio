import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cardHover } from '@/lib/motion-variants';

export const Card: React.FC<{
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}> = ({ children, className = '', hover = true, onClick }) => {
  return (
    <motion.div
      className={`card bg-surface border border-border rounded-xl p-6 transition-all duration-300 ${
        hover ? 'cursor-pointer' : ''
      } ${className}`}
      initial="rest"
      whileHover={hover ? 'hover' : undefined}
      variants={cardHover}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};
