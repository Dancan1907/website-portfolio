// ──────────────────────────────────────────────────────────────
// ABOUT PAGE
// ──────────────────────────────────────────────────────────────
//
// This page displays your personal story, interests,
// quick facts, and current focus.
//
// Data Sources:
// - Profile (name, title, bio, location, email)
// - Experience (for career highlights)
// - Education (for academic background)
// ──────────────────────────────────────────────────────────────

import { apiClient } from "@/lib/api";
import { Navbar } from "@/components/shared/navbar";

// ──────────────────────────────────────────────────────────
// Fetch profile data from the backend
// ──────────────────────────────────────────────────────────

async function getProfile() {
  try {
    const response = await apiClient.get("/profile");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return null;
  }
}

// ──────────────────────────────────────────────────────────
// Fetch experience data for career highlights
// ──────────────────────────────────────────────────────────

async function getExperience() {
  try {
    const response = await apiClient.get("/experience");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch experience:", error);
    return [];
  }
}

// ──────────────────────────────────────────────────────────
// Fetch education data for academic background
// ──────────────────────────────────────────────────────────

async function getEducation() {
  try {
    const response = await apiClient.get("/education");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch education:", error);
    return [];
  }
}

// ──────────────────────────────────────────────────────────
// About Page Component
// ──────────────────────────────────────────────────────────

export default async function AboutPage() {
  // Fetch all data in parallel
  const [profile, experience, education] = await Promise.all([
    getProfile(),
    getExperience(),
    getEducation(),
  ]);

  // Determine current role from experience
  const currentRole = experience?.find((exp: any) => exp.isPresent);

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* ────────────────────────────────────────── */}
        {/* Section Header */}
        {/* ────────────────────────────────────────── */}

        <div className="mb-12">
          <p className="text-sm font-medium text-indigo-600">About Me</p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            Get to know me beyond the code.
          </h1>
        </div>

        {/* ────────────────────────────────────────── */}
        {/* Introduction & Story */}
        {/* ────────────────────────────────────────── */}

        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Left: Photo/Placeholder */}
          <div className="md:col-span-2 flex justify-center">
            <div className="w-48 h-48 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-5xl">
              {profile?.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile?.name || "Profile"}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-indigo-600">
                  {profile?.name?.charAt(0) || "DK"}
                </span>
              )}
            </div>
          </div>

          {/* Right: Content */}
          <div className="md:col-span-3 space-y-4">
            <h2 className="text-2xl font-bold">
              {profile?.name || "Dancan Kalerwa"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {profile?.bio ||
                "Computer Science student with a passion for designing scalable software and solving complex problems through technology."}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              My journey began in 2022 when I enrolled in Computer Science. By
              2023, I had built my first web application, which ignited my
              passion for backend engineering. In 2024, I dove deep into system
              architecture and API design, and by 2025, I was exploring AI and
              cloud technologies. Today, I focus on building scalable software
              projects that solve real-world problems.
            </p>
          </div>
        </div>

        {/* ────────────────────────────────────────── */}
        {/* Areas of Interest */}
        {/* ────────────────────────────────────────── */}

        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Areas of Interest</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Backend Engineering",
              "Artificial Intelligence",
              "Cloud Computing",
              "API Development",
              "Mobile Applications",
              "DevOps",
            ].map((interest) => (
              <span
                key={interest}
                className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* ────────────────────────────────────────── */}
        {/* Quick Facts + Current Focus (Side by Side) */}
        {/* ────────────────────────────────────────── */}

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Quick Facts Card */}
          <div className="p-6 border rounded-lg bg-white dark:bg-gray-900/50">
            <h3 className="text-lg font-semibold mb-4">Quick Facts</h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Education:</span> BSc in Computer
                Science
              </p>
              <p>
                <span className="font-medium">Focus:</span> Backend Engineering
              </p>
              <p>
                <span className="font-medium">Location:</span>{" "}
                {profile?.location || "Kenya"}
              </p>
              <p>
                <span className="font-medium">Languages:</span> English, Swahili
              </p>
              <p>
                <span className="font-medium">Current Goal:</span> Software
                Engineering Internship
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                {currentRole
                  ? "Working at " + currentRole.organization
                  : "Student"}
              </p>
            </div>
          </div>

          {/* Current Focus Card */}
          <div className="p-6 border rounded-lg bg-indigo-50 dark:bg-indigo-900/20">
            <h3 className="text-lg font-semibold mb-4">🔥 Current Focus</h3>
            <div className="space-y-2 text-sm">
              <p>• Microservices</p>
              <p>• Docker</p>
              <p>• Cloud Deployment</p>
              <p>• AI Integrations</p>
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────── */}
        {/* Call to Action */}
        {/* ────────────────────────────────────────── */}

        <div className="text-center pt-4">
          <a
            href="/projects"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            View My Projects
          </a>
        </div>
      </main>
    </>
  );
}
