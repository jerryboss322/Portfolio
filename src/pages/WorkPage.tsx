import React from 'react';
import { WorkSection } from './Work';
import { useDocumentTitle } from '@/lib/hooks';

/**
 * Work Page - Complete portfolio with all projects
 */
export const WorkPage: React.FC = () => {
  useDocumentTitle('Work — Jerry Adewole');

  return <WorkSection />;
};

export default WorkPage;
