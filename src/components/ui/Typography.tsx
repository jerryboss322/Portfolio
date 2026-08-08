import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

type TypographyProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
};

export const Typography = {
  H1: ({ children, className = '' }: TypographyProps) => (
    <motion.h1
      className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.h1>
  ),

  H2: ({ children, className = '' }: TypographyProps) => (
    <h2 className={`font-display text-2xl md:text-3xl font-bold ${className}`}>
      {children}
    </h2>
  ),

  H3: ({ children, className = '' }: TypographyProps) => (
    <h3 className={`font-display text-xl font-bold ${className}`}>
      {children}
    </h3>
  ),

  P: ({ children, className = '' }: TypographyProps) => (
    <p className={`text-base leading-relaxed text-muted ${className}`}>
      {children}
    </p>
  ),

  Meta: ({ children, className = '' }: TypographyProps) => (
    <span className={`font-mono text-xs uppercase tracking-widest text-muted ${className}`}>
      {children}
    </span>
  ),

  Body: ({ children, className = '' }: TypographyProps) => (
    <p className={`text-base leading-relaxed text-muted ${className}`}>
      {children}
    </p>
  ),
};
