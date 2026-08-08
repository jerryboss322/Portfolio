import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '@/lib/scroll';

interface ScrollLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

/**
 * Section scroll link. Renders a real anchor (accessible, deep-linkable)
 * but intercepts the click to scroll via Lenis and mirrors the section
 * into the URL hash without tripping HashRouter navigation.
 */
export const ScrollLink: React.FC<ScrollLinkProps> = ({
  to,
  children,
  className,
  onClick,
  ariaLabel,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const cleanId = to.replace(/^#/, '');

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onClick?.();

    // If we're on a sub-route (e.g. a project page), go home first and carry
    // the target in router state so the home layout can scroll once it has
    // committed to the DOM (handled by Layout's useLayoutEffect).
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: cleanId } });
      return;
    }

    scrollToSection(cleanId);
  };

  return (
    <a
      href={`#${cleanId}`}
      className={className}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
};
