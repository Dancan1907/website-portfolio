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
  // Create the admin user
  // ──────────────────────────────────────────────────────────

  const hashedPassword = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
    },
  });

  console.log(`✅ Created admin user: ${admin.email}`);

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
