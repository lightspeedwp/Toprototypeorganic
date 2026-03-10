/**
 * Animation Utilities
 * 
 * Reusable animation configurations for Motion (Framer Motion).
 * Provides consistent, accessible animations across the application.
 * 
 * @module animations
 * @category utils
 */

import { Variants, Transition } from 'motion/react';

/**
 * Fade in animation.
 * 
 * @example
 * ```tsx
 * import { motion } from 'motion/react';
 * import { fadeIn } from "../utils/animations";
 * 
 * <motion.div variants={fadeIn} initial="hidden" animate="visible">
 *   Content
 * </motion.div>
 * ```
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/**
 * Fade in with upward motion.
 * 
 * @param distance - Distance to move (in pixels)
 */
export const fadeInUp = (distance: number = 20): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: { opacity: 1, y: 0 },
});

/**
 * Fade in with downward motion.
 * 
 * @param distance - Distance to move (in pixels)
 */
export const fadeInDown = (distance: number = 20): Variants => ({
  hidden: { opacity: 0, y: -distance },
  visible: { opacity: 1, y: 0 },
});

/**
 * Fade in from left.
 * 
 * @param distance - Distance to move (in pixels)
 */
export const fadeInLeft = (distance: number = 20): Variants => ({
  hidden: { opacity: 0, x: -distance },
  visible: { opacity: 1, x: 0 },
});

/**
 * Fade in from right.
 * 
 * @param distance - Distance to move (in pixels)
 */
export const fadeInRight = (distance: number = 20): Variants => ({
  hidden: { opacity: 0, x: distance },
  visible: { opacity: 1, x: 0 },
});

/**
 * Scale up animation.
 * 
 * @param scale - Initial scale value
 */
export const scaleIn = (scale: number = 0.9): Variants => ({
  hidden: { opacity: 0, scale },
  visible: { opacity: 1, scale: 1 },
});

/**
 * Stagger container animation.
 * 
 * @param staggerDelay - Delay between children (in seconds)
 * 
 * @example
 * ```tsx
 * <motion.div variants={staggerContainer(0.1)} initial="hidden" animate="visible">
 *   <motion.div variants={fadeInUp()}>Child 1</motion.div>
 *   <motion.div variants={fadeInUp()}>Child 2</motion.div>
 *   <motion.div variants={fadeInUp()}>Child 3</motion.div>
 * </motion.div>
 * ```
 */
export const staggerContainer = (staggerDelay: number = 0.1): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

/**
 * Slide in from direction.
 * 
 * @param direction - Direction to slide from
 * @param distance - Distance to slide (in pixels)
 */
export const slideIn = (
  direction: 'up' | 'down' | 'left' | 'right',
  distance: number = 100
): Variants => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance };
      case 'down': return { y: -distance };
      case 'left': return { x: -distance };
      case 'right': return { x: distance };
    }
  };

  return {
    hidden: { ...getInitialPosition(), opacity: 0 },
    visible: { x: 0, y: 0, opacity: 1 },
  };
};

/**
 * Bounce animation.
 */
export const bounce: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 10,
    },
  },
};

/**
 * Rotate in animation.
 * 
 * @param degrees - Degrees to rotate from
 */
export const rotateIn = (degrees: number = -180): Variants => ({
  hidden: { opacity: 0, rotate: degrees },
  visible: { opacity: 1, rotate: 0 },
});

/**
 * Expand animation (for accordions, etc.).
 */
export const expand: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: 'auto', opacity: 1 },
};

/**
 * Collapse animation.
 */
export const collapse: Variants = {
  visible: { height: 'auto', opacity: 1 },
  hidden: { height: 0, opacity: 0 },
};

/**
 * Shake animation (for errors).
 */
export const shake: Variants = {
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.5 },
  },
};

/**
 * Pulse animation.
 */
export const pulse: Variants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: { duration: 0.5, repeat: Infinity },
  },
};

