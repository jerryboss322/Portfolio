// Checkbox component
import type { CheckboxProps } from '../../types/ui';

export function Checkbox({ label, checked, onChange, disabled, className = '' }: CheckboxProps) {
  return (
    <label className={`checkbox ${className}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: disabled ? 'not-allowed' : 'pointer' }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        style={{
          width: '18px',
          height: '18px',
          borderRadius: '4px',
          border: '2px solid var(--color-border)',
          accentColor: 'var(--color-primary)',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      />
      {label && <span style={{ fontSize: '0.875rem', color: 'var(--color-text)' }}>{label}</span>}
    </label>
  );
}

export default Checkbox;
