const SECTION_IDS = [
  'home',
  'work',
  'about',
  'capabilities',
  'process',
  'testimonials',
  'contact',
];

export const isSectionId = (id: string): boolean =>
  SECTION_IDS.includes(id.replace(/^#/, ''));

/**
 * Scrolls to a section by id and mirrors the section into the URL hash for
 * deep-linking. Uses native smooth scrolling — the page relies on
 * `scroll-behavior: smooth` in tailwind.css, which also respects the OS
 * reduced-motion setting for free.
 */
export const scrollToSection = (id: string, updateUrl = true) => {
  const cleanId = id.replace(/^#/, '');
  const el = document.getElementById(cleanId);
  if (!el) return;

  el.scrollIntoView({ behavior: 'smooth', block: 'start' });

  if (updateUrl) {
    try {
      history.replaceState(null, '', `#${cleanId}`);
    } catch {
      /* ignore sandbox restrictions */
    }
  }
};
