import { Module } from '@nestjs/common';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellersModule } from './sellers/sellers.module';
import { CustomersModule } from './customers/customers.module';
import { InvoicesModule } from './invoices/invoices.module';
import { InvoiceDetailsModule } from './invoice-details/invoice-details.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3307,
      username: "root",
      password: "admin",
      database: "nestDB",
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductsModule,
    SellersModule,
    CustomersModule,
    InvoicesModule,
    InvoiceDetailsModule
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class AppModule {}
