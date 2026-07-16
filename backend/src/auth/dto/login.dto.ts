// ──────────────────────────────────────────────────────────────
// LOGIN DTO (Data Transfer Object)
// ──────────────────────────────────────────────────────────────
//
// This defines the shape of the login request body.
// It validates that the incoming data has the required fields.
// ──────────────────────────────────────────────────────────────

import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  // ──────────────────────────────────────────────────────────
  // email: Must be a valid email format
  // ──────────────────────────────────────────────────────────

  @IsEmail({}, { message: 'Please provide a valid email address' })
  email!: string;

  // ──────────────────────────────────────────────────────────
  // password: Must be a string with minimum length of 6
  // ──────────────────────────────────────────────────────────

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string;
}
