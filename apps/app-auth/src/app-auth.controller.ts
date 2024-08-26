import { Controller, Get } from '@nestjs/common';
import { AppAuthService } from './app-auth.service';

@Controller()
export class AppAuthController {
  constructor(private readonly appAuthService: AppAuthService) {}

  @Get()
  getHello(): string {
    return this.appAuthService.getHello();
  }
}
