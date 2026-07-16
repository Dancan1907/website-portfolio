// ──────────────────────────────────────────────────────────────
// PROFILE ENTITY
// ──────────────────────────────────────────────────────────────
//
// This defines the shape of the profile data returned to clients.
// We exclude sensitive data like `id` and `userId` to keep it clean.
// ──────────────────────────────────────────────────────────────

import { ApiProperty } from '@nestjs/swagger';

export class ProfileEntity {
  @ApiProperty({ example: 'cmrn4ded60000err7wgg2e705' })
  id: string;

  @ApiProperty({ example: 'Dancan Kalerwa' })
  name: string;

  @ApiProperty({
    example: 'Computer Science Student | Aspiring Software Engineer',
  })
  title: string;

  @ApiProperty({
    example:
      'I build scalable backend systems, AI-powered applications, and modern web experiences...',
  })
  bio: string;

  @ApiProperty({ example: 'https://cloudinary.com/avatar.jpg' })
  avatarUrl?: string | null;

  @ApiProperty({ example: 'https://drive.google.com/resume.pdf' })
  resumeUrl?: string | null;

  @ApiProperty({ example: 'https://github.com/yourusername' })
  githubUrl?: string | null;

  @ApiProperty({ example: 'https://linkedin.com/in/yourusername' })
  linkedinUrl?: string | null;

  @ApiProperty({ example: 'dancan@example.com' })
  email?: string;

  @ApiProperty({ example: 'Nairobi, Kenya' })
  location?: string;
}
