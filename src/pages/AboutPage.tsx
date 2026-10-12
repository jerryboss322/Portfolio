import React from 'react';
import { AboutSection } from './About';
import { CapabilitiesSection } from './Capabilities';
import { ProcessSection } from './Process';
import { TestimonialsSection } from './Testimonials';

/**
 * About Page - About me, capabilities, process, testimonials
 */
export const AboutPage: React.FC = () => {
  return (
    <div className="pt-16">
      <AboutSection />
      <CapabilitiesSection />
      <ProcessSection />
      <TestimonialsSection />
    </div>
  );
};

export default AboutPage;
