import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Media } from '@/components/ui/Media';
import { portrait, projectImage_titan } from '@/content/images';

const original = {
  complete: Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'complete'),
  naturalWidth: Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'naturalWidth'),
};

/**
 * Simulates an image the browser already had in cache.
 *
 * jsdom never fetches images, so it reports `complete: false` and never fires
 * `load`. That is precisely why the cached-image race went unnoticed: the test
 * environment always looked like the slow, well-behaved case. Stubbing the two
 * properties reproduces the race.
 */
const pretendAlreadyCached = () => {
  Object.defineProperty(HTMLImageElement.prototype, 'complete', {
    configurable: true,
    value: true,
  });
  Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', {
    configurable: true,
    value: 1,
  });
};

describe('Media', () => {
  afterEach(() => {
    if (original.complete) {
      Object.defineProperty(HTMLImageElement.prototype, 'complete', original.complete);
    }
    if (original.naturalWidth) {
      Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', original.naturalWidth);
    }
  });

  it('shows an image that was already in the browser cache', () => {
    pretendAlreadyCached();
    render(<Media asset={portrait} alt="Jerry Adewole" />);

    const img = screen.getByAltText('Jerry Adewole');
    expect(img.className).toContain('opacity-100');
    expect(img.className).not.toContain('opacity-0');
  });

  it('drops the blur-up placeholder once the real image is showing', () => {
    /* A 24px blur scaled to fill the box stays visible through the transparent
       parts of a cut-out, as a halo that reads as a glow behind the subject. */
    pretendAlreadyCached();
    render(<Media asset={portrait} alt="Jerry Adewole" />);

    const wrapper = screen.getByAltText('Jerry Adewole').parentElement as HTMLElement;
    expect(getComputedStyle(wrapper).backgroundImage).toBe('none');
  });

  it('keeps the placeholder while the image is still loading', () => {
    render(<Media asset={portrait} alt="Jerry Adewole" />);

    const wrapper = screen.getByAltText('Jerry Adewole').parentElement as HTMLElement;
    expect(getComputedStyle(wrapper).backgroundImage).toContain('url(');
  });

  it('keeps an image that is still loading hidden behind its placeholder', () => {
    render(<Media asset={portrait} alt="Jerry Adewole" />);

    const img = screen.getByAltText('Jerry Adewole');
    expect(img.className).toContain('opacity-0');
  });

  it('keeps a broken image hidden rather than showing an empty box', () => {
    /* complete, but zero natural width means the bytes never arrived. */
    Object.defineProperty(HTMLImageElement.prototype, 'complete', {
      configurable: true,
      value: true,
    });
    Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', {
      configurable: true,
      value: 0,
    });

    render(<Media asset={portrait} alt="Jerry Adewole" />);

    expect(screen.getByAltText('Jerry Adewole').className).toContain('opacity-0');
  });

  it('reserves the layout up front and points at a real source', () => {
    render(<Media asset={projectImage_titan} alt="Titan Commerce" />);

    const img = screen.getByAltText('Titan Commerce');
    expect(img.getAttribute('width')).toBe(String(projectImage_titan.width));
    expect(img.getAttribute('height')).toBe(String(projectImage_titan.height));
    expect(img.getAttribute('src')).toBe(projectImage_titan.src);
    expect(img.getAttribute('srcset')).toBe(projectImage_titan.srcSet);
  });
});
