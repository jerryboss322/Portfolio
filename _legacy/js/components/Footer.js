/**
 * Footer.js — Site footer component
 */

export function renderFooter() {
  const currentYear = new Date().getFullYear();
  return `
    <footer class="site-footer container arrive">
      <div class="footer-divider"></div>
      <div class="footer-content">
        <div class="footer-left">
          <span class="meta">© ${currentYear} JBOSS</span>
          <span class="footer-status meta">● Available for select contracts</span>
        </div>
        <div class="footer-right">
          <button class="secondary-button scroll-top" data-action="scroll" data-target="home">
            ↑ Back to top
          </button>
        </div>
      </div>
    </footer>
  `;
}
