import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const gsapPresets = {
  heroParallax: (container: HTMLElement | string) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      },
    });
    tl.to(container, { yPercent: -10, ease: 'none' }, 0);
    return tl;
  },

  skillBarAnimate: (barRef: HTMLElement) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: barRef,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
    tl.fromTo(barRef, { width: '0%' }, { width: '100%', duration: 1, ease: 'power2.out' }, 0);
    return tl;
  },

  projectGrid: (gridRef: HTMLElement) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: gridRef,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
    tl.from(gridRef.querySelectorAll('.project-card'), {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power2.out',
    });
    return tl;
  },

  textStagger: (container: HTMLElement) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
    tl.from(container.querySelectorAll('.stagger-text'), {
      opacity: 0,
      y: 20,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power2.out',
    });
    return tl;
  },

  fadeInUp: (element: HTMLElement) => {
    return gsap.from(element, {
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: 'power2.out',
    });
  },
};

export const cleanupGSAP = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

export default gsapPresets;
