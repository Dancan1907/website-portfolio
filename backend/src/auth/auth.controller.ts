// ──────────────────────────────────────────────────────────────
// AUTH CONTROLLER
// ──────────────────────────────────────────────────────────────
//
// This controller handles authentication-related HTTP requests.
//
// Routes:
// POST /auth/login - Log in and get a JWT token
// ──────────────────────────────────────────────────────────────

import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ──────────────────────────────────────────────────────────
  // POST /auth/login
  // ──────────────────────────────────────────────────────────
  //
  // Request Body: { email, password }
  // Response: { access_token, user }
  // ──────────────────────────────────────────────────────────

  @Post('login')
  @HttpCode(HttpStatus.OK) // Return 200 OK (not 201 Created)
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );
    return result;
  }
}
