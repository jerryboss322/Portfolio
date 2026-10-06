import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '@/App';
import { profile, projects, heroTitle } from '@/content/data';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the hero and all home sections', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: heroTitle })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Some things I.ve built/ })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'About me' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'What I do' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'How a project goes' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Kind words' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Get in touch' })).toBeInTheDocument();
  });

  it('renders the brand and navigation', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: /JBOSS.DEV/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Work' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'What I do' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Process' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
  });

  it('renders project rows with live site and source links', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Titan Commerce' })).toBeInTheDocument();

    const demoLinks = screen.getAllByRole('link', { name: /Live site/ });
    const githubLinks = screen.getAllByRole('link', { name: 'Source' });
    expect(demoLinks).toHaveLength(projects.length);
    expect(githubLinks).toHaveLength(projects.length);

    const demoSorted = demoLinks.map((link) => link.getAttribute('href')).sort();
    const githubSorted = githubLinks.map((link) => link.getAttribute('href')).sort();
    expect(demoSorted).toEqual(projects.map((p) => p.liveUrl).sort());
    expect(githubSorted).toEqual(projects.map((p) => p.githubUrl).sort());
  });

  it('keeps each project write-up in a closed disclosure that opens without JS state', () => {
    render(<App />);

    const disclosures = document.querySelectorAll('details');
    expect(disclosures).toHaveLength(projects.length);

    for (const project of projects) {
      const row = screen.getByRole('heading', { name: project.title }).closest('article');
      const detail = row?.querySelector('details');
      expect(detail, `${project.title} should have a details disclosure`).not.toBeNull();
      expect(detail?.open).toBe(false);

      // Every long-form field is reachable in the DOM, not fetched on click.
      expect(detail?.textContent).toContain(project.description);
      for (const step of project.process) {
        expect(detail?.textContent).toContain(step);
      }
      expect(detail?.textContent).toContain(project.outcome);
    }
  });

  it('renders the footer', () => {
    render(<App />);

    const year = new Date().getFullYear();
    expect(
      screen.getByText(`© ${year} ${profile.name} — ${profile.location}`)
    ).toBeInTheDocument();
  });
});
