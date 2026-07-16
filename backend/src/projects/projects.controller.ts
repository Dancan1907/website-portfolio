// ──────────────────────────────────────────────────────────────
// PROJECTS CONTROLLER
// ──────────────────────────────────────────────────────────────
//
// This controller handles HTTP requests for project management.
//
// Routes:
// GET /projects - Get all projects (public)
// GET /projects/:id - Get a single project (public)
// GET /projects/slug/:slug - Get project by slug (public)
// POST /projects - Create a new project (admin only)
// PUT /projects/:id - Update a project (admin only)
// DELETE /projects/:id - Delete a project (admin only)
// ──────────────────────────────────────────────────────────────

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  // ──────────────────────────────────────────────────────────
  // GET /projects - Public endpoint
  // ──────────────────────────────────────────────────────────

  @Get()
  async findAll() {
    return this.projectsService.findAll();
  }

  // ──────────────────────────────────────────────────────────
  // GET /projects/slug/:slug - Public endpoint
  // ──────────────────────────────────────────────────────────

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.projectsService.findBySlug(slug);
  }

  // ──────────────────────────────────────────────────────────
  // GET /projects/:id - Public endpoint
  // ──────────────────────────────────────────────────────────

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  // ──────────────────────────────────────────────────────────
  // POST /projects - Protected endpoint (admin only)
  // ──────────────────────────────────────────────────────────

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  // ──────────────────────────────────────────────────────────
  // PUT /projects/:id - Protected endpoint (admin only)
  // ──────────────────────────────────────────────────────────

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(id, updateProjectDto);
  }

  // ──────────────────────────────────────────────────────────
  // DELETE /projects/:id - Protected endpoint (admin only)
  // ──────────────────────────────────────────────────────────

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
