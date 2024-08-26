import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { CustomersModule } from '../customers/customers.module';
import { SellersModule } from '../sellers/sellers.module';
import { CustomersService } from '../customers/customers.service';
import { SellersService } from '../sellers/sellers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice]),
    CustomersModule,
    SellersModule
  ],
  controllers: [InvoicesController],
  providers: [
    InvoicesService,
    CustomersService,
    SellersService
  ],
  exports: [TypeOrmModule]
})
export class InvoicesModule {}
