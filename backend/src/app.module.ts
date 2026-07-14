import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [], // Future modules will be added here
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

/*
 * app.module.ts - Root module of the application
 *
 * This file:
 * 1. Defines the AppModule class
 * 2. Uses @Module() decorator to define:
 *    - imports: other modules (empty for now)
 *    - controllers: AppController
 *    - providers: AppService
 * 3. This is where we'll add all future modules (Auth, Projects, Skills, etc.)
 */
