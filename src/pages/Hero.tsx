import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Media } from '@/components/ui/Media';
import { ScrollLink } from '@/components/ui/ScrollLink';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Marquee } from '@/components/ui/Marquee';
import { portrait } from '@/content/images';
import { profile, heroIntro, heroStats, heroTitle, coreSkills } from '@/content/data';

export const Hero: React.FC = () => (
  <section id="home" className="relative border-b border-line-faint overflow-hidden">
    {/* Subtle atmospheric ambient glow */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-accent/10 blur-[120px]"
    />

    <div className="shell py-16 md:py-24 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        {/* ---- Copy ---- */}
        <div>
          <ScrollReveal direction="up" distance={16}>
            <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-line bg-tint-1 px-3.5 py-1.5 text-[12px] font-medium text-bright transition-colors hover:border-line-strong hover:bg-tint-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              <span>{profile.status}</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.1}>
            <h1 className="text-display-1 mt-6 font-bold tracking-tight text-display">
              {heroTitle}
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.2}>
            <p className="mt-6 max-w-[52ch] text-[16px] leading-[1.8] text-bright sm:text-[17px]">
              {heroIntro}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center gap-6 sm:gap-10">
              {heroStats.map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-2.5 sm:block">
                  <div className="font-display text-[26px] font-bold tracking-tight text-display">
                    {stat.value}
                  </div>
                  <div className="text-[12px] font-medium tracking-wide text-muted sm:mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
              <div className="hidden h-8 w-px bg-line sm:block" />
              <div className="flex items-baseline gap-2.5 sm:block">
                <div className="font-display text-[26px] font-bold tracking-tight text-accent">
                  100%
                </div>
                <div className="text-[12px] font-medium tracking-wide text-muted sm:mt-0.5">
                  Full-stack ownership
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.4}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ScrollLink
                to="work"
                className="group inline-flex h-11 cursor-pointer items-center gap-2 rounded-full bg-display px-6 text-[14px] font-medium text-onaccent shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-bright active:scale-[0.98]"
              >
                <span>See my work</span>
                <ArrowDown size={14} className="transition-transform duration-200 group-hover:translate-y-0.5" />
              </ScrollLink>
              <ScrollLink
                to="contact"
                className="inline-flex h-11 cursor-pointer items-center rounded-full border border-line-strong px-6 text-[14px] font-medium text-display transition-all duration-200 hover:scale-[1.02] hover:border-display/40 hover:bg-tint-2 active:scale-[0.98]"
              >
                Get in touch
              </ScrollLink>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-11 cursor-pointer items-center gap-1.5 px-3 text-[14px] font-medium text-muted transition-colors hover:text-display"
              >
                <span>GitHub</span>
                <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* ---- Portrait Showcase ---- */}
        <ScrollReveal direction="right" distance={30} delay={0.2}>
          <div className="mx-auto w-full max-w-[280px] lg:mx-0 lg:ml-auto">
            <div className="group relative">
              {/* Soft decorative glow */}
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-accent/20 via-transparent to-accent/10 opacity-40 blur-xl transition-opacity duration-500 group-hover:opacity-70"
              />

              <div className="relative overflow-hidden rounded-2xl border border-line bg-ink-700/60 p-2 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-line-strong">
                <div className="overflow-hidden rounded-xl">
                  <Media
                    asset={portrait}
                    alt={`${profile.fullName}, ${profile.role}`}
                    priority
                    sizes="280px"
                    imgClassName="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-[13px]">
              <div>
                <div className="font-semibold text-display">{profile.fullName}</div>
                <div className="text-[12px] text-muted">
                  {profile.role} · {profile.location}
                </div>
              </div>
              <span className="rounded-full border border-line bg-tint-2 px-2.5 py-0.5 font-mono text-[11px] text-accent">
                UTC+1
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>

    {/* ---- What I work with ---- */}
    <div className="border-t border-line-faint bg-ink-850/50 backdrop-blur-sm">
      <div className="shell flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-6">
        <span className="shrink-0 text-[12px] font-medium tracking-wide uppercase text-muted">
          What I work with
        </span>
        <div className="min-w-0 flex-1">
          <Marquee items={coreSkills} label="Tools and technologies" />
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
