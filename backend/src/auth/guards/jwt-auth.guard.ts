// ──────────────────────────────────────────────────────────────
// JWT AUTH GUARD
// ──────────────────────────────────────────────────────────────
//
// This guard protects routes that require authentication.
//
// Usage:
// @UseGuards(JwtAuthGuard)
// @Get('protected')
// async protectedRoute() { ... }
// ──────────────────────────────────────────────────────────────

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
