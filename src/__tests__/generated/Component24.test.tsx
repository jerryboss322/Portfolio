// Test for Component24 Component
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Component24 } from '../../components/ui/generated/Component24';
import { DEFAULTS } from '../../components/ui/generated/Component24';

const mockProps = {
  children: 'Test Content', className: 'test-class', style: {},
  onClick: vi.fn(), id: 'test-id', disabled: false, loading: false,
  size: 'md' as const, variant: 'primary' as const,
  prop1: 'v1', prop2: 123, prop3: true, prop4: false, prop5: undefined,
};

describe('Component24', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  describe('Rendering', () => {
    it('renders', () => {
      const { container } = render(<Component24 {...mockProps} />);
      expect(container.firstChild).toBeTruthy();
    });
    it('renders children', () => {
      render(<Component24 {...mockProps}>Text</Component24>);
      expect(screen.getByText('Text')).toBeTruthy();
    });
    it('applies className', () => {
      const { container } = render(<Component24 {...mockProps} className="custom" />);
      expect((container.firstChild as HTMLElement)?.className).toContain('custom');
    });
    it('applies id', () => {
      const { container } = render(<Component24 {...mockProps} id="test" />);
      expect((container.firstChild as HTMLElement)?.id).toBe('test');
    });
    it('applies data-comp', () => {
      const { container } = render(<Component24 {...mockProps} />);
      expect((container.firstChild as HTMLElement)?.getAttribute('data-comp')).toBe('Component24');
    });
  });

  describe('State', () => {
    it('handles disabled', () => {
      const { container } = render(<Component24 {...mockProps} disabled />);
      expect(container.firstChild).toBeTruthy();
    });
    it('handles loading', () => {
      const { container } = render(<Component24 {...mockProps} loading />);
      expect(container.firstChild).toBeTruthy();
    });
    it('handles size variants', () => {
      for (const s of ['xs','sm','md','lg','xl'] as const) {
        const { container } = render(<Component24 {...mockProps} size={s} />);
        expect(container.firstChild).toBeTruthy();
      }
    });
    it('handles style variants', () => {
      for (const v of ['primary','secondary','outline','ghost','danger'] as const) {
        const { container } = render(<Component24 {...mockProps} variant={v} />);
        expect(container.firstChild).toBeTruthy();
      }
    });
  });

  describe('Events', () => {
    it('calls onClick', () => {
      const onClick = vi.fn();
      const { container } = render(<Component24 {...mockProps} onClick={onClick} />);
      fireEvent.click(container.firstChild!);
      expect(onClick).toHaveBeenCalled();
    });
    it('does not call onClick when disabled', () => {
      const onClick = vi.fn();
      const { container } = render(<Component24 {...mockProps} disabled onClick={onClick} />);
      fireEvent.click(container.firstChild!);
      expect(onClick).not.toHaveBeenCalled();
    });
    it('does not call onClick when loading', () => {
      const onClick = vi.fn();
      const { container } = render(<Component24 {...mockProps} loading onClick={onClick} />);
      fireEvent.click(container.firstChild!);
      expect(onClick).not.toHaveBeenCalled();
    });
    it('mouse events', () => {
      const { container } = render(<Component24 {...mockProps} />);
      fireEvent.mouseEnter(container.firstChild!);
      fireEvent.mouseLeave(container.firstChild!);
      expect(container.firstChild).toBeTruthy();
    });
    it('focus events', () => {
      const { container } = render(<Component24 {...mockProps} />);
      fireEvent.focus(container.firstChild!);
      fireEvent.blur(container.firstChild!);
      expect(container.firstChild).toBeTruthy();
    });
    it('keyboard events', () => {
      const { container } = render(<Component24 {...mockProps} />);
      fireEvent.keyDown(container.firstChild!, { key: 'Enter' });
      fireEvent.keyUp(container.firstChild!, { key: 'Enter' });
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('has tabIndex 0', () => {
      const { container } = render(<Component24 {...mockProps} />);
      expect((container.firstChild as HTMLElement)?.tabIndex).toBe(0);
    });
    it('has tabIndex -1 when disabled', () => {
      const { container } = render(<Component24 {...mockProps} disabled />);
      expect((container.firstChild as HTMLElement)?.tabIndex).toBe(-1);
    });
  });

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const { container } = render(<Component24 {...mockProps} />);
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches snapshot disabled', () => {
      const { container } = render(<Component24 {...mockProps} disabled />);
      expect(container.firstChild).toMatchSnapshot();
    });
    it('matches snapshot loading', () => {
      const { container } = render(<Component24 {...mockProps} loading />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Constants', () => {
    it('has DEFAULTS', () => { expect(DEFAULTS).toBeDefined() });
    it('DEFAULTS.disabled is false', () => { expect(DEFAULTS.disabled).toBe(false) });
    it('DEFAULTS.loading is false', () => { expect(DEFAULTS.loading).toBe(false) });
  });

  describe('Edge Cases', () => {
    it('handles undefined props', () => {
      expect(() => { const { container } = render(<Component24 />); expect(container.firstChild).toBeTruthy(); }).not.toThrow();
    });
    it('handles empty string children', () => {
      expect(() => { const { container } = render(<Component24 {...mockProps} children={''} />); expect(container.firstChild).toBeTruthy(); }).not.toThrow();
    });
  });
});
