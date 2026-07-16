// ──────────────────────────────────────────────────────────────
// CREATE PROFILE DTO
// ──────────────────────────────────────────────────────────────
//
// This DTO is used when creating a new profile.
// All fields are optional because we'll create the profile
// when a user is first created.
// ──────────────────────────────────────────────────────────────

import {
  IsString,
  IsOptional,
  IsUrl,
  IsEmail,
  IsObject,
} from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsUrl()
  @IsOptional()
  avatarUrl?: string;

  @IsUrl()
  @IsOptional()
  resumeUrl?: string;

  @IsUrl()
  @IsOptional()
  githubUrl?: string;

  @IsUrl()
  @IsOptional()
  linkedinUrl?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  location?: string;
}
