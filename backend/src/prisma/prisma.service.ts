// ──────────────────────────────────────────────────────────────
// PRISMA SERVICE
// ──────────────────────────────────────────────────────────────
//
// This service wraps the Prisma Client and provides it to
// other parts of the application via Dependency Injection.
//
// Benefits:
// 1. Single instance of Prisma Client (reuse connections)
// 2. Easy to mock for testing
// 3. Centralized database access
// ──────────────────────────────────────────────────────────────

// Import NestJS decorators for creating a service

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

// Import PrismaClient from @prisma/client
import { PrismaClient } from '@prisma/client';

// ──────────────────────────────────────────────────────────────
// The @Injectable() decorator tells NestJS this class can be
// injected into other classes (Dependency Injection).
// ──────────────────────────────────────────────────────────────
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // ──────────────────────────────────────────────────────────────
  // OnModuleInit - Called when the module is initialized
  // This ensures the database connection is established BEFORE
  // the application starts handling requests.
  // ──────────────────────────────────────────────────────────────

  async onModuleInit() {
    await this.$connect();
  }

  // ──────────────────────────────────────────────────────────────
  // OnModuleDestroy - Called when the application is shutting down
  // This ensures the database connection is closed properly,
  // preventing connection leaks.
  // ──────────────────────────────────────────────────────────────

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
