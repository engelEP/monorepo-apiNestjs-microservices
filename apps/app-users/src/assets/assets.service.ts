import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from './entities/asset.entity';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset)
    private assetsRepository: Repository<Asset>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async create(createAssetDto: CreateAssetDto) {
    const { rolesId, ...rest } = createAssetDto;

    let roles;
    if(rolesId?.length) {
      roles = await Promise.all(
        rolesId.map((rol) => this.rolesRepository.findOneBy({ id: rol }))
      );
    }

    const asset = this.assetsRepository.create({
      ...rest,
      roles
    });
    
    return this.assetsRepository.save(asset);
  }

  findAll() {
    return this.assetsRepository.find();
  }

  findOne(controller: string) {
    return this.assetsRepository.find({
      where: { controller }
    });
  }

  update(id: number, updateAssetDto: UpdateAssetDto) {
    return `This action updates a #${id} asset`;
  }

  remove(id: number) {
    return `This action removes a #${id} asset`;
  }
}
