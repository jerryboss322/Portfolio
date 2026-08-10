import React, { useLayoutEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SmoothScroller } from './components/layout/SmoothScroller';
import { PageTransition } from './components/layout/PageTransition';
import { Hero } from './pages/Hero';
import { WorkSection } from './pages/Work';
import { AboutSection } from './pages/About';
import { WhatIBuildSection } from './pages/WhatIBuild';
import { SkillsSection } from './pages/Skills';
import { CTASection } from './pages/CTA';
import { FAQSection } from './components/sections/FAQ';
import { ContactSection } from './pages/Contact';
import { ProjectPage } from './pages/Project';
import { scrollToSection, scrollToTop, isSectionId } from './lib/scroll';

export const App: React.FC = () => {
  return (
    <HashRouter>
      <SmoothScroller>
        <div className="relative z-10 min-h-screen bg-bg text-text overflow-x-hidden">
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Header />

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
      <WhatIBuildSection />
      <AboutSection />
      <SkillsSection />
      <CTASection />
      <FAQSection />
      <ContactSection />
    </>
  );
};

export default App;
