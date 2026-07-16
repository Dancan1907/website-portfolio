// ──────────────────────────────────────────────────────────────
// SKILLS CONTROLLER
// ──────────────────────────────────────────────────────────────
//
// This controller handles HTTP requests for skill management.
//
// Routes:
// GET /skills - Get all skills (public)
// GET /skills/:id - Get a single skill (public)
// GET /skills/category/:category - Get skills by category (public)
// POST /skills - Create a new skill (admin only)
// PUT /skills/:id - Update a skill (admin only)
// DELETE /skills/:id - Delete a skill (admin only)
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
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('skills')
export class SkillsController {
  constructor(private skillsService: SkillsService) {}

  // ──────────────────────────────────────────────────────────
  // GET /skills - Public endpoint
  // ──────────────────────────────────────────────────────────

  @Get()
  async findAll() {
    return this.skillsService.findAll();
  }

  // ──────────────────────────────────────────────────────────
  // GET /skills/category/:category - Public endpoint
  // ──────────────────────────────────────────────────────────

  @Get('category/:category')
  async findByCategory(@Param('category') category: string) {
    return this.skillsService.findByCategory(category);
  }

  // ──────────────────────────────────────────────────────────
  // GET /skills/:id - Public endpoint
  // ──────────────────────────────────────────────────────────

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.skillsService.findOne(id);
  }

  // ──────────────────────────────────────────────────────────
  // POST /skills - Protected endpoint (admin only)
  // ──────────────────────────────────────────────────────────

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }

  // ──────────────────────────────────────────────────────────
  // PUT /skills/:id - Protected endpoint (admin only)
  // ──────────────────────────────────────────────────────────

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ) {
    return this.skillsService.update(id, updateSkillDto);
  }

  // ──────────────────────────────────────────────────────────
  // DELETE /skills/:id - Protected endpoint (admin only)
  // ──────────────────────────────────────────────────────────

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.skillsService.remove(id);
  }
}
