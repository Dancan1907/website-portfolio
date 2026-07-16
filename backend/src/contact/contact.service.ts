// ──────────────────────────────────────────────────────────────
// CONTACT SERVICE
// ──────────────────────────────────────────────────────────────
//
// This service handles all database operations for contact messages.
// ──────────────────────────────────────────────────────────────

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  // ──────────────────────────────────────────────────────────
  // create: Submit a new contact message (public)
  // ──────────────────────────────────────────────────────────

  async create(createContactDto: CreateContactDto) {
    return this.prisma.contactMessage.create({
      data: {
        name: createContactDto.name,
        email: createContactDto.email,
        subject: createContactDto.subject,
        message: createContactDto.message,
        isRead: false,
      },
    });
  }

  // ──────────────────────────────────────────────────────────
  // findAll: Get all contact messages (admin only)
  // ──────────────────────────────────────────────────────────

  async findAll() {
    return this.prisma.contactMessage.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // ──────────────────────────────────────────────────────────
  // findOne: Get a single contact message by ID (admin only)
  // ──────────────────────────────────────────────────────────

  async findOne(id: string) {
    const message = await this.prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }

    return message;
  }

  // ──────────────────────────────────────────────────────────
  // update: Update a contact message (admin only)
  // ──────────────────────────────────────────────────────────

  async update(id: string, updateContactDto: UpdateContactDto) {
    await this.findOne(id);

    return this.prisma.contactMessage.update({
      where: { id },
      data: {
        isRead: updateContactDto.isRead,
      },
    });
  }

  // ──────────────────────────────────────────────────────────
  // markAsRead: Mark a message as read (admin only)
  // ──────────────────────────────────────────────────────────

  async markAsRead(id: string) {
    return this.update(id, { isRead: true });
  }

  // ──────────────────────────────────────────────────────────
  // remove: Delete a contact message (admin only)
  // ──────────────────────────────────────────────────────────

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.contactMessage.delete({
      where: { id },
    });
  }
}
