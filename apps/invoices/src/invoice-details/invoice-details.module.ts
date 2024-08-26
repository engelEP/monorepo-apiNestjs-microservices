import { Module } from '@nestjs/common';
import { InvoiceDetailsService } from './invoice-details.service';
import { InvoiceDetailsController } from './invoice-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceDetail } from './entities/invoice-detail.entity';
import { ProductsModule } from '../products/products.module';
import { InvoicesModule } from '../invoices/invoices.module';
import { CustomersModule } from '../customers/customers.module';
import { SellersModule } from '../sellers/sellers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceDetail]),
    ProductsModule,
    InvoicesModule,
    CustomersModule,
    SellersModule,
  ],
  controllers: [InvoiceDetailsController],
  providers: [InvoiceDetailsService],
})
export class InvoiceDetailsModule {}
