import { useState } from 'react';
import type { ReactNode } from 'react';

interface DesignToken {
  name: string;
  value: string;
  category: string;
}

const colorTokens: DesignToken[] = [
  { name: '--color-primary', value: '#2563EB', category: 'Primary' },
  { name: '--color-secondary', value: '#10B981', category: 'Secondary' },
  { name: '--color-success', value: '#15803d', category: 'Success' },
  { name: '--color-warning', value: '#b45309', category: 'Warning' },
  { name: '--color-error', value: '#b91c1c', category: 'Error' },
  { name: '--color-text', value: '#F8FAFC', category: 'Text' },
  { name: '--color-surface', value: '#1E293B', category: 'Surface' },
  { name: '--color-background', value: '#0F172A', category: 'Background' },
  { name: '--color-border', value: '#334155', category: 'Border' },
];

const typographyTokens = [
  { name: 'font-size-base', value: '1rem', category: 'Typography' },
  { name: 'font-size-lg', value: '1.125rem', category: 'Typography' },
  { name: 'font-size-xl', value: '1.25rem', category: 'Typography' },
  { name: 'font-size-2xl', value: '1.5rem', category: 'Typography' },
  { name: 'line-height-tight', value: '1.25', category: 'Typography' },
  { name: 'line-height-normal', value: '1.5', category: 'Typography' },
];

const spacingTokens = [
  { name: '--space-2', value: '0.5rem', category: 'Spacing' },
  { name: '--space-4', value: '1rem', category: 'Spacing' },
  { name: '--space-6', value: '1.5rem', category: 'Spacing' },
  { name: '--space-8', value: '2rem', category: 'Spacing' },
  { name: '--space-12', value: '3rem', category: 'Spacing' },
];

const sections = [
  { id: 'colors', title: 'Colors', tokens: colorTokens },
  { id: 'typography', title: 'Typography', tokens: typographyTokens },
  { id: 'spacing', title: 'Spacing', tokens: spacingTokens },
];

const examples = [
  { name: 'Primary Button', description: 'A standard primary button', code: '<Button variant="primary">Click</Button>' },
  { name: 'Secondary Button', description: 'A subtle secondary button', code: '<Button variant="secondary">Secondary</Button>' },
  { name: 'Ghost Button', description: 'An outline button', code: '<Button variant="ghost">Ghost</Button>' },
  { name: 'Badge', description: 'Status badge component', code: '<Badge>New</Badge>' },
];

export function DesignSystem() {
  const [active, setActive] = useState('colors');

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
        Design System
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        A comprehensive design system with tokens, components, and interactive playground.
      </p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActive(section.id)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: active === section.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
              background: active === section.id ? 'var(--color-primary)' : 'var(--color-surface)',
              color: active === section.id ? 'var(--color-on-primary)' : 'var(--color-text)',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {section.title}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {sections.find(s => s.id === active)?.tokens.map((token) => (
          <div key={token.name} style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '10px', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <h4 style={{ margin: 0, fontWeight: 600, color: 'var(--color-text)' }}>{token.name}</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 500 }}>{token.category}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '8px', background: token.value, border: '1px solid var(--color-border)', flexShrink: 0 }} />
              <code style={{ fontSize: '0.9375rem', color: 'var(--color-primary)', fontFamily: 'monospace', background: 'var(--color-background)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                {token.value}
              </code>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2.5rem', background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
        <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontWeight: 600, color: 'var(--color-text)' }}>Component Playground</h2>
          <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>Interactive examples</span>
        </div>
        <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {examples.map((example) => (
            <div key={example.name} style={{ background: 'var(--color-background)', borderRadius: '8px', padding: '1rem' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontWeight: 600, color: 'var(--color-text)' }}>{example.name}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0, marginBottom: '1rem' }}>{example.description}</p>
              <pre style={{ backgroundColor: 'var(--color-surface)', borderRadius: '6px', padding: '0.75rem', fontSize: '0.8125rem', color: 'var(--color-text-secondary)', fontFamily: 'monospace' }}>
{example.code}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DesignSystem;
