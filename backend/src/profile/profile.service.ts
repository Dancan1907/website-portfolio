// ──────────────────────────────────────────────────────────────
// PROFILE SERVICE
// ──────────────────────────────────────────────────────────────
//
// This service handles all database operations for profiles.
// It uses PrismaService to interact with the Profile table.
// ──────────────────────────────────────────────────────────────

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  // ──────────────────────────────────────────────────────────
  // create: Create a new profile for a user
  // ──────────────────────────────────────────────────────────
  //
  // This is called when a new user is created.
  // It creates a profile linked to the user's ID.
  // ──────────────────────────────────────────────────────────

  async create(userId: string, createProfileDto: CreateProfileDto) {
    return this.prisma.profile.create({
      data: {
        userId: userId,
        name: createProfileDto.name || '',
        title: createProfileDto.title || '',
        bio: createProfileDto.bio || '',
        avatarUrl: createProfileDto.avatarUrl || null,
        resumeUrl: createProfileDto.resumeUrl || null,
        githubUrl: createProfileDto.githubUrl || null,
        linkedinUrl: createProfileDto.linkedinUrl || null,
        email: createProfileDto.email || '',
        location: createProfileDto.location || '',
      },
    });
  }

  // ──────────────────────────────────────────────────────────
  // findOne: Get a user's profile by userId
  // ──────────────────────────────────────────────────────────
  //
  // This is used by the public API to display profile data.
  // ──────────────────────────────────────────────────────────

  async findOne(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  // ──────────────────────────────────────────────────────────
  // update: Update a user's profile
  // ──────────────────────────────────────────────────────────
  //
  // This is used by the admin dashboard to edit profile data.
  // Only provided fields are updated.
  // ──────────────────────────────────────────────────────────

  async update(userId: string, updateProfileDto: UpdateProfileDto) {
    // Check if profile exists
    await this.findOne(userId);

    // Update the profile
    return this.prisma.profile.update({
      where: { userId },
      data: {
        name: updateProfileDto.name,
        title: updateProfileDto.title,
        bio: updateProfileDto.bio,
        avatarUrl: updateProfileDto.avatarUrl,
        resumeUrl: updateProfileDto.resumeUrl,
        githubUrl: updateProfileDto.githubUrl,
        linkedinUrl: updateProfileDto.linkedinUrl,
        email: updateProfileDto.email,
        location: updateProfileDto.location,
      },
    });
  }
}
