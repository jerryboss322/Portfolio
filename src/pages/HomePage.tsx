import React from 'react';
import { Hero } from './Hero';
import { WorkSection } from './Work';

/**
 * Home Page - Hero section + featured work preview
 */
export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <WorkSection />
    </>
  );
};

export default HomePage;
