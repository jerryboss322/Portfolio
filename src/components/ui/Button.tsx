import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cardHover } from '@/lib/motion-variants';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  icon,
  iconPosition = 'left',
}) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: 'primary-button cta-glow bg-accent text-white hover:scale-105 hover:shadow-lg hover:shadow-accent/30',
    secondary: 'secondary-button border border-border bg-transparent text-muted hover:border-accent hover:text-text',
    ghost: 'bg-transparent text-muted hover:text-text hover:bg-surface-strong',
  }[variant];

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  }[size];

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      whileTap={{ scale: 0.97 }}
      initial="rest"
      animate="rest"
      whileHover={variant === 'primary' ? 'hover' : undefined}
      variants={variant === 'primary' ? cardHover : undefined}
    >
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </motion.button>
  );
};
