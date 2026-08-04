/**
 * WorkGrid.js — selected work section with filter bar
 * Filter buttons use active state (accent usage #2).
 * Cards trigger Reveal on click.
 */

export function renderWorkGrid(state, filteredProjects) {
  const activeIdx = state.carouselIndex;
  const total = filteredProjects.length;

  return `
    <section id="work" class="container section arrive arrive-delay-2">
      <div class="section-header centered-header">
        <h2>Featured Projects</h2>
        <div class="filter-bar">
          ${state.disciplines.map((d) => `
            <button class="secondary-button ${state.workFilter === d.id ? 'active' : ''}" data-action="filter-work" data-filter="${d.id}">${d.name}</button>
          `).join('')}
        </div>
      </div>

      <div class="carousel-container">
        <button class="carousel-arrow prev" data-action="carousel-prev" aria-label="Previous Project">⟪</button>

        <div class="carousel-track">
          ${filteredProjects.map((project, index) => {
            let positionClass = 'hidden';
            if (index === activeIdx) {
              positionClass = 'active';
            } else if (index === (activeIdx - 1 + total) % total) {
              positionClass = 'left';
            } else if (index === (activeIdx + 1) % total) {
              positionClass = 'right';
            }

            return `
              <article class="carousel-card ${positionClass} arrive" data-index="${index}" data-action="${positionClass === 'active' ? 'open-project' : 'set-carousel'}" data-project-id="${project.id}">
                <div class="carousel-card-inner">
                  <div class="carousel-card-media">
                    <img src="${project.image}" alt="${project.name}" />
                    <div class="card-glow-overlay"></div>
                  </div>
                  <div class="carousel-card-footer">
                    <h3>
                      <span>${project.name}</span>
                      ${index === activeIdx ? `<span class="dropdown-indicator">▼</span>` : ''}
                    </h3>
                  </div>
                </div>
              </article>
            `;
          }).join('')}
        </div>

        <button class="carousel-arrow next" data-action="carousel-next" aria-label="Next Project">⟫</button>
      </div>

      <div class="carousel-dots">
        ${filteredProjects.map((_, index) => `
          <span class="dot ${index === activeIdx ? 'active' : ''}" data-action="carousel-dot" data-index="${index}"></span>
        `).join('')}
      </div>
    </section>
  `;
}