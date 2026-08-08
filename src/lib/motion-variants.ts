import { Variants } from 'framer-motion';

export const easing = {
  expoOut: [0.16, 1, 0.3, 1],
  expoIn: [0.65, 0.05, 0.36, 1],
} as const;

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});
