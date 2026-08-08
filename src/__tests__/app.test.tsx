import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '@/App';

const navigateTo = (hash: string) => {
  window.location.hash = hash;
  fireEvent.popState(window);
};

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    window.location.hash = '';
    delete document.documentElement.dataset.theme;
  });

  it('renders the hero and all home sections', async () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: /I build digital products/ })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Selected Work/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /What I Build/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Tech Stack/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Have a project in mind/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View My Work/ })).toBeInTheDocument();
  });

  it('renders a case study page for a project slug', async () => {
    render(<App />);
    navigateTo('#/projects/titan');

    // PageTransition keeps the home layout mounted during the exit animation —
    // wait for it to unmount so the project page is the only route in the DOM.
    await waitFor(() => {
      expect(
        screen.queryByRole('heading', { name: /I build digital products/ })
      ).not.toBeInTheDocument();
    });

    expect(
      screen.getByRole('heading', { name: 'Titan Commerce' })
    ).toBeInTheDocument();
    expect(screen.getByText('Challenge')).toBeInTheDocument();
    expect(screen.getByText('Process')).toBeInTheDocument();
    expect(screen.getByText('Solution')).toBeInTheDocument();
    expect(screen.getByText('+35%')).toBeInTheDocument();
  });

  it('renders a fallback message for unknown slugs', async () => {
    render(<App />);
    navigateTo('#/projects/does-not-exist');

    expect(await screen.findByText('Project not found')).toBeInTheDocument();
  });

  it('toggles the theme and persists it to localStorage', () => {
    render(<App />);

    const toggle = screen.getByRole('button', { name: 'Switch to light mode' });
    fireEvent.click(toggle);

    expect(document.documentElement.dataset.theme).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(
      screen.getByRole('button', { name: 'Switch to dark mode' })
    ).toBeInTheDocument();
  });
});
