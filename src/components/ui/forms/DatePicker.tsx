// Date picker component
import { useState } from 'react';
import type { DatePickerProps } from '../../types/ui';

export function DatePicker({ label, value, onChange, placeholder = '', disabled, className = '' }: DatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className={`form-group ${className}`}>
      {label && <label style={{ display: 'block', marginBottom: '0.375rem', fontWeight: 500, color: 'var(--color-text)' }}>{label}</label>}
      <input
        type="text"
        className={`form-input form-datepicker ${disabled ? 'form-input-disabled' : ''}`}
        placeholder={value || placeholder}
        value={value}
        onClick={() => !disabled && setShowPicker(true)}
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
      {showPicker && !disabled && (
        <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {Array.from({ length: 12 }, (_, m) => {
            const month = m + 1;
            return (
              <button
                key={month}
                onClick={() => {
                  onChange(new Date().getFullYear().toString() + '-' + String(month).padStart(2, '0'));
                  setShowPicker(false);
                }}
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '6px',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                  cursor: 'pointer',
                  fontSize: '0.8125rem',
                  fontWeight: '500',
                }}
              >
                {month}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DatePicker;
