// ──────────────────────────────────────────────────────────────
// ANIMATED CARD
// ──────────────────────────────────────────────────────────────
//
// A card component with hover animations.
// ──────────────────────────────────────────────────────────────

"use client";

import { motion } from "framer-motion";

export function AnimatedCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{
        y: -4,
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        transition: { duration: 0.2 },
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
