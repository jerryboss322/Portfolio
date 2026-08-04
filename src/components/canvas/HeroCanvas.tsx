import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { threeConfig } from '@/lib/three-config';

function IcosahedronMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, 2), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(threeConfig.materialColor),
        emissive: new THREE.Color(threeConfig.emissiveColor),
        emissiveIntensity: 0.2,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.9,
      }),
    []
  );

  const mouse = useRef({ x: 0, y: 0 });

  // Mouse-based subtle rotation with smoothing (±5°)
  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      const targetRotationX = mouse.current.y * threeConfig.mouseSensitivity;
      const targetRotationY = mouse.current.x * threeConfig.mouseSensitivity;

      meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} material={material}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color={threeConfig.accentColor} />
    </mesh>
  );
};

function Scene() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { prefersReduced } = useReducedMotion();

  if (prefersReduced || !isDesktop) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 3] }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <color attach="background" args={['transparent']} />
        <fog attach="fog" args={['#02040a', 5, 15]} />
        <IcosahedronMesh />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate
        />
      </Suspense>
    </Canvas>
  );
};

export const HeroCanvas: React.FC = () => {
  const { prefersReduced } = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (prefersReduced || !isDesktop) return null;

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <Scene />
      </div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${threeConfig.accentColor} 0%, transparent 70%)`,
        }}
      />
    </div>
  );
};

export default HeroCanvas;
