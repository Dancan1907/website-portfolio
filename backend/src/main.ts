import { NestFactory } from '@nestjs/core'; // Factory to create the app instance
import { AppModule } from './app.module'; // Root module that imports all others

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Create the app
  await app.listen(process.env.PORT ?? 3000); // Start the server on port 3000
}
bootstrap(); // Execute the bootstrap function

/*
 * main.ts - Entry point of the NestJS application
 *
 * This file:
 * 1. Imports NestFactory from @nestjs/core
 * 2. Imports AppModule (the root module)
 * 3. Creates an instance of the application
 * 4. Starts the server on port 3000
 */
