import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollLink } from '@/components/ui/ScrollLink';
import { staggerContainer } from '@/lib/motion-variants';
import { projects, type Project } from '@/content/data';
import { scrollToTop } from '@/lib/scroll';

const sectionItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const Section: React.FC<{
  index: string;
  title: string;
  items: string[];
  delay?: number;
}> = ({ index, title, items, delay = 0 }) => (
  <motion.section
    className="relative pl-6 border-l border-border"
    variants={sectionItem}
    transition={{ delay }}
  >
    <div className="absolute left-0 top-0 w-[2px] h-full bg-accent opacity-60" />
    <div className="flex items-center gap-3 mb-5">
      <span className="section-index">{index}</span>
      <h2 className="text-xl font-bold font-display text-text">{title}</h2>
    </div>
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-muted leading-relaxed">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  </motion.section>
);

const MetricStrip: React.FC<{ metrics: Project['metrics'] }> = ({ metrics }) => {
  if (!metrics.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-12">
      {metrics.map((metric, i) => (
        <motion.div
          key={metric.label}
          className="text-center p-6 rounded-xl bg-surface border border-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
        >
          <div className="text-3xl font-bold text-accent">{metric.value}</div>
          <div className="meta mt-2">{metric.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

export const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    scrollToTop(true);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text mb-4">Project not found</h2>
          <ScrollLink to="work" className="text-accent font-medium link-underline">
            ← Back to work
          </ScrollLink>
        </div>
      </div>
    );
  }

  return (
    <article className="py-24">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <ScrollLink
            to="work"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Work
          </ScrollLink>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="section-index">{project.subtitle}</span>
            <span className="text-muted">·</span>
            <span className="meta">{project.year}</span>
            <span className={`project-badge ${project.type === 'client' ? 'project-badge-client' : project.type === 'experiment' ? 'project-badge-experiment' : 'project-badge-personal'}`}>
              {project.type === 'client' ? 'Client Project' : project.type === 'experiment' ? 'Experiment' : 'Personal Project'}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold font-display text-text leading-tight">
            {project.title}
          </h1>
          <p className="mt-3 text-muted font-medium">{project.role}</p>

          <p className="mt-6 text-lg text-muted leading-relaxed max-w-3xl">
            {project.description}
          </p>

          <div className="mt-8 rounded-2xl overflow-hidden border border-border bg-surface shadow-card">
            <img
              src={project.image}
              alt={`${project.title} — hero screenshot`}
              className="w-full aspect-video object-cover"
              loading="eager"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span key={tech} className="tech-tag">{tech}</span>
            ))}
          </div>
        </motion.div>

        <MetricStrip metrics={project.metrics} />

        <motion.div
          className="mt-16 space-y-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '10%' }}
          variants={staggerContainer(0.15, 0)}
        >
          <Section index="01" title="Challenge" items={project.challenge} />
          <Section index="02" title="Process" items={project.process} delay={0.1} />
          <Section index="03" title="Solution" items={project.solution} delay={0.2} />
        </motion.div>

        <motion.div
          className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="primary-button inline-flex items-center gap-2"
          >
            <ExternalLink size={16} aria-hidden="true" />
            Live Demo
          </a>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-button inline-flex items-center gap-2"
            >
              <ExternalLink size={16} aria-hidden="true" />
              View Source
            </a>
          )}
          <div className="sm:ml-auto">
            <ScrollLink
              to="work"
              className="ghost-button inline-flex items-center gap-2"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              All Projects
            </ScrollLink>
          </div>
        </motion.div>
      </div>
    </article>
  );
};

export default ProjectPage;
