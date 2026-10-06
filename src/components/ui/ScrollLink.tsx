import React from 'react';
import { scrollToSection } from '@/lib/scroll';

interface ScrollLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

/**
 * Section scroll link. Renders a real anchor (accessible, deep-linkable) but
 * intercepts the click to scroll smoothly and mirror the section into the URL
 * hash.
 */
export const ScrollLink: React.FC<ScrollLinkProps> = ({
  to,
  children,
  className,
  onClick,
  ariaLabel,
}) => {
  const cleanId = to.replace(/^#/, '');

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onClick?.();
    scrollToSection(cleanId);
  };

  return (
    <a href={`#${cleanId}`} className={className} onClick={handleClick} aria-label={ariaLabel}>
      {children}
    </a>
  );
};
