import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class InvoicesService {
  private logger;
  constructor(
    private readonly httpService: HttpService,
    @Inject('LOGS_SERVICE') private client: ClientProxy,
  ) {
    this.logger = new Logger();
  }

  async create(createInvoiceDto: CreateInvoiceDto) {
    const { data } = await firstValueFrom(this.httpService.post(`${process.env.URLINVOICE}/invoices`, createInvoiceDto
    ).pipe(catchError((error) => {
        this.logger.error(error);
        throw `Error connect to ${error}`
      }))
    );

    const response = await firstValueFrom(this.client.send<string>('log_created', {
      id: data.id,
      message: "Invoice"
    }).pipe(catchError((error) => {
        throw `An error happened! ${error}`;
      }))
    );

    this.logger.log(response);

    return data;
  }

  async findAll() {
    const { data } = await firstValueFrom(this.httpService.get(`${process.env.URLINVOICE}/invoices`)
    .pipe(catchError((error) => {
        this.logger.error(error);
        throw `Error connect to ${error}`
      }))
    );
    return data;
  }

  async findOne(id: number) {
    const { data } = await firstValueFrom(this.httpService.get(`${process.env.URLINVOICE}/invoices/${id}`)
    .pipe(catchError((error) => {
      this.logger.error(error);
      throw `Error connect to ${error}`
    }))
  );
  return data;
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    const { data } = await firstValueFrom(this.httpService.patch(`${process.env.URLINVOICE}/invoices/${id}`, updateInvoiceDto
      ).pipe(catchError((error) => {
        this.logger.error(error);
        throw `Error connect to ${error}`
      }))
    );
    return data;
  }

  async remove(id: number) {
    const { data } = await firstValueFrom(this.httpService.delete(`${process.env.URLINVOICE}/invoices/${id}`)
    .pipe(catchError((error) => {
        this.logger.error(error);
        throw `Error connect to ${error}`
      }))
    );
    return data;
  }
}
