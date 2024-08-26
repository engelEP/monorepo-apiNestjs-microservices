import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LogServicesService } from './log-services.service';
import { CreateLogServiceDto } from './dto/create-log-service.dto';
import { UpdateLogServiceDto } from './dto/update-log-service.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';

@Controller('log-services')
@UseGuards(AuthGuard)
export class LogServicesController {
  constructor(private readonly logServicesService: LogServicesService) {}

  @Post()
  @UseGuards(RolesGuard)
  create(@Body() createLogServiceDto: CreateLogServiceDto) {
    return this.logServicesService.create(createLogServiceDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  findAll() {
    return this.logServicesService.findAll();
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  findOne(@Param('id') id: string) {
    return this.logServicesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() updateLogServiceDto: UpdateLogServiceDto) {
    return this.logServicesService.update(+id, updateLogServiceDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.logServicesService.remove(+id);
  }
}
