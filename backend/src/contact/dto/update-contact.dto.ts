// ──────────────────────────────────────────────────────────────
// UPDATE CONTACT DTO
// ──────────────────────────────────────────────────────────────
//
// This DTO is used when updating a contact message (e.g., marking as read).
// All fields are optional, allowing partial updates.
// ──────────────────────────────────────────────────────────────

import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateContactDto {
  @IsBoolean()
  @IsOptional()
  isRead?: boolean;
}
