// ──────────────────────────────────────────────────────────────
// UPDATE SKILL DTO
// ──────────────────────────────────────────────────────────────
//
// This DTO is used when updating an existing skill.
// All fields are optional, allowing partial updates.
// ──────────────────────────────────────────────────────────────

import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillDto } from './create-skill.dto';

export class UpdateSkillDto extends PartialType(CreateSkillDto) {}
