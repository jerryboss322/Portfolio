/**
 * About.js — approach section with skills
 */

export function renderAbout(state) {
  return `
    <section id="about" class="container section arrive arrive-delay-2">
      <div class="section-header">
        <h2>Approach</h2>
        <a href="#contact" class="link-underline">Contact</a>
      </div>
      <div class="about-grid">
        <div class="about-copy">
          <h3>Building digital infrastructure with visual clarity.</h3>
          <p>I bridge the gap between design vision and production-ready implementation. I construct cohesive design token architectures, design layouts around structured grid lines, and write semantic, high-performance CSS and JavaScript. My goal is to make every interface feel tactile, performant, and simple to navigate.</p>
          <div class="skills-list">
            ${state.skills.map((skill) => `<span class="skill-chip">${skill}</span>`).join('')}
          </div>
        </div>
        <div class="about-card arrive">
          <h3>Expertise</h3>
          <ul>
            <li>System-level token pipelines</li>
            <li>Accessible component architecture</li>
            <li>High-fidelity motion & canvas art</li>
            <li>Clean, native frontend execution</li>
          </ul>
        </div>
      </div>
    </section>
  `;
}