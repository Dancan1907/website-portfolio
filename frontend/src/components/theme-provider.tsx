// ──────────────────────────────────────────────────────────────
// THEME PROVIDER
// ──────────────────────────────────────────────────────────────
//
// This wraps the application to enable dark/light mode switching.
// It uses next-themes to persist the user's preference.
// ──────────────────────────────────────────────────────────────

"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
