import { Module } from '@nestjs/common';
import { AppAuthController } from './app-auth.controller';
import { AppAuthService } from './app-auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AppAuthController],
  providers: [AppAuthService],
})
export class AppAuthModule {}
