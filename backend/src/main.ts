import { NestFactory } from '@nestjs/core'; // Factory to create the app instance
import { AppModule } from './app.module'; // Root module that imports all others
import { ValidationPipe } from '@nestjs/common'; // Built-in pipe for automatic request validation

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Create the app

  // ──────────────────────────────────────────────────────────
  // Enable CORS (Allow frontend to call the API)
  // ──────────────────────────────────────────────────────────

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // ──────────────────────────────────────────────────────────
  // Enable validation globally
  // ──────────────────────────────────────────────────────────

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`); // Start the server on port 3000
}
bootstrap(); // Execute the bootstrap function

/*
 * main.ts - Entry point of the NestJS application
 *
 * This file:
 * 1. Imports NestFactory from @nestjs/core
 * 2. Imports AppModule (the root module)
 * 3. Creates an instance of the application
 * 4. Enables CORS so the frontend (http://localhost:3001) can call the API
 * 5. Enables global request validation via ValidationPipe
 * 6. Starts the server on process.env.PORT, defaulting to 3000
 */
