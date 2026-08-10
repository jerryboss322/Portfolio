import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '@/content/data';

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const WorkSection: React.FC = () => {
  return (
    <section id="work" className="section" aria-label="Selected work">
      <div className="container">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="section-index">01 — Selected Work</span>
            <h2 className="mt-3 text-[var(--fs-h2)] font-bold font-display text-text">
              Featured Projects
            </h2>
          </div>
          <p className="hidden md:block max-w-sm text-muted text-sm leading-relaxed">
            A selection of client work and personal builds.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '10%' }}
        >
          {projects.map((project, index) => (
            <motion.div key={project.slug} variants={item}>
              <Link
                to={`/projects/${project.slug}`}
                className="project-card block h-full"
                aria-label={`View case study: ${project.title}`}
              >
                <div className="project-card-media">
                  <img
                    src={project.image}
                    alt={`${project.title} — ${project.subtitle}`}
                    loading="lazy"
                  />
                </div>
                <div className="project-card-body">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="section-index text-[0.6rem]">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-[0.6rem] text-muted">/</span>
                    <span className="text-[0.6rem] text-muted uppercase tracking-wider">{project.subtitle}</span>
                    <span className={`project-badge ${project.type === 'client' ? 'project-badge-client' : 'project-badge-personal'}`}>
                      {project.type === 'client' ? 'Client' : 'Personal'}
                    </span>
                  </div>
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-desc line-clamp-2">{project.summary}</p>
                  <div className="project-card-tech">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
