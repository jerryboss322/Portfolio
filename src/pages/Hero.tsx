import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const HeroCanvas = lazy(() => import('@/components/canvas/HeroCanvas'));

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const Hero = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.section
      ref={ref}
      id="hero"
      className="hero min-h-screen flex items-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0">
        {!isMobile && !prefersReducedMotion() && (
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        )}
      </div>
      <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] max-w-[80vw] rounded-full bg-accent/25 blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="eyebrow inline-block mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            JBOSS / Portfolio
          </motion.span>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 font-display"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Engineering detail into digital products.
          </motion.h1>

          <motion.p
            className="text-lg max-w-2xl mx-auto mb-8 leading-relaxed text-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Crafting high-fidelity interfaces & interactive tools. Building digital infrastructure
            with visual clarity, performance, and intentional motion.
          </motion.p>

          <motion.div
            className="hero-actions flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.button
              onClick={() => scrollTo('work')}
              className="cta-glow primary-button px-8 py-3 text-base font-semibold flex items-center gap-2 justify-center"
              whileTap={{ scale: 0.97 }}
            >
              View My Work
              <ArrowRight size={18} />
            </motion.button>

            <motion.button
              onClick={() => scrollTo('contact')}
              className="secondary-button px-8 py-3 text-base font-semibold"
              whileTap={{ scale: 0.97 }}
            >
              Get in Touch
            </motion.button>
          </motion.div>

          <motion.div
            className="stats-grid grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div className="stat">
              <div className="stat-number">5+</div>
              <div className="stat-label">Systems Shipped</div>
            </motion.div>
            <motion.div className="stat">
              <div className="stat-number">60%</div>
              <div className="stat-label">Debt Reduction</div>
            </motion.div>
            <motion.div className="stat">
              <div className="stat-number">100%</div>
              <div className="stat-label">Native Frontend</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
