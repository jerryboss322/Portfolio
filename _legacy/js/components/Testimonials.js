/**
 * Testimonials.js — social proof section
 */

export function renderTestimonials(state) {
  return `
    <section class="container section arrive arrive-delay-4">
      <div class="section-header">
        <h2>Testimonials</h2>
        <a href="#contact" class="link-underline">Say hello</a>
      </div>
      <div class="project-grid">
        ${state.testimonials.map((item) => `
          <article class="project-card testimonial-card arrive">
            <p>“${item.quote}”</p>
            <div class="testimonial-author">
              <strong>${item.name}</strong>
              <span class="meta">${item.role}</span>
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}