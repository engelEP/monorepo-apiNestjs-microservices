import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateInvoiceDetailDto } from './dto/create-invoice-detail.dto';
import { UpdateInvoiceDetailDto } from './dto/update-invoice-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceDetail } from './entities/invoice-detail.entity';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Invoice } from '../invoices/entities/invoice.entity';

@Injectable()
export class InvoiceDetailsService {

  constructor(
    @InjectRepository(InvoiceDetail)
    private invoiceDetailsRepository: Repository<InvoiceDetail>,
    
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,

    @InjectRepository(Invoice)
    private InvoicesRepository: Repository<Invoice>,
  ) {}

  async create(createInvoiceDetailDto: CreateInvoiceDetailDto) {
    const { productId, invoiceId, ...rest } = createInvoiceDetailDto;
    const product = await this.productsRepository.findOneBy({ id: productId });
    const invoice = await this.InvoicesRepository.findOneBy({ id: invoiceId });

    if(!product)
      throw new BadRequestException('Product not found');

    if(!invoice)
      throw new BadRequestException('Invoice not found');

    const invoiceDetail = this.invoiceDetailsRepository.create({
      ...rest,
      product,
      invoice
    });

    return this.invoiceDetailsRepository.save(invoiceDetail);
  }

  findAll() {
    return this.invoiceDetailsRepository.find({
      relations: {
        invoice: {
          customer: true,
          seller: true
        },
        product: true
      }
    });
  }

  findOne(id: number) {
    return this.invoiceDetailsRepository.findOne({
      where: { id },
      relations: {
        invoice: {
          customer: true,
          seller: true
        },
        product: true
      }
    });
  }

  async update(id: number, updateInvoiceDetailDto: UpdateInvoiceDetailDto) {
    const { productId, invoiceId, ...rest } = updateInvoiceDetailDto;
    const invoiceDetail = await this.invoiceDetailsRepository.findOne({
      where: { id },
      relations: {
        invoice: {
          customer: true,
          seller: true
        },
        product: true
      }
    });

    if(!invoiceDetail)
      throw new BadRequestException('Invoice Details not found');

    let invoice;
    if(invoiceId) {
      invoice = await this.InvoicesRepository.findOne({
        where: { id: invoiceId },
        relations: {
          customer: true,
          seller: true
        }
      });

      if(!invoice)
        throw new BadRequestException('Invoice not found');
    }

    let product;
    if(productId) {
      product = await this.productsRepository.findOneBy({ id: productId });

      if(!product)
        throw new BadRequestException('Product not found');
    }

    await this.invoiceDetailsRepository.update(id, {
      ...invoiceDetail,
      ...rest,
      product,
      invoice
    });

    return this.invoiceDetailsRepository.findOne({
      where: { id },
      relations: {
        invoice: {
          customer: true,
          seller: true
        },
        product: true
      }
    });
  }

  async remove(id: number) {
    const deleteInvoiceDetails = await this.invoiceDetailsRepository.findOne({
      where: { id },
      relations: {
        invoice: {
          customer: true,
          seller: true
        },
        product: true
      }
    });

    await this.invoiceDetailsRepository.delete(id);

    return deleteInvoiceDetails;
  }
}
