import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../content/data';
import { Media } from '../components/ui/Media';
import ProjectModal from '../components/ui/ProjectModal';
import InteractiveBadge from '../components/ui/InteractiveBadge';
import {
  projectImage_titan,
  projectImage_luxora,
  projectImage_sallygreen,
  projectImage_tastetrail,
  projectImage_jbet,
  type ImageAsset,
} from '../content/images';

const IMAGES: Record<string, ImageAsset> = {
  titan: projectImage_titan,
  luxora: projectImage_luxora,
  sallygreen: projectImage_sallygreen,
  tastetrail: projectImage_tastetrail,
  jbet: projectImage_jbet,
};

interface WorkProps {
  id?: string;
}

export const WorkSection = ({ id = 'work' }: WorkProps) => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const titanProject = projects.find(p => p.slug === 'titan');
  const otherProjects = projects.filter(p => p.slug !== 'titan');

  const selectedProjectData = projects.find(p => p.slug === selectedProject);

  return (
    <>
      <section 
        id={id}
        className="relative overflow-hidden border-b border-line-faint bg-ink-900"
      >
        {/* Background accent - atmospheric gradient */}
        <div 
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 right-0 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-gradient-to-l from-sky-500/10 via-indigo-500/8 to-transparent blur-[120px]" 
        />

        <div className="shell py-16 sm:py-24 md:py-32 relative">
          {/* Section Header */}
          <div className="mb-12 sm:mb-16">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                02. ARCHITECTURE
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-line-strong to-transparent" />
            </div>
            <h2 className="font-display text-[clamp(2rem,8vw,4rem)] font-bold leading-[1.1] tracking-[-0.04em] text-display mb-4">
              Selected Work
            </h2>
            <p className="text-[15px] sm:text-[17px] leading-[1.75] text-bright max-w-2xl">
              From architecture to deployment—systems built to scale
            </p>
          </div>

          {/* Titan - Full Width Hero Card */}
          {titanProject && (
            <Link
              to={`/work/${titanProject.slug}`}
              className="group relative mb-8 sm:mb-12 block"
            >
              {/* Full-bleed image container */}
              <div className="relative h-[350px] sm:h-[450px] md:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden border border-line-faint bg-ink-700">
                <Media
                  asset={IMAGES[titanProject.slug]}
                  alt={titanProject.title}
                  className="w-full h-full"
                  imgClassName="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1400px"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ink-900/95 via-ink-900/70 to-transparent" />
                
                {/* Content overlay - left aligned */}
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-2xl px-6 sm:px-8 md:px-12">
                    <InteractiveBadge 
                      label="⭐ Centerpiece"
                      variant="warning"
                      tooltip="Flagship Project"
                    />
                    
                    <h3 className="font-display text-[clamp(1.75rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-0.04em] text-display mb-3 sm:mb-4 mt-3 sm:mt-4">
                      {titanProject.title}
                    </h3>
                    
                    <p className="text-[15px] sm:text-[18px] leading-[1.75] text-bright mb-4 sm:mb-6">
                      {titanProject.subtitle}
                    </p>

                    {/* Architecture highlights */}
                    {titanProject.architecture && (
                      <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-4 sm:mb-6">
                        <div>
                          <div className="font-display text-[20px] sm:text-[32px] font-bold tracking-tight bg-gradient-to-br from-sky-400 to-cyan-300 bg-clip-text text-transparent mb-1">
                            {titanProject.architecture.techStack.length}
                          </div>
                          <div className="text-[9px] sm:text-[11px] font-medium uppercase tracking-wide text-muted">Technologies</div>
                        </div>
                        <div>
                          <div className="font-display text-[20px] sm:text-[32px] font-bold tracking-tight bg-gradient-to-br from-emerald-400 to-teal-300 bg-clip-text text-transparent mb-1">
                            {titanProject.architecture.database?.keyTables.length || 0}
                          </div>
                          <div className="text-[9px] sm:text-[11px] font-medium uppercase tracking-wide text-muted">DB Tables</div>
                        </div>
                        <div>
                          <div className="font-display text-[20px] sm:text-[32px] font-bold tracking-tight bg-gradient-to-br from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-1">
                            {titanProject.architecture.deployment?.ciCd ? '✓' : '✗'}
                          </div>
                          <div className="text-[9px] sm:text-[11px] font-medium uppercase tracking-wide text-muted">CI/CD</div>
                        </div>
                      </div>
                    )}

                    {/* Tech stack preview */}
                    <div className="hidden sm:flex flex-wrap gap-2 mb-6">
                      {titanProject.architecture?.techStack.slice(0, 6).map((tech) => (
                        <InteractiveBadge 
                          key={tech.name}
                          label={tech.name}
                          variant="default"
                          tooltip={tech.why}
                        />
                      ))}
                      {titanProject.architecture && titanProject.architecture.techStack.length > 6 && (
                        <span className="rounded-lg border border-line-faint bg-ink-700/60 px-3 py-1.5 text-[13px] font-medium text-muted">
                          +{titanProject.architecture.techStack.length - 6} more
                        </span>
                      )}
                    </div>

                    <div className="inline-flex items-center gap-2 text-[13px] sm:text-[15px] font-semibold text-accent transition-all group-hover:gap-4">
                      <span>Explore Architecture</span>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Other Projects - 2x2 Staggered Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {otherProjects.map((project, idx) => (
              <Link
                key={project.slug}
                to={`/work/${project.slug}`}
                className="group relative"
                style={{
                  marginTop: idx % 2 === 1 ? '0' : '0',
                  ...(window.innerWidth >= 768 && idx % 2 === 1 ? { marginTop: '3rem' } : {})
                }}
              >
                {/* Card */}
                <div className="relative h-[300px] sm:h-[350px] md:h-[400px] rounded-xl sm:rounded-2xl overflow-hidden border border-line-faint bg-ink-700 shadow-lg hover:shadow-2xl hover:shadow-accent-glow transition-all duration-300">
                  <Media
                    asset={IMAGES[project.slug]}
                    alt={project.title}
                    className="w-full h-full"
                    imgClassName="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/95 via-ink-900/60 to-transparent" />
                  
                  {/* Content overlay - bottom aligned */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                    <h3 className="font-display text-[24px] sm:text-[28px] font-bold text-display mb-2 transition-colors group-hover:text-accent">
                      {project.title}
                    </h3>
                    
                    <p className="text-[14px] sm:text-[15px] leading-[1.75] text-bright mb-3 sm:mb-4 line-clamp-2">
                      {project.subtitle}
                    </p>

                    {/* Tech stack preview */}
                    <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                      {project.architecture?.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech.name}
                          className="rounded-lg border border-line-faint bg-ink-700/80 px-2 py-1 text-[10px] sm:text-[11px] font-medium text-muted backdrop-blur-sm"
                        >
                          {tech.name}
                        </span>
                      ))}
                      {project.architecture && project.architecture.techStack.length > 3 && (
                        <span className="rounded-lg border border-line-faint bg-ink-700/80 px-2 py-1 text-[10px] sm:text-[11px] font-medium text-muted backdrop-blur-sm">
                          +{project.architecture.techStack.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[12px] sm:text-[13px] font-medium text-accent transition-all group-hover:gap-3">
                      <span>View Details</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProjectData && (
        <ProjectModal
          project={selectedProjectData}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default WorkSection;
