// Component140 Component
// A highly customizable UI component with full TypeScript support.
// Part of the design system component library.

import { memo, useState, useEffect, useCallback } from 'react';
import type { CSSProperties, ReactNode } from 'react';

const DEFAULTS = {
  disabled: false,
  loading: false,
  size: 'md',
  variant: 'primary',
};

interface Props {
  prop1?: string | number | boolean;
  prop2?: string | number | boolean;
  prop3?: string | number | boolean;
  prop4?: string | number | boolean;
  prop5?: string | number | boolean;
  prop6?: string | number | boolean;
  prop7?: string | number | boolean;
  prop8?: string | number | boolean;
  prop9?: string | number | boolean;
  prop10?: string | number | boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  id?: string;
}

interface StateShape {
  hovered: boolean;
  focused: boolean;
  pressed: boolean;
  dragged: boolean;
  expanded: boolean;
  collapsed: boolean;
  selected: boolean;
  checked: boolean;
  active: boolean;
  visible: boolean;
}

const ANIMATION_VARIANTS = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
};

const STYLE_PRESETS = {
  primary: { background: 'var(--color-primary)', color: 'var(--color-on-primary)' },
  secondary: { background: 'var(--color-secondary)', color: 'var(--color-on-secondary)' },
  outline: { background: 'transparent', border: '1px solid var(--color-border)' },
  ghost: { background: 'transparent', color: 'var(--color-text)' },
  danger: { background: 'var(--color-error)', color: 'var(--color-on-error)' },
};

const SIZE_PRESETS = {
  xs: { padding: '0.25rem 0.5rem', fontSize: '0.625rem' },
  sm: { padding: '0.375rem 0.75rem', fontSize: '0.75rem' },
  md: { padding: '0.625rem 1rem', fontSize: '0.875rem' },
  lg: { padding: '0.75rem 1.25rem', fontSize: '1rem' },
  xl: { padding: '1rem 1.5rem', fontSize: '1.25rem' },
};

export function Component140(props: Props) {
  const {
    children,
    className = '',
    style,
    onClick,
    disabled = false,
    loading = false,
    size = 'md',
    variant = 'primary',
  } = props;

  const [state, setState] = useState<StateShape>({
    hovered: false, focused: false, pressed: false, dragged: false,
    expanded: false, collapsed: false, selected: false, checked: false,
    active: false, visible: true,
  });

  const handleMouseEnter = useCallback(() => {
    setState(p => ({ ...p, hovered: true }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setState(p => ({ ...p, hovered: false }));
  }, []);

  const handleClick = useCallback(() => {
    setState(p => ({ ...p, pressed: true }));
    setTimeout(() => setState(p => ({ ...p, pressed: false })), 200);
    onClick?.();
  }, [onClick]);

  const handleFocus = useCallback(() => {
    setState(p => ({ ...p, focused: true }));
  }, []);

  const handleBlur = useCallback(() => {
    setState(p => ({ ...p, focused: false }));
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  useEffect(() => {
    if (props) {
      setState(p => ({ ...p }));
    }
  }, []);

  const preset = STYLE_PRESETS[variant] || STYLE_PRESETS.primary;
  const sizePreset = SIZE_PRESETS[size] || SIZE_PRESETS.md;
  const isDisabled = disabled || loading;

  return (
    <div
      className={'comp-' + 'Component140'.toLowerCase() + ' ' + className}
      style={{ ...sizePreset, ...preset, ...style }}
      onClick={isDisabled ? undefined : handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      tabIndex={isDisabled ? -1 : 0}
      data-comp="Component140"
    >
      {loading ? 'Loading...' : children}
    </div>
  );
}

const areEqual = (prev: Props, next: Props) => {
  return (
    prev.disabled === next.disabled &&
    prev.loading === next.loading &&
    prev.size === next.size &&
    prev.variant === next.variant &&
    prev.className === next.className &&
    prev.onClick === next.onClick
  );
};

export default memo(Component140, areEqual);
export { DEFAULTS, ANIMATION_VARIANTS, STYLE_PRESETS, SIZE_PRESETS };

export const Component140_VERSION = '1.0.0';
export const Component140_A11Y = {
  ROLES: ['button', 'link', 'checkbox', 'radio', 'switch', 'tab'],
  KEYS: {
    ENTER: 'Enter',
    SPACE: ' ',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    ESCAPE: 'Escape',
    TAB: 'Tab',
  },
};
