import React from "react";
import { motion, type Transition } from "framer-motion";

const EASE = [0.4, 0, 0.2, 1] as const;

const pageTransition: Transition = {
  duration: 0.25,
  ease: EASE
};

const PAGE_VARIANTS = {
  initial: {
    opacity: 0,
    filter: "blur(2px)"
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    transition: pageTransition
  },
  exit: {
    opacity: 0,
    filter: "blur(2px)",
    transition: pageTransition
  }
};

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, className }) => (
  <motion.div
    variants={PAGE_VARIANTS}
    initial="initial"
    animate="animate"
    exit="exit"
    className={className}
  >
    {children}
  </motion.div>
);

PageTransition.displayName = "PageTransition";

export { EASE };
export default PageTransition;
