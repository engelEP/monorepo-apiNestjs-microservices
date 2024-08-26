import { Controller, Get } from '@nestjs/common';
import { AppImageService } from './app-image.service';

@Controller()
export class AppImageController {
  constructor(private readonly appImageService: AppImageService) {}

  @Get()
  getHello(): string {
    return this.appImageService.getHello();
  }
}
