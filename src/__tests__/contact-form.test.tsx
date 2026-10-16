import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactForm } from '@/components/ui/ContactForm';

const submitForm = (
  overrides: Partial<{
    name: string;
    email: string;
    message: string;
    projectType: string;
    budget: string;
    timeline: string;
  }> = {}
) => {
  const values = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    message: 'Hello there!',
    projectType: 'new-website',
    budget: '',
    timeline: '',
    ...overrides,
  };
  render(<ContactForm />);

  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: values.name } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: values.email } });
  fireEvent.change(screen.getByLabelText(/what do you need/i), {
    target: { value: values.projectType },
  });
  if (values.budget) {
    fireEvent.change(screen.getByLabelText(/budget range/i), { target: { value: values.budget } });
  }
  if (values.timeline) {
    fireEvent.change(screen.getByLabelText(/timeline/i), { target: { value: values.timeline } });
  }
  fireEvent.change(screen.getByLabelText(/message/i), { target: { value: values.message } });
  fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));
};

describe('ContactForm', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', 'test-key-123');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it('posts the message to Web3Forms and shows a success message', async () => {
    submitForm();

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent('Message sent');
    });

    const fetchMock = vi.mocked(fetch);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.web3forms.com/submit');
    expect(init?.method).toBe('POST');

    const payload = JSON.parse(String(init?.body));
    expect(payload.access_key).toBe('test-key-123');
    expect(payload.name).toBe('Jane Doe');
    expect(payload.email).toBe('jane@example.com');
    expect(payload.message).toBe('Hello there!');
    expect(payload.subject).toBe('New message from jboss.dev portfolio');
    expect(payload.replyto).toBe('jane@example.com');
    expect(payload.botcheck).toBe('');
  });

  it('sends the qualification fields, and omits the optional ones as empty strings', async () => {
    submitForm({ projectType: 'redesign', budget: '750k-2m', timeline: 'quarter' });

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent('Message sent');
    });

    const payload = JSON.parse(String(vi.mocked(fetch).mock.calls[0][1]?.body));
    expect(payload.project_type).toBe('redesign');
    expect(payload.budget).toBe('750k-2m');
    expect(payload.timeline).toBe('quarter');
  });

  it('treats budget and timeline as optional', async () => {
    submitForm();

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent('Message sent');
    });

    const payload = JSON.parse(String(vi.mocked(fetch).mock.calls[0][1]?.body));
    expect(payload.budget).toBe('');
    expect(payload.timeline).toBe('');
  });

  it('shows an error and re-enables the button when the request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));

    submitForm();

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent('Something went wrong');
    });

    expect(screen.getByRole('button', { name: 'Send Message' })).toBeEnabled();
  });

  it('does not submit an empty form (native validation)', () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(fetch).not.toHaveBeenCalled();
  });
});
