// ──────────────────────────────────────────────────────────────
// SKILLS SERVICE
// ──────────────────────────────────────────────────────────────
//
// This service handles all database operations for skills.
// It uses PrismaService to interact with the Skill table.
// ──────────────────────────────────────────────────────────────

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) {}

  // ──────────────────────────────────────────────────────────
  // create: Create a new skill
  // ──────────────────────────────────────────────────────────

  async create(createSkillDto: CreateSkillDto) {
    return this.prisma.skill.create({
      data: {
        category: createSkillDto.category,
        name: createSkillDto.name,
        icon: createSkillDto.icon || null,
      },
    });
  }

  // ──────────────────────────────────────────────────────────
  // findAll: Get all skills (public)
  // ──────────────────────────────────────────────────────────
  //
  // This is used by the public frontend to display all skills.
  // ──────────────────────────────────────────────────────────

  async findAll() {
    return this.prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    });
  }

  // ──────────────────────────────────────────────────────────
  // findByCategory: Get skills by category
  // ──────────────────────────────────────────────────────────
  //
  // Optional: Get all skills grouped by category.
  // ──────────────────────────────────────────────────────────

  async findByCategory(category: string) {
    return this.prisma.skill.findMany({
      where: { category },
      orderBy: { name: 'asc' },
    });
  }

  // ──────────────────────────────────────────────────────────
  // findOne: Get a single skill by ID
  // ──────────────────────────────────────────────────────────

  async findOne(id: string) {
    const skill = await this.prisma.skill.findUnique({
      where: { id },
    });

    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }

    return skill;
  }

  // ──────────────────────────────────────────────────────────
  // update: Update a skill
  // ──────────────────────────────────────────────────────────

  async update(id: string, updateSkillDto: UpdateSkillDto) {
    // Check if skill exists
    await this.findOne(id);

    return this.prisma.skill.update({
      where: { id },
      data: {
        category: updateSkillDto.category,
        name: updateSkillDto.name,
        icon: updateSkillDto.icon,
      },
    });
  }

  // ──────────────────────────────────────────────────────────
  // remove: Delete a skill
  // ──────────────────────────────────────────────────────────

  async remove(id: string) {
    // Check if skill exists
    await this.findOne(id);

    return this.prisma.skill.delete({
      where: { id },
    });
  }
}
