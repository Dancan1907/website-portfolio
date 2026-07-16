// ──────────────────────────────────────────────────────────────
// UPDATE PROFILE DTO
// ──────────────────────────────────────────────────────────────
//
// This DTO is used when updating an existing profile.
// All fields are optional, allowing partial updates.
// ──────────────────────────────────────────────────────────────

import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';

// ──────────────────────────────────────────────────────────
// PartialType makes all fields optional from CreateProfileDto
// This allows us to update only specific fields.
// ──────────────────────────────────────────────────────────

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
