import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { profile } from '@/content/data';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const links = [
    { label: 'GitHub', href: profile.github },
    { label: 'WhatsApp', href: profile.whatsapp },
    { label: 'Email', href: `mailto:${profile.email}` },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="brand text-lg">JBOSS</span>
            <p className="mt-2 text-sm text-muted max-w-xs">
              Software Engineer building digital systems.
            </p>
          </div>

          <nav className="flex flex-wrap gap-6" aria-label="Footer">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-text transition-colors"
              >
                {link.label}
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            ))}
          </nav>

          <button
            onClick={scrollToTop}
            className="p-3 rounded-xl border border-border hover:border-accent hover:text-accent transition-all"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-muted">© {year} JBOSS. All rights reserved.</span>
          <span className="flex items-center gap-2 text-xs text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" />
            Available for work
          </span>
        </div>
      </div>
    </footer>
  );
};
