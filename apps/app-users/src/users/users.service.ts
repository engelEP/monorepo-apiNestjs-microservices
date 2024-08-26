import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { rolesId, ...rest } = createUserDto;

    let roles;
    if(rolesId?.length) {
      roles = await Promise.all(
        rolesId.map((rol) => this.rolesRepository.findOneBy({ id: rol }))
      );
    }

    const user = this.usersRepository.create({
      ...rest,
      roles
    });
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find({
      relations: {
        roles: true
      }
    });
  }

  findOne(id: number) {
    return this.usersRepository.findOne({
      where: { id },
      relations: {
        roles: true
      }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { rolesId, ...rest } = updateUserDto;
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        roles: true
      }
    });

    if(!user)
      throw new BadRequestException('User not found...')

    let roles;
    if(rolesId?.length) {
      roles = await Promise.all(
        rolesId.map((rol) => this.rolesRepository.findOneBy({ id: rol }))
      );
    }
    
    return await this.usersRepository.save({
      ...user,
      ...rest,
      roles
    });
  }

  async remove(id: number) {
    const deleteUser = this.usersRepository.findOne({
      where: { id },
      relations: {
        roles: true
      }
    });

    await this.usersRepository.delete(id);

    return deleteUser;
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
}
