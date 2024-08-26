import { Module } from '@nestjs/common';
import { InvoiceDetailsService } from './invoice-details.service';
import { InvoiceDetailsController } from './invoice-details.controller';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      { name: 'LOGS_SERVICE', transport: Transport.TCP },
    ]),
  ],
  controllers: [InvoiceDetailsController],
  providers: [InvoiceDetailsService],
})
export class InvoiceDetailsModule {}
