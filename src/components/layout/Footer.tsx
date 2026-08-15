import React from 'react';
import { profile } from '@/content/data';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgba(255,255,255,0.08)]">
      <div className="mx-auto flex h-[64px] max-w-[1200px] items-center justify-between px-6 text-[11px] tracking-[0.14em] text-[#94A3B8] md:px-8">
        <div>© {year} {profile.name} — {profile.location}</div>
        <div className="hidden md:block">
          Built with React + Framer Motion + Lenis + Three.js
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0077FF]" />
          <span>SYSTEMS THINKING</span>
        </div>
      </div>
    </footer>
  );
};
