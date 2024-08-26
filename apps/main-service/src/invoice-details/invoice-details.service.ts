import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateInvoiceDetailDto } from './dto/create-invoice-detail.dto';
import { UpdateInvoiceDetailDto } from './dto/update-invoice-detail.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class InvoiceDetailsService {
  private logger;
  constructor(
    private readonly httpService: HttpService,
    @Inject('LOGS_SERVICE') private client: ClientProxy,
  ) {
    this.logger = new Logger();
  }

  async create(createInvoiceDetailDto: CreateInvoiceDetailDto) {
    const { data } = await firstValueFrom(this.httpService.post(`${process.env.URLINVOICE}/invoice-details`, createInvoiceDetailDto
    ).pipe(catchError((error) => {
        this.logger.error(error);
        throw `Error connect to ${error}`
      }))
    );

    const response = await firstValueFrom(this.client.send<string>('log_created', {
      id: data.id,
      message: "Invoice Details"
    }).pipe(catchError((error) => {
        throw `An error happened! ${error}`;
      }))
    );

    this.logger.log(response);

    return data;
  }

  async findAll() {
    const { data } = await firstValueFrom(this.httpService.get(`${process.env.URLINVOICE}/invoice-details`)
      .pipe(catchError((error) => {
        this.logger.error(error);
        throw `Error connect to ${error}`
      }))
    );
    return data;
  }

  async findOne(id: number) {
    const { data } = await firstValueFrom(this.httpService.get(`${process.env.URLINVOICE}/invoice-details/${id}`)
    .pipe(catchError((error) => {
        this.logger.error(error);
        throw `Error connect to ${error}`
      }))
    );
    return data;
  }

  async update(id: number, updateInvoiceDetailDto: UpdateInvoiceDetailDto) {
    const { data } = await firstValueFrom(this.httpService.patch(`${process.env.URLINVOICE}/invoice-details/${id}`, updateInvoiceDetailDto
      ).pipe(catchError((error) => {
        this.logger.error(error);
        throw `Error connect to ${error}`
      }))
    );
    return data;
  }

  async remove(id: number) {
    const { data } = await firstValueFrom(this.httpService.delete(`${process.env.URLINVOICE}/invoice-details/${id}`)
      .pipe(catchError((error) => {
        this.logger.error(error);
        throw `Error connect to ${error}`
      }))
    );
    return data;
  }
}
