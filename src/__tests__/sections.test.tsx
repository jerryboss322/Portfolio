import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import App from '@/App';
import { capabilities, process, about, projects } from '@/content/data';

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
      expect(within(section as HTMLElement).getByText(capability.description)).toBeInTheDocument();
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
  it('shows the full quote and attribution with nothing hidden behind a click', () => {
    render(<App />);
    const section = document.getElementById('testimonials') as HTMLElement;

    for (const testimonial of about.testimonials) {
      expect(within(section).getByText(new RegExp(escapeRegExp(testimonial.quote.slice(0, 40)))))
        .toBeInTheDocument();
      expect(within(section).getByText(new RegExp(escapeRegExp(testimonial.role)))).toBeInTheDocument();
    }
  });
});

describe('No heavyweight rendering', () => {
  it('renders no canvas, and no animation libraries are driving the page', () => {
    render(<App />);

    /* The WebGL hero is gone for good: a canvas element should never come back. */
    expect(document.querySelector('canvas')).toBeNull();
  });
});

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

describe('Reduced motion', () => {
  const original = window.matchMedia;

  beforeEach(() => setReducedMotion(true));
  afterEach(() => {
    Object.defineProperty(window, 'matchMedia', { writable: true, value: original });
    vi.restoreAllMocks();
  });

  it('still renders every section heading', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'How a project goes' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Kind words' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'What I do' })).toBeInTheDocument();
  });

  it('still exposes every project write-up', () => {
    render(<App />);

    expect(document.querySelectorAll('details')).toHaveLength(projects.length);
  });
});
