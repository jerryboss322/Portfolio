// Toast notification component - dismissible notifications
import type { ToastProps } from '../../types/ui';

const TYPE_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  success: { bg: '#dcfce7', color: '#15803d', border: '#bbf7b0' },
  error: { bg: '#fee2e2', color: '#b91c1c', border: '#fca5a5' },
  warning: { bg: '#fff3cd', color: '#b45309', border: '#fcd34d' },
  info: { bg: '#dbeafe', color: '#1d4ed8', border: '#93c5fd' },
};

const SIZE_STYLES: Record<string, string> = {
  sm: 'padding: 0.625rem 0.875rem; font-size: 0.8125rem;',
  md: 'padding: 0.875rem 1.125rem; font-size: 0.9375rem;',
  lg: 'padding: 1.125rem 1.375rem; font-size: 1rem;',
};

export function Toast({ message, type = 'info', onClose, duration = 5000, className = '' }: ToastProps) {
  const style = TYPE_STYLES[type];
  const sizeStyle = SIZE_STYLES[size] || SIZE_STYLES.md;

  // Auto dismiss
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1rem',
        borderRadius: '10px',
        background: style.bg,
        color: style.color,
        border: `1px solid ${style.border}`,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        position: 'relative',
        animation: 'slideIn 0.3s ease',
      }}
    >
      <span style={{ fontWeight: 600 }}>
        {type === 'success' ? 'Success!' : type === 'error' ? 'Error!' : type === 'warning' ? 'Warning!' : 'Info'}
      </span>
      <span style={{ flex: 1 }}>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'inherit',
          cursor: 'pointer',
          padding: '0.25rem',
          fontSize: '1rem',
        }}
        aria-label="Dismiss notification"
      >
        &times;
      </button>
    </div>
  );
}

export default Toast;
