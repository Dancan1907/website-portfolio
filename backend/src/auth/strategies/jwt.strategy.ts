// ──────────────────────────────────────────────────────────────
// JWT STRATEGY
// ──────────────────────────────────────────────────────────────
//
// This is the passport strategy that validates JWT tokens.
//
// Flow:
// 1. Client sends request with Authorization: Bearer <token>
// 2. Passport extracts the token
// 3. JwtStrategy validates the token signature
// 4. If valid, it extracts the payload
// 5. It then returns the user data (attached to request.user)
// ──────────────────────────────────────────────────────────────

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      // ──────────────────────────────────────────────────
      // Extract JWT from Authorization header
      // The header looks like: Authorization: Bearer <token>
      // ──────────────────────────────────────────────────

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // ──────────────────────────────────────────────────
      // Don't ignore expired tokens
      // ──────────────────────────────────────────────────

      ignoreExpiration: false,

      // ──────────────────────────────────────────────────
      // Secret used to verify the token signature
      // Must match the secret used when signing the token
      // ──────────────────────────────────────────────────

      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
  }

  // ──────────────────────────────────────────────────────────
  // validate: Called after the token is verified
  //
  // The payload comes from the JWT token
  // We use it to find the user and return user data
  // ──────────────────────────────────────────────────────────

  async validate(payload: any) {
    const user = await this.authService.getUserFromToken(payload);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
