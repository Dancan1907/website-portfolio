// ──────────────────────────────────────────────────────────────
// SKILLS PAGE
// ──────────────────────────────────────────────────────────────
//
// This page displays all skills organized by category.
// It fetches data from GET /skills endpoint.
// ──────────────────────────────────────────────────────────────

import { apiClient } from "@/lib/api";
import { Navbar } from "@/components/shared/navbar";
import { Badge } from "@/components/ui/badge";
import { MotionWrapper } from "@/components/motion-wrapper"; // ← NEW

// ──────────────────────────────────────────────────────────
// Fetch skills from the backend
// ──────────────────────────────────────────────────────────

async function getSkills() {
  try {
    const response = await apiClient.get("/skills");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch skills:", error);
    return [];
  }
}

// ──────────────────────────────────────────────────────────
// Group skills by category
// ──────────────────────────────────────────────────────────

function groupByCategory(skills: any[]) {
  const grouped: Record<string, any[]> = {};
  skills.forEach((skill) => {
    if (!grouped[skill.category]) {
      grouped[skill.category] = [];
    }
    grouped[skill.category].push(skill);
  });
  return grouped;
}

// ──────────────────────────────────────────────────────────
// Skills Page Component
// ──────────────────────────────────────────────────────────

export default async function SkillsPage() {
  const skills = await getSkills();
  const groupedSkills = groupByCategory(skills);

  // Define category order for consistent display
  const categoryOrder = [
    "Programming Languages",
    "Frontend Development",
    "Backend Development",
    "Databases & ORMs",
    "Mobile Development",
    "Cloud & DevOps",
    "AI & Intelligent Systems",
    "Tools",
  ];

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <MotionWrapper>
          {" "}
          {/* ← WRAP CONTENT */}
          {/* ────────────────────────────────────────── */}
          {/* Section Header */}
          {/* ────────────────────────────────────────── */}
          <div className="mb-12">
            <p className="text-sm font-medium text-indigo-600">
              Skills & Technologies
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mt-2">
              Technologies I use to design, build, test, and deploy software
              solutions.
            </h1>
          </div>
          {/* ────────────────────────────────────────── */}
          {/* Skills Grid */}
          {/* ────────────────────────────────────────── */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryOrder.map((category) => {
              const categorySkills = groupedSkills[category] || [];
              if (categorySkills.length === 0) return null;

              return (
                <div
                  key={category}
                  className="p-6 border rounded-lg bg-white dark:bg-gray-900/50"
                >
                  <h3 className="text-lg font-semibold mb-4">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill: any) => (
                      <Badge
                        key={skill.id}
                        variant="secondary"
                        className="text-sm px-3 py-1"
                      >
                        {skill.icon && (
                          <span className="mr-1">{skill.icon}</span>
                        )}
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          {/* ────────────────────────────────────────── */}
          {/* Empty State */}
          {/* ────────────────────────────────────────── */}
          {skills.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>No skills added yet. Check back soon!</p>
            </div>
          )}
        </MotionWrapper>
      </main>
    </>
  );
}
