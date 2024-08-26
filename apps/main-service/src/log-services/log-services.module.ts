import { Module } from '@nestjs/common';
import { LogServicesService } from './log-services.service';
import { LogServicesController } from './log-services.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      { name: 'LOGS_SERVICE', transport: Transport.TCP },
    ]),
  ],
  controllers: [LogServicesController],
  providers: [LogServicesService],
})
export class LogServicesModule {}
