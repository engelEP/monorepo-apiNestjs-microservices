import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpService } from '@nestjs/axios';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  private logger;
  constructor(
    private readonly httpService: HttpService,
    @Inject('LOGS_SERVICE') private client: ClientProxy,
  ) {
    this.logger = new Logger();
  }
  
  async create(createUserDto: CreateUserDto) {
    const { data } = await firstValueFrom(this.httpService.post(`${process.env.URLUSER}/users`, createUserDto
    ).pipe(catchError(({ response: { data } }) => {
        throw data;
      }))
    );

    const response = await firstValueFrom(this.client.send<string>('log_created', {
      id: data.id,
      message: "User"
    }).pipe(catchError(({ response: { data } }) => {
        throw data;
      }))
    );

    this.logger.log(response);

    return data;
  }

  async findAll() {
    const { data } = await firstValueFrom(this.httpService.get(`${process.env.URLUSER}/users`
    ).pipe(catchError(({ response: { data } }) => {
        throw data;
      }))
    );

    return data;
  }

  async findOne(id: number) {
    const { data } = await firstValueFrom(this.httpService.get(`${process.env.URLUSER}/users/${id}`
    ).pipe(catchError(({ response: { data } }) => {
        throw data;
      }))
    );

    return data;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { data } = await firstValueFrom(this.httpService.patch(`${process.env.URLUSER}/users/${id}`, updateUserDto
    ).pipe(catchError(({ response: { data } }) => {
        throw data;
      }))
    );

    return data;
  }

  async remove(id: number) {
    const { data } = await firstValueFrom(this.httpService.delete(`${process.env.URLUSER}/users/${id}`
    ).pipe(catchError((error) => {
        throw `Error connect to ${error}`
      }))
    );

    return data;
  }
}
