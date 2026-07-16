// ──────────────────────────────────────────────────────────────
// CREATE PROJECT DTO
// ──────────────────────────────────────────────────────────────
//
// This DTO validates the data when creating a new project.
// ──────────────────────────────────────────────────────────────

import {
  IsString,
  IsOptional,
  IsBoolean,
  IsUrl,
  IsArray,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  problem?: string;

  @IsString()
  @IsOptional()
  solution?: string;

  @IsString()
  @IsOptional()
  challenge?: string;

  @IsString()
  @IsOptional()
  lessons?: string;

  @IsArray()
  @IsOptional()
  techStack?: string[];

  @IsArray()
  @IsOptional()
  features?: string[];

  @IsUrl()
  @IsOptional()
  demoUrl?: string;

  @IsUrl()
  @IsOptional()
  githubUrl?: string;

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;
}
