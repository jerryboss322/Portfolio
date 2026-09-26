import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '@/App';
import { profile, projects } from '@/content/data';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the hero and all home sections', async () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: /Engineering\s+detail\s+into\s+digital\s+systems/ })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /SYSTEMS I SHIPPED/ })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /I BUILD THE WHOLE THING/ })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /How I think/ })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /jerryadewole2023@gmail.com/i })
    ).toBeInTheDocument();
  });

  it('renders the brand and navigation', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: /JBOSS.DEV/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Stack' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Process' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Work' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Systems' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
  });

  it('renders project rows with live site and source links', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Titan Commerce' })).toBeInTheDocument();

    const demoLinks = screen.getAllByRole('link', { name: 'Live site' });
    const githubLinks = screen.getAllByRole('link', { name: 'Source' });
    expect(demoLinks).toHaveLength(projects.length);
    expect(githubLinks).toHaveLength(projects.length);

    const demoSorted = demoLinks.map((link) => link.getAttribute('href')).sort();
    const githubSorted = githubLinks.map((link) => link.getAttribute('href')).sort();
    expect(demoSorted).toEqual(
      projects.map((p) => p.liveUrl).sort()
    );
    expect(githubSorted).toEqual(
      projects.map((p) => p.githubUrl).sort()
    );
  });

  it('renders the footer', () => {
    render(<App />);

    const year = new Date().getFullYear();
    expect(
      screen.getByText(`© ${year} ${profile.name} — ${profile.location}`)
    ).toBeInTheDocument();
  });
});
