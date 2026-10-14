// Dashboard real-time update component - simulates live data
import { useState, useEffect } from 'react';

interface RealTimeWidgetProps {
  title: string;
  value: string;
  unit: string;
  color: string;
  interval?: number;
  format?: (val: string) => string;
  className?: string;
}

export function RealTimeWidget({ title, value, unit, color, interval = 1000, format, className = '' }: RealTimeWidgetProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayValue((prev) => {
        const num = parseFloat(prev);
        if (isNaN(num)) return '1';
        const delta = (Math.random() - 0.5) * 0.08;
        const newVal = Math.max(0, num + delta);
        return format ? format(String(newVal)) : String(newVal);
      });
    }, interval);

    return () => clearInterval(timer);
  }, [interval, format]);

  return (
    <div className={`realtime-widget ${className}`} style={{
      background: 'var(--color-surface)',
      borderRadius: '12px',
      border: '1px solid var(--color-border)',
      padding: '1.25rem',
      minWidth: '200px',
      animation: 'pulse 2s ease-in-out infinite',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{title}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
        <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text)' }}>{displayValue}</span>
        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{unit}</span>
      </div>
      <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
        <span>▲ 1.2%</span>
        <span>Live</span>
      </div>
    </div>
  );
}

export default RealTimeWidget;
