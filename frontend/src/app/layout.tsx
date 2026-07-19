import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/query-provider";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeScript } from "@/components/theme-script"; // ← NEW

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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeScript /> {/* ← ADD THIS BEFORE ThemeProvider */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            {children}
            <Toaster position="top-right" richColors />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
