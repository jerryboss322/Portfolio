import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ScrollLink } from '@/components/ui/ScrollLink';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { profile } from '@/content/data';

const NAV_ITEMS = [
  { label: 'Work', id: 'work' },
  { label: 'About', id: 'about' },
  { label: 'What I do', id: 'capabilities' },
  { label: 'Process', id: 'process' },
  { label: 'Contact', id: 'contact' },
];

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-ink-900/80 backdrop-blur-xl transition-colors duration-200">
      <div className="shell flex h-[64px] items-center justify-between">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            closeMenu();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-2.5 font-display text-[15px] font-semibold tracking-tight transition-opacity hover:opacity-90"
          aria-label={`${profile.brand} — back to top`}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-display text-onaccent font-mono text-[12px] font-bold shadow-sm transition-transform duration-200 group-hover:scale-105">
            J
          </span>
          <span className="text-display">{profile.brand}</span>
        </a>

        <nav className="hidden items-center gap-1.5 text-[14px] md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <ScrollLink
              key={item.id}
              to={item.id}
              className="rounded-full px-3.5 py-1.5 text-body font-medium transition-all duration-200 hover:bg-tint-2 hover:text-display"
            >
              {item.label}
            </ScrollLink>
          ))}
          <div className="ml-2 pl-2 border-l border-line-faint">
            <ThemeToggle />
          </div>
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
                className={`h-0.5 w-4 rounded-full bg-display transition-all duration-200 ${
                  menuOpen ? 'translate-y-[4px] rotate-45' : ''
                }`}
              />
              <div
                className={`h-0.5 w-4 rounded-full bg-display transition-all duration-200 ${
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
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.18 }}
                >
                  <ScrollLink
                    to={item.id}
                    onClick={closeMenu}
                    className="block rounded-lg px-3 py-2.5 font-medium text-body transition-colors hover:bg-tint-2 hover:text-display"
                  >
                    {item.label}
                  </ScrollLink>
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
