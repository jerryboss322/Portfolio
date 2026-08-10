import type Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenisInstance = instance;
};

export const getLenis = () => lenisInstance;

const SECTION_IDS = ['hero', 'work', 'what-i-build', 'about', 'skills', 'contact'];

export const isSectionId = (id: string): boolean =>
  SECTION_IDS.includes(id.replace(/^#/, ''));

/**
 * Smoothly scroll to a section by id, falling back to native scrolling.
 * Optionally mirrors the section into the URL hash for deep-linking
 * without triggering router navigation.
 */
export const scrollToSection = (id: string, updateUrl = true) => {
  const cleanId = id.replace(/^#/, '');
  const el = document.getElementById(cleanId);
  if (!el) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: 0, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  if (updateUrl) {
    try {
      history.replaceState(null, '', `#${cleanId}`);
    } catch {
      /* ignore sandbox restrictions */
    }
  }
};

export const scrollToTop = (immediate = false) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate });
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
  }
};
