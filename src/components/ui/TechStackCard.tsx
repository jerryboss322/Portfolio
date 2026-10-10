import React, { useState } from 'react';
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
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left rounded-lg border border-line-faint bg-ink-800/60 p-3 transition-all duration-200 hover:border-indigo-500/30 hover:bg-ink-800"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="text-[13px] font-semibold text-display">{tech.name}</div>
            <div className="mt-1 text-[11px] text-muted">{tech.purpose}</div>
          </div>
          {showAlternatives && (
            <span className="text-[10px] text-accent transition-transform duration-200 group-hover:translate-y-0.5">
              {isExpanded ? '−' : '+'}
            </span>
          )}
        </div>
      </button>

      {/* Hover Tooltip */}
      {showWhy && (
        <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 hidden w-64 -translate-x-1/2 transform rounded-lg border border-line bg-ink-900 p-3 shadow-xl group-hover:block">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-indigo-300 mb-1">
            Why {tech.name}
          </div>
          <p className="text-[11px] leading-tight text-indigo-200/80">{tech.why}</p>
          {/* Arrow */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-ink-900"></div>
        </div>
      )}

      {/* Expanded Details */}
      {isExpanded && showAlternatives && (
        <div className="mt-2 rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="mb-2">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-indigo-300 mb-1">
              Why {tech.name}
            </div>
            <p className="text-[11px] leading-tight text-indigo-200/80">{tech.why}</p>
          </div>
          {tech.alternatives.length > 0 && (
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wide text-muted mb-1">
                Alternatives Considered
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tech.alternatives.map((alt) => (
                  <span
                    key={alt}
                    className="rounded-md bg-ink-900/60 px-2 py-0.5 text-[10px] font-medium text-muted"
                  >
                    {alt}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TechStackCard;