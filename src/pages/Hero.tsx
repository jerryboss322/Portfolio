import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Copy } from 'lucide-react';
import { coreSkills, heroStats, profile } from '@/content/data';
import { portrait } from '@/content/images';
import { Media } from '@/components/ui/Media';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { TiltCard } from '@/components/ui/TiltCard';
import { useReducedMotion } from '@/lib/hooks';

const SHIPPING_LANES = [
  { code: '01', label: 'Full-Stack Web Apps', spec: 'Next.js · Node · PostgreSQL' },
  { code: '02', label: 'Commerce & Payment Flows', spec: 'Stripe · Paystack · Prisma' },
  { code: '03', label: 'High-Craft Marketing & 3D', spec: 'React · Three.js · Motion' },
];

const EXTRA_METRICS = [
  { value: '4+ yrs', label: 'Building for the web' },
  { value: '< 24h', label: 'Enquiry response window' },
];

export const Hero: React.FC = () => {
  const reduced = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [watTime, setWatTime] = useState<string>('WAT · UTC+1');

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Africa/Lagos',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date());
        setWatTime(`${formatted} WAT`);
      } catch {
        setWatTime('WAT · UTC+1');
      }
    };
    updateClock();
    const timer = window.setInterval(updateClock, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const copyEmail = () => {
    navigator.clipboard?.writeText(profile.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const allStats = [...heroStats, ...EXTRA_METRICS];

  return (
    <section
      id="top"
      className="relative flex items-center py-8 sm:py-14 lg:py-20"
    >
      <div className="shell relative z-10 w-full">
        {/* Exposed Architectural Grid Container */}
        <div className="arch-frame arch-corner-tl arch-corner-br rounded-2xl overflow-hidden surface-inset">
          {/* Top Telemetry Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-faint bg-ink-900/55 px-4 py-2.5 sm:px-6 font-mono text-[11px] tracking-[0.12em] uppercase text-muted">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5 items-center justify-center" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50 opacity-75 duration-1000" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
              </span>
              <span className="text-bright font-semibold">STATUS // {profile.status}</span>
            </div>
            <div className="flex items-center gap-4 tabular-nums">
              <span className="hidden sm:inline">{profile.location}</span>
              <span className="text-line-strong" aria-hidden="true">/</span>
              <span className="text-display">{watTime}</span>
            </div>
          </div>

          {/* Main 12-Col Split Ledger */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Editorial Statement (7 cols) */}
            <motion.div
              className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-10 lg:p-12"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <div className="mb-5 inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                  <span>INDEX 00</span>
                  <span className="text-line-strong" aria-hidden="true">—</span>
                  <span>{profile.fullName} · {profile.role}</span>
                </div>

                <h1 className="font-display text-[clamp(2.2rem,5.2vw,4.1rem)] font-bold leading-[1.04] tracking-[-0.035em] text-display mb-6">
                  I build websites that work, scale, and last.
                </h1>

                <p className="text-[15px] sm:text-[17px] leading-[1.75] text-body max-w-xl mb-6">
                  For founders, small businesses, and teams launching a new product or replacing a
                  site they have outgrown — from database schema and API architecture to the final
                  responsive interface.
                </p>

                {/* Core Skill Tags */}
                <div className="mb-8 flex flex-wrap gap-2">
                  {coreSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-line-faint bg-ink-900/55 px-2.5 py-1 font-mono text-[11px] text-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tactile Actions */}
              <div className="pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to="/work"
                    className="group inline-flex h-11 sm:h-12 items-center justify-center gap-2.5 rounded-full bg-accent px-6 sm:px-7 text-[14px] font-semibold text-ink-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-bright active:scale-[0.99]"
                  >
                    <span>Explore My Work</span>
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </Link>

                  <Link
                    to="/contact"
                    className="group inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-full border border-line-strong bg-ink-800/80 px-6 sm:px-7 text-[14px] font-semibold text-display transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-ink-750 active:scale-[0.99]"
                  >
                    <span>Let&apos;s talk</span>
                  </Link>

                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex h-11 sm:h-12 items-center gap-2 rounded-full border border-line-faint bg-ink-900/60 px-4 font-mono text-[12px] text-muted transition-colors hover:border-line-strong hover:text-display"
                    title={`Copy ${profile.email}`}
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-accent" aria-hidden="true" />
                        <span className="text-accent">Copied email</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} aria-hidden="true" />
                        <span>Copy email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Technical Dossier Frame (5 cols) */}
            <motion.div
              className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-line-faint bg-ink-900/30 p-6 sm:p-8 lg:p-10"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Framed Portrait with Bevel Plate */}
              <div className="mx-auto w-full max-w-[290px] sm:max-w-[310px]">
                <TiltCard maxTilt={5} className="rounded-[18px]">
                  <div className="rounded-[18px] bg-frame-plate p-[3px] surface-inset">
                    <div className="rounded-[15px] bg-frame-well p-[3px]">
                      <div className="relative overflow-hidden rounded-[12px] bg-ink-800">
                        <Media
                          asset={portrait}
                          alt={`${profile.fullName} — ${profile.role}`}
                          priority
                          sizes="(max-width: 768px) 290px, 310px"
                          imgClassName="object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                </TiltCard>
                <div className="mt-2.5 flex items-center justify-between px-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  <span>FIG. 01 // {profile.fullName}</span>
                  <span>{profile.brand}</span>
                </div>
              </div>

              {/* 3-Row Shipping Lanes Readout */}
              <div className="mt-6 border-t border-line-faint pt-5">
                <div className="mb-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                  CORE SHIPPING LANES
                </div>
                <div className="divide-y divide-line-faint border border-line-faint rounded-xl bg-ink-900/50 overflow-hidden">
                  {SHIPPING_LANES.map((lane) => (
                    <div
                      key={lane.code}
                      className="flex items-center justify-between gap-2 px-3.5 py-2.5 text-[12px]"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="font-mono text-[11px] text-accent">{lane.code}</span>
                        <span className="font-medium text-display truncate">{lane.label}</span>
                      </div>
                      <span className="shrink-0 font-mono text-[11px] text-muted">
                        {lane.spec}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom 4-Cell Architectural Telemetry Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-line-faint border-t border-line-faint bg-ink-900/45">
            {allStats.map((stat, idx) => (
              <div key={stat.label} className="p-5 sm:p-6">
                <div className="flex items-baseline justify-between mb-1">
                  <AnimatedCounter
                    value={stat.value}
                    className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-display tabular-nums"
                  />
                  <span className="font-mono text-[10px] text-muted">0{idx + 1}</span>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
