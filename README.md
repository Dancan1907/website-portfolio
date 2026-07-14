# Website Portfolio

Full-stack portfolio management system with an admin dashboard.

<!-- Example: Add a comment at the top of your README -->
<!-- 
  This is my personal portfolio project.
  I'm building this to learn full-stack development with Next.js and NestJS.
  The goal is to have a working portfolio + admin dashboard by the end.
-->


## Tech Stack

### Backend
- NestJS
- TypeScript
- Prisma ORM (v5.22.0)
- PostgreSQL (Neon)
- JWT Authentication
- Railway (Hosting)

### Frontend
- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query

## Project Structure
website_portfolio/
├── backend/ # NestJS backend API
└── frontend/ # Next.js frontend app


## Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm

### Backend Setup

```bash
cd backend
pnpm install
pnpm dlx prisma migrate dev --name init
pnpm run start:dev

Frontend Setup
cd frontend
pnpm install
pnpm run dev

Backend (.env)
DATABASE_URL="your_neon_postgresql_connection_string"
JWT_SECRET="your_jwt_secret_key"

Frontend (.env.local)
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

