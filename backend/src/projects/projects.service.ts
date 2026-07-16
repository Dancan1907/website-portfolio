// ──────────────────────────────────────────────────────────────
// PROJECTS SERVICE
// ──────────────────────────────────────────────────────────────
//
// This service handles all database operations for projects.
// It uses PrismaService to interact with the Project table.
// ──────────────────────────────────────────────────────────────

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  // ──────────────────────────────────────────────────────────
  // generateSlug: Create a URL-friendly slug from title
  // ──────────────────────────────────────────────────────────

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  // ──────────────────────────────────────────────────────────
  // create: Create a new project
  // ──────────────────────────────────────────────────────────

  async create(createProjectDto: CreateProjectDto) {
    const slug = this.generateSlug(createProjectDto.title);

    return this.prisma.project.create({
      data: {
        title: createProjectDto.title,
        slug,
        description: createProjectDto.description || '',
        problem: createProjectDto.problem || null,
        solution: createProjectDto.solution || null,
        challenge: createProjectDto.challenge || null,
        lessons: createProjectDto.lessons || null,
        techStack: createProjectDto.techStack || [],
        features: createProjectDto.features || [],
        demoUrl: createProjectDto.demoUrl || null,
        githubUrl: createProjectDto.githubUrl || null,
        isFeatured: createProjectDto.isFeatured || false,
      },
    });
  }

  // ──────────────────────────────────────────────────────────
  // findAll: Get all projects (public)
  // ──────────────────────────────────────────────────────────

  async findAll() {
    return this.prisma.project.findMany({
      include: {
        images: true,
      },
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
    });
  }

  // ──────────────────────────────────────────────────────────
  // findOne: Get a single project by ID
  // ──────────────────────────────────────────────────────────

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        images: true,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  // ──────────────────────────────────────────────────────────
  // findBySlug: Get a single project by slug
  // ──────────────────────────────────────────────────────────

  async findBySlug(slug: string) {
    const project = await this.prisma.project.findUnique({
      where: { slug },
      include: {
        images: true,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with slug ${slug} not found`);
    }

    return project;
  }

  // ──────────────────────────────────────────────────────────
  // update: Update a project
  // ──────────────────────────────────────────────────────────

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    await this.findOne(id);

    const data: any = {
      title: updateProjectDto.title,
      description: updateProjectDto.description,
      problem: updateProjectDto.problem,
      solution: updateProjectDto.solution,
      challenge: updateProjectDto.challenge,
      lessons: updateProjectDto.lessons,
      techStack: updateProjectDto.techStack,
      features: updateProjectDto.features,
      demoUrl: updateProjectDto.demoUrl,
      githubUrl: updateProjectDto.githubUrl,
      isFeatured: updateProjectDto.isFeatured,
    };

    // If title is updated, regenerate the slug
    if (updateProjectDto.title) {
      data.slug = this.generateSlug(updateProjectDto.title);
    }

    return this.prisma.project.update({
      where: { id },
      data,
      include: {
        images: true,
      },
    });
  }

  // ──────────────────────────────────────────────────────────
  // remove: Delete a project
  // ──────────────────────────────────────────────────────────

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.project.delete({
      where: { id },
    });
  }
}
