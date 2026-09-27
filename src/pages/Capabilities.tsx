import React from 'react';
import { motion } from 'framer-motion';
import {
  Accessibility,
  Cloud,
  Database,
  Gauge,
  Layers,
  PenTool,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { Text3D } from '@/components/ui/Text3D';
import { useReducedMotion } from '@/lib/hooks';
import { capabilities, type CapabilityIcon } from '@/content/data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ICONS: Record<CapabilityIcon, LucideIcon> = {
  layers: Layers,
  gauge: Gauge,
  database: Database,
  accessibility: Accessibility,
  cloud: Cloud,
  pen: PenTool,
};

/**
 * Isometric layer stack rendered in real 3D — the featured card's anchor visual.
 * Three planes separated on Z inside a rotated context, so it parallaxes
 * against the card as the pointer moves. Static under reduced motion.
 */
/**
 * Receding layer stack rendered in real 3D — the featured card's anchor visual.
 * Three planes separated along Z inside a slightly turned context, so the
 * parallax is genuine and the labels stay legible (a full isometric tilt would
 * shear the text). Static under reduced motion.
 */
const LayerStack: React.FC = () => {
  const reduced = useReducedMotion();

  const layers = [
    { label: 'Interface', sub: 'React · Next.js', tone: 'color-mix(in oklab, var(--glow) 34%, transparent)' },
    { label: 'API', sub: 'Node · Django · REST', tone: 'color-mix(in oklab, var(--accent) 30%, transparent)' },
    { label: 'Data', sub: 'PostgreSQL · Docker', tone: 'color-mix(in oklab, var(--accent-deep) 26%, transparent)' },
  ];

  return (
    <div className="relative mt-7 h-[230px] w-full [perspective:820px]" aria-hidden="true">
      <motion.div
        className="absolute inset-0 [transform-style:preserve-3d]"
        animate={reduced ? undefined : { rotateY: [-16, -10, -16] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transform: 'rotateY(-13deg) rotateX(5deg)' }}
      >
        {layers.map((layer, i) => (
          <div
            key={layer.label}
            className="absolute left-1/2 top-0 w-[244px] rounded-[12px] border bg-[linear-gradient(140deg,color-mix(in oklab, var(--accent) 24%, transparent),color-mix(in oklab, var(--glow) 6%, transparent))] px-4 py-3 shadow-elev-2 backdrop-blur-[3px]"
            style={{
              borderColor: layer.tone,
              /* Spread far enough on Y that every label clears the panel above
                 it, and recede on Z so the stack reads as genuinely layered. */
              transform: `translate(-50%, 0) translate3d(${i * 10}px, ${i * 50}px, ${-i * 30}px)`,
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-[12px] font-semibold tracking-[0.14em] text-display">
                {layer.label}
              </span>
              <span className="font-mono text-[9px] tracking-widest text-glow/80">
                0{i + 1}
              </span>
            </div>
            <div className="mt-1 text-[10px] tracking-wide text-bright">{layer.sub}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/**
 * Bento grid of capabilities.
 *
 * Laid out as a 3x3 desktop grid with the lead card spanning 2x2, so all six
 * cards tile exactly with no orphan gaps. Card hover is transform + border only.
 */
export const CapabilitiesSection: React.FC = () => {
  const reduced = useReducedMotion();

  return (
    <section
      id="capabilities"
      className="relative bg-ground px-6 py-20 md:py-28"
    >
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-[11px] tracking-[0.2em] text-body">
              CAPABILITIES — WHAT I BRING
            </div>
            <h2 className="font-display mt-4 text-[30px] font-semibold uppercase leading-[0.94] tracking-[-0.03em] md:text-[42px]">
              <Text3D depth={reduced ? 1 : 13} step={0.9} tilt={3}>
                From first commit
              </Text3D>
              <br />
              <Text3D
                depth={reduced ? 1 : 13}
                step={0.9}
                tilt={3}
                back="var(--accent-deep)"
                front="var(--text-body)"
              >
                to production traffic
              </Text3D>
            </h2>
          </div>
          <p className="max-w-[38ch] text-[13px] leading-[1.7] text-body">
            Six disciplines I practise together rather than hand off between.
            Most projects need all six at once.
          </p>
        </div>
      </Reveal>

      <div className="relative mx-auto mt-10 grid max-w-[1280px] gap-3 px-6 sm:grid-cols-2 md:px-10 lg:grid-cols-3">
        {capabilities.map((capability, index) => {
          const Icon = ICONS[capability.icon];
          const featured = capability.featured;

          return (
            <motion.article
              key={capability.id}
              initial={reduced ? false : { opacity: 0, y: 26, scale: 0.98 }}
              whileInView={reduced ? {} : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
              className={[
                'group relative overflow-hidden rounded-[18px] border border-line bg-ink-700/70 p-6',
                'transition-[transform,border-color,box-shadow] duration-500',
                'hover:-translate-y-1 hover:border-[color-mix(in oklab, var(--accent) 35%, transparent)]',
                'hover:shadow-elev-3',
                featured ? 'lg:col-span-2 lg:row-span-2 lg:p-8' : '',
              ].join(' ')}
            >
              {/* Feature card gets a lit backdrop; the rest stay flat. */}
              {featured && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_15%_0%,color-mix(in oklab, var(--accent) 20%, transparent),transparent_60%),radial-gradient(80%_70%_at_90%_100%,color-mix(in oklab, var(--glow) 12%, transparent),transparent_65%)]"
                />
              )}

              {/* Gradient hairline that brightens on hover. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-glow/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              <div className="relative flex h-full flex-col">
                <div
                  className={[
                    'grid h-11 w-11 place-items-center rounded-[13px] border border-line-strong',
                    'bg-[linear-gradient(140deg,color-mix(in oklab, var(--accent) 22%, transparent),color-mix(in oklab, var(--glow) 8%, transparent))]',
                    'text-glow transition-transform duration-500 group-hover:scale-110',
                  ].join(' ')}
                >
                  <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
                </div>

                <h3
                  className={[
                    'font-display font-semibold tracking-tight',
                    featured ? 'mt-6 text-[22px] leading-[1.05] md:text-[26px]' : 'mt-5 text-[16px]',
                  ].join(' ')}
                >
                  {capability.title}
                </h3>

                <p
                  className={[
                    'mt-2.5 leading-[1.65] text-body',
                    featured ? 'max-w-[46ch] text-[14px] md:text-[15px]' : 'text-[13px]',
                  ].join(' ')}
                >
                  {capability.description}
                </p>

                {featured && <LayerStack />}

                <ul
                  className={[
                    'mt-auto flex flex-wrap gap-1.5 pt-6',
                    featured ? 'pt-7' : '',
                  ].join(' ')}
                >
                  {capability.points.map((point) => (
                    <li
                      key={point}
                      className="rounded-full border border-line-strong bg-tint-1 px-2.5 py-1 text-[11px] tracking-wide text-bright"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};

export default CapabilitiesSection;
