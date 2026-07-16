// ──────────────────────────────────────────────────────────────
// PROJECT ENTITY
// ──────────────────────────────────────────────────────────────
//
// This defines the shape of the project data returned to clients.
// ──────────────────────────────────────────────────────────────

export class ProjectEntity {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  problem: string | null;
  solution: string | null;
  challenge: string | null;
  lessons: string | null;
  techStack: string[];
  features: string[];
  demoUrl: string | null;
  githubUrl: string | null;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}
