import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { projects, type ProjectType } from '@/content/data';

const rowItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const getBadgeLabel = (type: ProjectType) => {
  switch (type) {
    case 'client': return 'Client Project';
    case 'experiment': return 'Experiment';
    default: return 'Personal Project';
  }
};

export const WorkSection: React.FC = () => {
  return (
    <section id="work" className="section container" aria-label="Selected work">
      <div className="section-head">
        <span className="section-index">03 — Selected Work</span>
        <h2 className="mt-3">Selected Work</h2>
        <p className="mt-4 max-w-xl leading-relaxed text-muted">
          A selection of digital products, platforms and interfaces I&apos;ve designed and built.
        </p>
      </div>

      <div className="space-y-16 md:space-y-24">
        {projects.map((project, index) => {
          const number = String(index + 1).padStart(2, '0');

          return (
            <motion.article
              key={project.slug}
              className="work-item"
              variants={rowItem}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className="flex items-baseline gap-2 mb-5">
                <span className="section-index">
                  {number}
                  <span className="mx-1 opacity-50" aria-hidden="true">/</span>
                  {project.subtitle}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <Link
                  to={`/projects/${project.slug}`}
                  className="project-media"
                  aria-label={`View case study: ${project.title}`}
                >
                  <img
                    src={project.image}
                    alt={`${project.title} — ${project.subtitle}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl md:text-3xl font-bold font-display">{project.title}</h3>
                    <span className={`project-badge ${project.type === 'client' ? 'project-badge-client' : project.type === 'experiment' ? 'project-badge-experiment' : 'project-badge-personal'}`}>
                      {getBadgeLabel(project.type)}
                    </span>
                  </div>
                  <p className="mt-4 leading-relaxed text-muted">{project.summary}</p>
                  <div className="mt-6 meta leading-relaxed">{project.tech.join(' · ')}</div>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent link-underline"
                  >
                    View Case Study
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};
