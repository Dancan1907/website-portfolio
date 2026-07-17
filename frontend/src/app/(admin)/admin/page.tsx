// ──────────────────────────────────────────────────────────────
// ADMIN DASHBOARD HOME
// ──────────────────────────────────────────────────────────────
//
// This page displays an overview of all content with statistics.
// It fetches data from multiple API endpoints.
// ──────────────────────────────────────────────────────────────

import { apiClient } from "@/lib/api";
import {
  Code2,
  FolderOpen,
  Briefcase,
  GraduationCap,
  MessageSquare,
} from "lucide-react";

// ──────────────────────────────────────────────────────────
// Fetch all data for dashboard stats
// ──────────────────────────────────────────────────────────

async function getDashboardData() {
  try {
    const [skills, projects, experience, education, messages] =
      await Promise.all([
        apiClient.get("/skills"),
        apiClient.get("/projects"),
        apiClient.get("/experience"),
        apiClient.get("/education"),
        apiClient.get("/contact"),
      ]);

    return {
      skills: skills.data || [],
      projects: projects.data || [],
      experience: experience.data || [],
      education: education.data || [],
      messages: messages.data || [],
    };
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return {
      skills: [],
      projects: [],
      experience: [],
      education: [],
      messages: [],
    };
  }
}

// ──────────────────────────────────────────────────────────
// Stat Card Component
// ──────────────────────────────────────────────────────────

function StatCard({
  title,
  count,
  icon: Icon,
  color,
}: {
  title: string;
  count: number;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="rounded-lg border bg-white dark:bg-gray-900 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <p className="text-3xl font-bold mt-1">{count}</p>
        </div>
        <div className={cn("rounded-full p-3", color)}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// Dashboard Page Component
// ──────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const data = await getDashboardData();

  const stats = [
    {
      title: "Skills",
      count: data.skills.length,
      icon: Code2,
      color: "bg-indigo-500",
    },
    {
      title: "Projects",
      count: data.projects.length,
      icon: FolderOpen,
      color: "bg-blue-500",
    },
    {
      title: "Experience",
      count: data.experience.length,
      icon: Briefcase,
      color: "bg-green-500",
    },
    {
      title: "Education",
      count: data.education.length,
      icon: GraduationCap,
      color: "bg-purple-500",
    },
    {
      title: "Messages",
      count: data.messages.length,
      icon: MessageSquare,
      color: "bg-rose-500",
    },
  ];

  // Get unread messages count
  const unreadMessages = data.messages.filter((m: any) => !m.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Welcome back! Here's an overview of your portfolio content.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Quick Actions / Unread Messages */}
      <div className="rounded-lg border bg-white dark:bg-gray-900 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Unread Messages</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {unreadMessages} message{unreadMessages !== 1 ? "s" : ""} waiting
              for your response
            </p>
          </div>
          <a
            href="/admin/messages"
            className="text-sm text-indigo-600 hover:underline"
          >
            View all →
          </a>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// Import cn utility (add this at the top)
// ──────────────────────────────────────────────────────────

import { cn } from "@/lib/utils";
