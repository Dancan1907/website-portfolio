// ──────────────────────────────────────────────────────────────
// ROOT APPLICATION MODULE
// ──────────────────────────────────────────────────────────────
//
// This is the entry point for all modules in the application.
// Every module must be imported here to be available.
// ──────────────────────────────────────────────────────────────

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module'; // ← NEW IMPORT

@Module({
  // ──────────────────────────────────────────────────────────
  // imports: List of modules imported by this application
  // PrismaModule is added here so its providers are available
  // ──────────────────────────────────────────────────────────

  imports: [PrismaModule], // ← ADDED THIS

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
