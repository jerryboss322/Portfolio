import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { openCommandPalette } from '@/components/ui/CommandPalette';
import { profile } from '@/content/data';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Work', path: '/work' },
  { label: 'Services', path: '/services' },
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
    <header className="sticky top-0 z-50 border-b border-line-faint/60 bg-ink-900/75 backdrop-blur-xl transition-colors duration-200">
      <div className="shell relative flex h-[64px] items-center justify-between">
        <Link
          to="/"
          onClick={closeMenu}
          className="group inline-flex items-center gap-2 font-display text-[15px] font-semibold tracking-tight transition-opacity hover:opacity-90"
          aria-label={`${profile.brand} — home`}
        >
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125"
          />
          <span className="text-display">{profile.brand}</span>
        </Link>

        <nav className="absolute left-1/2 -translate-x-1/2 hidden items-center gap-1 rounded-full border border-line-faint bg-ink-850/65 p-1 text-[14px] backdrop-blur-md md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                aria-current={active ? 'page' : undefined}
                className={`relative rounded-full px-3.5 py-1.5 font-medium transition-colors duration-200 ${
                  active
                    ? 'text-display'
                    : 'text-body hover:text-display'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="header-nav-pill"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border border-line bg-tint-3"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label="Open command palette"
            className="inline-flex h-8 items-center gap-2 rounded-full border border-line bg-ink-800/80 px-3 font-mono text-[11px] text-muted transition-colors hover:border-line-strong hover:text-display"
          >
            <span>Index</span>
            <kbd className="rounded border border-line-faint bg-ink-900/70 px-1.5 py-0.5 text-[10px] text-bright">
              ⌘K
            </kbd>
          </button>
          <ThemeToggle />
        </div>

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
