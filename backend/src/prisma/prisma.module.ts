// ──────────────────────────────────────────────────────────────
// PRISMA MODULE
// ──────────────────────────────────────────────────────────────
//
// This module provides the PrismaService to the entire application.
//
// Any module that wants to access the database must import
// PrismaModule and inject PrismaService.
// ──────────────────────────────────────────────────────────────

import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// ──────────────────────────────────────────────────────────────
// The @Global() decorator makes this module available to ALL
// other modules without having to import it in each one.
//
// This is useful for a core service like Prisma that is used
// everywhere in the application.
// ──────────────────────────────────────────────────────────────

@Global()
@Module({
  // ──────────────────────────────────────────────────────────
  // providers: List of services that this module provides
  // These are available for injection in other modules
  // ──────────────────────────────────────────────────────────

  providers: [PrismaService],

  // ──────────────────────────────────────────────────────────
  // exports: List of services that should be available when
  // this module is imported by other modules
  // ──────────────────────────────────────────────────────────

  exports: [PrismaService],
})
export class PrismaModule {}
