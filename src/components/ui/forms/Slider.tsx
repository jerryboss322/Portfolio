// Slider component
import type { SliderProps } from '../../../types/ui';

export function Slider({ label, value, min = 0, max = 100, step = 1, onChange, className = '' }: SliderProps) {
  return (
    <div className={`slider-group ${className}`}>
      {label && <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--color-text)' }}>{label}</label>}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <input
          type="range"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(parseInt(e.target.value))}
          style={{
            flex: 1,
            padding: '0.25rem',
            accentColor: 'var(--color-primary)',
            cursor: 'pointer',
          }}
        />
        <span style={{ minWidth: '3rem', textAlign: 'right', fontWeight: 500, color: 'var(--color-text)' }}>
          {value}
        </span>
      </div>
    </div>
  );
}

export default Slider;
