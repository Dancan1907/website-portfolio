// ──────────────────────────────────────────────────────────────
// AUTH SERVICE
// ──────────────────────────────────────────────────────────────
//
// This service handles the business logic for authentication:
// 1. Validating user credentials (find user, compare password)
// 2. Generating JWT tokens
// 3. Returning user data (without the password)
// ──────────────────────────────────────────────────────────────

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // ──────────────────────────────────────────────────────────
  // validateUser: Checks if the credentials are valid
  // ──────────────────────────────────────────────────────────
  //
  // Flow:
  // 1. Find user by email in the database
  // 2. If user not found → throw exception
  // 3. Compare provided password with hashed password
  // 4. If password doesn't match → throw exception
  // 5. Return user data (excluding password)
  // ──────────────────────────────────────────────────────────

  async validateUser(email: string, password: string): Promise<any> {
    // Step 1: Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    // Step 2: If user not found, throw error
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Step 3: Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Step 4: If password doesn't match, throw error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Step 5: Return user data (excluding password)
    const { password: _, ...result } = user;
    return result;
  }

  // ──────────────────────────────────────────────────────────
  // login: Generates a JWT token for a user
  // ──────────────────────────────────────────────────────────
  //
  // Flow:
  // 1. Validate the user's credentials
  // 2. Create a JWT payload with user data
  // 3. Sign the payload using JwtService
  // 4. Return the access token and user data
  // ──────────────────────────────────────────────────────────

  async login(email: string, password: string) {
    // Step 1: Validate credentials
    const user = await this.validateUser(email, password);

    // Step 2: Create JWT payload
    const payload = {
      sub: user.id, // "sub" = subject (user ID)
      email: user.email, // User email for quick access
    };

    // Step 3: Sign the token
    const access_token = this.jwtService.sign(payload);

    // Step 4: Return token and user data
    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  // ──────────────────────────────────────────────────────────
  // getUserFromToken: Extracts user data from a token
  // ──────────────────────────────────────────────────────────
  //
  // This is used by the JWT strategy to get the user from
  // the token payload.
  // ──────────────────────────────────────────────────────────

  async getUserFromToken(payload: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { password: _, ...result } = user;
    return result;
  }
}
