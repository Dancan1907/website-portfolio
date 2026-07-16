// ──────────────────────────────────────────────────────────────
// AUTH MODULE
// ──────────────────────────────────────────────────────────────
//
// This module organizes everything related to authentication.
//
// Components:
// - AuthController: Handles HTTP routes
// - AuthService: Business logic
// - JwtStrategy: Validates JWT tokens
// - JwtAuthGuard: Protects routes
// ──────────────────────────────────────────────────────────────

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    // ──────────────────────────────────────────────────
    // PassportModule - Required for passport strategies
    // ──────────────────────────────────────────────────

    PassportModule,

    // ──────────────────────────────────────────────────
    // JwtModule - Provides JWT signing and verification
    //
    // secret: Used to sign JWT tokens (from .env)
    // signOptions: Token expires in 7 days
    // ──────────────────────────────────────────────────

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '7d' },
    }),

    // ──────────────────────────────────────────────────
    // PrismaModule - For database access
    // ──────────────────────────────────────────────────

    PrismaModule,
  ],

  // ──────────────────────────────────────────────────
  // controllers: HTTP route handlers
  // ──────────────────────────────────────────────────

  controllers: [AuthController],

  // ──────────────────────────────────────────────────
  // providers: Services and strategies
  // ──────────────────────────────────────────────────

  providers: [AuthService, JwtStrategy],

  // ──────────────────────────────────────────────────
  // exports: Make AuthService available to other modules
  // ──────────────────────────────────────────────────

  exports: [AuthService],
})
export class AuthModule {}
