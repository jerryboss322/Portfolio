import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ContactForm } from '@/components/ui/ContactForm';
import { profile } from '@/content/data';

const ease = [0.16, 1, 0.3, 1] as const;

const links = [
  { label: 'Email', href: `mailto:${profile.email}` },
  { label: 'GitHub', href: profile.github },
  { label: 'LinkedIn', href: profile.linkedin },
];

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="section container" aria-label="Contact">
      <div className="section-head">
        <span className="section-index">05 — Contact</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display leading-tight">
            Have a project in mind?
          </h2>
          <p className="mt-4 text-lg text-muted">Let&apos;s build something useful.</p>

          <ul className="mt-10 space-y-4">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="link-underline inline-flex items-center gap-2 font-medium text-base"
                >
                  {link.label}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="pt-8 lg:pt-0 lg:border-l lg:border-border lg:pl-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
};
