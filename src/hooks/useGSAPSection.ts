import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseGSAPOptions {
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean;
  once?: boolean;
}

export const useGSAPSection = (
  callback: (scope: gsap.Context) => void,
  deps: React.DependencyList = [],
  options: UseGSAPOptions = {}
) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(callback, ref.current);

    return () => {
      ctx.revert();
    };
  }, deps);

  return ref;
};

export const useParallax = (speed: number = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = ref.current;
    if (!current) return undefined;

    const animation = gsap.fromTo(
      current,
      { y: -speed * 100 },
      {
        y: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    return () => {
      void animation.kill();
    };
  }, [speed]);

  return ref;
};

export default useGSAPSection;
