import React from 'react';
import { profile } from '@/content/data';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto grid max-w-[1280px] gap-6 px-6 py-10 text-[11px] tracking-[0.14em] text-muted md:grid-cols-3 md:items-center md:px-10">
        <div>
          © {year} {profile.name} — {profile.location}
        </div>

        {/* Credit reflects what this site actually ships. It previously named
            three.js, which the WebGL hero replaced. */}
        <div className="hidden text-center md:block">
          React · TypeScript · Tailwind · Framer Motion · raw WebGL2
        </div>

        <div className="flex items-center gap-2 md:justify-end">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-signal"
          />
          <span>SYSTEMS THINKING</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
