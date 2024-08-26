import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';
import { RolesModule } from '../roles/roles.module';
import { RolesService } from '../roles/roles.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Asset]),
    RolesModule
  ],
  controllers: [AssetsController],
  providers: [AssetsService, RolesService],
  exports: [TypeOrmModule]
})
export class AssetsModule {}
