/**
 * app.js — JBOSS portfolio bootstrap
 * Composes section components, wires interactions, and orchestrates
 * the five motion behaviors (Arrive, Glide, Reveal, Respond, Hold).
 */

import { 
  initializeStore, 
  getState, 
  setTheme, 
  setWorkFilter, 
  openProject, 
  closeProject, 
  getFilteredProjects,
  nextCarouselProject,
  prevCarouselProject,
  setCarouselIndex
} from './core/store.js';

import { renderHero } from './components/Hero.js';
import { renderWorkGrid } from './components/WorkGrid.js';
import { renderProjectDetail } from './components/ProjectDetail.js';
import { renderSystems } from './components/Systems.js';
import { renderTestimonials } from './components/Testimonials.js';
import { renderAbout } from './components/About.js';
import { renderContact } from './components/Contact.js';
import { renderToast } from './components/Toast.js';
import { renderFooter } from './components/Footer.js';
import { bindMagneticHover, bindParallax, updateParallax, captureRevealOrigin } from './utils/motion.js';
import { initStarfield } from './utils/starfield.js';

const app = document.getElementById('app');
const toastStack = document.getElementById('toastStack');

// Reveal — stores the clicked card's center for the detail expansion
let revealOrigin = null;

/**
 * Render the entire app from state.
 */
function render() {
  const state = getState();
  document.documentElement.dataset.theme = state.theme;

  app.innerHTML = `
    ${renderHero()}
    ${renderWorkGrid(state, getFilteredProjects())}
    ${renderSystems(state)}
    ${renderTestimonials(state)}
    ${renderAbout(state)}
    ${renderContact()}
    ${renderFooter()}
    ${renderProjectDetail(state, revealOrigin)}
  `;

  updateThemeIcon(state.theme);
  toastStack.innerHTML = renderToast(state);
  bindEvents();
  updateParallax();
}

/**
 * Update the theme toggle icon based on current mode.
 */
function updateThemeIcon(theme) {
  const themeButton = document.querySelector('[data-action="toggle-theme"]');
  if (themeButton) {
    themeButton.textContent = theme === 'dark' ? '☀︎' : '☾';
    themeButton.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

/**
 * Wire up all interactive elements after render.
 */
function bindEvents() {
  document.querySelectorAll('[data-action]').forEach((element) => {
    element.onclick = (event) => {
      // Don't close when clicking inside the detail card itself
      if (element.classList.contains('detail-overlay') && event.target !== element) return;
      handleAction(element);
    };
  });

  // Respond — magnetic hover on buttons
  bindMagneticHover(document.querySelectorAll('.primary-button, .secondary-button, .carousel-arrow'));

  // 3D Tilt effect on active carousel card on hover
  document.querySelectorAll('.carousel-card.active').forEach((card) => {
    card.onpointermove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = -(y / rect.height) * 15; // Up to 15deg tilt
      const rotateY = (x / rect.width) * 15; // Up to 15deg tilt
      card.style.transform = `translateZ(120px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    card.onpointerleave = () => {
      card.style.transform = 'translateZ(120px) rotateY(0deg)';
    };
  });

  // Drag/Swipe controls on the carousel track
  const track = document.querySelector('.carousel-track');
  if (track) {
    let startX = 0;
    let isDragging = false;

    track.onpointerdown = (e) => {
      startX = e.clientX;
      isDragging = true;
      try {
        track.setPointerCapture(e.pointerId);
      } catch (err) {}
    };

    track.onpointerup = (e) => {
      if (!isDragging) return;
      isDragging = false;
      try {
        track.releasePointerCapture(e.pointerId);
      } catch (err) {}
      
      const diffX = e.clientX - startX;
      if (diffX > 60) {
        prevCarouselProject();
        render();
      } else if (diffX < -60) {
        nextCarouselProject();
        render();
      }
    };
  }
}

/**
 * Central action handler — routes data-action clicks.
 */
function handleAction(element) {
  const action = element.dataset.action;
  const target = element.dataset.target;
  const projectId = element.dataset.projectId;

  switch (action) {
    case 'toggle-theme':
      setTheme(getState().theme === 'dark' ? 'light' : 'dark');
      render();
      break;

    case 'scroll':
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      break;

    case 'filter-work':
      setWorkFilter(element.dataset.filter);
      render();
      break;

    case 'carousel-prev':
      prevCarouselProject();
      render();
      break;

    case 'carousel-next':
      nextCarouselProject();
      render();
      break;

    case 'carousel-dot':
      setCarouselIndex(parseInt(element.dataset.index));
      render();
      break;

    case 'set-carousel':
      setCarouselIndex(parseInt(element.dataset.index));
      render();
      break;

    case 'open-project':
      // Reveal — capture card center for the cinematic expansion
      revealOrigin = captureRevealOrigin(element.closest('.carousel-card'));
      openProject(projectId);
      render();
      break;

    case 'close-modal':
      closeProject();
      revealOrigin = null;
      render();
      break;

    default:
      break;
  }
}

// Global single event registration
let globalEventsBound = false;
function bindGlobalEvents() {
  if (globalEventsBound) return;
  globalEventsBound = true;

  window.addEventListener('keydown', (event) => {
    // Escape key modal handling
    if (event.key === 'Escape' && getState().selectedProject) {
      closeProject();
      revealOrigin = null;
      render();
      return;
    }
    
    // Left/Right arrow navigation for carousel (if modal is not open)
    if (!getState().selectedProject) {
      if (event.key === 'ArrowLeft') {
        prevCarouselProject();
        render();
      } else if (event.key === 'ArrowRight') {
        nextCarouselProject();
        render();
      }
    }
  });
}

// --- Bootstrap ---
initializeStore();
initStarfield();
render();
bindParallax();
bindGlobalEvents();