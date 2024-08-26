import { Module } from '@nestjs/common';
import { AppLogServiceController } from './app-log-service.controller';
import { AppLogServiceService } from './app-log-service.service';
import { LogServicesModule } from './log-services/log-services.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3307,
      username: "root",
      password: "admin",
      database: "nestLog",
      autoLoadEntities: true,
      synchronize: true,
    }),
    LogServicesModule
  ],
  controllers: [AppLogServiceController],
  providers: [AppLogServiceService],
  exports: [TypeOrmModule]
})
export class AppLogServiceModule {}
