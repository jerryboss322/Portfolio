import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '@/content/data';

const SOCIAL_LINKS = [
  { label: 'GitHub', href: profile.github },
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'WhatsApp', href: profile.whatsapp },
];

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-line-faint bg-gradient-to-t from-ink-850/90 to-transparent">
      <div className="shell flex flex-col gap-5 py-10 text-[14px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="font-display font-semibold text-display">
            {profile.brand}
          </span>
          <span>
            © {year} {profile.name} — {profile.location}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <ul className="flex items-center gap-4">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-0.5 text-[13px] font-medium text-muted transition-colors hover:text-display"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight
                    size={12}
                    aria-hidden="true"
                    className="opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </a>
              </li>
            ))}
          </ul>
          <span className="hidden h-3.5 w-px bg-line-faint sm:block" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span>Built with React and TypeScript</span>
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line bg-tint-1 px-3 py-1 text-[13px] font-medium text-bright transition-all duration-200 hover:border-line-strong hover:bg-tint-2 hover:text-display"
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
