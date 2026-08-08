import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/content/data';
import { Typography } from '@/components/ui/Typography';

const rowItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const WorkSection: React.FC = () => {
  return (
    <section id="work" className="section container" aria-label="Selected work">
      <div className="section-head">
        <span className="section-index">01 — Selected Work</span>
        <h2 className="mt-3">Selected Work</h2>
        <p className="mt-4 max-w-xl leading-relaxed text-muted">
          A selection of digital products, platforms and interfaces I&apos;ve designed and built.
        </p>
      </div>

      <div className="space-y-24 md:space-y-32">
        {projects.map((project, index) => {
          const fullWidth = index === 0 || index === 3;
          const flipped = index === 2;
          const number = String(index + 1).padStart(2, '0');
          const media = (
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
          );

          const info = (
            <div>
              <h3 className="text-2xl md:text-3xl font-bold font-display">{project.title}</h3>
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
          );

          return (
            <motion.article
              key={project.slug}
              className="work-item"
              variants={rowItem}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className="flex items-baseline justify-between gap-4 mb-5">
                <span className="section-index">{number}</span>
                <Typography.Meta>{project.subtitle}</Typography.Meta>
              </div>

              {fullWidth ? (
                <>
                  <div className="aspect-video">{media}</div>
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                    {info}
                  </div>
                </>
              ) : (
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${
                    flipped ? '' : ''
                  }`}
                >
                  {flipped ? (
                    <>
                      <div className="order-2 md:order-1">{info}</div>
                      <div className="order-1 md:order-2 aspect-video md:aspect-[4/3]">{media}</div>
                    </>
                  ) : (
                    <>
                      <div className="aspect-video md:aspect-[4/3]">{media}</div>
                      {info}
                    </>
                  )}
                </div>
              )}
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};
