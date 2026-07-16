// ──────────────────────────────────────────────────────────────
// HOME PAGE
// ──────────────────────────────────────────────────────────────
//
// This is the public homepage that displays the Hero section.
// It fetches profile data from the backend API.
// ──────────────────────────────────────────────────────────────

import { apiClient } from "@/lib/api";
import { Navbar } from "@/components/shared/navbar";

async function getProfile() {
  try {
    const response = await apiClient.get("/profile");
    return response.data;
  } catch (error) {
    return null;
  }
}

export default async function HomePage() {
  const profile = await getProfile();

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-4">
            <p className="text-sm font-medium text-indigo-600">👋 Hello, I'm</p>
            <h1 className="text-4xl md:text-5xl font-bold">
              {profile?.name || "Dancan Kalerwa"}
            </h1>
            <h2 className="text-xl text-gray-600 dark:text-gray-300">
              {profile?.title ||
                "Computer Science Student | Aspiring Software Engineer"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-lg">
              {profile?.bio ||
                "I build scalable backend systems, AI-powered applications, and modern web experiences with a focus on solving real-world problems through software."}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/projects"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                View Projects
              </a>
              <a
                href={profile?.resumeUrl || "#"}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                Download Resume
              </a>
            </div>
            <div className="flex gap-4 pt-4">
              {profile?.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600"
                >
                  GitHub
                </a>
              )}
              {profile?.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-64 h-64 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-6xl">
              {profile?.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-indigo-600">DK</span>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
