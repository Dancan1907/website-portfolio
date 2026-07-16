// ──────────────────────────────────────────────────────────────
// EXPERIENCE ENTITY
// ──────────────────────────────────────────────────────────────
//
// This defines the shape of the experience data returned to clients.
// ──────────────────────────────────────────────────────────────

export class ExperienceEntity {
  id?: string;
  role?: string;
  organizatio?: string;
  location?: string | null;
  startDate?: Date;
  endDate?: Date | null;
  isPresent?: boolean;
  description?: string;
  responsibilities?: string[];
  technologies?: string[];
  achievements?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
