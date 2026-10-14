// Pricing page - three-tier pricing models
import { useState } from 'react';

const plans = [
  {
    name: 'Starter',
    price: '$19',
    period: 'month',
    description: 'Perfect for individuals getting started with web projects.',
    features: ['1 website', 'Basic analytics', 'Community support', '5 GB storage'],
    highlight: false,
  },
  {
    name: 'Professional',
    price: '$49',
    period: 'month',
    description: 'Ideal for growing teams and serious projects.',
    features: ['Unlimited websites', 'Advanced analytics', 'Priority support', '50 GB storage', 'Custom domains', 'SEO tools'],
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: 'month',
    description: 'Built for large organizations with advanced needs.',
    features: ['Everything in Professional', 'Dedicated account manager', 'Unlimited storage', 'SLA guarantee', 'Custom integrations', '24/7 phone support'],
    highlight: false,
  },
];

export function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
        Pricing Plans
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Choose the plan that fits your needs. All plans include a 14-day free trial.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {plans.map((plan) => (
          <div
            key={plan.name}
            onClick={() => setSelectedPlan(plan.name)}
            style={{
              border: selectedPlan === plan.name ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '1.5rem',
              background: selectedPlan === plan.name ? 'var(--color-primary)' : 'var(--color-surface)',
              color: selectedPlan === plan.name ? 'var(--color-on-primary)' : 'var(--color-text)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <h2 style={{ margin: '0 0 0.5rem 0', fontWeight: 600 }}>{plan.name}</h2>
            <p style={{ margin: '0 0 1rem 0', color: selectedPlan === plan.name ? 'var(--color-on-primary)' : 'var(--color-text-secondary)' }}>
              {plan.description}
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 700, color: selectedPlan === plan.name ? 'var(--color-on-primary)' : 'var(--color-text)' }}>
                {plan.price}
              </span>
              <span style={{ fontSize: '0.875rem', color: selectedPlan === plan.name ? 'var(--color-on-primary)' : 'var(--color-text-secondary)' }}>
                / {plan.period}
              </span>
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {plan.features.map((feature) => (
                <li key={feature} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <span style={{ display: 'inline-block', width: '18px', height: '18px', borderRadius: '50%', background: 'var(--color-primary)', color: 'var(--color-on-primary)', fontSize: '0.625rem', fontWeight: 700, textAlign: 'center', lineHeight: '18px', flexShrink: 0 }}>
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              style={{
                marginTop: '1rem',
                padding: '0.625rem 1.25rem',
                borderRadius: '8px',
                border: 'none',
                background: selectedPlan === plan.name ? 'var(--color-on-primary)' : 'var(--color-primary)',
                color: selectedPlan === plan.name ? 'var(--color-primary)' : 'var(--color-on-primary)',
                fontWeight: 600,
                cursor: 'pointer',
                width: '100%',
              }}
            >
              {selectedPlan === plan.name ? 'Selected' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PricingPage;
