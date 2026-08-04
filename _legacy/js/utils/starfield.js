/**
 * starfield.js — Premium Constellation Network Canvas Background
 * Twinkling particles, responsive constellation links, and reactive mouse connections.
 */

export function initStarfield() {
  if (typeof window === 'undefined') return;

  const canvas = document.createElement('canvas');
  canvas.id = 'starfield-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const maxDistance = 110; // Max distance for drawing links
  const particleCount = Math.min(120, Math.floor((width * height) / 10000));
  
  let mouse = { x: null, y: null, targetX: null, targetY: null, active: false };

  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.12 + 0.03,
      baseOpacity: Math.random() * 0.5 + 0.2,
      opacity: 0,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2,
      depth: Math.random() * 1.2 + 0.4, // Parallax depth factor
    });
  }

  // Track mouse position and status
  window.addEventListener('pointermove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    if (mouse.x === null) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    mouse.active = true;
  });

  window.addEventListener('pointerleave', () => {
    mouse.active = false;
  });

  // Handle window resizing
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  function animate(timestamp) {
    ctx.clearRect(0, 0, width, height);

    // Smoothly interpolate mouse position if active
    if (mouse.active && mouse.targetX !== null) {
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;
    }

    // Center offsets for parallax based on mouse
    const offsetX = mouse.active ? (mouse.x - width / 2) * 0.015 : 0;
    const offsetY = mouse.active ? (mouse.y - height / 2) * 0.015 : 0;

    // Update positions and draw connections (Constellations)
    const activeParticles = particles.map(p => {
      // Apply parallax position mapping
      return {
        ...p,
        cx: p.x + offsetX * p.depth,
        cy: p.y + offsetY * p.depth,
        // Twinkle opacity mapping
        currentOpacity: Math.max(0.1, p.baseOpacity + Math.sin(timestamp * p.twinkleSpeed + p.phase) * 0.2)
      };
    });

    // Draw constellation lines between nearby stars
    for (let i = 0; i < activeParticles.length; i++) {
      const pi = activeParticles[i];
      for (let j = i + 1; j < activeParticles.length; j++) {
        const pj = activeParticles[j];
        const dx = pi.cx - pj.cx;
        const dy = pi.cy - pj.cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.06;
          ctx.beginPath();
          ctx.moveTo(pi.cx, pi.cy);
          ctx.lineTo(pj.cx, pj.cy);
          ctx.strokeStyle = `rgba(0, 140, 255, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      // Draw faint connection rays from mouse to nearby stars
      if (mouse.active && mouse.x !== null) {
        const dx = pi.cx - mouse.x;
        const dy = pi.cy - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const alpha = (1 - dist / 150) * 0.08;
          ctx.beginPath();
          ctx.moveTo(pi.cx, pi.cy);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    // Draw the individual stars
    activeParticles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.cx, p.cy, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180, 220, 255, ${p.currentOpacity})`;
      ctx.shadowBlur = p.size * 1.5;
      ctx.shadowColor = 'rgba(0, 140, 255, 0.4)';
      ctx.fill();

      // Slow drift particle movement
      p.y -= p.speed;
      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
    });

    ctx.shadowBlur = 0;
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
