import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}
  
  async create(createProductDto: CreateProductDto) {
    const product = this.productsRepository.create(createProductDto);
    return await this.productsRepository.save(product);
  }

  findAll() {
    return this.productsRepository.find();
  }

  findOne(id: number) {
    return this.productsRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.productsRepository.update(id, updateProductDto);
    const updateProduct = this.productsRepository.findOne({
      where: { id } 
    });

    return updateProduct;
  }

  async remove(id: number) {
    const deleteProduct = this.productsRepository.findOne({
      where: { id }
    });
    await this.productsRepository.delete(id);

    return deleteProduct;
  }
}
