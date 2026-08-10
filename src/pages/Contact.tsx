import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ScrollLink } from '@/components/ui/ScrollLink';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="section container" aria-label="Contact">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '10%' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <span className="section-index">07 — Contact</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold font-display text-text leading-tight">
            Have a Project in Mind?
          </h2>
          <p className="mt-6 text-lg text-muted leading-relaxed max-w-xl mx-auto">
            Let&apos;s build something useful.
          </p>

          <div className="mt-10">
            <ScrollLink
              to="mailto:jerryadewole2023@gmail.com"
              className="primary-button px-8 py-4 text-base font-semibold"
            >
              Get in Touch
              <ArrowRight size={18} aria-hidden="true" />
            </ScrollLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
