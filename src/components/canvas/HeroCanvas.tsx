import React, { useEffect, useRef } from 'react';

/**
 * Three.js hero background — starfield point cloud, wireframe torus and a
 * metallic cylinder lit in the reference palette (#0077FF / #00F0FF).
 * Loaded lazily and only enabled on desktop with motion allowed.
 */
export const HeroCanvas: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || window.innerWidth < 1024) return;

    const probe = document.createElement('canvas');
    const gl = probe.getContext('webgl2') || probe.getContext('webgl');
    if (!gl) return;

    let cleanup: (() => void) | undefined;

    void import('three').then((THREE) => {
      const wrapper = wrapperRef.current;
      const canvas = canvasRef.current;
      if (!wrapper || !canvas) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        wrapper.clientWidth / wrapper.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 6;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
      renderer.setClearColor(0x000000, 0);

      scene.add(new THREE.AmbientLight(0xffffff, 0.6));

      const directional = new THREE.DirectionalLight(0x0077ff, 1.2);
      directional.position.set(2, 5, 3);
      scene.add(directional);

      const point = new THREE.PointLight(0x00f0ff, 0.8, 20);
      point.position.set(-2, -1, 4);
      scene.add(point);

      const torusGeo = new THREE.TorusGeometry(1.8, 1);
      const torusMat = new THREE.MeshStandardMaterial({
        color: 0x0077ff,
        wireframe: true,
        emissive: 0x0077ff,
        emissiveIntensity: 0.15,
        transparent: true,
        opacity: 0.18,
      });
      const torus = new THREE.Mesh(torusGeo, torusMat);
      torus.position.set(-1.2, 0.3, 0);
      scene.add(torus);

      const cylinderGeo = new THREE.CylinderGeometry(0.6, 0.18, 120, 16);
      const cylinderMat = new THREE.MeshStandardMaterial({
        color: 0x00f0ff,
        metalness: 0.7,
        roughness: 0.2,
        transparent: true,
        opacity: 0.25,
      });
      const cylinder = new THREE.Mesh(cylinderGeo, cylinderMat);
      cylinder.position.set(2.5, -0.8, 0.5);
      scene.add(cylinder);

      const count = 600;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const radius = 8 * Math.cbrt(Math.random());
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
      }
      const pointsGeo = new THREE.BufferGeometry();
      pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const pointsMat = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x94a3b8,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true,
      });
      const points = new THREE.Points(pointsGeo, pointsMat);
      scene.add(points);

      const target = { x: 0, y: 0 };
      const current = { x: 0, y: 0 };
      let hidden = false;
      let visible = true;

      const onMouse = (event: MouseEvent) => {
        if (!visible) return;
        target.x = (event.clientX / window.innerWidth - 0.5) * 0.6;
        target.y = (event.clientY / window.innerHeight - 0.5) * 0.6;
      };
      const onVisibility = () => {
        hidden = document.hidden;
      };
      window.addEventListener('mousemove', onMouse, { passive: true });
      document.addEventListener('visibilitychange', onVisibility);

      let rafId = 0;
      let running = false;
      const animate = () => {
        if (hidden || !visible || running) return;
        running = true;
        rafId = requestAnimationFrame(() => {
          running = false;
          if (hidden || !visible) return;
          current.x += (target.x - current.x) * 0.05;
          current.y += (target.y - current.y) * 0.05;

          torus.rotation.x += 0.003;
          torus.rotation.y += 0.005;
          torus.rotation.x += current.y * 0.02;
          torus.rotation.y += current.x * 0.02;

          cylinder.rotation.x -= 0.004;
          cylinder.rotation.y -= 0.006;
          cylinder.rotation.x += current.y * 0.015;
          cylinder.rotation.y += current.x * 0.015;

          points.rotation.y += 0.0008;
          points.rotation.y += current.x * 0.005;
          points.rotation.x += current.y * 0.003;

          renderer.render(scene, camera);
          animate();
        });
      };
      animate();

      const observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible) {
            target.x = 0;
            target.y = 0;
            animate();
          }
        },
        { threshold: 0 }
      );
      observer.observe(wrapper);

      const onResize = () => {
        if (!wrapper) return;
        camera.aspect = wrapper.clientWidth / wrapper.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
      };
      window.addEventListener('resize', onResize);

      cleanup = () => {
        cancelAnimationFrame(rafId);
        observer.disconnect();
        window.removeEventListener('mousemove', onMouse);
        window.removeEventListener('resize', onResize);
        document.removeEventListener('visibilitychange', onVisibility);
        torusGeo.dispose();
        torusMat.dispose();
        cylinderGeo.dispose();
        cylinderMat.dispose();
        pointsGeo.dispose();
        pointsMat.dispose();
        renderer.dispose();
      };
    });

    return () => cleanup?.();
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 opacity-[0.9]"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
};
