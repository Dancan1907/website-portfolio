// ──────────────────────────────────────────────────────────────
// PROFILE MODULE
// ──────────────────────────────────────────────────────────────
//
// This module organizes everything related to profile management.
//
// Components:
// - ProfileController: Handles HTTP routes
// - ProfileService: Business logic for profile operations
// ──────────────────────────────────────────────────────────────

import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
