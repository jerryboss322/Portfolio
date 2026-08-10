import React from 'react';

interface MarqueeProps {
  items: string[];
  speed?: number;
  separator?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({ items, speed = 30, separator = '•' }) => {
  const content = (
    <>
      {items.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-4 mx-4">
          <span className="font-mono text-sm font-medium text-muted uppercase tracking-wider">
            {item}
          </span>
          <span className="text-accent opacity-50" aria-hidden="true">{separator}</span>
        </span>
      ))}
    </>
  );

  return (
    <div className="marquee py-6" aria-hidden="true">
      <div className="marquee-track" style={{ animationDuration: `${speed}s` }}>
        {content}
        {content}
      </div>
    </div>
  );
};
