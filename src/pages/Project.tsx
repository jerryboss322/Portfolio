import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { ScrollLink } from '@/components/ui/ScrollLink';
import { staggerContainer } from '@/lib/motion-variants';
import { projects, type Project } from '@/content/data';
import { scrollToTop } from '@/lib/scroll';

const sectionItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const Section: React.FC<{
  index: string;
  title: string;
  items: string[];
  delay?: number;
}> = ({ index, title, items, delay = 0 }) => (
  <motion.section
    className="project-section"
    variants={sectionItem}
    transition={{ delay }}
  >
    <div className="flex items-center gap-4 mb-6">
      <span className="meta text-accent" aria-hidden="true">
        {index}
      </span>
      <Typography.H2>{title}</Typography.H2>
    </div>
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-muted leading-relaxed">
          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
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
          className="stat text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <div className="stat-number text-accent text-3xl">{metric.value}</div>
          <div className="stat-label mt-1">{metric.label}</div>
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
      <div className="min-h-screen flex items-center justify-center container">
        <div className="text-center">
          <Typography.H2 className="mb-4">Project not found</Typography.H2>
          <ScrollLink to="work" className="link-underline meta text-muted">
            ← Back to work
          </ScrollLink>
        </div>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-24">
      <motion.div
        className="project-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <ScrollLink
          to="work"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Work
        </ScrollLink>

        <div className="project-topline flex items-center justify-between mb-6 gap-4">
          <span className="meta text-accent">{project.subtitle}</span>
          <Typography.Meta>{project.year}</Typography.Meta>
        </div>

        <Typography.H1 className="mb-4">{project.title}</Typography.H1>
        <Typography.Meta className="block mb-6">{project.role}</Typography.Meta>

        <Typography.P className="text-lg max-w-3xl mb-12">{project.description}</Typography.P>

        <div className="aspect-video rounded-2xl overflow-hidden border border-border mb-12 bg-surface-strong">
          <img
            src={project.image}
            alt={`${project.title} — hero screenshot`}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        <div className="meta flex flex-wrap gap-x-6 gap-y-2 mb-8">
          {project.tech.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </motion.div>

      <MetricStrip metrics={project.metrics} />

      <motion.div
        className="project-content mt-16 space-y-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer(0.2, 0)}
      >
        <Section index="01" title="Challenge" items={project.challenge} />
        <Section index="02" title="Process" items={project.process} delay={0.15} />
        <Section index="03" title="Solution" items={project.solution} delay={0.3} />
      </motion.div>

      {project.gallery.length > 1 && (
        <motion.div
          className="project-gallery grid grid-cols-1 md:grid-cols-2 gap-6 mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer(0.15)}
        >
          {project.gallery.slice(1).map((src, i) => (
            <motion.div
              key={src}
              className="rounded-2xl overflow-hidden border border-border bg-surface-strong"
              variants={sectionItem}
            >
              <img
                src={src}
                alt={`${project.title} — detail ${i + 2}`}
                loading="lazy"
                className="w-full aspect-video object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      <motion.div
        className="project-footer mt-20 pt-8 border-t border-border flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Button
          variant="primary"
          size="md"
          onClick={() => window.open(project.liveUrl, '_blank', 'noopener,noreferrer')}
        >
          Live Demo
        </Button>
        <Button
          variant="secondary"
          size="md"
          onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
        >
          GitHub
        </Button>
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
    </article>
  );
};

export default ProjectPage;
