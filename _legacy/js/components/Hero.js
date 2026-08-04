/**
 * Hero.js — hero section
 * Arrive behavior on load, Glide parallax on scroll.
 */

export function renderHero() {
  return `
    <section id="home" class="container hero arrive">
      <div class="hero-copy arrive">
        <span class="eyebrow">JBOSS / Portfolio</span>
        <h1>Engineering detail into digital products.</h1>
        <p>Crafting high-fidelity interfaces & interactive tools.</p>
        <div class="hero-actions">
          <button class="primary-button cta-glow" data-action="scroll" data-target="work">View My Work</button>
          <button class="secondary-button" data-action="scroll" data-target="contact">Get in Touch</button>
        </div>
        <div class="stats-grid">
          <div class="stat"><strong>5+</strong><span>Systems Shipped</span></div>
          <div class="stat"><strong>60%</strong><span>Debt Reduction</span></div>
          <div class="stat"><strong>100%</strong><span>Native Frontend</span></div>
        </div>
      </div>
      <div class="hero-visual arrive arrive-delay-1">
        <div class="orbital-container">
          <div class="orbit-ring ring-1"></div>
          <div class="orbit-ring ring-2"></div>
          <div class="orbit-ring ring-3"></div>

          <div class="orbiting-node node-1" title="Interface Design"><span class="node-icon">⚡</span></div>
          <div class="orbiting-node node-2" title="Development"><span class="node-icon">⚛</span></div>
          <div class="orbiting-node node-3" title="Systems Architect"><span class="node-icon">⚙</span></div>
          <div class="orbiting-node node-4" title="Performance"><span class="node-icon">❖</span></div>
          <div class="orbiting-node node-5" title="Creative Direction"><span class="node-icon">✦</span></div>

          <div class="profile-circle">
            <img src="img/portrait.jpeg" alt="Portrait of JBOSS" />
            <div class="glow-ring"></div>
          </div>
        </div>
      </div>
    </section>
  `;
}