import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactForm } from '@/components/ui/ContactForm';

const submitForm = (overrides: Partial<{ name: string; email: string; message: string }> = {}) => {
  const values = { name: 'Jane Doe', email: 'jane@example.com', message: 'Hello there!', ...overrides };
  render(<ContactForm />);

  fireEvent.change(screen.getByLabelText('Name'), { target: { value: values.name } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: values.email } });
  fireEvent.change(screen.getByLabelText('Message'), { target: { value: values.message } });
  fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));
};

describe('ContactForm', () => {
  beforeEach(() => {
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
    expect(payload.access_key).toBe(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
    expect(payload.name).toBe('Jane Doe');
    expect(payload.email).toBe('jane@example.com');
    expect(payload.message).toBe('Hello there!');
    expect(payload.replyto).toBe('jane@example.com');
    expect(payload.botcheck).toBe('');
  });

  it('shows an error and re-enables the button when the request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));

    submitForm();

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent('Something went wrong');
    });

    expect(screen.getByRole('button', { name: 'Send Message' })).toBeEnabled();
  });

  it('rejects empty submissions via native validation', () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(fetch).not.toHaveBeenCalled();
  });
});
