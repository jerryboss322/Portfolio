import React, { useState } from 'react';
import { budgetBands, profile, projectTypes, timelines } from '@/content/data';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const SUBMIT_URL = 'https://api.web3forms.com/submit';

const INPUT_CLASS =
  'w-full rounded-xl border border-line-strong bg-ink-700 px-4 py-3 text-[14px] text-bright placeholder:text-muted outline-none transition-all duration-200 focus:border-accent focus:bg-ink-600 focus:ring-2 focus:ring-accent/20 hover:border-line-strong hover:bg-ink-600';
const LABEL_CLASS = 'text-[12px] font-semibold uppercase tracking-[0.16em] text-bright';

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
          project_type: formData.get('project_type') ?? '',
          budget: formData.get('budget') ?? '',
          timeline: formData.get('timeline') ?? '',
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

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="cf-project-type" className={LABEL_CLASS}>
            What do you need?
          </label>
          <select
            id="cf-project-type"
            name="project_type"
            required
            defaultValue=""
            className={`${INPUT_CLASS} mt-2`}
          >
            <option value="" disabled>
              Choose one
            </option>
            {projectTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cf-budget" className={LABEL_CLASS}>
            Budget range
          </label>
          <select id="cf-budget" name="budget" defaultValue="" className={`${INPUT_CLASS} mt-2`}>
            <option value="">Optional</option>
            {budgetBands.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cf-timeline" className={LABEL_CLASS}>
            Timeline
          </label>
          <select id="cf-timeline" name="timeline" defaultValue="" className={`${INPUT_CLASS} mt-2`}>
            <option value="">Optional</option>
            {timelines.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
          placeholder="What are you building, and where is it stuck?"
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
          className="grid h-11 cursor-pointer place-items-center rounded-full bg-accent px-7 text-[14px] font-semibold text-onaccent transition-all duration-200 hover:scale-[1.03] hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 disabled:hover:brightness-100"
        >
          {status === 'submitting' ? 'Sending…' : 'Send Message'}
        </button>
        <span className="text-[13px] text-muted">Replies go straight to my inbox</span>
      </div>

      <p role="status" aria-live="polite" className="mt-3 text-[14px]">
        {status === 'success' && (
          <span className="text-success">Message sent — I&apos;ll get back to you shortly.</span>
        )}
        {status === 'error' && (
          <span className="text-danger">
            Something went wrong. Please email me directly at{' '}
            <a
              href={`mailto:${profile.email}`}
              className="text-accent underline underline-offset-2"
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
