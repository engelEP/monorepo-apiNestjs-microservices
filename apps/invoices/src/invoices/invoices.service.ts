import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Seller } from '../sellers/entities/seller.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../customers/entities/customer.entity';
import { Invoice } from './entities/invoice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private invoicesRepository: Repository<Invoice>,
    
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,

    @InjectRepository(Seller)
    private sellersRepository: Repository<Seller>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    const { customerId, sellerId, ...rest } = createInvoiceDto;
    const customer = await this.customersRepository.findOneBy({ id: customerId });
    const seller = await this.sellersRepository.findOneBy({ id: sellerId });

    if (!customer) 
      throw new BadRequestException('Customer not found');

    if (!seller)
      throw new BadRequestException('Seller not found');

    const invoice = this.invoicesRepository.create({
      ...rest,
      seller,
      customer
    });

    return this.invoicesRepository.save(invoice);
  }

  findAll() {
    return this.invoicesRepository.find({
      relations: {
        seller: true,
        customer: true,
      }
    });
  }

  findOne(id: number) {
    return this.invoicesRepository.findOne({
      where: { id },
      relations: {
        seller: true,
        customer: true,
      }
    });
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    const { sellerId, customerId, ...rest } = updateInvoiceDto;
    const invoice =  await this.invoicesRepository.findOneBy({ id });

    if (!invoice)
      throw new BadRequestException('Invoice not found');

    let customer;
    if(customerId) {
      customer = await this.customersRepository.findOneBy({ id: customerId });

      if (!customer)
        throw new BadRequestException('Customer not found');
    }

    let seller;
    if(sellerId) {
      seller = await this.sellersRepository.findOneBy({ id: sellerId });

      if (!seller)
        throw new BadRequestException('Seller not found');
    }

    await this.invoicesRepository.update(id, {
      ...invoice,
      ...rest,
      customer,
      seller
    });

    const updateInvoice = this.invoicesRepository.findOne({
      where: { id },
      relations: {
        customer: true,
        seller: true
      }
    })

    return updateInvoice;
  }

  async remove(id: number) {
    const deleteInvoice = this.invoicesRepository.findOne({
      where: { id },
      relations: {
        customer: true,
        seller: true
      }
    });
    
    await this.invoicesRepository.delete(id);

    return deleteInvoice;
  }
}
