import { useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Shared viewport animation variants used across all sections.
 * Import these instead of defining local ones per component.
 */

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeUpFastVariant = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
};

export const scaleInVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1, scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer = (stagger = 0.1, delay = 0.05) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/**
 * useScrollReveal — returns a ref and whether the element has entered view.
 * Simpler alternative to whileInView when you need imperative control.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15, ...options });
  return { ref, isInView };
}
