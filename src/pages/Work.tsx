import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';
import { projects } from '@/content/data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface ProjectCardProps {
  number: string;
  name: string;
  role: string;
  summary: string;
  tech: string[];
  challenge: string;
  process: string;
  solution: string;
  live: string;
  github: string;
  image: string;
  alt: string;
  index: number;
  reduced: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  number,
  name,
  role,
  summary,
  tech,
  challenge,
  process,
  solution,
  live,
  github,
  image,
  alt,
  index,
  reduced,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-300, 300], [8, -8]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [-300, 300], [-12, 12]), {
    stiffness: 120,
    damping: 18,
  });
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    mx.set(x - rect.width / 2);
    my.set(y - rect.height / 2);
    setSpot({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={reduced ? false : { y: 60, rotateX: -15, opacity: 0 }}
      whileInView={reduced ? {} : { y: 0, rotateX: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
      style={reduced ? {} : { perspective: 1200 }}
      className="group"
    >
      <motion.div
        style={reduced ? {} : { rotateX, rotateY }}
        className="relative overflow-hidden rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#0A0E1A]/60 transition-[border,box-shadow] duration-300 hover:border-[rgba(0,119,255,0.35)] hover:shadow-[0_0_0_1px_rgba(0,119,255,0.25),0_20px_80px_rgba(0,119,255,0.12)]"
      >
        {/* Spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${spot.x}% ${spot.y}%, rgba(0,119,255,0.15), transparent 40%)`,
          }}
        />

        <div className="relative z-20 grid md:grid-cols-[1.1fr_0.9fr]">
          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="text-[11px] tracking-[0.18em] text-[#94A3B8]">{number}</span>
              <span className="h-px w-8 bg-[rgba(255,255,255,0.08)]" />
              <span className="text-[11px] uppercase tracking-[0.12em] text-[#94A3B8]">{role}</span>
            </div>

            <h3 className="font-display mt-4 text-[28px] font-semibold leading-[0.95] tracking-tight md:text-[32px]">
              {name}
            </h3>

            <p className="mt-3 max-w-[54ch] text-[14px] leading-[1.7] text-[#94A3B8]">{summary}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {tech.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[rgba(255,255,255,0.10)] px-2.5 py-1 text-[11px] tracking-wide text-[#CBD5E1]"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 rounded-[12px] border border-[rgba(255,255,255,0.06)] bg-[#02040A]/60 p-3">
              {[
                { k: 'Challenge', v: challenge },
                { k: 'Process', v: process },
                { k: 'Solution', v: solution },
              ].map((item) => (
                <div key={item.k}>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-[#94A3B8]">
                    {item.k}
                  </div>
                  <div className="mt-1 text-[12px] leading-[1.3]">{item.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-9 cursor-pointer place-items-center rounded-full bg-white px-4 text-[13px] font-medium text-black shadow-[0_6px_20px_rgba(255,255,255,0.15)] transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#F8FAFC] hover:shadow-[0_10px_30px_rgba(0,119,255,0.35)] active:scale-[0.97]"
              >
                Live Demo ↗
              </a>
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-9 cursor-pointer place-items-center rounded-full bg-[#F8FAFC] px-4 text-[13px] font-medium text-black transition-all duration-300 hover:-translate-y-[2px] hover:bg-white hover:shadow-[0_10px_30px_rgba(0,240,255,0.25)] active:scale-[0.97]"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Preview panel */}
          <div className="relative flex flex-col overflow-hidden rounded-b-[20px] border-t border-[rgba(255,255,255,0.08)] bg-[#02040A] md:rounded-bl-none md:rounded-r-[20px] md:border-l md:border-t-0">
            <div className="flex h-[36px] shrink-0 items-center justify-between border-b border-[rgba(255,255,255,0.06)] bg-[#0A0E1A] px-4">
              <div className="flex items-center gap-[6px]">
                <span className="h-[10px] w-[10px] rounded-full bg-[#FF5F56] opacity-[0.5]" />
                <span className="h-[10px] w-[10px] rounded-full bg-[#FFBD2E] opacity-[0.5]" />
                <span className="h-[10px] w-[10px] rounded-full bg-[#27C93F] opacity-[0.5]" />
              </div>
              <div className="hidden text-[10px] font-medium tracking-[0.14em] text-[#94A3B8]/70 sm:block">
                {name.toUpperCase()} — LIVE PREVIEW
              </div>
              <div className="text-[10px] tracking-[0.12em] text-[#94A3B8]/60 sm:hidden">
                PREVIEW
              </div>
              <div className="flex w-[48px] justify-end sm:w-[54px]">
                <span className="h-1 w-1 rounded-full bg-[#00F0FF]/60" />
              </div>
            </div>

            <div className="relative h-[280px] overflow-hidden bg-[#02040A] md:h-[360px] lg:h-full lg:min-h-[360px]">
              <motion.img
                src={image}
                alt={alt}
                loading="lazy"
                decoding="async"
                initial={reduced ? false : { scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: EASE }}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(2,4,10,0.55)_85%,rgba(2,4,10,0.9)_100%)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[rgba(255,255,255,0.08)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_20px_40px_rgba(2,4,10,0.08)]"
              />
              <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between p-3">
                <span className="rounded-full border border-white/10 bg-[#02040A]/60 px-2.5 py-1 text-[10px] tracking-[0.14em] text-white/70 backdrop-blur">
                  {number} • {tech[0]}
                </span>
                <span className="text-[10px] tracking-wide text-white/50">↗ Hover to zoom</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const WorkSection: React.FC = () => {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <section id="work" className="mx-auto max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[rgba(255,255,255,0.08)] pb-6">
          <h2 className="font-display text-[28px] font-semibold tracking-tight md:text-[36px]">
            Selected Work — <span className="font-normal text-[#94A3B8]">05 featured builds</span>
          </h2>
          <div className="text-[12px] tracking-[0.14em] text-[#94A3B8]">
            2024 — 2026 • CRAFTED SYSTEMS
          </div>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            number={String(index + 1).padStart(2, '0')}
            name={project.title}
            role={project.role}
            summary={project.summary}
            tech={project.tech}
            challenge={project.challenge[0] ?? ''}
            process={project.process[0] ?? ''}
            solution={project.solution[0] ?? ''}
            live={project.liveUrl}
            github={project.githubUrl}
            image={project.image}
            alt={`${project.title} — ${project.subtitle}`}
            index={index}
            reduced={reduced}
          />
        ))}
      </div>
    </section>
  );
};

export default WorkSection;
