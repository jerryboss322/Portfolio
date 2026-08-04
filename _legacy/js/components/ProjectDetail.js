/**
 * ProjectDetail.js — cinematic Reveal overlay
 *
 * Reveal behavior: the detail card scales up from the clicked card's
 * position (transform-origin set from captured rect). Text content
 * staggers in 120ms after via CSS nth-child animation delays.
 */

import { formatRevealOrigin } from '../utils/motion.js';

export function renderProjectDetail(state, revealOrigin) {
  if (!state.selectedProject) return '';

  const project = state.selectedProject;
  const origin = formatRevealOrigin(revealOrigin);

  return `
    <div class="detail-overlay" data-action="close-modal">
      <div class="detail-card" role="dialog" aria-modal="true" aria-label="${project.name}" style="--reveal-origin: ${origin}; --reveal-scale: 0.88;">
        <div class="detail-media">
          <img src="${project.image}" alt="${project.name}" />
        </div>
        <div class="detail-content">
          <div class="project-topline">
            <span class="badge">${project.badge}</span>
            <span class="meta">${project.year}</span>
          </div>
          <h3>${project.name}</h3>
          <p class="meta">${project.role}</p>
          <p>${project.summary}</p>
          <p>${project.outcome}</p>
          <div class="project-meta">
            ${project.tags.map((tag) => `<span class="badge">${tag}</span>`).join('')}
          </div>
          <div class="detail-actions">
            <button class="primary-button" data-action="close-modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;
}