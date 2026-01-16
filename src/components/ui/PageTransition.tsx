import React from "react";
import { motion } from "framer-motion";

const PAGE_VARIANTS = {
  initial: { opacity: 0, y: 8, filter: "blur(2px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, filter: "blur(2px)" },
};

const PAGE_TRANSITION = {
  duration: 0.35,
  ease: [0.25, 0.1, 0.25, 1] as const,
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
    transition={PAGE_TRANSITION}
    className={className}
  >
    {children}
  </motion.div>
);

PageTransition.displayName = "PageTransition";

export default PageTransition;
