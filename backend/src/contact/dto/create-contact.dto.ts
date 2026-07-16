// ──────────────────────────────────────────────────────────────
// CREATE CONTACT DTO
// ──────────────────────────────────────────────────────────────
//
// This DTO validates the data when a visitor submits a message.
// All fields are required.
// ──────────────────────────────────────────────────────────────

import { IsEmail, IsString, IsOptional } from 'class-validator';

export class CreateContactDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  subject: string;

  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  recaptchaToken?: string; // For future CAPTCHA integration
}
