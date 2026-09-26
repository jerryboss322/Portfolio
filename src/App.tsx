import React from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SmoothScroller } from './components/layout/SmoothScroller';
import { Ambient } from './components/ui/Ambient';
import { Hero } from './pages/Hero';
import { WorkSection } from './pages/Work';
import { AboutSection } from './pages/About';
import { CapabilitiesSection } from './pages/Capabilities';
import { SystemsSection } from './pages/Systems';
import { ProcessSection } from './pages/Process';
import { TestimonialsSection } from './pages/Testimonials';
import { ContactSection } from './pages/Contact';

export const App: React.FC = () => {
  return (
    <SmoothScroller>
      <div className="relative min-h-screen bg-bg text-text">
        <a href="#main" className="sr-only">
          Skip to content
        </a>
        <Ambient />
        <Header />

        <main id="main">
          <Hero />
          <WorkSection />
          <AboutSection />
          <CapabilitiesSection />
          <SystemsSection />
          <ProcessSection />
          <TestimonialsSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </SmoothScroller>
  );
};

export default App;
