import { Module } from '@nestjs/common';
import { AppUsersController } from './app-users.controller';
import { AppUsersService } from './app-users.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { AssetsModule } from './assets/assets.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3307,
      username: "root",
      password: "admin",
      database: "nestUsers",
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    RolesModule,
    AssetsModule
  ],
  controllers: [AppUsersController],
  providers: [AppUsersService],
})
export class AppUsersModule {}
