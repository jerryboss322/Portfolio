import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { ScrollLink } from '@/components/ui/ScrollLink';

interface HeaderProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const NAV_ITEMS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
];

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  // Scrollspy: highlight the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll progress + hide-on-scroll-down
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);

      const y = window.scrollY;
      if (Math.abs(y - lastScrollY.current) < 8) return;
      setHidden(y > lastScrollY.current && y > 120);
      lastScrollY.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleScrollLink = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      {/* Scroll progress bar — fixed, stays visible when the header hides */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[45] h-[2px] bg-accent transition-[width] duration-150 ease-out pointer-events-none"
        style={{ width: `${progress * 100}%` }}
      />

      <header
        className={`topbar transition-transform duration-300 ease-out ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >

      <div className="container">
        <div className="flex items-center justify-between h-16">
          <ScrollLink to="hero" className="brand text-text" ariaLabel="JBOSS — back to top">
            JBOSS
          </ScrollLink>

          <nav className="hidden md:flex items-center space-x-8" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <ScrollLink
                key={item.id}
                to={item.id}
                className={`topbar-nav text-sm font-medium transition-colors hover:text-accent ${
                  activeSection === item.id ? 'text-accent' : 'text-muted'
                }`}
              >
                {item.label}
              </ScrollLink>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="icon-button"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="md:hidden icon-button"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-surface border-t border-border`}
      >
        <nav className="container py-4" aria-label="Mobile">
          {NAV_ITEMS.map((item) => (
            <ScrollLink
              key={item.id}
              to={item.id}
              onClick={handleScrollLink}
              className={`block py-3 text-sm font-medium transition-colors hover:text-accent ${
                activeSection === item.id ? 'text-accent' : 'text-muted'
              }`}
            >
              {item.label}
            </ScrollLink>
          ))}
        </nav>
      </div>
      </header>
    </>
  );
};
