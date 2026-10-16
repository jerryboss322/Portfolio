// Drawer component - sliding panel from any edge
import type { DrawerProps } from '../../types/ui';

const SIZE_STYLES: Record<string, Record<string, string>> = {
  sm: { width: '300px' },
  md: { width: '400px' },
  lg: { width: '560px' },
};

export function Drawer({ isOpen, onClose, title, direction = 'left', children, size = 'md' }: DrawerProps) {
  const sizeStyle = SIZE_STYLES[size] || SIZE_STYLES.md;

  if (!isOpen) return null;

  const positionStyles: Record<string, { top: string; left: string; right: string; bottom: string }> = {
    left: { top: '0', left: '0', right: 'auto', bottom: '0' },
    right: { top: '0', right: '0', left: 'auto', bottom: '0' },
    top: { top: '0', left: '0', right: '0', bottom: 'auto' },
    bottom: { bottom: '0', left: '0', right: '0', top: 'auto' },
  };

  return (
    <div
      className="drawer-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: direction === 'top' || direction === 'bottom' ? 'center' : 'flex-start',
        justifyContent: direction === 'left' || direction === 'right' ? 'flex-start' : 'center',
        zIndex: 1000,
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        className="drawer-content"
        style={{
          ...sizeStyle,
          ...positionStyles[direction],
          background: 'var(--color-surface)',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          overflowY: direction === 'top' || direction === 'bottom' ? 'hidden' : 'auto',
          animation: 'slideInFromLeft 0.25s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-border)', marginBottom: '1rem' }}>
            <h2 style={{ margin: 0, fontWeight: 600, color: 'var(--color-text)' }}>{title}</h2>
          </div>
        )}
        <div style={{ padding: '1.5rem' }}>{children}</div>
      </div>
    </div>
  );
}

export default Drawer;
