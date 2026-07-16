// ──────────────────────────────────────────────────────────────
// EXPERIENCE CONTROLLER
// ──────────────────────────────────────────────────────────────
//
// This controller handles HTTP requests for experience management.
//
// Routes:
// GET /experience - Get all experience (public)
// GET /experience/:id - Get a single experience (public)
// POST /experience - Create a new experience (admin only)
// PUT /experience/:id - Update an experience (admin only)
// DELETE /experience/:id - Delete an experience (admin only)
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
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('experience')
export class ExperienceController {
  constructor(private experienceService: ExperienceService) {}

  // ──────────────────────────────────────────────────────────
  // GET /experience - Public endpoint
  // ──────────────────────────────────────────────────────────

  @Get()
  async findAll() {
    return this.experienceService.findAll();
  }

  // ──────────────────────────────────────────────────────────
  // GET /experience/:id - Public endpoint
  // ──────────────────────────────────────────────────────────

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.experienceService.findOne(id);
  }

  // ──────────────────────────────────────────────────────────
  // POST /experience - Protected endpoint (admin only)
  // ──────────────────────────────────────────────────────────

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createExperienceDto: CreateExperienceDto) {
    return this.experienceService.create(createExperienceDto);
  }

  // ──────────────────────────────────────────────────────────
  // PUT /experience/:id - Protected endpoint (admin only)
  // ──────────────────────────────────────────────────────────

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    return this.experienceService.update(id, updateExperienceDto);
  }

  // ──────────────────────────────────────────────────────────
  // DELETE /experience/:id - Protected endpoint (admin only)
  // ──────────────────────────────────────────────────────────

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.experienceService.remove(id);
  }
}
