import React from 'react';
import { ContactSection } from './Contact';
import { useDocumentTitle } from '@/lib/hooks';

/**
 * Contact Page - Get in touch
 */
export const ContactPage: React.FC = () => {
  useDocumentTitle('Contact — Jerry Adewole');

  return (
    <div className="pt-16">
      <ContactSection />
    </div>
  );
};

export default ContactPage;
