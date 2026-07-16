// ──────────────────────────────────────────────────────────────
// EDUCATION PAGE
// ──────────────────────────────────────────────────────────────
//
// This page displays education entries in a timeline format.
// It fetches data from GET /education endpoint.
// ──────────────────────────────────────────────────────────────

import { apiClient } from "@/lib/api";
import { Navbar } from "@/components/shared/navbar";
import { Badge } from "@/components/ui/badge";

// ──────────────────────────────────────────────────────────
// Fetch education from the backend
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
// Format date helper
// ──────────────────────────────────────────────────────────

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// ──────────────────────────────────────────────────────────
// Education Page Component
// ──────────────────────────────────────────────────────────

export default async function EducationPage() {
  const education = await getEducation();

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* ────────────────────────────────────────── */}
        {/* Section Header */}
        {/* ────────────────────────────────────────── */}

        <div className="mb-12">
          <p className="text-sm font-medium text-indigo-600">Education</p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            My academic journey in Computer Science and technology.
          </h1>
        </div>

        {/* ────────────────────────────────────────── */}
        {/* Education Entries */}
        {/* ────────────────────────────────────────── */}

        <div className="space-y-8">
          {education.map((edu: any) => (
            <div
              key={edu.id}
              className="p-6 border rounded-lg bg-white dark:bg-gray-900/50"
            >
              <div className="mb-2">
                <h3 className="text-xl font-bold">{edu.degree}</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  {edu.institution}
                </p>
                <p className="text-sm text-gray-500">
                  {edu.location || "Remote"} · {formatDate(edu.startDate)} –{" "}
                  {edu.isPresent ? "Present" : formatDate(edu.endDate)}
                </p>
              </div>

              {edu.description && (
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {edu.description}
                </p>
              )}

              {/* Coursework */}
              {edu.coursework?.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium">Relevant Coursework:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {edu.coursework.map((course: string) => (
                      <Badge key={course} variant="outline">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {edu.achievements?.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium">Academic Achievements:</p>
                  <ul className="list-disc list-inside text-sm text-green-600 dark:text-green-400 space-y-1">
                    {edu.achievements.map((achievement: string, i: number) => (
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

        {education.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No education entries added yet. Check back soon!</p>
          </div>
        )}
      </main>
    </>
  );
}
