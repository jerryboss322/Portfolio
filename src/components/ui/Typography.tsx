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
    <span className={`text-xs uppercase tracking-wider text-muted ${className}`}>
      {children}
    </span>
  ),

  Body: ({ children, className = '' }: TypographyProps) => (
    <p className={`text-base leading-relaxed text-muted ${className}`}>
      {children}
    </p>
  ),
};

export const Icon: React.FC<{ name: string; size?: number; className?: string }> = ({
  name,
  size = 20,
  className = '',
}) => {
  const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    external: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size ?? size}
        height={props.size ?? size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={props.className}
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 12l6-6l6 6" />
        <line x1="13.5" x2="20.5" y1="19.5" y2="19.5" />
      </svg>
    ),
    github: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size ?? size}
        height={props.size ?? size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={props.className}
      >
        <path d="M15 22v-6a3 3 0 0 0-.5-2.5a2.5 2.5 0 0 0-2-1.2v-2.5a4.5 4.5 0 0 0-9 0v2.5a2.5 2.5 0 0 0-2 1.2A3 3 0 0 0 6 16v6" />
        <path d="M9 18C9 17.4 9.2 16.8 9.6 16.3c.5-.6 1.2-.9 2-.9 1 0 1.8.6 2 1.5.2.7.3 1.5.3 2.3" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    linkedin: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size ?? size}
        height={props.size ?? size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={props.className}
      >
        <path d="M16 8a6 6 0 0 1 0 12v-1.5A3.5 3.5 0 0 0 15.5 16h-1a3.5 3.5 0 0 1 0-7A3.5 3.5 0 0 1 15 9" />
        <path d="M2 2h6v6" />
        <path d="M2 20h6v-6" />
        <path d="M20 20V12a4 4 0 0 0-4-4h-1a3.5 3.5 0 0 1 0-7H12" />
      </svg>
    ),
    mail: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size ?? size}
        height={props.size ?? size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={props.className}
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 8-10 5L2 8" />
      </svg>
    ),
    arrow: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size ?? size}
        height={props.size ?? size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={props.className}
      >
        <path d="M5 12h14" />
        <path d="m9 5 7 7-7 7" />
      </svg>
    ),
  };

  const IconComponent = iconMap[name] || iconMap.external;
  return <IconComponent size={size} className={className} />;
};
