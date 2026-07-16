// ──────────────────────────────────────────────────────────────
// SKILLS MODULE
// ──────────────────────────────────────────────────────────────
//
// This module organizes everything related to skill management.
//
// Components:
// - SkillsController: Handles HTTP routes
// - SkillsService: Business logic for skill operations
// ──────────────────────────────────────────────────────────────

import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SkillsController],
  providers: [SkillsService],
  exports: [SkillsService],
})
export class SkillsModule {}
