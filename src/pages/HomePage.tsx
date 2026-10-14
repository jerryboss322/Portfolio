import React from 'react';
import { Hero } from './Hero';
import { WorkSection } from './Work';
import { CapabilityTeaser } from './CapabilityTeaser';
import { FeaturedTestimonial } from './FeaturedTestimonial';
import { ProcessTeaser } from './ProcessTeaser';
import { CtaBand } from './CtaBand';
import { useDocumentTitle } from '@/lib/hooks';
import { profile } from '@/content/data';

/**
 * Home Page - Hero, a "what I do" strip, a work preview, a process teaser,
 * a featured quote, and a closing call to action.
 *
 * The homepage shows only the first few projects (non-clickable) and points
 * visitors to the full Work page. It deliberately does not list every project
 * or link into individual case studies. The extra sections give the page a
 * full arc — who, what, proof, how, and a next step — without turning it into
 * the whole site.
 */
export const HomePage: React.FC = () => {
  useDocumentTitle(`${profile.fullName} — Software Engineer | ${profile.location}`);

  return (
    <>
      <Hero />
      <CapabilityTeaser />
      <WorkSection id="work" preview previewLimit={3} />
      <ProcessTeaser />
      <FeaturedTestimonial />
      <CtaBand />
    </>
  );
};

export default HomePage;
