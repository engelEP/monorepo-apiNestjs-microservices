import { Controller, Get } from '@nestjs/common';
import { AppUsersService } from './app-users.service';

@Controller()
export class AppUsersController {
  constructor(private readonly appUsersService: AppUsersService) {}

  @Get()
  getHello(): string {
    return this.appUsersService.getHello();
  }
}
