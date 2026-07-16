// ──────────────────────────────────────────────────────────────
// EDUCATION MODULE
// ──────────────────────────────────────────────────────────────
//
// This module organizes everything related to education management.
// ──────────────────────────────────────────────────────────────

import { Module } from '@nestjs/common';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EducationController],
  providers: [EducationService],
  exports: [EducationService],
})
export class EducationModule {}
