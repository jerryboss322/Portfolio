import React, { useState, useCallback } from 'react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;
const SUBMIT_URL = 'https://api.web3forms.com/submit';

export const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!ACCESS_KEY) {
      setStatus('error');
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus('submitting');

    try {
      const response = await fetch(SUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
          subject: 'New message from jboss.dev portfolio',
          replyto: formData.get('email'),
          botcheck: '',
        }),
      });

      const data = (await response.json()) as { success: boolean };
      if (!response.ok || !data.success) {
        throw new Error('Submission failed');
      }

      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="contact-form text-left" noValidate={false}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="cf-name" className="form-label">
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="form-label">
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="form-input"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="cf-message" className="form-label">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about your project…"
          className="form-input resize-y"
        />
      </div>

      {/* Honeypot spam protection — must stay empty */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <button type="submit" className="primary-button w-full sm:w-auto" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send Message'}
        </button>

        <span className="meta">Replies go straight to my inbox</span>
      </div>

      <p role="status" aria-live="polite" className="form-status">
        {status === 'success' && (
          <span className="form-status-success">
            Message sent — I&apos;ll get back to you shortly.
          </span>
        )}
        {status === 'error' && (
          <span className="form-status-error">
            Something went wrong. Please email me directly at{' '}
            <a href="mailto:hello@jboss.dev" className="link-underline text-accent">
              hello@jboss.dev
            </a>
            .
          </span>
        )}
      </p>
    </form>
  );
};

export default ContactForm;
