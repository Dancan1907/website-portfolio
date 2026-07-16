// ──────────────────────────────────────────────────────────────
// PROJECTS PAGE
// ──────────────────────────────────────────────────────────────
//
// This page displays all portfolio projects.
// It fetches data from GET /projects endpoint.
// ──────────────────────────────────────────────────────────────

import { apiClient } from "@/lib/api";
import { Navbar } from "@/components/shared/navbar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// ──────────────────────────────────────────────────────────
// Fetch projects from the backend
// ──────────────────────────────────────────────────────────

async function getProjects() {
  try {
    const response = await apiClient.get("/projects");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

// ──────────────────────────────────────────────────────────
// Projects Page Component
// ──────────────────────────────────────────────────────────

export default async function ProjectsPage() {
  const projects = await getProjects();

  // Separate featured and non-featured projects
  const featuredProjects = projects.filter((p: any) => p.isFeatured);
  const otherProjects = projects.filter((p: any) => !p.isFeatured);

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {/* ────────────────────────────────────────── */}
        {/* Section Header */}
        {/* ────────────────────────────────────────── */}

        <div className="mb-12">
          <p className="text-sm font-medium text-indigo-600">
            Featured Projects
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            Projects that showcase my software engineering skills,
            problem-solving approach, and passion for building real-world
            applications.
          </h1>
        </div>

        {/* ────────────────────────────────────────── */}
        {/* Featured Project (if exists) */}
        {/* ────────────────────────────────────────── */}

        {featuredProjects.length > 0 && (
          <div className="mb-12">
            {featuredProjects.map((project: any) => (
              <Card key={project.id} className="overflow-hidden">
                <div className="grid md:grid-cols-2">
                  {/* Image / Placeholder */}
                  <div className="bg-gray-100 dark:bg-gray-800 h-64 md:h-auto flex items-center justify-center text-4xl text-gray-400">
                    {project.images?.[0]?.url ? (
                      <img
                        src={project.images[0].url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>📸</span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>

                    <div className="mb-4">
                      <p className="text-sm font-medium">Problem</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {project.problem ||
                          "Solving a real-world challenge with technology."}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack?.map((tech: string) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
                        >
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition text-sm"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* ────────────────────────────────────────── */}
        {/* Other Projects Grid */}
        {/* ────────────────────────────────────────── */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project: any) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="bg-gray-100 dark:bg-gray-800 h-40 rounded-t-lg flex items-center justify-center text-2xl text-gray-400">
                  {project.images?.[0]?.url ? (
                    <img
                      src={project.images[0].url}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  ) : (
                    <span>📸</span>
                  )}
                </div>
                <CardTitle className="text-lg mt-2">{project.title}</CardTitle>
                <CardDescription className="text-sm">
                  {project.description?.slice(0, 100)}
                  {project.description?.length > 100 && "..."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {project.techStack?.slice(0, 3).map((tech: string) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.techStack?.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.techStack.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-600 hover:underline"
                  >
                    Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-600 hover:underline"
                  >
                    GitHub
                  </a>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* ────────────────────────────────────────── */}
        {/* Empty State */}
        {/* ────────────────────────────────────────── */}

        {projects.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No projects added yet. Check back soon!</p>
          </div>
        )}

        {/* ────────────────────────────────────────── */}
        {/* View All Button (if more than displayed) */}
        {/* ────────────────────────────────────────── */}

        {projects.length > 6 && (
          <div className="text-center mt-12">
            <a
              href="/projects/all"
              className="inline-block px-6 py-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              View All Projects →
            </a>
          </div>
        )}
      </main>
    </>
  );
}
