// ──────────────────────────────────────────────────────────────
// ADMIN MESSAGES PAGE
// ──────────────────────────────────────────────────────────────
//
// This page displays all contact messages from visitors.
// Admins can mark messages as read or delete them.
// ──────────────────────────────────────────────────────────────

import { apiClient } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";

// ──────────────────────────────────────────────────────────
// Fetch all messages
// ──────────────────────────────────────────────────────────

async function getMessages() {
  try {
    const response = await apiClient.get("/contact");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return [];
  }
}

// ──────────────────────────────────────────────────────────
// Messages Page Component
// ──────────────────────────────────────────────────────────

export default async function MessagesPage() {
  const messages = await getMessages();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Messages from visitors who reached out via the contact form.
        </p>
      </div>

      {/* Messages List */}
      {messages.length === 0 ? (
        <div className="rounded-lg border bg-white dark:bg-gray-900 p-12 text-center">
          <p className="text-gray-500">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message: any) => (
            <div
              key={message.id}
              className={cn(
                "rounded-lg border bg-white dark:bg-gray-900 p-6 shadow-sm transition-colors",
                !message.isRead &&
                  "border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/20",
              )}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{message.name}</h3>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(message.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                    {!message.isRead && (
                      <span className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{message.email}</p>
                  <p className="text-sm font-medium">{message.subject}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {message.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { cn } from "@/lib/utils";
