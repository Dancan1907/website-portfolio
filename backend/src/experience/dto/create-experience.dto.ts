// ──────────────────────────────────────────────────────────────
// CREATE EXPERIENCE DTO
// ──────────────────────────────────────────────────────────────
//
// This DTO validates the data when creating a new experience entry.
// ──────────────────────────────────────────────────────────────

import {
  IsString,
  IsOptional,
  IsDateString,
  IsBoolean,
  IsArray,
} from 'class-validator';

export class CreateExperienceDto {
  @IsString()
  role: string;

  @IsString()
  organization: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsBoolean()
  @IsOptional()
  isPresent?: boolean;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  responsibilities?: string[];

  @IsArray()
  @IsOptional()
  technologies?: string[];

  @IsArray()
  @IsOptional()
  achievements?: string[];
}
