import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Code2, ExternalLink } from 'lucide-react';
import { ContactForm } from '@/components/ui/ContactForm';
import { profile } from '@/content/data';

const ease = [0.16, 1, 0.3, 1] as const;

const contactLinks = [
  { label: 'Email', href: `mailto:${profile.email}`, icon: Mail, description: profile.email },
  { label: 'GitHub', href: profile.github, icon: Code2, description: 'github.com/jerryboss322' },
  { label: 'WhatsApp', href: profile.whatsapp, icon: ExternalLink, description: 'Chat on WhatsApp' },
];

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="section" aria-label="Contact">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '10%' }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="section-index">07 — Contact</span>
            <h2 className="mt-3 text-[var(--fs-h2)] font-bold font-display text-text">
              Get in Touch
            </h2>
            <p className="mt-4 text-muted leading-relaxed max-w-md">
              Have a question or want to work together? Reach out through any of the channels below.
            </p>

            <div className="mt-10 space-y-4">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-accent hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} className="text-muted group-hover:text-accent transition-colors" />
                      <div>
                        <span className="font-medium text-text block">{link.label}</span>
                        <span className="text-sm text-muted">{link.description}</span>
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="text-muted group-hover:text-accent transition-colors" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '10%' }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 shadow-card">
              <h3 className="text-lg font-semibold text-text mb-6">Send a Message</h3>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
