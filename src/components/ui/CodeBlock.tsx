import React, { useMemo, useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import type { CodeSample } from '@/content/data';

interface CodeBlockProps {
  sample: CodeSample;
  className?: string;
}

/**
 * An IDE-grade code excerpt in an architectural plate with tabular line numbers
 * and one-click copy.
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({ sample, className }) => {
  const [copied, setCopied] = useState(false);

  const lines = useMemo(() => sample.code.split('\n'), [sample.code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sample.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable in insecure context */
    }
  };

  return (
    <figure
      className={[
        'group surface-inset overflow-hidden rounded-xl border border-line-faint bg-ink-850 transition-colors duration-200 hover:border-line',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <figcaption className="flex items-center justify-between gap-3 border-b border-line-faint bg-ink-900/75 px-4 py-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <Terminal size={13} className="shrink-0 text-accent" aria-hidden="true" />
          <span className="truncate text-[13px] font-medium text-bright">{sample.title}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="rounded border border-line-faint bg-ink-850 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            {sample.language}
          </span>
          <span className="hidden sm:inline font-mono text-[10px] text-faint tabular-nums">
            {lines.length}L
          </span>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? 'Copied code' : `Copy ${sample.title} code`}
            className="inline-flex h-6 items-center gap-1.5 rounded-md border border-line-faint bg-ink-800/80 px-2.5 font-mono text-[11px] font-medium text-muted transition-colors hover:border-line-strong hover:text-display"
          >
            {copied ? (
              <>
                <Check size={12} className="text-accent" aria-hidden="true" />
                <span className="text-accent">Copied</span>
              </>
            ) : (
              <>
                <Copy size={12} aria-hidden="true" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </figcaption>
      <div className="relative flex overflow-x-auto py-4 text-[13px] leading-[1.75]">
        {/* Tabular line-number gutter (hidden from screen readers so code copy/tests stay clean) */}
        <div
          aria-hidden="true"
          className="select-none border-r border-line-faint/60 px-3.5 text-right font-mono text-[11px] leading-[1.9] text-faint tabular-nums"
        >
          {lines.map((_, idx) => (
            <div key={idx}>{String(idx + 1).padStart(2, '0')}</div>
          ))}
        </div>
        <pre className="flex-1 px-4 font-mono text-body">
          <code>{sample.code}</code>
        </pre>
      </div>
    </figure>
  );
};

export default CodeBlock;
