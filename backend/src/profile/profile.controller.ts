// ──────────────────────────────────────────────────────────────
// PROFILE CONTROLLER
// ──────────────────────────────────────────────────────────────
//
// This controller handles HTTP requests for profile management.
//
// Routes:
// GET /profile - Get public profile data (no auth required)
// PUT /profile - Update profile data (admin only)
// ──────────────────────────────────────────────────────────────

import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  // ──────────────────────────────────────────────────────────
  // GET /profile
  // ──────────────────────────────────────────────────────────
  //
  // This is a public endpoint — no authentication required.
  // The frontend can fetch this data to display the Hero and About sections.
  // ──────────────────────────────────────────────────────────

  @Get()
  async getProfile() {
    // For now, we're using a fixed userId since we only have one admin user.
    // In a multi-user system, we'd need to fetch the user from the request.
    const userId = 'cmrn4ded60000err7wgg2e705'; // Replace with your user ID
    return this.profileService.findOne(userId);
  }

  // ──────────────────────────────────────────────────────────
  // PUT /profile
  // ──────────────────────────────────────────────────────────
  //
  // This is a protected endpoint — requires JWT authentication.
  // Only the admin user can update the profile.
  // ──────────────────────────────────────────────────────────

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Request() req,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const userId = req.user.id; // The authenticated user's ID from the JWT token
    return this.profileService.update(userId, updateProfileDto);
  }
}
