import React from 'react';
import type { CodeSample } from '@/content/data';

interface CodeBlockProps {
  sample: CodeSample;
  className?: string;
}

/**
 * A code snippet in a bordered plate.
 *
 * Deliberately plain — no syntax highlighting library, to match the "plain on
 * purpose" ethos and keep the bundle small. The language and title sit in a
 * header row so the block reads as a labelled excerpt rather than a wall of
 * monospace. The body scrolls horizontally on its own so a long line never
 * stretches the page.
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({ sample, className }) => (
  <figure
    className={[
      'overflow-hidden rounded-xl border border-line-faint bg-ink-850',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ')}
  >
    <figcaption className="flex items-center justify-between gap-3 border-b border-line-faint bg-ink-800/60 px-4 py-2.5">
      <span className="text-[13px] font-medium text-bright">{sample.title}</span>
      <span className="font-mono text-[11px] uppercase tracking-wider text-faint">
        {sample.language}
      </span>
    </figcaption>
    <pre className="overflow-x-auto px-4 py-4 text-[14px] leading-[1.7]">
      <code className="font-mono text-body">{sample.code}</code>
    </pre>
  </figure>
);

export default CodeBlock;
