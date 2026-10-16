// Input form component
import type { InputProps } from '../../../types/ui';

export function Input({ label, type = 'text', placeholder = '', value, onChange, error, disabled, className = '', required }: InputProps) {
  return (
    <div className={`form-group ${className}`}>
      {label && <label style={{ display: 'block', marginBottom: '0.375rem', fontWeight: 500, color: 'var(--color-text)' }}>{label}{required && <span style={{ color: 'var(--color-error)', fontSize: '0.75rem' }}> *</span>}</label>}
      <input
        type={type}
        className={`form-input ${error ? 'form-input-error' : ''}`}
        placeholder={placeholder}
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
        }}
      />
      {error && <span style={{ fontSize: '0.75rem', color: 'var(--color-error)' }}>{error}</span>}
    </div>
  );
}

export default Input;
