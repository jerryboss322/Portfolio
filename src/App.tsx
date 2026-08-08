import React, { useState, useEffect, useLayoutEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SmoothScroller } from './components/layout/SmoothScroller';
import { PageTransition } from './components/layout/PageTransition';
import { Hero } from './pages/Hero';
import { WorkSection } from './pages/Work';
import { AboutSection } from './pages/About';
import { CapabilitiesSection } from './pages/Capabilities';
import { StackSection } from './pages/Stack';
import { ContactSection } from './pages/Contact';
import { ProjectPage } from './pages/Project';
import { scrollToSection, scrollToTop, isSectionId } from './lib/scroll';

type Theme = 'dark' | 'light';

const getInitialTheme = (): Theme => {
  const current = document.documentElement.dataset.theme;
  return current === 'light' || current === 'dark' ? current : 'dark';
};

export const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute(
        'content',
        theme === 'dark' ? '#08090b' : '#f5f5f2'
      );
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <HashRouter>
      <SmoothScroller>
        <div className="app relative z-10 min-h-screen bg-bg text-text overflow-hidden">
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Header theme={theme} toggleTheme={toggleTheme} />

          <main id="main" className="flex-1">
            <PageTransition>
              <Routes>
                <Route path="/" element={<Layout />} />
                <Route path="/projects/:slug" element={<ProjectPage />} />
                <Route path="*" element={<Layout />} />
              </Routes>
            </PageTransition>
          </main>

          <Footer />
        </div>
      </SmoothScroller>
    </HashRouter>
  );
};

const Layout: React.FC = () => {
  const location = useLocation();

  // Scroll handling runs after the home layout commits to the DOM:
  // 1. A section target carried in router state (nav links clicked from a
  //    sub-route), 2. a section id in the URL hash (cold deep-links),
  // 3. otherwise reset to the top on route change.
  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const target = location.state?.scrollTo;

    const scrollToId = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (prefersReduced) {
        el.scrollIntoView({ block: 'start' });
      } else {
        scrollToSection(id, false);
      }
    };

    if (typeof target === 'string' && isSectionId(target)) {
      scrollToId(target);
      return;
    }

    const rawHash = window.location.hash;
    if (rawHash) {
      const candidate = rawHash.startsWith('#') ? rawHash.slice(1) : rawHash;
      if (isSectionId(candidate)) {
        scrollToId(candidate);
        return;
      }
    }

    scrollToTop(true);
  }, [location]);

  return (
    <>
      <Hero />
      <WorkSection />
      <AboutSection />
      <CapabilitiesSection />
      <StackSection />
      <ContactSection />
    </>
  );
};

export default App;
