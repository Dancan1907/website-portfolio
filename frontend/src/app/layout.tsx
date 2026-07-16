// ──────────────────────────────────────────────────────────────
// ROOT LAYOUT
// ──────────────────────────────────────────────────────────────
//
// This is the root layout for the entire application.
// It wraps all pages with the QueryProvider and global styles.
// ──────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/query-provider";
import { Toaster } from "sonner"; // ← ADD THIS

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dancan Kalerwa | Software Engineer Portfolio",
  description:
    "Portfolio of Dancan Kalerwa - Computer Science Student & Aspiring Software Engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          {children}
          <Toaster position="top-right" richColors /> {/* ← ADD THIS */}
        </QueryProvider>
      </body>
    </html>
  );
}
