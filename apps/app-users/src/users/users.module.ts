import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RolesModule } from '../roles/roles.module';
import { RolesService } from '../roles/roles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RolesModule
  ],
  controllers: [UsersController],
  providers: [UsersService, RolesService],
  exports: [TypeOrmModule]
})
export class UsersModule {}
