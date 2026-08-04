import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Typography, Icon } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AnimatedSection } from '@/components/motion/AnimatedSection';
import { staggerContainer } from '@/lib/motion-variants';
import { projects, Project } from '@/content/data';

export const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Typography.H2>Project not found</Typography.H2>
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
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Work
        </Link>

        <div className="project-topline flex items-center justify-between mb-6 gap-4">
          <Badge variant="primary">{project.subtitle}</Badge>
          <Typography.Meta>{project.year}</Typography.Meta>
        </div>

        <Typography.H1 className="mb-4">{project.title}</Typography.H1>
        <Typography.Meta className="block mb-6">{project.role}</Typography.Meta>

        <Typography.P className="text-lg max-w-3xl mb-8">{project.description}</Typography.P>

        <div className="aspect-video rounded-xl overflow-hidden border border-border mb-12">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        <div className="project-meta flex flex-wrap gap-3 mb-8">
          {project.tech.map((tech) => (
            <Badge key={tech} variant="default">
              {tech}
            </Badge>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="project-content mt-16 space-y-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer(0.2, 0)}
      >
        <AnimatedSection delay={0.2}>
          <motion.div
            className="project-section"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Typography.H2 className="mb-6 text-accent">Challenge</Typography.H2>
            <div className="space-y-4">
              <Typography.P>{project.summary}</Typography.P>
              <Typography.P>{project.outcome}</Typography.P>
              <Typography.P>
                This project exemplifies the engineering rigor and design precision applied
                across all work — from token architecture to production deployment.
              </Typography.P>
            </div>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <motion.div
            className="project-section"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Typography.H2 className="mb-6 text-accent">Process</Typography.H2>
            <div className="space-y-4">
              <Typography.P>{project.description}</Typography.P>
              <Typography.P>
                Built with a focus on performance, user experience, and maintainable architecture.
              </Typography.P>
            </div>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection delay={0.6}>
          <motion.div
            className="project-section"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Typography.H2 className="mb-6 text-accent">Solution</Typography.H2>
            <div className="space-y-4">
              <Typography.P>{project.outcome}</Typography.P>
              <Typography.P>
                The result is a robust, scalable, and high-performing product that meets user
                needs and business objectives.
              </Typography.P>
            </div>
          </motion.div>
        </AnimatedSection>
      </motion.div>

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
          icon={<Icon name="external" size={18} />}
        >
          Live Demo
        </Button>
        <Button
          variant="secondary"
          size="md"
          onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
          icon={<Icon name="github" size={18} />}
        >
          GitHub
        </Button>
        <Link to="/" className="ml-auto">
          <Button variant="ghost" size="md">
            <ArrowLeft size={16} />
            All Projects
          </Button>
        </Link>
      </motion.div>
    </article>
  );
};

export { ProjectPage as Project };
