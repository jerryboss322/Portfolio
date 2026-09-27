import React, { useState } from 'react';
import { profile } from '@/content/data';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const SUBMIT_URL = 'https://api.web3forms.com/submit';

const INPUT_CLASS =
  'w-full rounded-[12px] border border-line bg-ink-900/60 px-4 py-3 text-[14px] text-display placeholder:text-faint outline-none transition-colors focus:border-accent/60';
const LABEL_CLASS = 'text-[11px] tracking-[0.2em] text-body';

export const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;
    if (!accessKey) {
      setStatus('error');
      return;
    }

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
          access_key: accessKey,
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
          subject: 'New message from jboss.dev portfolio',
          replyto: formData.get('email'),
          botcheck: formData.get('botcheck') ?? '',
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
  };

  return (
    <form onSubmit={handleSubmit} noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={LABEL_CLASS}>
            NAME
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={`${INPUT_CLASS} mt-2`}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className={LABEL_CLASS}>
            EMAIL
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={`${INPUT_CLASS} mt-2`}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="cf-message" className={LABEL_CLASS}>
          MESSAGE
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about your project…"
          className={`${INPUT_CLASS} mt-2 resize-y`}
        />
      </div>

      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="mt-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="grid h-10 cursor-pointer place-items-center rounded-full bg-display px-6 text-[13px] font-medium text-onaccent transition-all duration-300 hover:-translate-y-[2px] hover:bg-bright hover:shadow-[0_10px_30px_color-mix(in_oklab,var(--accent)_35%,transparent)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:bg-display disabled:hover:shadow-none"
        >
          {status === 'submitting' ? 'Sending…' : 'Send Message'}
        </button>
        <span className="text-[12px] text-body">Replies go straight to my inbox</span>
      </div>

      <p role="status" aria-live="polite" className="mt-3 text-[13px]">
        {status === 'success' && (
          <span className="text-success">Message sent — I&apos;ll get back to you shortly.</span>
        )}
        {status === 'error' && (
          <span className="text-danger">
            Something went wrong. Please email me directly at{' '}
            <a
              href={`mailto:${profile.email}`}
              className="text-glow underline underline-offset-2 hover:text-accent"
            >
              {profile.email}
            </a>
            .
          </span>
        )}
      </p>
    </form>
  );
};

export default ContactForm;
