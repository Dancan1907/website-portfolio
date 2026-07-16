// ──────────────────────────────────────────────────────────────
// EDUCATION CONTROLLER
// ──────────────────────────────────────────────────────────────
//
// This controller handles HTTP requests for education management.
//
// Routes:
// GET /education - Get all education (public)
// GET /education/:id - Get a single education (public)
// POST /education - Create a new education (admin only)
// PUT /education/:id - Update an education (admin only)
// DELETE /education/:id - Delete an education (admin only)
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
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('education')
export class EducationController {
  constructor(private educationService: EducationService) {}

  // ──────────────────────────────────────────────────────────
  // GET /education - Public endpoint
  // ──────────────────────────────────────────────────────────

  @Get()
  async findAll() {
    return this.educationService.findAll();
  }

  // ──────────────────────────────────────────────────────────
  // GET /education/:id - Public endpoint
  // ──────────────────────────────────────────────────────────

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.educationService.findOne(id);
  }

  // ──────────────────────────────────────────────────────────
  // POST /education - Protected endpoint (admin only)
  // ──────────────────────────────────────────────────────────

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createEducationDto: CreateEducationDto) {
    return this.educationService.create(createEducationDto);
  }

  // ──────────────────────────────────────────────────────────
  // PUT /education/:id - Protected endpoint (admin only)
  // ──────────────────────────────────────────────────────────

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateEducationDto: UpdateEducationDto,
  ) {
    return this.educationService.update(id, updateEducationDto);
  }

  // ──────────────────────────────────────────────────────────
  // DELETE /education/:id - Protected endpoint (admin only)
  // ──────────────────────────────────────────────────────────

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.educationService.remove(id);
  }
}
