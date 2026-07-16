// ──────────────────────────────────────────────────────────────
// UPDATE EXPERIENCE DTO
// ──────────────────────────────────────────────────────────────
//
// This DTO is used when updating an existing experience entry.
// All fields are optional, allowing partial updates.
// ──────────────────────────────────────────────────────────────

import { PartialType } from '@nestjs/mapped-types';
import { CreateExperienceDto } from './create-experience.dto';

export class UpdateExperienceDto extends PartialType(CreateExperienceDto) {}
