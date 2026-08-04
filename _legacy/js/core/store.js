import { loadState, saveState } from '../services/storage.js';
import { disciplines, projects, systems, testimonials, skills } from '../../data/content.js';

const defaultState = {
  theme: 'dark',
  workFilter: 'all',
  selectedProject: null,
  toast: null,
  carouselIndex: 1,
  disciplines,
  projects,
  systems,
  testimonials,
  skills
};

let state = { ...defaultState };

export function initializeStore() {
  const saved = loadState(defaultState);
  state = {
    ...defaultState,
    ...saved,
    workFilter: saved.workFilter || 'all',
    selectedProject: null,
    toast: null,
    carouselIndex: saved.carouselIndex !== undefined ? saved.carouselIndex : 1
  };
  return state;
}

export function getState() {
  return state;
}

export function persistState() {
  saveState({ 
    theme: state.theme,
    workFilter: state.workFilter,
    carouselIndex: state.carouselIndex
  });
}

export function setTheme(theme) {
  state.theme = theme;
  document.documentElement.dataset.theme = theme;
  persistState();
}

export function setWorkFilter(filter) {
  state.workFilter = filter;
  state.carouselIndex = 0; // Reset index on filter change
  persistState();
}

export function setCarouselIndex(index) {
  state.carouselIndex = index;
  persistState();
}

export function nextCarouselProject() {
  const count = getFilteredProjects().length;
  if (count === 0) return;
  state.carouselIndex = (state.carouselIndex + 1) % count;
  persistState();
}

export function prevCarouselProject() {
  const count = getFilteredProjects().length;
  if (count === 0) return;
  state.carouselIndex = (state.carouselIndex - 1 + count) % count;
  persistState();
}

export function openProject(projectId) {
  state.selectedProject = state.projects.find(project => project.id === projectId) || null;
  persistState();
}

export function closeProject() {
  state.selectedProject = null;
  persistState();
}

export function showToast(message, tone = 'success') {
  state.toast = { message, tone };
  persistState();
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    state.toast = null;
    persistState();
  }, 1800);
}

export function getFilteredProjects() {
  return state.projects.filter(project => state.workFilter === 'all' || project.discipline === state.workFilter);
}

