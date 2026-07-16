// ──────────────────────────────────────────────────────────────
// EDUCATION ENTITY
// ──────────────────────────────────────────────────────────────
//
// This defines the shape of the education data returned to clients.
// ──────────────────────────────────────────────────────────────

export class EducationEntity {
  id?: string;
  institution?: string;
  degree?: string;
  location?: string | null;
  startDate?: Date;
  endDate?: Date | null;
  isPresent?: boolean;
  description?: string | null;
  coursework?: string[];
  achievements?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
