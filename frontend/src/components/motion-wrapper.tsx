// ──────────────────────────────────────────────────────────────
// MOTION WRAPPER
// ──────────────────────────────────────────────────────────────
//
// This file contains all Framer Motion components used throughout
// the portfolio for consistent animations.
// ──────────────────────────────────────────────────────────────

"use client";

import { motion } from "framer-motion";

// ──────────────────────────────────────────────────────────────
// 1. PAGE TRANSITIONS
// Used for page-level entrance and exit animations
// ──────────────────────────────────────────────────────────────

const pageVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.3 },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      // ✅ Removed "ease": "easeOut" to fix TypeScript error
      delay: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 }, // ✅ Removed "ease": "easeIn"
  },
};

export function MotionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────
// 2. STAGGERED CONTAINER
// Used for lists where items should appear one by one
// ──────────────────────────────────────────────────────────────

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3 }, // ✅ Removed "ease": "easeOut"
  },
};

export function StaggeredContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}
