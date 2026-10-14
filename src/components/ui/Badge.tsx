// Badge component - small badge/pill component
import type { BadgeProps } from '../../types/ui';

const STATUS_STYLES: Record<string, string> = {
  success: 'background: #dcfce7; color: #15803d; border: 1px solid #bbf7b0;',
  warning: 'background: #fff3cd; color: #b45309; border: 1px solid #fcd34d;',
  error: 'background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5;',
  info: 'background: #dbeafe; color: #1d4ed8; border: 1px solid #93c5fd;',
  pending: 'background: #f3f4f6; color: #4b5563; border: 1px solid #d1d5db;',
};

export function Badge({ className = '', variant = 'default', children }: BadgeProps) {
  const statusStyle = variant !== 'default' && STATUS_STYLES[variant]
    ? `background: ${STATUS_STYLES[variant].split(': ')[1].split(';')[0]}; color: ${STATUS_STYLES[variant].split(': ')[2].split(';')[0]}; border-color: ${STATUS_STYLES[variant].split('; ').find(s => s.includes('border'))};`
    : '';

  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        padding: '0.2rem 0.6rem',
        borderRadius: '9999px',
        background: 'var(--color-background)',
        color: 'var(--color-text)',
        font-size: '0.75rem',
        fontWeight: 500,
        border: '1px solid var(--color-border)',
        ...statusStyle,
      }}
    >
      {children}
    </span>
  );
}

export default Badge;
