// Team page - displays team members with profiles
import { TEAM_MEMBERS } from '../data/team';
import { StatusBadge, useCountUp } from '../components/dashboard/StatusBadge';

export function TeamPage() {
  const totalMembers = TEAM_MEMBERS.length;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
        Our Team
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Meet the talented people building the future of web development. With over 50 years of combined experience,
        we bring together diverse perspectives and expertise to create exceptional products.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.5rem',
      }}>
        {TEAM_MEMBERS.map((member) => {
          const count = useCountUp(totalMembers, 1000);
          return (
            <div
              key={member.id}
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                padding: '1.5rem',
                transition: 'border-color 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--color-background)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {member.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, fontWeight: 600, color: 'var(--color-text)' }}>{member.name}</h3>
                  <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>{member.role}</p>
                </div>
                <StatusBadge status={member.status} size="sm" />
              </div>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>{member.bio}</p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {member.email && (
                  <a href={`mailto:${member.email}`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontSize: '0.875rem' }}>
                    {member.email}
                  </a>
                )}
                {member.GitHub && (
                  <a href={member.GitHub} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>
                    GitHub
                  </a>
                )}
                {member.LinkedIn && (
                  <a href={member.LinkedIn} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontSize: '0.875rem' }}>
                    LinkedIn
                  </a>
                )}
                {member.Twitter && (
                  <a href={member.Twitter} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-info)', textDecoration: 'none', fontSize: '0.875rem' }}>
                    Twitter
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: 'var(--color-surface)',
        borderRadius: '12px',
        border: '1px solid var(--color-border)',
        textAlign: 'center',
      }}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontWeight: 600, color: 'var(--color-text)' }}>
          Our Team
        </h3>
        <p style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--color-text)',
          margin: '0.5rem 0',
        }}>
          {totalMembers}
        </p>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
          Expert members across engineering, design, and product
        </p>
      </div>
    </div>
  );
}

export default TeamPage;
