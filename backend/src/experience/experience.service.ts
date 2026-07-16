// ──────────────────────────────────────────────────────────────
// EXPERIENCE SERVICE
// ──────────────────────────────────────────────────────────────
//
// This service handles all database operations for experience.
// ──────────────────────────────────────────────────────────────

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperienceService {
  constructor(private prisma: PrismaService) {}

  // ──────────────────────────────────────────────────────────
  // create: Create a new experience entry
  // ──────────────────────────────────────────────────────────

  async create(createExperienceDto: CreateExperienceDto) {
    return this.prisma.experience.create({
      data: {
        role: createExperienceDto.role,
        organization: createExperienceDto.organization,
        location: createExperienceDto.location || null,
        startDate: new Date(createExperienceDto.startDate),
        endDate: createExperienceDto.endDate
          ? new Date(createExperienceDto.endDate)
          : null,
        isPresent: createExperienceDto.isPresent || false,
        description: createExperienceDto.description || '',
        responsibilities: createExperienceDto.responsibilities || [],
        technologies: createExperienceDto.technologies || [],
        achievements: createExperienceDto.achievements || [],
      },
    });
  }

  // ──────────────────────────────────────────────────────────
  // findAll: Get all experience entries (public)
  // ──────────────────────────────────────────────────────────

  async findAll() {
    return this.prisma.experience.findMany({
      orderBy: [
        { isPresent: 'desc' }, // Present jobs first
        { startDate: 'desc' }, // Most recent first
      ],
    });
  }

  // ──────────────────────────────────────────────────────────
  // findOne: Get a single experience entry by ID
  // ──────────────────────────────────────────────────────────

  async findOne(id: string) {
    const experience = await this.prisma.experience.findUnique({
      where: { id },
    });

    if (!experience) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }

    return experience;
  }

  // ──────────────────────────────────────────────────────────
  // update: Update an experience entry
  // ──────────────────────────────────────────────────────────

  async update(id: string, updateExperienceDto: UpdateExperienceDto) {
    await this.findOne(id);

    const data: any = {};

    if (updateExperienceDto.role !== undefined)
      data.role = updateExperienceDto.role;
    if (updateExperienceDto.organization !== undefined)
      data.organization = updateExperienceDto.organization;
    if (updateExperienceDto.location !== undefined)
      data.location = updateExperienceDto.location;
    if (updateExperienceDto.startDate !== undefined)
      data.startDate = new Date(updateExperienceDto.startDate);
    if (updateExperienceDto.endDate !== undefined)
      data.endDate = updateExperienceDto.endDate
        ? new Date(updateExperienceDto.endDate)
        : null;
    if (updateExperienceDto.isPresent !== undefined)
      data.isPresent = updateExperienceDto.isPresent;
    if (updateExperienceDto.description !== undefined)
      data.description = updateExperienceDto.description;
    if (updateExperienceDto.responsibilities !== undefined)
      data.responsibilities = updateExperienceDto.responsibilities;
    if (updateExperienceDto.technologies !== undefined)
      data.technologies = updateExperienceDto.technologies;
    if (updateExperienceDto.achievements !== undefined)
      data.achievements = updateExperienceDto.achievements;

    return this.prisma.experience.update({
      where: { id },
      data,
    });
  }

  // ──────────────────────────────────────────────────────────
  // remove: Delete an experience entry
  // ──────────────────────────────────────────────────────────

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.experience.delete({
      where: { id },
    });
  }
}
