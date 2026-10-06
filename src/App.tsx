import React from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './pages/Hero';
import { WorkSection } from './pages/Work';
import { AboutSection } from './pages/About';
import { CapabilitiesSection } from './pages/Capabilities';
import { ProcessSection } from './pages/Process';
import { TestimonialsSection } from './pages/Testimonials';
import { ContactSection } from './pages/Contact';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-ink-900 text-body">
      <a href="#main" className="sr-only">
        Skip to content
      </a>
      <Header />

      <main id="main">
        <Hero />
        <WorkSection />
        <AboutSection />
        <CapabilitiesSection />
        <ProcessSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default App;
