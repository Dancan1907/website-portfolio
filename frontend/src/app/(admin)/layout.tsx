// ──────────────────────────────────────────────────────────────
// ADMIN LAYOUT
// ──────────────────────────────────────────────────────────────
//
// This layout wraps all admin pages with the sidebar navigation.
// It checks for authentication and redirects to login if not.
// ──────────────────────────────────────────────────────────────

"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Code2,
  FolderOpen,
  Briefcase,
  GraduationCap,
  MessageSquare,
  LogOut,
  Menu,
  X,
} from "lucide-react";

// ──────────────────────────────────────────────────────────
// Navigation Links
// ──────────────────────────────────────────────────────────

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/skills", label: "Skills", icon: Code2 },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/education", label: "Education", icon: GraduationCap },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
];

// ──────────────────────────────────────────────────────────
// Sidebar Component (Desktop & Mobile)
// ──────────────────────────────────────────────────────────

function Sidebar({
  isMobile,
  onClose,
}: {
  isMobile?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  return (
    <div
      className={cn(
        "flex h-full flex-col bg-gray-900 dark:bg-gray-950 text-white",
        isMobile ? "w-64" : "w-64 fixed inset-y-0 left-0",
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-gray-800">
        <Link href="/admin" className="text-xl font-bold">
          DK<span className="text-indigo-400">.</span>
        </Link>
        <span className="ml-2 text-xs text-gray-400">Admin</span>
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto text-white hover:bg-gray-800"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navLinks.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/admin" && pathname?.startsWith(link.href));
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white",
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-800 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// Admin Layout Component
// ──────────────────────────────────────────────────────────

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ──────────────────────────────────────────────────────────
  // Check authentication on mount
  // ──────────────────────────────────────────────────────────

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isLoginPage = pathname === "/admin/login";

    // If no token and not on login page, redirect to login
    if (!token && !isLoginPage) {
      router.push("/admin/login");
    }
    setIsLoading(false);
  }, [pathname, router]);

  // ──────────────────────────────────────────────────────────
  // If on login page, render without sidebar
  // ──────────────────────────────────────────────────────────

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // ──────────────────────────────────────────────────────────
  // Show loading state
  // ──────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────
  // Main admin layout with sidebar
  // ──────────────────────────────────────────────────────────

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <Sidebar isMobile onClose={() => setIsMobileMenuOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto lg:ml-64">
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-white dark:bg-gray-900 px-4 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <span className="font-semibold">Admin Dashboard</span>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
