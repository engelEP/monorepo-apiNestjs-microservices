import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    const role = this.rolesRepository.create(createRoleDto);
    return this.rolesRepository.save(role);
  }

  findAll() {
    return this.rolesRepository.find();
  }

  findOne(id: number) {
    return this.rolesRepository.findOne({
      where: { id }
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.rolesRepository.update(id, updateRoleDto);

    return this.rolesRepository.findOne({
      where: { id }
    });
  }

  async remove(id: number) {
    const deleteProduct =  this.rolesRepository.findOne({
      where: { id }
    });

    await this.rolesRepository.delete(id);

    return deleteProduct;
  }
}
