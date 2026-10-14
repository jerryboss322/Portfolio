// About Extended Page
// Shows our mission, values, and company timeline.

const values = [
  { title: 'Innovation', description: 'We constantly push the boundaries of what is possible with web technology.' },
  { title: 'Excellence', description: 'We strive for the highest quality in everything we build.' },
  { title: 'Collaboration', description: 'Great things happen when diverse perspectives come together.' },
  { title: 'Integrity', description: 'We build trust through transparency and honest communication.' },
  { title: 'Inclusivity', description: 'We design for everyone, regardless of ability or background.' },
  { title: 'Continuous Learning', description: 'The web evolves rapidly, and we evolve with it.' },
];

const timeline = [
  { year: '2014', event: 'Founded our first studio in San Francisco' },
  { year: '2016', event: 'Launched portfolio for 10+ global brands' },
  { year: '2018', event: 'Expanded to remote-first team of 15' },
  { year: '2020', event: 'Completed 50+ successful projects' },
  { year: '2022', event: 'Reached 100+ projects across 20 industries' },
  { year: '2024', event: 'Updated to 200+ projects and new design systems' },
];

export function AboutExtendedPage() {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
        About Us
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        We are a team of engineers, designers, and strategists passionate about building exceptional digital products.
      </p>

      <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '2rem' }}>
        <h2 style={{ margin: '0 0 1rem 0', fontWeight: 700, color: 'var(--color-text)' }}>Our Mission</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
          To empower teams and organizations with world-class web technologies and design systems that scale with their ambitions.
        </p>
      </div>

      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        {values.map((v) => (
          <div key={v.title} style={{ padding: '1.25rem', border: '1px solid var(--color-border)', borderRadius: '10px', background: 'var(--color-background)' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontWeight: 600, color: 'var(--color-text)' }}>{v.title}</h3>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>{v.description}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
        <h2 style={{ margin: '0 0 1.5rem 0', fontWeight: 700, color: 'var(--color-text)' }}>Our Journey</h2>
        <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
          {timeline.map((t, i) => (
            <div key={t.year} style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ position: 'absolute', left: '-0.5rem', top: '0.5rem', bottom: '-0.5rem', width: '2px', background: 'var(--color-border)' }} />
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--color-primary)', color: 'var(--color-on-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.625rem', fontWeight: 700, flexShrink: 0 }}>
                {i + 1}
              </div>
              <div>
                <span style={{ fontWeight: 700, color: 'var(--color-text)', fontSize: '0.9375rem' }}>{t.year}</span>
                <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>{t.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutExtendedPage;
