// Navbar component - site navigation header
import type { NavbarProps } from '../../../types/ui';
import { Link } from 'react-router-dom';

export function Navbar({ brand, links, className = '' }: NavbarProps) {
  return (
    <nav className={`navbar ${className}`} style={{
      background: 'var(--color-surface)',
      borderBottom: '1px solid var(--color-border)',
      padding: '0.75rem 1.5rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/" style={{ fontWeight: 700, color: 'var(--color-text)', textDecoration: 'none', fontSize: '1.125rem' }}>
          {brand}
        </Link>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              style={{
                padding: '0.4rem 0.75rem',
                borderRadius: '6px',
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.875rem',
                transition: 'color 0.2s, background 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-primary)';
                e.currentTarget.style.backgroundColor = 'var(--color-background)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-secondary)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
