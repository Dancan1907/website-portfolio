// ──────────────────────────────────────────────────────────────
// CONTACT CONTROLLER
// ──────────────────────────────────────────────────────────────
//
// This controller handles HTTP requests for contact messages.
//
// Routes:
// POST /contact - Submit a new message (public)
// GET /contact - Get all messages (admin only)
// GET /contact/:id - Get a single message (admin only)
// PUT /contact/:id - Update a message (admin only)
// PATCH /contact/:id/read - Mark as read (admin only)
// DELETE /contact/:id - Delete a message (admin only)
// ──────────────────────────────────────────────────────────────

import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  // ──────────────────────────────────────────────────────────
  // POST /contact - Public endpoint (anyone can submit)
  // ──────────────────────────────────────────────────────────

  @Post()
  async create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  // ──────────────────────────────────────────────────────────
  // GET /contact - Protected endpoint (admin only)
  // ──────────────────────────────────────────────────────────

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.contactService.findAll();
  }

  // ──────────────────────────────────────────────────────────
  // GET /contact/:id - Protected endpoint (admin only)
  // ──────────────────────────────────────────────────────────

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.contactService.findOne(id);
  }

  // ──────────────────────────────────────────────────────────
  // PUT /contact/:id - Protected endpoint (admin only)
  // ──────────────────────────────────────────────────────────

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return this.contactService.update(id, updateContactDto);
  }

  // ──────────────────────────────────────────────────────────
  // PATCH /contact/:id/read - Protected endpoint (admin only)
  // ──────────────────────────────────────────────────────────

  @Patch(':id/read')
  @UseGuards(JwtAuthGuard)
  async markAsRead(@Param('id') id: string) {
    return this.contactService.markAsRead(id);
  }

  // ──────────────────────────────────────────────────────────
  // DELETE /contact/:id - Protected endpoint (admin only)
  // ──────────────────────────────────────────────────────────

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}
