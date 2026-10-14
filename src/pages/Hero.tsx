import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Media } from '@/components/ui/Media';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Marquee } from '@/components/ui/Marquee';
import { portrait } from '@/content/images';
import { profile, architecturePatterns, heroStats, coreSkills } from '@/content/data';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative overflow-hidden bg-ink-900">
      <div className="shell relative pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-20 sm:pb-24 md:pb-28 lg:pb-32">
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          {/* Left: Text */}
          <div className="max-w-4xl">
            {/* Headline */}
            <ScrollReveal direction="up" distance={24} delay={0.05}>
              <h1 className="font-display text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em] text-display">
                I build websites that work.
              </h1>
            </ScrollReveal>

            {/* Subtext — one line, then let the numbers and chips do the talking. */}
            <ScrollReveal direction="up" distance={20} delay={0.1}>
              <p className="mt-6 sm:mt-8 max-w-xl text-[16px] sm:text-[18px] leading-[1.75] text-bright">
                You bring the idea. I handle design, code, backend, and launch.{' '}
                No handoffs, no half-done work — just a live site ready for users.
              </p>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal direction="up" distance={20} delay={0.15}>
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to="/work"
                  className="group relative inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-white/5 bg-gradient-to-b from-white/[0.08] to-white/[0.02] px-7 text-[14px] sm:text-[15px] font-medium text-white shadow-[0_4px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm transition-all duration-300 hover:translate-y-[-2px] hover:border-white/20 hover:shadow-[0_8px_40px_rgba(56,189,248,0.25)] active:translate-y-0"
                >
                  <span className="relative z-10">See my work</span>
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  <span className="absolute inset-0 rounded-xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(135deg, rgba(56,189,248,0.5) 0%, transparent 70%)' }} />
                </Link>
                <Link
                  to="/contact"
                  className="group relative inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] px-7 text-[14px] sm:text-[15px] font-medium text-body shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.05] hover:text-white active:scale-[0.98]"
                >
                  <span className="relative z-10">Let&apos;s talk</span>
                  <ArrowUpRight size={15} className="opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5" />
                  <span className="absolute inset-0 rounded-xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(225deg, rgba(255,255,255,0.1) 0%, transparent 70%)' }} />
                </Link>
              </div>
            </ScrollReveal>

            {/* Stats — the proof, stated as numbers rather than sentences. */}
            <ScrollReveal direction="up" distance={20} delay={0.2}>
              <dl className="mt-10 sm:mt-12 flex flex-wrap items-end gap-x-10 gap-y-6 border-t border-line-faint pt-8">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    {/* Term before description is required for a valid <dl>;
                        the legacy `order` utilities put the big number on top. */}
                    <dt className="order-first text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">
                      {stat.label}
                    </dt>
                    <dd className="order-last mt-2 font-display text-[28px] sm:text-[32px] font-bold leading-none tracking-[-0.02em] text-display">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </ScrollReveal>

            {/* Core skills — what he actually does, scannable at a glance. */}
            <ScrollReveal direction="up" distance={20} delay={0.25}>
              <ul className="mt-8 flex flex-wrap gap-2">
                {coreSkills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-line-faint bg-ink-800/60 px-3 py-1.5 text-[13px] font-medium text-body"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Right: Portrait */}
          <ScrollReveal direction="up" distance={24} delay={0.1}>
            <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[340px] lg:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line-faint bg-transparent shadow-2xl">
                <Media
                  asset={portrait}
                  alt={profile.fullName}
                  sizes="(max-width: 1024px) 340px, 480px"
                  imgClassName="object-cover object-top w-full h-full"
                />
              </div>
              <span className="absolute -bottom-2 -right-2 h-4 w-4 rounded-full border-2 border-ink-900 bg-success shadow-lg">
                <span className="absolute inset-0 animate-ping rounded-full bg-success opacity-75" />
              </span>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Architecture Patterns Marquee */}
      <div className="border-t border-line-faint bg-ink-850/70 backdrop-blur-md">
        <div className="shell flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:gap-8">
          <span className="shrink-0 text-[12px] font-bold uppercase tracking-[0.15em] text-muted">
            Architecture patterns I specialize in
          </span>
          <div className="min-w-0 flex-1">
            <Marquee items={architecturePatterns} label="Architecture patterns" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
