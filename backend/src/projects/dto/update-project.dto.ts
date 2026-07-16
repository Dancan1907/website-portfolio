// ──────────────────────────────────────────────────────────────
// UPDATE PROJECT DTO
// ──────────────────────────────────────────────────────────────
//
// This DTO is used when updating an existing project.
// All fields are optional, allowing partial updates.
// ──────────────────────────────────────────────────────────────

import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
