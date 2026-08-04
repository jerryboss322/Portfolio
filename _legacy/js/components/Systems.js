export function renderSystems(state) {
  return `
    <section id="systems" class="container section arrive arrive-delay-3">
      <div class="tech-stack-header">
        <p class="tech-stack-eyebrow">Building with the latest technologies.</p>
        <h2>My Tech Stack</h2>
      </div>
      
      <div class="laser-divider"></div>
      
      <div class="tech-stack-grid">
        <div class="tech-badge-container">
          <div class="tech-badge badge-html5" title="HTML5">
            <svg viewBox="0 0 100 100" class="tech-icon">
              <polygon points="20,10 80,10 73,80 50,90 27,80" fill="#E34F26"/>
              <polygon points="50,18 78,18 72,74 50,82" fill="#F16529"/>
              <path d="M50,30 L50,44 L64,44 L63,58 L50,62 L50,75 L67,70 L69,44 L50,44 Z M50,30 L33,30 L35,58 L50,58 L50,44 L47,44 L46,36 L50,36 Z" fill="#FFFFFF"/>
            </svg>
            <div class="tech-glow"></div>
          </div>
          
          <div class="tech-badge badge-css3" title="CSS3">
            <svg viewBox="0 0 100 100" class="tech-icon">
              <polygon points="20,10 80,10 73,80 50,90 27,80" fill="#1572B6"/>
              <polygon points="50,18 78,18 72,74 50,82" fill="#33A9DC"/>
              <path d="M50,30 L50,44 L64,44 L63,58 L50,62 L50,75 L67,70 L69,44 L50,44 Z M50,30 L33,30 L35,58 L50,58 L50,44 L47,44 L46,36 L50,36 Z" fill="#FFFFFF"/>
            </svg>
            <div class="tech-glow"></div>
          </div>
          
          <div class="tech-badge badge-js" title="JavaScript">
            <svg viewBox="0 0 100 100" class="tech-icon">
              <rect width="80" height="80" x="10" y="10" rx="10" fill="#F7DF1E"/>
              <text x="50" y="74" font-family="'Space Grotesk', Arial, sans-serif" font-weight="900" font-size="44" fill="#323330" text-anchor="middle">JS</text>
            </svg>
            <div class="tech-glow"></div>
          </div>
          
          <div class="tech-badge badge-react" title="React.js">
            <svg viewBox="0 0 100 100" class="tech-icon">
              <circle cx="50" cy="50" r="10" fill="#61DAFB"/>
              <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="#61DAFB" stroke-width="4" transform="rotate(0 50 50)"/>
              <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="#61DAFB" stroke-width="4" transform="rotate(60 50 50)"/>
              <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="#61DAFB" stroke-width="4" transform="rotate(120 50 50)"/>
            </svg>
            <div class="tech-glow"></div>
          </div>
          
          <div class="tech-badge badge-git" title="Git">
            <svg viewBox="0 0 100 100" class="tech-icon">
              <rect width="60" height="60" x="20" y="20" rx="10" fill="#F05032" transform="rotate(45 50 50)"/>
              <circle cx="40" cy="50" r="6" fill="#FFFFFF"/>
              <circle cx="60" cy="50" r="6" fill="#FFFFFF"/>
              <circle cx="50" cy="60" r="6" fill="#FFFFFF"/>
              <line x1="40" y1="50" x2="60" y2="50" stroke="#FFFFFF" stroke-width="4"/>
              <line x1="50" y1="50" x2="50" y2="60" stroke="#FFFFFF" stroke-width="4"/>
            </svg>
            <div class="tech-glow"></div>
          </div>
        </div>
      </div>
    </section>
  `;
}