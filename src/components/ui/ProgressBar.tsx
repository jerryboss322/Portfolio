// Progress bar component - animated progress indicator
import type { ProgressBarProps } from '../../types/ui';

export function ProgressBar({ value, max = 100, variant = 'default', size = 'md', className = '' }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const sizeStyle: Record<string, string> = size === 'sm' ? { height: '6px' } : size === 'lg' ? { height: '16px' } : { height: '8px' };
  const variantStyle: Record<string, string> = variant === 'primary'
    ? { background: 'var(--color-primary)' }
    : variant === 'success'
      ? { background: '#15803d' }
      : variant === 'warning'
        ? { background: '#b45309' }
        : variant === 'danger'
          ? { background: '#b91c1c' }
          : { background: 'var(--color-primary)' };

  return (
    <div className={className} style={{ width: '100%' }}>
      <div
        className="progress-bar-track"
        style={{
          ...sizeStyle,
          background: 'var(--color-background)',
          borderRadius: '9999px',
          overflow: 'hidden',
        }}
      >
        <div
          className="progress-bar-fill"
          style={{
            ...variantStyle,
            borderRadius: '9999px',
            transition: 'width 0.3s ease',
            width: `${percentage}%`,
          }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
      <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem', textAlign: 'right' }}>
        {value}/{max} ({percentage.toFixed(1)}%)
      </span>
    </div>
  );
}

export default ProgressBar;
