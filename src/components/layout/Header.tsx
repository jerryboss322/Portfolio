import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Media } from '@/components/ui/Media';
import { portrait } from '@/content/images';
import { profile } from '@/content/data';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Work', path: '/work' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Close menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const closeMenu = () => setMenuOpen(false);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-ink-900/55 backdrop-blur-2xl transition-colors duration-200">
      <div className="shell flex h-[64px] items-center justify-between">
        <Link
          to="/"
          onClick={closeMenu}
          className="group flex items-center gap-2.5 font-display text-[15px] font-semibold tracking-tight transition-opacity hover:opacity-90"
          aria-label={`${profile.brand} — home`}
        >
          <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg border border-accent bg-accent/10 shadow-sm transition-all duration-200 group-hover:scale-105 group-hover:bg-accent/20">
            <Media
              asset={portrait}
              alt={profile.fullName}
              sizes="28px"
              imgClassName="object-cover object-top w-full h-full"
            />
          </span>
          <span className="text-display">{profile.brand}</span>
        </Link>

        <nav className="hidden items-center gap-1.5 text-[14px] md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`rounded-full px-3.5 py-1.5 font-medium transition-all duration-200 hover:bg-tint-2 ${
                isActive(item.path)
                  ? 'bg-tint-2 text-display'
                  : 'text-body hover:text-display'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile menu controls */}
        <div className="flex items-center gap-2.5 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg border border-line bg-tint-1 transition-colors hover:border-line-strong hover:bg-tint-2"
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <div className="space-y-1.5">
              <div
                className={`h-0.5 w-4 rounded-full bg-bright transition-all duration-200 ${
                  menuOpen ? 'translate-y-[4px] rotate-45' : ''
                }`}
              />
              <div
                className={`h-0.5 w-4 rounded-full bg-bright transition-all duration-200 ${
                  menuOpen ? '-translate-y-[4px] -rotate-45' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-ink-900/95 backdrop-blur-2xl md:hidden"
          >
            <div className="shell flex flex-col gap-1.5 py-4 text-[15px]">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.18 }}
                >
                  <Link
                    to={item.path}
                    onClick={closeMenu}
                    className={`block rounded-lg px-3 py-2.5 font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-tint-2 text-display'
                        : 'text-body hover:bg-tint-2 hover:text-display'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
