/**
 * Contact.js — contact section
 */

export function renderContact() {
  return `
    <section id="contact" class="container section arrive arrive-delay-3 contact-section-centered">
      <div class="contact-card arrive centered-card">
        <h2>Let's work together!</h2>
        <p>Get in touch to discuss your next project.</p>
        <div class="contact-actions centered-actions">
          <a class="primary-button cta-glow" href="mailto:hello@jboss.dev">Contact Me</a>
        </div>
      </div>
    </section>
  `;
}