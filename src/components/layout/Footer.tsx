import React from 'react';
import { Mail, ExternalLink } from 'lucide-react';

const GithubIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-6a3 3 0 0 0-.5-2.5a2.5 2.5 0 0 0-2-1.2v-2.5a4.5 4.5 0 0 0-9 0v2.5a2.5 2.5 0 0 0-2 1.2A3 3 0 0 0 6 16v6" />
    <path d="M9 18C9 17.4 9.2 16.8 9.6 16.3c.5-.6 1.2-.9 2-.9 1 0 1.8.6 2 1.5.2.7.3 1.5.3 2.3" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const LinkedInIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 0 12v-1.5A3.5 3.5 0 0 0 15.5 16h-1a3.5 3.5 0 0 1 0-7A3.5 3.5 0 0 1 15 9" />
    <path d="M2 2h6v6" />
    <path d="M2 20h6v-6" />
    <path d="M20 20V12a4 4 0 0 0-4-4h-1a3.5 3.5 0 0 1 0-7H12" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer container py-8">
      <div className="footer-divider"></div>
      <div className="footer-content flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="footer-left flex items-center gap-4">
          <span className="meta">© {new Date().getFullYear()} JBOSS</span>
          <span className="footer-status meta flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500" /> Available for select contracts
          </span>
        </div>

        <div className="footer-right flex items-center gap-3">
          <a
            href="mailto:hello@jboss.dev"
            className="icon-button w-10 h-10 flex items-center justify-center rounded-full border border-border text-text hover:border-accent hover:text-accent transition-colors"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
          <a
            href="https://linkedin.com/in/jboss-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-button w-10 h-10 flex items-center justify-center rounded-full border border-border text-text hover:border-accent hover:text-accent transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://github.com/jerryboss322"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-button w-10 h-10 flex items-center justify-center rounded-full border border-border text-text hover:border-accent hover:text-accent transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};
