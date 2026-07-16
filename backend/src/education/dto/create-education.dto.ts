// ──────────────────────────────────────────────────────────────
// CREATE EDUCATION DTO
// ──────────────────────────────────────────────────────────────
//
// This DTO validates the data when creating a new education entry.
// ──────────────────────────────────────────────────────────────

import {
  IsString,
  IsOptional,
  IsDateString,
  IsBoolean,
  IsArray,
} from 'class-validator';

export class CreateEducationDto {
  @IsString()
  institution: string;

  @IsString()
  degree: string;

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
  coursework?: string[];

  @IsArray()
  @IsOptional()
  achievements?: string[];
}
