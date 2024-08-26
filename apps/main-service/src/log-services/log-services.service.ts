import { Inject, Injectable } from '@nestjs/common';
import { CreateLogServiceDto } from './dto/create-log-service.dto';
import { UpdateLogServiceDto } from './dto/update-log-service.dto';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class LogServicesService {
  constructor(
    @Inject('LOGS_SERVICE') private client: ClientProxy,
  ) {}

  create(createLogServiceDto: CreateLogServiceDto) {
    return 'This action adds a new logService';
  }

  async findAll() {
    return await firstValueFrom(this.client.send<any>('log_get', 'Get all logs')
    .pipe(catchError((error) => {
      throw `An error happened! ${error}`;
    }))
  );
  }

  async findOne(id: number) {
    return await firstValueFrom(this.client.send<any>('log_getById', { id })
    .pipe(catchError((error) => {
        throw `Error search log ${error}`;
      }))
    );
  }

  update(id: number, updateLogServiceDto: UpdateLogServiceDto) {
    return `This action updates a #${id} logService`;
  }

  remove(id: number) {
    return `This action removes a #${id} logService`;
  }
}
