// ──────────────────────────────────────────────────────────────
// CREATE SKILL DTO
// ──────────────────────────────────────────────────────────────
//
// This DTO validates the data when creating a new skill.
// category and name are required fields.
// ──────────────────────────────────────────────────────────────

import { IsString, IsOptional, IsDefined } from 'class-validator';

export class CreateSkillDto {
  // ──────────────────────────────────────────────────────────
  // category: Required field
  // ──────────────────────────────────────────────────────────

  @IsDefined({ message: 'Category is required' })
  @IsString({ message: 'Category must be a string' })
  category: string;

  // ──────────────────────────────────────────────────────────
  // name: Required field
  // ──────────────────────────────────────────────────────────

  @IsDefined({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  // ──────────────────────────────────────────────────────────
  // icon: Optional field
  // ──────────────────────────────────────────────────────────

  @IsOptional()
  @IsString()
  icon?: string;
}
