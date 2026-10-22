import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { PageTransition } from './components/layout/PageTransition';
import { AmbientBackground } from './components/layout/AmbientBackground';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { CommandPalette } from './components/ui/CommandPalette';
import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { ServicesPage } from './pages/Services';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

/** Resets scroll on navigation, or glides to a #hash target if there is one. */
const ScrollManager: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace(/^#/, '');
      const timer = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname, hash]);

  return null;
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  // Key on the top-level segment so moving between projects does not re-run the
  // whole-page transition, only moving between sections of the site does.
  const key = '/' + location.pathname.split('/')[1];

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={key}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/work" element={<PageTransition><WorkPage /></PageTransition>} />
        <Route path="/work/:slug" element={<PageTransition><ProjectDetailPage /></PageTransition>} />
        <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

/** The whole site minus the router, so tests can mount it at any URL. */
export const AppShell: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-ink-900 text-body">
      <a href="#main" className="sr-only">
        Skip to content
      </a>
      <ScrollManager />
      <ScrollProgress />
      <AmbientBackground />
      <Header />
      <CommandPalette />

      <main id="main" className="relative z-10">
        <AnimatedRoutes />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export const App: React.FC = () => (
  <BrowserRouter>
    <AppShell />
  </BrowserRouter>
);

export default App;
