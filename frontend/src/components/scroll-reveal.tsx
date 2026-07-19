// ──────────────────────────────────────────────────────────────
// SCROLL REVEAL
// ──────────────────────────────────────────────────────────────
//
// Animates elements when they scroll into view.
// ──────────────────────────────────────────────────────────────

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
