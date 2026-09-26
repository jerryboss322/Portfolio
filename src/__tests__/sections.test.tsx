import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '@/App';
import { capabilities, process } from '@/content/data';

/** Flips the mocked matchMedia result for the duration of a test. */
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

describe('Capabilities section', () => {
  it('renders one card per capability', () => {
    render(<App />);
    const section = document.getElementById('capabilities');
    expect(section).not.toBeNull();

    for (const capability of capabilities) {
      expect(
        within(section as HTMLElement).getByRole('heading', { name: capability.title })
      ).toBeInTheDocument();
    }
  });

  it('exposes the capability detail points as text', () => {
    render(<App />);
    const section = document.getElementById('capabilities') as HTMLElement;
    const delivery = capabilities.find((c) => c.featured);

    for (const point of delivery?.points ?? []) {
      expect(within(section).getByText(point)).toBeInTheDocument();
    }
  });
});

describe('Process section', () => {
  it('renders every stage as a heading', () => {
    render(<App />);
    const section = document.getElementById('process') as HTMLElement;

    for (const step of process) {
      expect(within(section).getByRole('heading', { name: step.title })).toBeInTheDocument();
    }
  });
});

describe('Testimonials', () => {
  it('exposes each card as a toggle button', async () => {
    render(<App />);
    const buttons = screen.getAllByRole('button', { pressed: false });
    expect(buttons.length).toBeGreaterThan(0);

    const first = buttons[0];
    await userEvent.click(first);
    expect(first).toHaveAttribute('aria-pressed', 'true');
  });
});

describe('Reduced motion', () => {
  const original = window.matchMedia;

  beforeEach(() => setReducedMotion(true));
  afterEach(() => {
    Object.defineProperty(window, 'matchMedia', { writable: true, value: original });
    vi.restoreAllMocks();
  });

  it('still renders every section heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /How I work/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /What clients say/ })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /From first commit/ })
    ).toBeInTheDocument();
  });

  it('renders testimonials without toggle buttons so nothing depends on a flip', () => {
    render(<App />);
    const section = document.getElementById('testimonials') as HTMLElement;
    expect(within(section).queryAllByRole('button')).toHaveLength(0);
  });
});
