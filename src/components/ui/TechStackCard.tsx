import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { type TechStackItem } from '@/content/data';

interface TechStackCardProps {
  tech: TechStackItem;
  showAlternatives?: boolean;
  showWhy?: boolean;
}

/**
 * Interactive tech stack card with hover tooltip and expandable details.
 *
 * Shows technology name, purpose, and reasoning.
 * Hover reveals "Why we chose this" tooltip.
 * Click expands to show alternatives considered.
 */
export const TechStackCard: React.FC<TechStackCardProps> = ({
  tech,
  showAlternatives = false,
  showWhy = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={showAlternatives ? isExpanded : undefined}
        className={`w-full rounded-xl border p-3.5 text-left transition-all duration-200 ${
          isExpanded
            ? 'border-accent/40 bg-ink-800'
            : 'border-line-faint bg-ink-800/60 hover:border-accent/30 hover:bg-ink-800'
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="text-[14px] font-semibold text-display">{tech.name}</div>
            <div className="mt-1 text-[12px] text-muted">{tech.purpose}</div>
          </div>
          {showAlternatives && (
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-tint-2 text-accent transition-colors group-hover:bg-accent/15"
            >
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              />
            </span>
          )}
        </div>
      </button>

      {/* Hover Tooltip (only when collapsed) */}
      {showWhy && !isExpanded && (
        <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 hidden w-64 -translate-x-1/2 transform rounded-xl border border-line bg-ink-900 p-3 group-hover:block">
          <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-accent">
            Why {tech.name}
          </div>
          <p className="text-[12px] leading-relaxed text-bright">{tech.why}</p>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-ink-900" />
        </div>
      )}

      {/* Expanded Details */}
      <AnimatePresence initial={false}>
        {isExpanded && showAlternatives && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-2 rounded-xl border border-accent/20 bg-accent/5 p-3.5">
              <div className="mb-2.5">
                <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-accent">
                  Why {tech.name}
                </div>
                <p className="text-[12px] leading-relaxed text-bright">{tech.why}</p>
              </div>
              {tech.alternatives.length > 0 && (
                <div>
                  <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted">
                    Alternatives Considered
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tech.alternatives.map((alt) => (
                      <span
                        key={alt}
                        className="rounded-md border border-line-faint bg-ink-900/70 px-2 py-0.5 text-[11px] font-medium text-muted"
                      >
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TechStackCard;