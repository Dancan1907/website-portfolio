// ──────────────────────────────────────────────────────────────
// EXPERIENCE PAGE
// ──────────────────────────────────────────────────────────────
//
// This page displays work experience in a timeline format.
// It fetches data from GET /experience endpoint.
// ──────────────────────────────────────────────────────────────

import { apiClient } from "@/lib/api";
import { Navbar } from "@/components/shared/navbar";
import { Badge } from "@/components/ui/badge";

// ──────────────────────────────────────────────────────────
// Fetch experience from the backend
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
// Format date helper
// ──────────────────────────────────────────────────────────

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// ──────────────────────────────────────────────────────────
// Experience Page Component
// ──────────────────────────────────────────────────────────

export default async function ExperiencePage() {
  const experience = await getExperience();

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* ────────────────────────────────────────── */}
        {/* Section Header */}
        {/* ────────────────────────────────────────── */}

        <div className="mb-12">
          <p className="text-sm font-medium text-indigo-600">Experience</p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            My journey of learning, building, and collaborating through software
            engineering.
          </h1>
        </div>

        {/* ────────────────────────────────────────── */}
        {/* Timeline */}
        {/* ────────────────────────────────────────── */}

        <div className="space-y-8">
          {experience.map((exp: any, index: number) => (
            <div
              key={exp.id}
              className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700"
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-9px] top-0 w-4 h-4 bg-indigo-600 rounded-full" />

              {/* Content */}
              <div className="mb-1">
                <h3 className="text-xl font-bold">{exp.role}</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  {exp.organization}
                </p>
                <p className="text-sm text-gray-500">
                  {exp.location || "Remote"} · {formatDate(exp.startDate)} –{" "}
                  {exp.isPresent ? "Present" : formatDate(exp.endDate)}
                </p>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {exp.description}
              </p>

              {/* Responsibilities */}
              {exp.responsibilities?.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium">Responsibilities:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {exp.responsibilities.map((resp: string, i: number) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              {exp.technologies?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {exp.technologies.map((tech: string) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Achievements */}
              {exp.achievements?.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium">Key Achievements:</p>
                  <ul className="list-disc list-inside text-sm text-green-600 dark:text-green-400 space-y-1">
                    {exp.achievements.map((achievement: string, i: number) => (
                      <li key={i}>✓ {achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ────────────────────────────────────────── */}
        {/* Empty State */}
        {/* ────────────────────────────────────────── */}

        {experience.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No experience entries added yet. Check back soon!</p>
          </div>
        )}
      </main>
    </>
  );
}
