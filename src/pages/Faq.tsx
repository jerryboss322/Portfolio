import { useState } from 'react';

export function FaqPage() {
  const [open, setOpen] = useState<string | null>('1');

  const faqs = [
    { id: '1', q: 'What services do you offer?', a: 'We offer full-stack web development, design systems, performance optimization, and architecture consultation.' },
    { id: '2', q: 'How much does a typical project cost?', a: 'Project costs vary based on scope. We provide detailed quotes after an initial consultation.' },
    { id: '3', q: 'What is your typical timeline?', a: 'Timelines depend on the project scope. A simple website can take 2-4 weeks.' },
    { id: '4', q: 'Do you work with remote teams?', a: 'Yes! We have extensive experience working with distributed teams across time zones.' },
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
        Frequently Asked Questions
      </h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {faqs.map((faq) => (
          <div key={faq.id} style={{ border: '1px solid var(--color-border)', borderRadius: '10px', overflow: 'hidden' }}>
            <button style={{ width: '100%', padding: '1rem 1.25rem', background: 'var(--color-surface)', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1rem', fontWeight: 600, color: 'var(--color-text)' }} onClick={() => setOpen(open === faq.id ? null : faq.id)}>
              {faq.q}
              <span style={{ transition: 'transform 0.2s', transform: open === faq.id ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
            </button>
            <div style={{ padding: '1rem', background: 'var(--color-background)', maxHeight: open === faq.id ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.3s' }}>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FaqPage;
