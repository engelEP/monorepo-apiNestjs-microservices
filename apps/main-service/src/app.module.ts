import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { SellersModule } from './sellers/sellers.module';
import { CustomersModule } from './customers/customers.module';
import { InvoicesModule } from './invoices/invoices.module';
import { InvoiceDetailsModule } from './invoice-details/invoice-details.module';
import { LogServicesModule } from './log-services/log-services.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { UploadFileModule } from './upload-file/upload-file.module';

@Module({
  imports: [
    ProductsModule,
    SellersModule,
    CustomersModule,
    InvoicesModule,
    InvoiceDetailsModule,
    LogServicesModule,
    ClientsModule.register([
      { name: 'LOGS_SERVICE', transport: Transport.TCP },
    ]),
    UsersModule,
    RolesModule,
    AuthModule,
    UploadFileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
