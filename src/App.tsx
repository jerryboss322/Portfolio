import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SmoothScroller } from './components/layout/SmoothScroller';
import { PageTransition } from './components/layout/PageTransition';
import { Hero } from './pages/Hero';
import { AboutSection } from './pages/About';
import { ProjectsSection } from './pages/About';
import { SystemsSection } from './pages/Systems';
import { TestimonialsSection } from './pages/Testimonials';
import { SkillsSection } from './pages/Skills';
import { ContactSection } from './pages/About';
import { ProjectPage } from './pages/Project';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <HashRouter>
      <SmoothScroller>
        <div className="app min-h-screen bg-bg text-text overflow-hidden">
          <Header theme={theme} toggleTheme={toggleTheme} />

          <PageTransition>
            <Routes>
              <Route path="/" element={<Layout />} />
              <Route path="/projects/:slug" element={<ProjectPage />} />
            </Routes>
          </PageTransition>

          <Footer />
        </div>
      </SmoothScroller>
    </HashRouter>
  );
};

const Layout: React.FC = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <SystemsSection />
      <TestimonialsSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
};

export default App;
