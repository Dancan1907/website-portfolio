import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module'; // ← NEW IMPORT

@Module({
  imports: [
    PrismaModule, // Already here
    AuthModule, // ← ADD THIS
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
