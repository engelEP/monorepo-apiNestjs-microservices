import { Controller, Get, Post, Param, } from '@nestjs/common';
import { LogServicesService } from './log-services.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('log-services')
export class LogServicesController {
  constructor(private readonly logServicesService: LogServicesService) {}

  @MessagePattern('log_created')
  @Post()
  create(@Payload() payload) {
    return this.logServicesService.create(payload);
  }

  @MessagePattern('log_get')
  @Get()
  findAll() {
    return this.logServicesService.findAll();
  }

  @MessagePattern('log_getById')
  @Get(':id')
  findOne(@Param('id') id: number, @Payload() payload) {
    return this.logServicesService.findOne(payload);
  }
}
