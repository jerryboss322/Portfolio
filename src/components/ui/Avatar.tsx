// Avatar component - user avatar with different sizes
import type { AvatarProps } from '../../types/ui';

const SIZE_STYLES: Record<string, Record<string, string>> = {
  sm: { width: '32px', height: '32px', fontSize: '0.75rem' },
  md: { width: '40px', height: '40px', fontSize: '0.875rem' },
  lg: { width: '56px', height: '56px', fontSize: '1.125rem' },
  xl: { width: '80px', height: '80px', fontSize: '1.5rem' },
};

export function Avatar({ src, alt = '', size = 'md', variant = 'default', children }: AvatarProps) {
  const sizeStyle = SIZE_STYLES[size] || SIZE_STYLES.md;

  return (
    <div
      className="avatar"
      style={{
        ...sizeStyle,
        borderRadius: '50%',
        background: 'var(--color-surface)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        border: '2px solid var(--color-border)',
      }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <span style={{ fontWeight: 600, color: 'var(--color-on-primary)' }}>
          {children || (alt?.charAt(0) || '')}
        </span>
      )}
    </div>
  );
}

export default Avatar;
