import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '@/content/data';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const links = [
    { label: 'GitHub', href: profile.github },
    { label: 'LinkedIn', href: profile.linkedin },
    { label: 'Email', href: `mailto:${profile.email}` },
  ];

  return (
    <footer className="container pt-16 pb-10 mt-16">
      <div className="footer-divider" />
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="brand">JBOSS</span>
          <div className="mt-2 text-sm text-muted">
            {profile.role} · {profile.location}
          </div>
        </div>

        <nav className="flex flex-col sm:flex-row gap-3 sm:gap-8" aria-label="Footer">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="link-underline inline-flex items-center gap-1.5 text-sm font-medium"
            >
              {link.label}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ))}
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 meta">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
            {profile.status}
          </span>
          <span>© {year} JBOSS</span>
        </div>
      </div>
    </footer>
  );
};
