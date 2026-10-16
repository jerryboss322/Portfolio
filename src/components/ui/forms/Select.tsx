// Select form component
import type { SelectProps } from '../../../types/ui';

export function Select({ label, options, value, onChange, error, disabled, className = '', required }: SelectProps) {
  return (
    <div className={`form-group ${className}`}>
      {label && <label style={{ display: 'block', marginBottom: '0.375rem', fontWeight: 500, color: 'var(--color-text)' }}>{label}{required && <span style={{ color: 'var(--color-error)', fontSize: '0.75rem' }}> *</span>}</label>}
      <select
        className={`form-select ${error ? 'form-select-error' : ''}`}
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={{
          width: '100%',
          padding: '0.625rem 0.875rem',
          borderRadius: '8px',
          border: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
          color: 'var(--color-text)',
          fontSize: '0.875rem',
          fontFamily: 'inherit',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span style={{ fontSize: '0.75rem', color: 'var(--color-error)' }}>{error}</span>}
    </div>
  );
}

export default Select;
