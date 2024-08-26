import { Controller, Get } from '@nestjs/common';
import { AppLogServiceService } from './app-log-service.service';

@Controller()
export class AppLogServiceController {
  constructor(private readonly appLogServiceService: AppLogServiceService) {}

  @Get()
  getHello(): string {
    return this.appLogServiceService.getHello();
  }
}
