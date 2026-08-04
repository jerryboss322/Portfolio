import React, { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const baseClasses =
    'inline-flex items-center rounded-full font-medium text-xs uppercase tracking-wider';

  const variantClasses = {
    default: 'bg-surface-strong border border-border text-muted',
    primary: 'bg-accent-soft text-accent border border-accent',
    secondary: 'bg-muted text-muted border border-border',
    outline: 'border border-border text-muted',
  }[variant];

  const sizeClasses = {
    sm: 'px-2.5 py-1',
    md: 'px-3 py-1.5',
  }[size];

  return (
    <span className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}>
      {children}
    </span>
  );
};
