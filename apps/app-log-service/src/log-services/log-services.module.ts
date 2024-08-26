import { Module } from '@nestjs/common';
import { LogServicesService } from './log-services.service';
import { LogServicesController } from './log-services.controller';
import { LogService } from './entities/log-service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LogService]),],
  controllers: [LogServicesController],
  providers: [LogServicesService],
})
export class LogServicesModule {}
