import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollLink } from '@/components/ui/ScrollLink';
import { profile } from '@/content/data';

const NAV_ITEMS = [
  { label: 'Work', id: 'work' },
  { label: 'About', id: 'about' },
  { label: 'Systems', id: 'systems' },
  { label: 'Contact', id: 'contact' },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Scroll progress */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-[#0077FF] transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
      />

      <header className="sticky top-0 z-50 border-b border-[rgba(255,255,255,0.08)] bg-[#02040A]/80 backdrop-blur-[14px]">
        <div className="mx-auto flex h-[64px] max-w-[1200px] items-center justify-between px-6 md:px-8">
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              closeMenu();
              window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
            }}
            className="font-display text-[13px] font-semibold tracking-[0.2em] transition-colors hover:text-[#00F0FF]"
            style={{ perspective: 600, transformStyle: 'preserve-3d' }}
            whileHover={reduced ? {} : { rotateY: 180, scale: 1.05 }}
            transition={{ duration: 0.6, ease: EASE }}
            aria-label={`${profile.brand} — back to top`}
          >
            <span className="inline-block" style={{ transformStyle: 'preserve-3d' }}>
              {profile.brand}
            </span>
          </motion.a>

          <nav className="hidden items-center gap-8 text-[13px] md:flex" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <ScrollLink
                key={item.id}
                to={item.id}
                className="tracking-wide text-[#94A3B8] transition-colors hover:text-[#F8FAFC]"
              >
                {item.label}
              </ScrollLink>
            ))}
            <div className="flex items-center gap-2 border-l border-[rgba(255,255,255,0.08)] pl-4">
              <motion.span
                className="h-2 w-2 rounded-full bg-[#0077FF] shadow-[0_0_12px_rgba(0,119,255,0.6)]"
                animate={reduced ? {} : { scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="h-2 w-2 rounded-full bg-[#00F0FF]/80" />
            </div>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-[rgba(255,255,255,0.08)] transition-all duration-300 hover:-translate-y-[2px] hover:border-white/20 hover:bg-white/10 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <div className="space-y-1">
              <div
                className={`h-[1.5px] w-4 bg-white transition ${menuOpen ? 'rotate-45 translate-y-[3px]' : ''}`}
              />
              <div
                className={`h-[1.5px] w-4 bg-white transition ${menuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`}
              />
            </div>
          </button>
        </div>

        {menuOpen && (
          <div
            id="mobile-menu"
            className="animate-[fadeIn_0.25s_ease] border-t border-[rgba(255,255,255,0.08)] bg-[#02040A] px-6 py-6 md:hidden"
          >
            <div className="flex flex-col gap-5 text-[14px]">
              {NAV_ITEMS.map((item) => (
                <ScrollLink
                  key={item.id}
                  to={item.id}
                  onClick={closeMenu}
                  className="cursor-pointer text-left text-[#94A3B8]"
                >
                  {item.label}
                </ScrollLink>
              ))}
              <ScrollLink
                to="contact"
                onClick={closeMenu}
                className="grid h-11 cursor-pointer place-items-center rounded-full bg-white px-5 text-[13px] font-medium text-black transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#F8FAFC] hover:shadow-[0_10px_30px_rgba(0,119,255,0.35)]"
              >
                Hire Me →
              </ScrollLink>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
