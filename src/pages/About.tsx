import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/motion-variants';
import { Typography } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { projects } from '@/content/data';

export const ContactSection: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} id="contact" className="section container">
      <div className="contact-section-centered">
        <motion.div
          className="contact-card mx-auto max-w-lg bg-surface border border-border rounded-2xl p-10 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Typography.H2 className="text-2xl md:text-3xl mb-4 font-display">
            Let's work together!
          </Typography.H2>
          <Typography.P className="mb-8">
            Get in touch to discuss your next project, a collaboration, or a role that matches my
            background.
          </Typography.P>

          <div className="contact-actions flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@jboss.dev"
              className="cta-glow primary-button px-8 py-3 text-base font-semibold"
            >
              Contact Me
            </a>
            <a
              href="https://github.com/jerryboss322"
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-button px-8 py-3 text-base font-semibold"
            >
              GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const AboutSection: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section ref={ref} id="about" className="section container">
      <div className="about-grid grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          className="about-copy"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Typography.H2 className="mb-6">
            Building digital infrastructure with visual clarity.
          </Typography.H2>

          <Typography.P className="mb-6">
            I bridge the gap between design vision and production-ready implementation. I construct
            cohesive design token architectures, design layouts around structured grid lines, and
            write semantic, high-performance CSS and JavaScript.
          </Typography.P>

          <Typography.H3 className="mb-4">Core Values</Typography.H3>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Engineering Excellence
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              User-Centered Design
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Performance Obsession
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Visual Clarity
            </li>
          </ul>

          <motion.div
            className="skills-list flex flex-wrap gap-2"
            variants={staggerContainer(0.05)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {['Design Systems', 'Data Density Design', 'Web Components', 'Interaction Physics', 'CSS Architecture', 'Canvas & WebGL'].map(
              (skill) => (
                <motion.span
                  key={skill}
                  className="skill-chip bg-surface border border-border rounded-full px-4 py-2 text-sm flex items-center"
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                >
                  {skill}
                </motion.span>
              )
            )}
          </motion.div>
        </motion.div>

        <motion.div
          className="about-card bg-surface border border-border rounded-xl p-8"
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Typography.H3 className="mb-4">Expertise</Typography.H3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              System-level token pipelines
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Accessible component architecture
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              High-fidelity motion & canvas art
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Clean, native frontend execution
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export const ProjectsSection: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section ref={ref} id="work" className="section container">
      <div className="section-header">
        <Typography.H2>Featured Projects</Typography.H2>
        <Link to="/projects/all" className="link-underline meta">
          View Case Studies
        </Link>
      </div>

      <motion.div
        className="project-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={staggerContainer(0.15)}
      >
        {projects.slice(0, 5).map((project, index) => (
          <motion.div
            key={project.slug}
            className="project-card"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link to={`/projects/${project.slug}`} className="block">
              <div className="relative rounded-xl overflow-hidden border border-border bg-surface-strong group">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="project-topline flex items-center justify-between mb-3 gap-2">
                    <Typography.Meta>{project.year}</Typography.Meta>
                    <Badge variant="primary" size="sm">
                      {project.subtitle}
                    </Badge>
                  </div>
                  <Typography.H3 className="mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </Typography.H3>
                  <Typography.P className="text-sm mb-4">{project.summary}</Typography.P>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