/**
 * Common transition configurations.
 */
export const transitions = {
  /** Fast transition (150ms) */
  fast: { duration: 0.15 } as Transition,
  
  /** Default transition (300ms) */
  default: { duration: 0.3 } as Transition,
  
  /** Slow transition (500ms) */
  slow: { duration: 0.5 } as Transition,
  
  /** Spring transition (bouncy) */
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 20,
  } as Transition,
  
  /** Smooth spring transition */
  smoothSpring: {
    type: 'spring',
    stiffness: 100,
    damping: 15,
  } as Transition,
  
  /** Ease out transition */
  easeOut: {
    duration: 0.3,
    ease: 'easeOut',
  } as Transition,
  
  /** Ease in transition */
  easeIn: {
    duration: 0.3,
    ease: 'easeIn',
  } as Transition,
  
  /** Ease in-out transition */
  easeInOut: {
    duration: 0.3,
    ease: 'easeInOut',
  } as Transition,
};

/**
 * Page transition variants.
 * 
 * @example
 * ```tsx
 * <motion.div
 *   variants={pageTransition}
 *   initial="initial"
 *   animate="animate"
 *   exit="exit"
 * >
 *   Page content
 * </motion.div>
 * ```
 */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

/**
 * Modal transition variants.
 */
export const modalTransition: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

/**
 * Drawer transition variants.
 * 
 * @param direction - Direction drawer slides from
 */
export const drawerTransition = (
  direction: 'left' | 'right' | 'top' | 'bottom' = 'right'
): Variants => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'left': return { x: '-100%' };
      case 'right': return { x: '100%' };
      case 'top': return { y: '-100%' };
      case 'bottom': return { y: '100%' };
    }
  };

  return {
    hidden: { ...getInitialPosition() },
    visible: { x: 0, y: 0 },
    exit: { ...getInitialPosition() },
  };
};

/**
 * Toast notification transition.
 */
export const toastTransition: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

/**
 * Hover scale effect.
 * 
 * @example
 * ```tsx
 * <motion.button whileHover={hoverScale}>
 *   Click me
 * </motion.button>
 * ```
 */
export const hoverScale = { scale: 1.05 };

/**
 * Hover lift effect.
 */
export const hoverLift = { y: -4 };

/**
 * Tap effect.
 */
export const tapEffect = { scale: 0.95 };

/**
 * Focus effect.
 */
export const focusEffect = { scale: 1.02 };

/**
 * Reduced motion variants (for accessibility).
 * 
 * These provide simpler animations for users who prefer reduced motion.
 * 
 * @example
 * ```tsx
 * import { useReducedMotion } from 'motion/react';
 * 
 * const prefersReducedMotion = useReducedMotion();
 * const variants = prefersReducedMotion ? reducedMotionFadeIn : fadeInUp();
 * ```
 */
export const reducedMotionFadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.1 } },
};

/**
 * Create custom animation variant.
 * 
 * @param options - Animation options
 * @returns Animation variants
 * 
 * @example
 * ```tsx
 * const customAnimation = createVariant({
 *   hidden: { opacity: 0, scale: 0.8, rotate: -45 },
 *   visible: { opacity: 1, scale: 1, rotate: 0 },
 *   transition: transitions.spring,
 * });
 * ```
 */
export function createVariant(options: {
  hidden: any;
  visible: any;
  transition?: Transition;
}): Variants {
  return {
    hidden: options.hidden,
    visible: {
      ...options.visible,
      transition: options.transition || transitions.default,
    },
  };
}

/**
 * Combine multiple variants.
 * 
 * @param variants - Array of variant objects
 * @returns Combined variants
 * 
 * @example
 * ```tsx
 * const combined = combineVariants(fadeIn, { visible: { scale: 1.1 } });
 * ```
 */
export function combineVariants(...variants: Variants[]): Variants {
  return variants.reduce((acc, variant) => ({
    ...acc,
    ...variant,
  }), {});
}
