import React from 'react';
import { AboutSection } from './About';
import { CapabilitiesSection } from './Capabilities';
import { Principles } from './Principles';
import { Toolbox } from './Toolbox';
import { ProcessSection } from './Process';
import { TestimonialsSection } from './Testimonials';
import { SectionNav, type NavItem } from '@/components/ui/SectionNav';
import { useDocumentTitle } from '@/lib/hooks';

const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'principles', label: 'How I work' },
  { id: 'toolbox', label: 'Toolbox' },
  { id: 'process', label: 'Process' },
  { id: 'testimonials', label: 'Testimonials' },
];

/**
 * About Page - About me, capabilities, principles, toolbox, process, testimonials
 *
 * A sticky sub-nav parks under the header so the long page stays navigable;
 * each Section keeps owning its own `.shell`, so nothing drifts out of
 * alignment with the rest of the site.
 */
export const AboutPage: React.FC = () => {
  useDocumentTitle('About — Jerry Adewole');

  return (
    <div className="pt-16">
      <SectionNav items={NAV_ITEMS} label="About page sections" />
      <AboutSection />
      <CapabilitiesSection />
      <Principles />
      <Toolbox />
      <ProcessSection />
      <TestimonialsSection />
    </div>
  );
};

export default AboutPage;
