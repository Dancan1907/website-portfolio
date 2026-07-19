"use client";

import { useEffect } from "react";

export function ThemeScript() {
  useEffect(() => {
    // This runs only on the client, avoiding hydration issues
    const theme = localStorage.getItem("theme") || "system";
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  return null;
}
