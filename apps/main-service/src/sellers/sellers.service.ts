import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class SellersService {
  private logger;
  constructor(
    private readonly httpService: HttpService,
    @Inject('LOGS_SERVICE') private client: ClientProxy,
  ) {
    this.logger = new Logger();
  }

  async create(createSellerDto: CreateSellerDto) {
    const { data } = await firstValueFrom(this.httpService.post(`${process.env.URLINVOICE}/sellers`, createSellerDto
      ).pipe(catchError((error) => {
        this.logger.error(error);
        throw `Error connect to ${error}`
      }))
    );

    const response = await firstValueFrom(this.client.send<string>('log_created', {
      id: data.id,
      message: "Seller"
    }).pipe(catchError((error) => {
        throw `An error happened! ${error}`;
      }))
    );

    this.logger.log(response);

    return data;
  }

  async findAll() {
    const { data } = await firstValueFrom(this.httpService.get(`${process.env.URLINVOICE}/sellers`)
      .pipe(catchError((error) => {
        this.logger.error(error);
        throw `Error connect to ${error}`
      }))
    );
    return data;
  }

  async findOne(id: number) {
    const { data } = await firstValueFrom(this.httpService.get(`${process.env.URLINVOICE}/sellers/${id}`)
    .pipe(catchError((error) => {
      this.logger.error(error);
      throw `Error connect to ${error}`
    }))
  );
  return data;
  }

  async update(id: number, updateSellerDto: UpdateSellerDto) {
    const { data } = await firstValueFrom(this.httpService.patch(`${process.env.URLINVOICE}/sellers/${id}`, updateSellerDto
      ).pipe(catchError((error) => {
        this.logger.error(error);
        throw `Error connect to ${error}`
      }))
    );
    return data;
  }

  async remove(id: number) {
    const { data } = await firstValueFrom(this.httpService.delete(`${process.env.URLINVOICE}/sellers/${id}`)
    .pipe(catchError((error) => {
      this.logger.error(error);
      throw `Error connect to ${error}`
    }))
  );
  return data;
  }
}
