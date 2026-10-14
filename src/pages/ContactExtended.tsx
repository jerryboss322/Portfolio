import { useState } from 'react';

export function ContactExtendedPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
        Contact Us
      </h1>

      {sent && (
        <div style={{ background: 'var(--color-success)', color: 'var(--color-on-success)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem' }}>
          Message sent successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" style={{ padding: '0.625rem', borderRadius: '6px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)' }} />
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" style={{ padding: '0.625rem', borderRadius: '6px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)' }} />
        </div>
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" rows={6} style={{ padding: '0.625rem', borderRadius: '6px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)', resize: 'vertical' }} />
        <button type="submit" style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', background: 'var(--color-primary)', color: 'var(--color-on-primary)', fontWeight: 600, cursor: 'pointer' }}>
          Send Message
        </button>
      </form>
    </div>
  );
}

export default ContactExtendedPage;
