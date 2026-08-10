import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ScrollLink } from '@/components/ui/ScrollLink';

export const CTASection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 dark-section relative overflow-hidden" aria-label="Call to action">
      {/* Subtle geometric decoration */}
      <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-purple rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '10%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <span className="section-index">05 — Let&apos;s Work Together</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold font-display text-white leading-tight">
              Have a Project in Mind?
            </h2>
            <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-xl mx-auto">
              Let&apos;s build something useful, fast, and reliable. I&apos;m available for select projects and collaborations.
            </p>

            <div className="mt-10">
              <ScrollLink
                to="contact"
                className="inline-flex items-center gap-2 bg-white text-[var(--dark-section)] px-8 py-4 rounded-xl font-semibold text-base hover:bg-slate-100 transition-all hover:shadow-lg"
              >
                Start a Conversation
                <ArrowRight size={18} aria-hidden="true" />
              </ScrollLink>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
