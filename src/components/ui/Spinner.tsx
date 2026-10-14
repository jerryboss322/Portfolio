// Spinner component - loading spinner with multiple sizes
import type { SpinnerProps } from '../../types/ui';

const SIZE_STYLES: Record<string, string> = {
  sm: 'width: 16px; height: 16px; border-width: 2px;',
  md: 'width: 24px; height: 24px; border-width: 3px;',
  lg: 'width: 36px; height: 36px; border-width: 4px;',
};

export function Spinner({ size = 'md', className = '', label = 'Loading...' }: SpinnerProps) {
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      <div
        className="spinner"
        style={{
          ...SIZE_STYLES[size],
          borderColor: 'var(--color-primary)',
          borderTopColor: 'transparent',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      {label && <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{label}</span>}
    </div>
  );
}

export default Spinner;
