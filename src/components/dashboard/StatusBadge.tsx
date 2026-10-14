// Dashboard status indicators and icons
import { useState, useEffect } from 'react';

export interface StatusBadgeProps {
  status: 'online' | 'offline' | 'away' | 'busy';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StatusBadge({ status, label, size = 'md', className = '' }: StatusBadgeProps) {
  const statusConfig = {
    online: { bg: '#dcfce7', color: '#15803d', dot: '#15803d' },
    offline: { bg: '#f3f4f6', color: '#4b5563', dot: '#9ca3af' },
    away: { bg: '#fef3c7', color: '#b45309', dot: '#f59e0b' },
    busy: { bg: '#fee2e2', color: '#b91c1c', dot: '#ef4444' },
  } as const;

  const config = statusConfig[status];
  const dotSize = size === 'sm' ? '6px' : size === 'lg' ? '12px' : '8px';

  return (
    <div className={`status-badge ${className}`} style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.25rem 0.625rem',
      borderRadius: '9999px',
      background: config.bg,
      border: '1px solid var(--color-border)',
    }}>
      <span style={{
        width: dotSize,
        height: dotSize,
        borderRadius: '50%',
        background: config.dot,
        animation: 'pulse 1.5s ease-in-out infinite',
      }} />
      {label && <span style={{ fontSize: '0.8125rem', color: config.color, fontWeight: 500 }}>{label}</span>}
    </div>
  );
}

export default StatusBadge;

// Animation helpers
export function useCountUp(target: number, duration = 1000) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    let frame: number;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}
