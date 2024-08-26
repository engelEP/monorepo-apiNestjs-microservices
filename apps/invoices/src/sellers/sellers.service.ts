import { Injectable } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SellersService {
  constructor(
    @InjectRepository(Seller)
    private sellersRepository: Repository<Seller>,
  ) {}

  async create(createSellerDto: CreateSellerDto) {
    const seller = this.sellersRepository.create(createSellerDto);
    return await this.sellersRepository.save(seller);
  }

  findAll() {
    return this.sellersRepository.find();
  }

  findOne(id: number) {
    return this.sellersRepository.findOne({
      where: { id }
    });
  }

  async update(id: number, updateSellerDto: UpdateSellerDto) {
    await  this.sellersRepository.update(id, updateSellerDto);
    const updateSeller = this.sellersRepository.findOne({
      where: { id }
    })
    return updateSeller;
  }

  async remove(id: number) {
    const deleteSeller = this.sellersRepository.findOne({
      where: { id }
    });
    await this.sellersRepository.delete(id);

    return deleteSeller;
  }
}
