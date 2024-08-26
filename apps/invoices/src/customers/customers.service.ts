import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = this.customersRepository.create(createCustomerDto);
    return await this.customersRepository.save(customer);
  }

  findAll() {
    return this.customersRepository.find();
  }

  findOne(id: number) {
    return this.customersRepository.findOne({
      where: { id },
    });
  }

async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    await this.customersRepository.update(id, updateCustomerDto);
    const updateCustomer = this.customersRepository.findOne({
      where: { id }
    });

    return updateCustomer;
  }

  async remove(id: number) {
    const deleteCustomer = this.customersRepository.find({
      where: { id }
    });
    await this.customersRepository.delete(id);

    return deleteCustomer;
  }
}
