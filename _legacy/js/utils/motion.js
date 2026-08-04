/**
 * motion.js — JBOSS motion language utilities
 * Implements the five named behaviors: Arrive, Glide, Reveal, Respond, Hold.
 *
 * Arrive  — CSS-driven (keyframes in styles.css), no JS needed
 * Glide   — scroll-linked parallax, one layer, 10% drift
 * Reveal  — cinematic card-to-detail expansion via transform-origin
 * Respond — magnetic hover (±4px max) + press state (CSS)
 * Hold    — enforced by absence of idle/looping animations
 */

const MAX_SHIFT = 4; // ±4px magnetic hover cap (Respond spec)

/**
 * Respond — magnetic hover on buttons.
 * Cursor-proximity translate, capped at ±4px.
 */
export function bindMagneticHover(elements) {
  elements.forEach((button) => {
    button.addEventListener('pointermove', (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      const shiftX = Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, x * 0.06));
      const shiftY = Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, y * 0.06));
      button.style.transform = `translate(${shiftX}px, ${shiftY}px)`;
    });

    button.addEventListener('pointerleave', () => {
      button.style.transform = '';
    });
  });
}

/**
 * Glide — update hero parallax offset.
 * Called on scroll (rAF-throttled) and after each render.
 * CSS applies the 0.10 multiplier (10% drift, within 8–12% spec).
 */
export function updateParallax() {
  const hero = document.querySelector('.hero');
  const sections = document.querySelectorAll('section');
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;

  if (hero) {
    hero.style.setProperty('--hero-offset', `${scrollY}px`);
  }

  document.documentElement.style.setProperty('--glow-x', `${20 + (scrollY % 120) / 120 * 60}%`);
  document.documentElement.style.setProperty('--glow-y', `${16 + (scrollY % 90) / 90 * 30}%`);

  const motionProfiles = {
    home: { drift: 0.012, scale: 0.002, shift: 5, tilt: 0.35 },
    work: { drift: 0.008, scale: 0.002, shift: 4, tilt: 0.4 },
    systems: { drift: 0.005, scale: 0.0015, shift: 3.2, tilt: 0.5 },
    about: { drift: 0.006, scale: 0.0018, shift: 3.4, tilt: 0.28 },
    testimonials: { drift: 0.006, scale: 0.0016, shift: 3.6, tilt: 0.3 },
    contact: { drift: 0.007, scale: 0.0015, shift: 2.8, tilt: 0.25 },
    default: { drift: 0.004, scale: 0.0014, shift: 2.6, tilt: 0.2 }
  };

  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const visible = rect.top < viewportHeight * 0.9 && rect.bottom > 0;
    if (!visible) return;

    const profile = motionProfiles[section.id] || motionProfiles[section.dataset.motion] || motionProfiles.default;
    const sectionDrift = Math.sin((scrollY + index * 160) / 260) * 8 * profile.drift;
    const sectionScale = 1 + Math.sin((scrollY + index * 100) / 310) * 0.003;
    const sectionDepth = Math.sin((scrollY + index * 140) / 320) * 8;

    section.style.setProperty('--scroll-depth', `${sectionDepth}px`);
    section.style.setProperty('--section-drift', `${sectionDrift}px`);
    section.style.setProperty('--section-scale', sectionScale.toFixed(3));

    section.querySelectorAll('.project-card, .system-card, .about-card, .contact-card, .hero-card, .profile-card, .hero-copy, .hero-visual, .about-copy, .skill-chip, .stat, .system-icon').forEach((element, elementIndex) => {
      const shift = Math.sin((scrollY + elementIndex * 90 + index * 70) / 360) * profile.shift;
      const tilt = Math.sin((scrollY * 0.01 + elementIndex * 0.55 + index) / 2.2) * profile.tilt;
      const scale = 1 + Math.sin((scrollY + elementIndex * 60 + index * 45) / 280) * profile.scale;
      element.style.setProperty('--motion-shift', `${shift}px`);
      element.style.setProperty('--motion-tilt', `${tilt}deg`);
      element.style.setProperty('--motion-scale', scale.toFixed(3));
    });
  });
}

/**
 * Glide — bind scroll listener for parallax.
 * Returns a cleanup function.
 */
export function bindParallax() {
  let rafId = null;

  function onScroll() {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      updateParallax();
      rafId = null;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}

/**
 * Reveal — capture the clicked card's center for the detail expansion.
 * Returns { x, y } in viewport coordinates for CSS transform-origin.
 */
export function captureRevealOrigin(element) {
  if (!element) return null;
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
}

/**
 * Reveal — format origin for CSS transform-origin property.
 */
export function formatRevealOrigin(origin) {
  if (!origin) return 'center center';
  return `${origin.x}px ${origin.y}px`;
}