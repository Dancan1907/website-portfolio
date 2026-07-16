// ──────────────────────────────────────────────────────────────
// DATABASE SEED SCRIPT
// ──────────────────────────────────────────────────────────────
//
// This script creates an initial admin user in the database.
//
// Run with: pnpm dlx prisma db seed
// ──────────────────────────────────────────────────────────────

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ──────────────────────────────────────────────────────────
  // 1. Hash the password
  // ──────────────────────────────────────────────────────────

  const hashedPassword = await bcrypt.hash('password123', 10);

  // ──────────────────────────────────────────────────────────
  // 2. Create or update the admin user
  // ──────────────────────────────────────────────────────────

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
    },
  });

  console.log(`✅ Created admin user: ${admin.email}`);

  // ──────────────────────────────────────────────────────────
  // 3. Create or update the admin's profile
  // ──────────────────────────────────────────────────────────

  await prisma.profile.upsert({
    where: { userId: admin.id },
    update: {},
    create: {
      userId: admin.id,
      name: 'Dancan Kalerwa',
      title: 'Computer Science Student | Aspiring Software Engineer',
      bio: 'I build scalable backend systems, AI-powered applications, and modern web experiences with a focus on solving real-world problems through software.',
      location: 'Nairobi, Kenya',
      email: 'dancankalerwa@gmail.com',
      githubUrl: 'https://github.com/Dancan1907',
      linkedinUrl: 'https://www.linkedin.com/in/dancan-kalerwa-7a3741297/',
      avatarUrl:
        'https://ui-avatars.com/api/?name=Dancan+Kalerwa&background=6366f1&color=fff',
    },
  });

  console.log('✅ Created admin profile');

  console.log('🌱 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
