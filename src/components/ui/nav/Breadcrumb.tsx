// Breadcrumb navigation component
import type { BreadcrumbProps } from '../../types/ui';

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav className={`breadcrumb ${className}`} style={{
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap',
      fontSize: '0.8125rem',
      color: 'var(--color-text-secondary)',
      marginBottom: '1rem',
    }}>
      {items.map((item, idx) => (
        <span key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          {idx > 0 && (
            <span style={{ color: 'var(--color-text-secondary)' }}>/</span>
          )}
          {item.href ? (
            <a href={item.href} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
              {item.label}
            </a>
          ) : (
            <span style={{ color: 'var(--color-text)' }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumb;
