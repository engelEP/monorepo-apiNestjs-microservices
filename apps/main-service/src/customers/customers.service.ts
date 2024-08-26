import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CustomersService {
  private logger;
  constructor(
    private readonly httpService: HttpService,
    @Inject('LOGS_SERVICE') private client: ClientProxy,
  ) {
    this.logger = new Logger();
  }

  async create(createCustomerDto: CreateCustomerDto) {
    const { data } = await firstValueFrom(this.httpService.post(`${process.env.URLINVOICE}/customers`, createCustomerDto
    ).pipe(catchError((error) => {
        throw `Error connect to ${error}`
      }))
    );
    
    const response = await firstValueFrom(this.client.send<string>('log_created', {
      id: data.id,
      message: "Customer"
    }).pipe(catchError((error) => {
        throw `An error happened! ${error}`;
      }))
    );

    this.logger.log(response);

    return data;
  }

  async findAll() {
    const { data } = await firstValueFrom(this.httpService.get(`${process.env.URLINVOICE}/customers`)
    .pipe(catchError((error) => {
        throw `Error connect to ${error}`
      }))
    );
    return data;
  }

  async findOne(id: number) {
    const { data } = await firstValueFrom(this.httpService.get(`${process.env.URLINVOICE}/customers/${id}`)
    .pipe(catchError((error) => {
        throw `Error connect to ${error}`
      }))
    );
    return data;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const { data } = await firstValueFrom(this.httpService.patch(`${process.env.URLINVOICE}/customers/${id}`, updateCustomerDto
      ).pipe(catchError((error) => {
        throw `Error connect to ${error}`
      }))
    );
    return data;
  }

  async remove(id: number) {
    const { data } = await firstValueFrom(this.httpService.delete(`${process.env.URLINVOICE}/customers/${id}`)
    .pipe(catchError((error) => {
      throw `Error connect to ${error}`
    }))
  );
  return data;
  }
}
