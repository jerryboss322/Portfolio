import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Server, Rocket } from 'lucide-react';

const capabilities = [
  {
    number: '01',
    title: 'Web Applications',
    description: 'Modern, responsive applications built around real user needs. From interactive interfaces to full-stack platforms.',
    icon: Globe,
  },
  {
    number: '02',
    title: 'Backend Systems',
    description: 'APIs, databases, authentication, business logic, and application architecture that scales.',
    icon: Server,
  },
  {
    number: '03',
    title: 'DevOps & Deployment',
    description: 'Production-ready applications with reliable deployment, CI/CD, and cloud infrastructure.',
    icon: Rocket,
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const WhatIBuildSection: React.FC = () => {
  return (
    <section id="what-i-build" className="section" aria-label="What I build">
      <div className="container">
        <div className="max-w-2xl mb-12">
          <span className="section-index">02 — What I Build</span>
          <h2 className="mt-3 text-[var(--fs-h2)] font-bold font-display text-text">
            Engineering Capabilities
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            I work across the full stack — from polished interfaces to scalable infrastructure.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '10%' }}
        >
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.number}
                variants={item}
                className="capability-card"
              >
                <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center mb-5">
                  <Icon size={20} className="text-accent" />
                </div>
                <div className="capability-number">{cap.number}</div>
                <h3 className="capability-title">{cap.title}</h3>
                <p className="capability-desc">{cap.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
