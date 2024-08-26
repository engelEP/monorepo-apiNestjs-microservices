import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductsService {
  private logger;
  constructor(
    private readonly httpService: HttpService,
    @Inject('LOGS_SERVICE') private client: ClientProxy,
  ) {
    this.logger = new Logger();
  }

  async create(createProductDto: CreateProductDto) {
    const { data } = await firstValueFrom(this.httpService.post(`${process.env.URLINVOICE}/products`, createProductDto
      ).pipe(catchError((error) => {
        throw `Error connect to ${error}`
      }))
    );

    const response = await firstValueFrom(this.client.send<string>('log_created', {
      id: data.id,
      message: "Product"
    }).pipe(catchError((error) => {
        throw `An error happened! ${error}`;
      }))
    );

    this.logger.log(response);

    return data;
  }

  async findAll() {
    const { data } = await firstValueFrom(this.httpService.get(`${process.env.URLINVOICE}/products`)
      .pipe(catchError((error) => {
        throw `Error connect to ${error}`
      }))
    );
    return data;
  }

  async findOne(id: number) {
    const { data } = await firstValueFrom(this.httpService.get(`${process.env.URLINVOICE}/products/${id}`)
      .pipe(catchError((error) => {
        throw `Error connect to ${error}`
      }))
    );
    return data;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { data } = await firstValueFrom(this.httpService.patch(`${process.env.URLINVOICE}/products/${id}`, updateProductDto
      ).pipe(catchError((error) => {
        throw `Error connect to ${error}`
      }))
    );
    return data;
  }

  async remove(id: number) {
    const { data } = await firstValueFrom(this.httpService.delete(`${process.env.URLINVOICE}/products/${id}`)
      .pipe(catchError((error) => {
        throw `Error connect to ${error}`
      }))
    );
    return data;
  }
}
