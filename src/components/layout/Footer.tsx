import React from 'react';
import { profile } from '@/content/data';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-line bg-ink-900/60 backdrop-blur-sm">
      <div className="shell flex flex-col gap-4 py-10 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <div>
          © {year} {profile.name} — {profile.location}
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span>Built with React and TypeScript</span>
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line bg-tint-1 px-3 py-1 text-[12px] font-medium text-bright transition-all duration-200 hover:border-line-strong hover:bg-tint-2 hover:text-display"
          >
            <span>Back to top</span>
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-y-0.5">
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
