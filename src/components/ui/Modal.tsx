// Modal component - dialog overlay
import type { ModalProps } from '../../types/ui';

const SIZE_STYLES: Record<string, string> = {
  sm: 'max-width: 400px;',
  md: 'max-width: 600px;',
  lg: 'max-width: 900px;',
  xl: 'max-width: 1200px;',
};

export function Modal({ isOpen, onClose, title, children, size = 'md', variant = 'default' }: ModalProps) {
  if (!isOpen) return null;

  const sizeStyle = SIZE_STYLES[size] || SIZE_STYLES.md;

  return (
    <div
      className="modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        className="modal-content"
        style={{
          ...sizeStyle,
          background: 'var(--color-surface)',
          borderRadius: '12px',
          border: '1px solid var(--color-border)',
          maxHeight: 'calc(100vh - 2rem)',
          overflowY: 'auto',
          animation: 'slideUp 0.2s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="modal-header" style={{ marginBottom: '1rem' }}>
            <h2 style={{ margin: 0, fontWeight: 600, color: 'var(--color-text)' }}>{title}</h2>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.25rem',
                color: 'var(--color-text-secondary)',
                marginLeft: 'auto',
                padding: '0.25rem',
              }}
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
        )}
        <div style={{ padding: '1.5rem' }}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
