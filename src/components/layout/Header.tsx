import React, { useEffect, useState, useCallback } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ScrollLink } from '@/components/ui/ScrollLink';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { profile } from '@/content/data';

const NAV_ITEMS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'skills', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
];

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [progress, setProgress] = useState(0);

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

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[45] h-[2px] bg-accent transition-[width] duration-150 ease-out pointer-events-none"
        style={{ width: `${progress * 100}%` }}
      />

      <header className="topbar">
        <div className="container">
          <div className="nav-inner">
            <ScrollLink to="hero" className="brand" ariaLabel="JBOSS — back to top">
              JBOSS
            </ScrollLink>

            <nav className="hidden md:flex items-center" aria-label="Primary">
              {NAV_ITEMS.map((item) => (
                <ScrollLink
                  key={item.id}
                  to={item.id}
                  className={`nav-link ${activeSection === item.id ? 'active text-text' : ''}`}
                >
                  {item.label}
                </ScrollLink>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link hidden sm:inline-flex items-center gap-1"
              >
                GitHub
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
              <ScrollLink to="contact" className="primary-button hidden sm:inline-flex text-sm py-2.5 px-5">
                Hire Me
              </ScrollLink>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                className="md:hidden p-2 rounded-lg hover:bg-bg-soft transition-colors"
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} container mt-2`}
        >
          <nav className="bg-surface border border-border rounded-xl p-4 shadow-md" aria-label="Mobile">
            {NAV_ITEMS.map((item) => (
              <ScrollLink
                key={item.id}
                to={item.id}
                onClick={handleScrollLink}
                className={`block py-3 px-2 text-sm font-medium rounded-lg transition-colors hover:bg-bg-soft ${
                  activeSection === item.id ? 'text-accent' : 'text-muted'
                }`}
              >
                {item.label}
              </ScrollLink>
            ))}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleScrollLink}
              className="block py-3 px-2 text-sm font-medium text-muted rounded-lg transition-colors hover:bg-bg-soft"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <ScrollLink
              to="contact"
              onClick={handleScrollLink}
              className="block mt-2 primary-button w-full text-sm"
            >
              Hire Me
            </ScrollLink>
          </nav>
        </div>
      </header>
    </>
  );
};
