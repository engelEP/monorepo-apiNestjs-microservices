import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ClientProxy } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class RolesService {
  private logger;
  constructor(
    private readonly httpService: HttpService,
    @Inject('LOGS_SERVICE') private client: ClientProxy,
  ) {
    this.logger = new Logger();
  }

  async create(createRoleDto: CreateRoleDto) {
    const { data } = await firstValueFrom(this.httpService.post(`${process.env.URLUSER}/roles`, createRoleDto
    ).pipe(catchError((error) => {
        throw `Error connect to ${error}`
      }))
    );

    const response = await firstValueFrom(this.client.send<string>('log_created', {
      id: data.id,
      message: "Rol"
    }).pipe(catchError((error) => {
        throw `An error happened! ${error}`;
      }))
    );

    this.logger.log(response);

    return data;
  }

  async findAll() {
    const { data } = await firstValueFrom(this.httpService.get(`${process.env.URLUSER}/roles`
    ).pipe(catchError((error) => {
        throw `Error connect to ${error}`
      }))
    );

    return data;
  }

  async findOne(id: number) {
    const { data } = await firstValueFrom(this.httpService.get(`${process.env.URLUSER}/roles/${id}`
    ).pipe(catchError((error) => {
        throw `Error connect to ${error}`
      }))
    );

    return data;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const { data } = await firstValueFrom(this.httpService.patch(`${process.env.URLUSER}/roles/${id}`, updateRoleDto
    ).pipe(catchError((error) => {
        throw `Error connect to ${error}`
      }))
    );

    return data;
  }

  async remove(id: number) {
    const { data } = await firstValueFrom(this.httpService.delete(`${process.env.URLUSER}/roles/${id}`
    ).pipe(catchError((error) => {
        throw `Error connect to ${error}`
      }))
    );

    return data;
  }
}
