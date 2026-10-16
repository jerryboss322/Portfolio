import { describe, it, expect, beforeEach } from 'vitest';
import { screen, within, fireEvent, waitFor } from '@testing-library/react';
import { profile, projects } from '@/content/data';
import { renderAt } from './test-utils';

describe('Shell', () => {
  beforeEach(() => localStorage.clear());

  it('renders the brand and the four primary pages in the nav', () => {
    renderAt('/');
    const nav = screen.getByRole('navigation', { name: 'Primary' });

    expect(screen.getByRole('link', { name: /JBOSS.DEV/ })).toHaveAttribute('href', '/');
    expect(within(nav).getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(within(nav).getByRole('link', { name: 'Work' })).toHaveAttribute('href', '/work');
    expect(within(nav).getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
    expect(within(nav).getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
  });

  it('renders the ambient colour layer and scroll progress, hidden from assistive tech', () => {
    renderAt('/');
    const decorative = document.querySelectorAll('[aria-hidden="true"]');
    expect(decorative.length).toBeGreaterThanOrEqual(2);
  });

  it('renders the footer', () => {
    renderAt('/');
    const year = new Date().getFullYear();
    expect(
      screen.getByText(`© ${year} ${profile.name} — ${profile.location}`)
    ).toBeInTheDocument();
  });

  it('renders no canvas', () => {
    renderAt('/');
    expect(document.querySelector('canvas')).toBeNull();
  });
});

describe('Home page', () => {
  it('renders the hero, capability teaser, work preview, process teaser and closing CTA', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { level: 1, name: /I build websites that work/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /What I've shipped/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'What I do' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'How a project runs' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Got something to build?' })).toBeInTheDocument();
  });
});

describe('Work page', () => {
  it('renders every project and links each to its detail page', () => {
    renderAt('/work');
    expect(screen.getByRole('heading', { name: /What I've shipped/ })).toBeInTheDocument();

    for (const project of projects) {
      const links = screen.getAllByRole('link', { name: project.title });
      expect(links.length).toBeGreaterThanOrEqual(1);
      expect(links[0]).toHaveAttribute('href', `/work/${project.slug}`);
    }
  });

  it('filters projects by type', () => {
    renderAt('/work');
    const personal = projects.filter((p) => p.type === 'personal');
    const notPersonal = projects.filter((p) => p.type !== 'personal');
    expect(personal.length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole('button', { name: 'Personal' }));

    for (const project of personal) {
      expect(screen.getAllByRole('link', { name: project.title }).length).toBeGreaterThanOrEqual(1);
    }
    for (const project of notPersonal) {
      expect(screen.queryByRole('link', { name: project.title })).toBeNull();
    }
  });
});

describe('Project detail page — deep content', () => {
  it.each(projects.map((p) => [p.slug, p.title] as const))(
    'renders %s with deep dive and code samples',
    (slug, title) => {
      renderAt(`/work/${slug}`);
      expect(screen.getByRole('heading', { level: 1, name: new RegExp(title) })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Technical Deep Dive' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Code Samples' })).toBeInTheDocument();
    }
  );

  it('links to the previous and next project', () => {
    // jbet is the second project, so it has both neighbours.
    renderAt('/work/jbet');
    expect(screen.getByRole('link', { name: /Titan Commerce/ })).toHaveAttribute('href', '/work/titan');
    expect(screen.getByRole('link', { name: /Sally Green/ })).toHaveAttribute('href', '/work/sallygreen');
  });

  it('renders the build process and outcome', () => {
    renderAt('/work/titan');
    expect(screen.getByRole('heading', { name: 'How it was built' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'API Architecture' })).toBeInTheDocument();
  });
});

describe('Project detail page', () => {
  it.each(projects.map((p) => [p.slug, p.title] as const))(
    'renders %s',
    (slug, title) => {
      renderAt(`/work/${slug}`);
      expect(screen.getByRole('heading', { level: 1, name: new RegExp(title) })).toBeInTheDocument();
    }
  );

  it('shows a not-found state with a way back for an unknown slug', () => {
    renderAt('/work/does-not-exist');
    expect(screen.getByRole('heading', { name: 'Project Not Found' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to Work/ })).toHaveAttribute('href', '/work');
  });
});

describe('About page', () => {
  it('renders about, capabilities, principles, toolbox, process and testimonials', () => {
    renderAt('/about');
    expect(screen.getByRole('heading', { name: 'Technical journey' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Architecture capabilities' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'How I work' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'The toolbox' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Architecture process' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Kind words' })).toBeInTheDocument();
  });
});

describe('Contact page', () => {
  it('renders the pitch, availability, direct email link and the form', () => {
    renderAt('/contact');
    expect(screen.getByRole('heading', { name: "Let's talk architecture" })).toBeInTheDocument();
    expect(screen.getByText('Available for new work')).toBeInTheDocument();
    expect(
      screen.getAllByRole('link').some((l) => l.getAttribute('href') === `mailto:${profile.email}`)
    ).toBe(true);
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument();
  });

  it('renders the FAQ', () => {
    renderAt('/contact');
    expect(screen.getByRole('heading', { name: 'Before you write' })).toBeInTheDocument();
    expect(screen.getByText('How do you charge?')).toBeInTheDocument();
  });
});

describe('Routing', () => {
  it('redirects unknown URLs to home', () => {
    renderAt('/nope');
    expect(screen.getByRole('heading', { level: 1, name: /I build websites that work/ })).toBeInTheDocument();
  });

  it('sets a per-page document title and restores it', () => {
    const home = 'Jerry Adewole — Software Engineer | Ogbomoso, Nigeria';
    renderAt('/');
    expect(document.title).toBe(home);

    const { unmount } = renderAt('/work/titan');
    expect(document.title).toBe('Titan Commerce — Jerry Adewole');
    unmount();
    expect(document.title).toBe(home);
  });

  it('navigates between pages from the nav with a transition', async () => {
    renderAt('/');
    const nav = screen.getByRole('navigation', { name: 'Primary' });
    fireEvent.click(within(nav).getByRole('link', { name: 'Contact' }));

    await waitFor(
      () =>
        expect(screen.getByRole('heading', { name: "Let's talk architecture" })).toBeInTheDocument(),
      { timeout: 3000 }
    );
    expect(screen.queryByRole('heading', { level: 1, name: /I build websites that work/ })).toBeNull();
  });
});
