// Button component - versatile button with multiple variants and sizes
import type { ButtonProps } from '../../types/ui';

const SIZE_STYLES: Record<string, Record<string, string>> = {
  sm: { minHeight: '32px', padding: '0.375rem 0.75rem', fontSize: '0.875rem', borderRadius: '6px' },
  md: { minHeight: '40px', padding: '0.5rem 1rem', fontSize: '0.9375rem', borderRadius: '8px' },
  lg: { minHeight: '48px', padding: '0.625rem 1.25rem', fontSize: '1rem', borderRadius: '10px' },
};

const VARIANT_STYLES: Record<string, Record<string, string>> = {
  default: { background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)' },
  primary: { background: 'var(--color-primary)', color: 'var(--color-on-primary)', border: '1px solid var(--color-primary)' },
  secondary: { background: 'var(--color-secondary)', color: 'var(--color-on-secondary)', border: '1px solid var(--color-border)' },
  ghost: { background: 'transparent', color: 'var(--color-text)', border: '1px solid transparent' },
  danger: { background: 'var(--color-error)', color: 'var(--color-on-error)', border: '1px solid var(--color-error)' },
};

const APPEARANCE_STYLES: Record<string, Record<string, string>> = {
  solid: {},
  outline: {},
  ghost: {},
  link: { background: 'transparent', textDecoration: 'underline' },
};

export function Button({ className = '', size = 'md', variant = 'default', appearance = 'solid', disabled, children, onClick, type = 'button', ...props }: ButtonProps) {
  const sizeStyle = SIZE_STYLES[size] || SIZE_STYLES.md;
  const variantStyle = VARIANT_STYLES[variant] || VARIANT_STYLES.default;
  const appearanceStyle = APPEARANCE_STYLES[appearance] || {};

  return (
    <button
      type={type}
      className={className}
      style={{
        ...sizeStyle,
        ...variantStyle,
        ...appearanceStyle,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
