// ──────────────────────────────────────────────────────────────
// EDUCATION SERVICE
// ──────────────────────────────────────────────────────────────
//
// This service handles all database operations for education.
// ──────────────────────────────────────────────────────────────

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Injectable()
export class EducationService {
  constructor(private prisma: PrismaService) {}

  // ──────────────────────────────────────────────────────────
  // create: Create a new education entry
  // ──────────────────────────────────────────────────────────

  async create(createEducationDto: CreateEducationDto) {
    return this.prisma.education.create({
      data: {
        institution: createEducationDto.institution,
        degree: createEducationDto.degree,
        location: createEducationDto.location || null,
        startDate: new Date(createEducationDto.startDate),
        endDate: createEducationDto.endDate
          ? new Date(createEducationDto.endDate)
          : null,
        isPresent: createEducationDto.isPresent || false,
        description: createEducationDto.description || null,
        coursework: createEducationDto.coursework || [],
        achievements: createEducationDto.achievements || [],
      },
    });
  }

  // ──────────────────────────────────────────────────────────
  // findAll: Get all education entries (public)
  // ──────────────────────────────────────────────────────────

  async findAll() {
    return this.prisma.education.findMany({
      orderBy: [
        { isPresent: 'desc' }, // Present education first
        { startDate: 'desc' }, // Most recent first
      ],
    });
  }

  // ──────────────────────────────────────────────────────────
  // findOne: Get a single education entry by ID
  // ──────────────────────────────────────────────────────────

  async findOne(id: string) {
    const education = await this.prisma.education.findUnique({
      where: { id },
    });

    if (!education) {
      throw new NotFoundException(`Education with ID ${id} not found`);
    }

    return education;
  }

  // ──────────────────────────────────────────────────────────
  // update: Update an education entry
  // ──────────────────────────────────────────────────────────

  async update(id: string, updateEducationDto: UpdateEducationDto) {
    await this.findOne(id);

    const data: any = {};

    if (updateEducationDto.institution !== undefined)
      data.institution = updateEducationDto.institution;
    if (updateEducationDto.degree !== undefined)
      data.degree = updateEducationDto.degree;
    if (updateEducationDto.location !== undefined)
      data.location = updateEducationDto.location;
    if (updateEducationDto.startDate !== undefined)
      data.startDate = new Date(updateEducationDto.startDate);
    if (updateEducationDto.endDate !== undefined)
      data.endDate = updateEducationDto.endDate
        ? new Date(updateEducationDto.endDate)
        : null;
    if (updateEducationDto.isPresent !== undefined)
      data.isPresent = updateEducationDto.isPresent;
    if (updateEducationDto.description !== undefined)
      data.description = updateEducationDto.description;
    if (updateEducationDto.coursework !== undefined)
      data.coursework = updateEducationDto.coursework;
    if (updateEducationDto.achievements !== undefined)
      data.achievements = updateEducationDto.achievements;

    return this.prisma.education.update({
      where: { id },
      data,
    });
  }

  // ──────────────────────────────────────────────────────────
  // remove: Delete an education entry
  // ──────────────────────────────────────────────────────────

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.education.delete({
      where: { id },
    });
  }
}
