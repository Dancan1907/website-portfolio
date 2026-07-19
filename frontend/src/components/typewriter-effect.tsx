// ──────────────────────────────────────────────────────────────
// TYPEWRITER EFFECT
// ──────────────────────────────────────────────────────────────
//
// A typewriter animation for the hero section.
// ──────────────────────────────────────────────────────────────

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const words = [
  "Backend Developer",
  "AI Enthusiast",
  "Flutter Developer",
  "Open Source Contributor",
];

export function TypewriterEffect() {
  const [index, setIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const word = words[index];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(word.substring(0, currentText.length + 1));
        setSpeed(150);
        if (currentText.length === word.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setCurrentText(word.substring(0, currentText.length - 1));
        setSpeed(50);
        if (currentText.length === 0) {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % words.length);
          setSpeed(150);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, index, speed, words]);

  return (
    <span className="text-indigo-600">
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-0.5 h-6 bg-indigo-600 ml-1"
      />
    </span>
  );
}
