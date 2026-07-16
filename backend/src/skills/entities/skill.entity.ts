// ──────────────────────────────────────────────────────────────
// SKILL ENTITY
// ──────────────────────────────────────────────────────────────
//
// This defines the shape of the skill data returned to clients.
// ──────────────────────────────────────────────────────────────

export class SkillEntity {
  id?: string;
  category?: string;
  name?: string;
  icon?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
