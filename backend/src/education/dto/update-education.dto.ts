// ──────────────────────────────────────────────────────────────
// UPDATE EDUCATION DTO
// ──────────────────────────────────────────────────────────────
//
// This DTO is used when updating an existing education entry.
// All fields are optional, allowing partial updates.
// ──────────────────────────────────────────────────────────────

import { PartialType } from '@nestjs/mapped-types';
import { CreateEducationDto } from './create-education.dto';

export class UpdateEducationDto extends PartialType(CreateEducationDto) {}
