import React, { useRef } from 'react';
import { useCoarsePointer, useIdleCallback, useReducedMotion } from '@/lib/hooks';
import { FRAG, VERT } from './shaders/coreScene';

const MAX_FPS = 40;
const FRAME_BUDGET = 1000 / MAX_FPS;

/* Fraction of CSS pixels the shader actually renders. The canvas is CSS-upscaled,
   so the raymarch gets a smaller framebuffer than the layout box. The floor
   matters: below ~0.5 the thin orbital rings and the starfield alias badly. */
const SCALE_HIGH = 1;
const SCALE_LOW = 0.5;
const SCALE_START = 0.62;

/* Adaptive quality. Only drop resolution once frames are clearly missing the
   budget — a threshold set near the budget itself would downscale constantly. */
const FRAME_SLOW = 30;
const FRAME_FAST = 20;

const compile = (gl: WebGL2RenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source.trim());
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

/**
 * Hero background: one raymarched fragment shader on a single fullscreen
 * triangle. No geometry, no scene graph, no library.
 *
 * Performance contract:
 *  - Rendered at a fraction of CSS resolution, upscaled by the compositor.
 *  - Capped at 40fps and adaptively dropped toward 0.42x when frames run long.
 *  - Fully paused when the hero leaves the viewport or the tab is hidden.
 *  - Boots on idle so it never competes with first paint.
 *  - Falls back to a static CSS gradient without WebGL2 or on reduced motion.
 */
export const HeroCanvas: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const narrow = useCoarsePointer();
  const enabled = !reduced && !narrow;

  useIdleCallback(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }

    /* No attributes are used, but WebGL2 still wants a VAO bound to draw. */
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.useProgram(program);

    const uRes = gl.getUniformLocation(program, 'uRes');
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uPointer = gl.getUniformLocation(program, 'uPointer');
    const uScroll = gl.getUniformLocation(program, 'uScroll');

    const pointer = { x: 0, y: 0 };
    const pointerTarget = { x: 0, y: 0 };

    let scale = SCALE_START;
    let rafId = 0;
    let running = false;
    let onScreen = true;
    let hidden = document.hidden;
    let lost = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(wrapper.clientWidth * scale * Math.min(dpr, 1.5)));
      const h = Math.max(1, Math.round(wrapper.clientHeight * scale * Math.min(dpr, 1.5)));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      pointerTarget.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerTarget.y = -(event.clientY / window.innerHeight - 0.5) * 2;
    };
    const onPointerLeave = () => {
      pointerTarget.x = 0;
      pointerTarget.y = 0;
    };
    const onVisibility = () => {
      hidden = document.hidden;
      if (!hidden && onScreen) start();
    };
    const onContextLost = (event: Event) => {
      event.preventDefault();
      lost = true;
      stop();
    };
    const onContextRestored = () => {
      lost = false;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen && !hidden) start();
        else stop();
      },
      { threshold: 0 }
    );
    observer.observe(wrapper);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (onScreen && !hidden) start();
    });
    resizeObserver.observe(wrapper);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    canvas.addEventListener('webglcontextlost', onContextLost);
    canvas.addEventListener('webglcontextrestored', onContextRestored);

    const start = () => {
      if (running || lost) return;
      running = true;
      rafId = requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    const startTime = performance.now();
    let lastTime = 0;
    let smoothed = FRAME_FAST;

    const frame = (now: number) => {
      if (!running) return;

      const elapsed = now - lastTime;
      if (elapsed < FRAME_BUDGET) {
        rafId = requestAnimationFrame(frame);
        return;
      }
      lastTime = now;

      if (elapsed > 0 && elapsed < 200) {
        smoothed = smoothed * 0.9 + elapsed * 0.1;
        if (smoothed > FRAME_SLOW && scale > SCALE_LOW) {
          scale = Math.max(SCALE_LOW, scale - 0.06);
          resize();
        } else if (smoothed < FRAME_FAST && scale < SCALE_HIGH) {
          scale = Math.min(SCALE_HIGH, scale + 0.035);
          resize();
        }
      }

      pointer.x += (pointerTarget.x - pointer.x) * 0.05;
      pointer.y += (pointerTarget.y - pointer.y) * 0.05;

      const scroll = Math.min(
        1,
        Math.max(0, window.scrollY / Math.max(wrapper.clientHeight, 1))
      );

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - startTime) / 1000);
      gl.uniform2f(uPointer, pointer.x, pointer.y);
      gl.uniform1f(uScroll, scroll);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      rafId = requestAnimationFrame(frame);
    };

    resize();
    start();

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
    };
  }, [enabled]);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 55% at 62% 38%, rgba(0,119,255,0.22), transparent 62%),' +
            'radial-gradient(45% 45% at 22% 78%, rgba(0,240,255,0.12), transparent 65%),' +
            '#02040A',
        }}
      />
      {enabled && (
        <canvas
          ref={canvasRef}
          className="relative h-full w-full opacity-[0.40] transition-opacity duration-1000"
        />
      )}
    </div>
  );
};

export default HeroCanvas;
