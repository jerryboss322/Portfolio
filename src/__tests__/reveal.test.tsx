import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { Marquee } from '@/components/ui/Marquee';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const setReducedMotion = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: query.includes('prefers-reduced-motion') ? matches : false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
};

describe('Marquee', () => {
  const items = ['React', 'TypeScript', 'Node.js'];

  it('exposes every label exactly once to assistive tech, in order', () => {
    render(<Marquee items={items} label="Tools and technologies" />);

    const list = screen.getByRole('list', { name: 'Tools and technologies' });

    /* Queried from the text rather than by accessible name: `listitem` takes
       its name from content in the spec, but that is not what the role query
       computes here, and the assertion wanted is really about count and
       order anyway. */
    expect(within(list).getAllByRole('listitem').map((el) => el.textContent)).toEqual(items);
  });

  it('hides the duplicated track so labels are not announced twice', () => {
    const { container } = render(<Marquee items={items} label="Tools" />);

    /* The loop is built from two identical copies of the track. Only the second
       is hidden — the first must stay in the accessibility tree. */
    expect(screen.getAllByRole('listitem')).toHaveLength(items.length);
    expect(container.querySelectorAll('[aria-hidden="true"]')).not.toHaveLength(0);
  });

  it('renders the edge fades as decorative', () => {
    const { container } = render(<Marquee items={items} label="Tools" />);

    const fades = container.querySelectorAll('div[aria-hidden="true"].pointer-events-none');
    expect(fades).toHaveLength(2);
  });
});

describe('ScrollReveal', () => {
  const original = window.matchMedia;

  afterEach(() => {
    Object.defineProperty(window, 'matchMedia', { writable: true, value: original });
    vi.restoreAllMocks();
  });

  it('renders its children when motion is allowed', () => {
    setReducedMotion(false);
    render(
      <ScrollReveal>
        <p>Visible content</p>
      </ScrollReveal>
    );

    expect(screen.getByText('Visible content')).toBeInTheDocument();
  });

  it('still renders, with no transform applied, when motion is reduced', () => {
    setReducedMotion(true);
    const { container } = render(
      <ScrollReveal direction="left" distance={40}>
        <p>Visible content</p>
      </ScrollReveal>
    );

    const wrapper = container.firstElementChild as HTMLElement;
    expect(screen.getByText('Visible content')).toBeInTheDocument();

    /* Reduced motion means no offset is ever applied, not an offset that
       animates to zero — so there must be no transform on the element at all. */
    expect(wrapper.style.transform).toBe('');
    expect(wrapper.style.opacity).toBe('');
  });
});
