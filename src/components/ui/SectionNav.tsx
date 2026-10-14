import React from 'react';
import { useActiveSection } from '@/lib/hooks';
import { scrollToSection } from '@/lib/scroll';

export interface NavItem {
  id: string;
  label: string;
}

interface SectionNavProps {
  items: NavItem[];
  label: string;
  className?: string;
}

/**
 * A sticky in-page sub-nav with scroll-spy highlighting.
 *
 * Horizontal by design so it never fights the `.shell` container each Section
 * already owns — a vertical sidebar would double the page's horizontal padding
 * and knock the About content out of alignment with the rest of the site. It
 * parks just under the header and highlights the section currently in the
 * reading zone, derived from scroll position rather than click state, so it
 * stays correct when the visitor uses the scrollbar or arrives via a deep link.
 */
export const SectionNav: React.FC<SectionNavProps> = ({ items, label, className }) => {
  const ids = items.map((item) => item.id);
  const active = useActiveSection(ids);

  return (
    <nav
      aria-label={label}
      className={['sticky top-16 z-30 border-b border-line-faint bg-ink-900/80 backdrop-blur-xl', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="shell flex items-center gap-1 overflow-x-auto py-2.5">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(item.id);
              }}
              aria-current={isActive ? 'location' : undefined}
              className={[
                'flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-[14px] font-medium transition-colors',
                isActive ? 'bg-accent/10 text-accent' : 'text-muted hover:bg-tint-2 hover:text-bright',
              ].join(' ')}
            >
              <span
                aria-hidden="true"
                className={[
                  'h-1.5 w-1.5 rounded-full transition-colors',
                  isActive ? 'bg-accent' : 'bg-line-strong',
                ].join(' ')}
              />
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default SectionNav;

