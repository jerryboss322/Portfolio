import React from 'react';
import { ArrowUpRight, Clock, Globe, Mail, MessageSquare, Zap } from 'lucide-react';
import { ContactForm } from '@/components/ui/ContactForm';
import { Media } from '@/components/ui/Media';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Section, SectionHead } from '@/components/ui/Section';
import { portrait } from '@/content/images';
import { profile } from '@/content/data';

const FACTS = [
  { k: 'Where I am', v: profile.location, icon: Globe },
  { k: 'Timezone', v: 'WAT (UTC+1)', icon: Clock },
  { k: 'Reply time', v: 'Usually within a day', icon: Zap },
  { k: 'Available for', v: 'Architecture consultation & full-stack', icon: MessageSquare },
];

const LINKS = [
  { label: 'GitHub', href: profile.github },
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'WhatsApp', href: profile.whatsapp },
];

export const ContactSection: React.FC = () => (
  <Section id="contact" tone="band">
    <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 items-start">
      {/* ---- Pitch + form ---- */}
      <div>
        <SectionHead
          title="Let's talk architecture"
          lede="Tell me what you are building and where it is stuck. I'll reply with an honest read on the architecture, roughly what it costs, and whether I am the right person for it. If I am not, I'll say so."
        />

        <ScrollReveal direction="up" distance={20} delay={0.1}>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border-2 border-accent bg-accent/10 px-6 text-[14px] font-semibold text-accent shadow-lg shadow-accent/10 backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:border-accent hover:bg-accent hover:text-white hover:shadow-accent/25 active:scale-[0.98]"
            >
              <Mail size={15} />
              <span>{profile.email}</span>
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" distance={24} delay={0.2}>
          <div className="mt-9 rounded-2xl border border-line bg-ink-700/60 p-6 md:p-8 backdrop-blur-sm shadow-xl">
            <ContactForm />
          </div>
        </ScrollReveal>
      </div>

      {/* ---- Details ---- */}
      <ScrollReveal direction="up" distance={24} delay={0.15}>
        <div className="rounded-2xl border border-line bg-ink-700/50 p-6 md:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Media
                asset={portrait}
                alt=""
                sizes="60px"
                className="h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-line"
                imgClassName="object-cover object-top"
              />
              <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-ink-700 bg-success" />
            </div>
            <div className="min-w-0">
              <div className="text-[16px] font-semibold text-display">{profile.fullName}</div>
              <div className="text-[13px] text-muted">{profile.role} · {profile.location}</div>
            </div>
          </div>

          <dl className="mt-7 border-t border-line/60 pt-2">
            {FACTS.map((fact) => {
              const Icon = fact.icon;
              return (
                <div
                  key={fact.k}
                  className="flex items-center justify-between gap-4 border-b border-line-faint py-3.5 text-[13px]"
                >
                  <dt className="flex items-center gap-2 text-muted">
                    <Icon size={14} className="text-accent" aria-hidden="true" />
                    <span>{fact.k}</span>
                  </dt>
                  <dd className="text-right font-medium text-bright">{fact.v}</dd>
                </div>
              );
            })}
          </dl>

          <div className="mt-7 pt-2">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-3">
              Connect Directly
            </div>
            <ul className="flex flex-wrap gap-2.5">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border border-line bg-tint-1 px-4 text-[12px] font-medium text-body transition-all duration-200 hover:scale-[1.03] hover:border-line-strong hover:bg-tint-2 hover:text-display"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      size={12}
                      className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Architecture Consultation Details */}
          <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300 mb-2">
              Architecture consultation
            </div>
            <p className="text-[13px] text-emerald-200/80 leading-[1.6]">
              Need a technical audit or architecture review? I offer 30-minute consultations to help you
              identify architectural gaps, performance bottlenecks, and scalability concerns.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </Section>
);

export default ContactSection;