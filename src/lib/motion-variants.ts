import { Variants } from 'framer-motion';

export const easing = {
  expoOut: [0.16, 1, 0.3, 1],
  expoIn: [0.65, 0.05, 0.36, 1],
} as const;

export const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easing.expoOut,
      delay: custom * 0.1,
    },
  }),
};

export const textReveal: Variants = {
  hidden: {
    opacity: 0,
    y: '100%',
  },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easing.expoOut,
      delay: custom * 0.05,
    },
  }),
};

export const charVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easing.expoOut,
      delay: custom * 0.03,
    },
  }),
};

export const cardHover: Variants = {
  rest: { scale: 1, y: 0, boxShadow: '0 0 0px rgba(0,0,0,0)' },
  hover: { scale: 1.03, y: -4, boxShadow: '0 20px 50px rgba(0, 119, 255, 0.2)' },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easing.expoOut } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
};

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});
